<template>
  <div>
    <!-- 航次列表 -->
    <div v-show="voyVisable">
      <div style="min-height:50px;padding:10px;border:1px solid black;">
        <div style="overflow:hidden;">
          <span style="float:left;margin-top:15px;margin-left:20px;" class="title">输入出口航次查询：</span>
          <a-input-search
            @search="onSearch"
            @change="onChange"
            enterButton
            style="width: 500px;float:left;margin-top:10px;margin-left:20px;margin-top:10px;"
            v-model="exvsvy"
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
      <div style="min-height:100px;padding:10px;border:1px solid black;margin-top:10px;">
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
        <a-button style="margin-left:20px;" @click="exportNotLoadExcel">未装船导出</a-button>
        <a-button style="margin-left:20px;" @click="exportLoadedExcel">已装船导出</a-button>
        <a-button style="float:right" @click="voyVisable = true">
          <a-icon type="left" />航次列表
        </a-button>
      </div>
      <div style="margin-top:10px;text-align:left;">
        <hr />
        <nbctCompactTable
          :header="unloadHeader"
          :columns="unloadColumns"
          :rows="unloadCntrs"
          :footer="unloadStatistcsStr"
          :filterColumns="filterColumns"
          :loading="loading"
        />
        <hr />
        <nbctCompactTable
          :header="loadHeader"
          :columns="loadColumns"
          :rows="loadCntrs"
          :footer="loadStatistcsStr"
          :filterColumns="filterColumns"
          :loading="loading"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
td {
  width: 100%;
  font-size: 6px;
  text-align: left;
}
.loading {
  text-align: center;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
</style>

<script>
import { voyagelist, excontainerlist } from '@/api/api';
import U from '@/utils/utils.vue';
import { mapState } from 'vuex';
import xlsx from '@/utils/xlsx';
import nbctCompactTable from '@/components/NBCTCompactTable.vue';

const loadColumns = [
  {
    title: '序号',
    width: 20,
    dataIndex: 'key'
  },
  {
    title: '箱号',
    width: 90,
    dataIndex: 'cntrId'
  },
  {
    title: '港口',
    width: 50,
    dataIndex: 'ptds'
  },
  {
    title: '尺寸类型',
    dataIndex: 'szty',
    width: 40
  },
  {
    title: '重量',
    dataIndex: 'ctgw',
    width: 40
  },
  {
    title: '过磅重量(仅供参考)',
    dataIndex: 'trwt',
    width: 40
  },
  {
    title: '船舱位',
    dataIndex: 'vsLoc',
    width: 60
  },
  {
    title: '扣留/放行',
    dataIndex: 'holdPass',
    width: 20
  },
  {
    title: '放行时间',
    dataIndex: 'passTime',
    width: 120
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
    title: '进场时间',
    dataIndex: 'inTime',
    width: 120
  },
  {
    title: '装船时间',
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
    title: '中转',
    dataIndex: 'ints',
    width: 20
  },
  {
    title: '查验箱',
    dataIndex: 'isck',
    width: 20
  },
  {
    title: '海铁箱',
    dataIndex: 'issrt',
    width: 20
  },
  {
    title: 'VGM重量',
    dataIndex: 'vgmw',
    width: 40
  },
  {
    title: 'VGM称重方式',
    dataIndex: 'vgmm',
    width: 20
  },
  {
    title: 'VGM签名',
    dataIndex: 'vgms',
    width: 60
  },
  {
    title: '内转外',
    dataIndex: 'nzw',
    width: 20
  }
];

const filterColumns = loadColumns.slice(1);

export default {
  data() {
    return {
      voyVisable: true,
      //voyage list
      exvsvy: '', //进口航次
      lncd: '', //船公司
      determineVoys: [], //指定航次列表
      companyVoys: [], //本公司一个月内进口航次
      weekVoys: [], //7天内进口航次
      //voyage cntrs
      curVoy: '', //当前进口航次
      filterOption: 'PORT', //过滤条件
      loading: false,
      //voyage cntrs - load
      loadHeader: '',
      loadColumns, //表格标题
      loadCntrs: [], //箱信息列表
      loadStatistcs: '', //统计信息
      loadStatistcsStr: '',
      //voyage cntrs - unload
      unloadHeader: '',
      unloadColumns: [], //表格标题
      unloadCntrs: [], //箱信息列表
      unloadStatistcs: '', //统计信息
      unloadStatistcsStr: '',
      //excel export
      headers: [],
      contents: [],
      filterColumns
    };
  },
  computed: {
    ...mapState({
      companyId: state => state.user.companyId,
      userType: state => state.user.userType
    })
  },
  methods: {
    exportNotLoadExcel() {
      let me = this;
      if (me.unloadCntrs.length > 0) {
        me.headers = me.unloadColumns.map(item => {
          return item.title;
        });
        me.contents = me.unloadCntrs.map(item => {
          let tmpStr = JSON.stringify(item);
          me.unloadColumns.forEach(item => {
            tmpStr = tmpStr.replace(item.dataIndex, item.title);
          });
          return JSON.parse(tmpStr);
        });
        let foot =
          '统计：' +
          '已放行：' +
          me.unloadStatistcs.rnum +
          '未放行：' +
          me.unloadStatistcs.hnum +
          '国际中转：' +
          me.unloadStatistcs.znum +
          '内支中转：' +
          me.unloadStatistcs.bnum;
        me.contents.push({ 序号: foot });
        xlsx(me.headers, me.contents, me.curVoy.vscd + '-' + me.curVoy.vsvy + '未装船箱信息', 'LAST');
      }
    },
    exportLoadedExcel() {
      let me = this;
      if (me.loadCntrs.length > 0) {
        me.headers = me.loadColumns.map(item => {
          return item.title;
        });
        me.contents = me.loadCntrs.map(item => {
          let tmpStr = JSON.stringify(item);
          me.loadColumns.forEach(item => {
            tmpStr = tmpStr.replace(item.dataIndex, item.title);
          });
          return JSON.parse(tmpStr);
        });
        let foot = '统计：' + '国际中转：' + me.loadStatistcs.znum + '内支中转：' + me.loadStatistcs.bnum;
        me.contents.push({ 序号: foot });
        xlsx(me.headers, me.contents, me.curVoy.vscd + '-' + me.curVoy.vsvy + '已装船箱信息', 'LAST');
      }
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
        vscd: voy.vscd,
        vsvy: voy.vsvy,
        vsdr: voy.vsdr,
        caag: me.companyId,
        usertype: me.userType,
        ordertype: me.filterOption
      };
      excontainerlist(params).then(res => {
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
          me.unloadStatistcs = data.total1;
          me.unloadHeader =
            swrap('未装船箱信息') + //
            smwrap('已放行', me.unloadStatistcs.rnum) +
            smwrap('未放行', me.unloadStatistcs.hnum) +
            smwrap('国际中转', me.unloadStatistcs.znum) +
            smwrap('内支中转', me.unloadStatistcs.bnum);
          me.unloadStatistcsStr =
            swrap('统计') + //
            smwrap('已放行', me.unloadStatistcs.rnum) +
            smwrap('未放行', me.unloadStatistcs.hnum) +
            smwrap('国际中转', me.unloadStatistcs.znum) +
            smwrap('内支中转', me.unloadStatistcs.bnum);
          me.unloadCntrs = data.list1 == null ? [] : data.list1;
          me.unloadCntrs = me.unloadCntrs.map(function(item, index) {
            return {
              ...item,
              key: index + 1,
              cntrId: item.cntrid,
              szty: item.ctsz + item.ctty,
              holdPass: item.isportpass,
              passTime: U.isEmpty(item.passtime) ? '' : U.compactDateToNormal(item.passtime),
              cabl: item.cabl ? item.cabl.replace(/,/g, '<br/>') : '', //
              inTime: U.isEmpty(item.intime) ? '' : U.compactDateToNormal(item.intime),
              nzw: item.isnzwct
            };
          });
          //
          me.loadStatistcs = data.total2;
          me.loadStatistcsStr =
            swrap('统计') + //
            smwrap('国际中转', me.loadStatistcs.znum) +
            smwrap('内支中转', me.loadStatistcs.bnum);
          me.loadHeader =
            swrap('已装船箱信息') + //
            smwrap('国际中转', me.loadStatistcs.znum) +
            smwrap('内支中转', me.loadStatistcs.bnum);
          me.loadCntrs = data.list2 == null ? [] : data.list2;
          me.loadCntrs = me.loadCntrs.map(function(item, index) {
            return {
              ...item,
              key: index + 1,
              cntrId: item.cntrid,
              szty: item.ctsz + item.ctty,
              //vsLoc: item.vsba.padStart(2, '0') + '/' + item.vscl.padStart(2, '0') + '/' + item.vsel.padStart(2, '0'),
              vsLoc: item.vsba.padStart(2, '0') + item.vscl.padStart(2, '0') + item.vsel.padStart(2, '0'),
              holdPass: item.isportpass,
              passTime: U.isEmpty(item.passtime) ? '' : U.compactDateToNormal(item.passtime),
              cabl: item.cabl ? item.cabl.replace(/,/g, '<br/>') : '', //
              inTime: U.isEmpty(item.intime) ? '' : U.compactDateToNormal(item.intime),
              outTime: U.isEmpty(item.outtime) ? '' : U.compactDateToNormal(item.outtime),
              nzw: item.isnzwct
            };
          });
        }
      });
      this.voyVisable = false;
    },
    onChange() {
      this.exvsvy = this.exvsvy.toUpperCase();
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
              key: index,
              vscd: U.trim(item.vscdvy),
              vsvy: U.trim(item.vsvyvy),
              vsdr: U.trim(item.vsdrvy),
              lncd: item.lncdvr,
              title: U.trim(item.egnmvr) + '/' + U.trim(item.cnnmvr) + ' ' + U.trim(item.vsvyvy)
            };
          });
          fn(r);
        }
      });
    },
    companyVoyList() {
      let me = this;
      let params = { vsvy: '', vsdr: 'E', lncd: me.companyId };
      let fn = function(value) {
        me.companyVoys = value;
      };
      me.voyList(params, fn);
    },
    weekVoyList() {
      let me = this;
      let params = { vsvy: '', vsdr: 'E', lncd: '' };
      let fn = function(value) {
        me.weekVoys = value;
      };
      me.voyList(params, fn);
    },
    determineVoy() {
      let me = this;
      if (U.isEmpty(me.exvsvy)) {
        me.$message.warn('请输入航次查询');
        return;
      }
      let params = { vsvy: me.exvsvy, vsdr: 'E', lncd: '' };
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
    this.unloadColumns = loadColumns.filter(item => {
      if (item.dataIndex == 'vsLoc' || item.dataIndex == 'outTime') {
        return false;
      }
      return true;
    });
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
</style>