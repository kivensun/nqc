<template>
  <div>
    <!-- 航次列表 -->
    <div v-show="voyVisable">
      <div class="block" style="min-height:50px;">
        <div style="text-align:left;">
          <span style="margin-left:20px;" class="title">输入进口航次查询：</span>
          <a-input-search
            @search="onSearch"
            @change="onChange"
            enterButton
            style="width: 400px;margin-left:20px;"
            v-model="imvsvy"
          />
        </div>
        <div style="overflow:hidden;margin-top:10px;">
          <a-tag
            v-for="voy in determineVoys"
            :key="voy.key"
            @click="showVoyCntrs(voy)"
            class="tag"
          >{{voy.title}}</a-tag>
        </div>
      </div>
      <div class="block" style="min-height:100px;">
        <div style="text-align:left;margin-left:20px;margin-top:10px;">
          <span class="title">7天内所有航次</span>
        </div>
        <div style="overflow:hidden;">
          <a-tag
            v-for="voy in weekVoys"
            :key="voy.key"
            @click="showVoyCntrs(voy)"
            class="tag"
          >{{voy.title}}</a-tag>
        </div>
      </div>
      <div class="block" style="min-height:100px;">
        <div style="text-align:left;margin-left:20px;margin-top:10px;">
          <span class="title">一个月内{{companyId}}航次</span>
        </div>
        <div style="overflow:hidden;">
          <a-tag
            v-for="voy in companyVoys"
            :key="voy.key"
            @click="showVoyCntrs(voy)"
            class="tag"
          >{{voy.title}}</a-tag>
        </div>
      </div>
    </div>
    <!-- 箱信息列表 -->
    <div v-show="!voyVisable">
      <div style="text-align: left;margin-left: 20px;overflow:hidden;">
        <span class="title">船名/航次： {{curVoy.vscd}} / {{curVoy.vsvy}}</span>
        <span class="title" style="margin-left:50px;">排序方式：</span>
        <a-select
          defaultValue="PORT"
          style="width: 120px"
          v-model="filterOption"
          @change="selFilterOption"
        >
          <a-select-option value="PORT">港口</a-select-option>
          <a-select-option value="LNCD">箱主</a-select-option>
          <a-select-option value="CTSZ">尺寸</a-select-option>
          <a-select-option value="ISPASS">扣留/放行</a-select-option>
        </a-select>
        <a-button style="margin-left:20px;" @click="exportExcel">导出EXCEL</a-button>
        <a-button style="float:right" @click="voyVisable = true">
          <a-icon type="left" />航次列表
        </a-button>
      </div>
      <nbctCompactTable
        :columns="columns"
        :rows="cntrs"
        :footer="statistcsStr"
        :filterColumns="filterColumns"
        style="margin-top:10px;"
      />
    </div>
  </div>
</template>

<script>
import { voyagelist, imcontainerlist } from '@/api/api';
import U from '@/utils/utils.vue';
import { mapState } from 'vuex';
import xlsx from '@/utils/xlsx';
import nbctCompactTable from '@/components/NBCTCompactTable.vue';

const columns = [
  {
    title: '序号',
    width: 20,
    dataIndex: 'key',
    fixed: 'left'
  },
  {
    title: '箱号',
    width: 90,
    dataIndex: 'cntrId',
    fixed: 'left'
  },
  {
    title: '尺寸类型',
    dataIndex: 'szty',
    width: 40
  },
  {
    title: '重量',
    dataIndex: 'weight',
    width: 40
  },
  {
    title: '空/重',
    dataIndex: 'infe',
    width: 20
  },
  {
    title: '提单号',
    dataIndex: 'cabl',
    width: 100
  },
  {
    title: '铅封号',
    dataIndex: 'ctsn',
    width: 100
  },
  {
    title: '卸船时间',
    dataIndex: 'inTime',
    width: 120
  },
  {
    title: '出场时间',
    dataIndex: 'outTime',
    width: 120
  },
  {
    title: '超限',
    dataIndex: 'inog',
    width: 20
  },
  {
    title: '箱主',
    dataIndex: 'lncd',
    width: 30
  },
  {
    title: '冷藏',
    dataIndex: 'inth',
    width: 20
  },
  {
    title: '危品',
    dataIndex: 'inhz',
    width: 20
  },
  {
    title: '危品等级',
    dataIndex: 'hzcl',
    width: 30
  },
  {
    title: '内外贸',
    dataIndex: 'intd',
    width: 20
  },
  {
    title: '中转',
    dataIndex: 'ints',
    width: 20
  },
  {
    title: '内转外',
    dataIndex: 'nzw',
    width: 20
  }
];

const filterColumns = columns.slice(1);

export default {
  data() {
    return {
      voyVisable: true,
      //voyage list
      imvsvy: 'JK044N', //进口航次
      lncd: '', //船公司
      determineVoys: [], //指定航次列表
      companyVoys: [], //本公司一个月内进口航次
      weekVoys: [], //7天内进口航次
      //voyage cntrs
      curVoy: '', //当前进口航次
      filterOption: 'PORT', //过滤条件
      cntrs: [], //箱信息列表
      statistcs: '', //统计信息对象
      statistcsStr: '', //统计信息对象字符串
      pagination: {},
      loading: false,
      columns, //表格标题
      //excel export
      headers: [],
      contents: [],
      filterColumns
    };
  },
  computed: {
    ...mapState({
      companyId: state => state.user.companyId
    })
  },
  methods: {
    exportExcel() {
      let me = this;
      me.headers = me.columns.map(item => {
        return item.title;
      });
      me.contents = me.cntrs.map(item => {
        let tmpStr = JSON.stringify(item);
        this.columns.forEach(item => {
          tmpStr = tmpStr.replace(item.dataIndex, item.title);
        });
        return JSON.parse(tmpStr);
      });
      me.contents.push({ 序号: me.statistcsStr });
      xlsx(me.headers, me.contents, me.curVoy.vscd + '-' + me.curVoy.vsvy + '箱信息', 'LAST');
    },
    selFilterOption() {
      let me = this;
      me.showVoyCntrs(me.curVoy);
    },
    showVoyCntrs(voy) {
      let me = this;
      me.curVoy = voy;
      me.loading = true;
      let params = {
        vscd: voy.vscd, //
        vsvy: voy.vsvy, //
        vsdr: voy.vsdr, //
        lncd: me.companyId, //
        ordertype: me.filterOption
      };
      imcontainerlist(params).then(res => {
        let swrap = title => {
          return `<span>${title}：</span>`;
        };
        let smwrap = (title, num) => {
          return `<span style='margin-left:20px;'>${title}：<b>${num}</b></span>`;
        };
        let { flag, data, errMsg } = res;
        if (!flag) {
          me.loading = false;
          me.$message.error(errMsg);
        } else {
          me.loading = false;
          me.statistcs = data.total;
          me.statistcsStr =
            swrap('统计') +
            smwrap('20箱量', me.statistcs.ct20) +
            smwrap('40箱量', me.statistcs.ct40) +
            smwrap('总箱量', me.statistcs.teu) +
            'TEU';
          me.cntrs = data.list.map(function(item, index) {
            return {
              ...item,
              key: index + 1,
              cntrId: item.cntrid,
              szty: item.ctsz + item.ctty,
              weight: item.ctgw,
              inTime: U.isEmpty(item.intime) ? '' : U.compactDateToNormal(item.intime),
              outTime: U.isEmpty(item.outtime) ? '' : U.compactDateToNormal(item.outtime),
              intd: item.intd == 'W' ? '外' : '内'
            };
          });
        }
      });
      this.voyVisable = false;
    },
    onChange() {
      this.imvsvy = this.imvsvy.toUpperCase();
    },
    onSearch() {
      this.determineVoy();
    },
    voyList(params, fn) {
      voyagelist(params).then(res => {
        let { flag, data, errMsg } = res;
        if (!flag) {
          this.$message.error(errMsg);
        } else {
          let r = data.map(function(item, index) {
            return {
              key: index, //
              vscd: U.trim(item.vscdvy), //
              vsvy: U.trim(item.vsvyvy), //
              vsdr: U.trim(item.vsdrvy), //
              lncd: item.lncdvr, //
              title: U.trim(item.egnmvr) + '/' + U.trim(item.cnnmvr) + ' ' + U.trim(item.vsvyvy)
            };
          });
          fn(r);
        }
      });
    },
    companyVoyList() {
      let me = this;
      let params = { vsvy: '', vsdr: 'I', lncd: me.companyId };
      let fn = function(value) {
        me.companyVoys = value;
      };
      me.voyList(params, fn);
    },
    weekVoyList() {
      let me = this;
      let params = { vsvy: '', vsdr: 'I', lncd: '' };
      let fn = function(value) {
        me.weekVoys = value;
      };
      me.voyList(params, fn);
    },
    determineVoy() {
      let me = this;
      if (U.isEmpty(me.imvsvy)) {
        me.$message.warn('请输入航次查询');
        return;
      }
      let params = { vsvy: me.imvsvy, vsdr: 'I', lncd: '' };
      let fn = function(value) {
        me.determineVoys = value;
      };
      me.voyList(params, fn);
    }
  },
  components: {
    nbctCompactTable
  },
  mounted() {
    this.companyVoyList();
    this.weekVoyList();
  }
};
</script>

<style scoped>
.title {
  font: bold 15px/20px arial, sans-serif;
}
.tag {
  min-width: 250px;
  float: left;
  margin-top: 10px;
  text-align: left;
}
.block {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #c0c4cc;
  border-radius: 10px;
}
</style>

<style scoped>
</style>