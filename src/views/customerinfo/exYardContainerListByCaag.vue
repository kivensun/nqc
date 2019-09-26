<template>
  <div>
    <!-- 箱信息列表 -->
    <div>
      <div style="text-align: left;margin-left: 20px;overflow:hidden;">
        <span class="title">货代： {{caag}}</span>
        <span class="title" style="margin-left:50px;">排序方式：</span>
        <a-select
          defaultValue="PORT"
          style="width: 120px"
          v-model="filterOption"
          @change="selFilterOption"
        >
          <a-select-option value="PORT">港口</a-select-option>
          <a-select-option value="CNTRID">箱号</a-select-option>
          <a-select-option value="VSVY">船名航次</a-select-option>
          <a-select-option value="CTSZ">尺寸箱型</a-select-option>
          <a-select-option value="ISPASS">扣留/放行</a-select-option>
        </a-select>
        <a-button style="margin-left:20px;" @click="exportExcel">导出EXCEL</a-button>
      </div>

      <div>
        <hr />
        <nbctCompactTable
          :header="exHeader"
          :columns="exColumns"
          :rows="exCntrs"
          :footer="exStatistcsStr"
          :loading="loading"
          :fixedWidth="false"
          :filterColumns="filterColumns"
          fontSize="14"
          textAlign="center"
        />
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { exYardContainerListByCaag } from '@/api/containerInfo';
import U from '@/utils/utils.vue';
import { mapState } from 'vuex';
import xlsx from '@/utils/xlsx';
import nbctCompactTable from '@/components/NBCTCompactTable.vue';

const exColumns = [
  ////表格标题
  {
    title: '序号',
    width: 40,
    dataIndex: 'key'
  },
  {
    title: '箱号',
    width: 120,
    dataIndex: 'cntrId'
  },
  {
    title: '港口',
    width: 70,
    dataIndex: 'ptds'
  },
  {
    title: '船名',
    dataIndex: 'vscn',
    width: 120
  },
  {
    title: '航次',
    dataIndex: 'vsvy',
    width: 60
  },
  {
    title: '提单号',
    dataIndex: 'cabl',
    width: 140
  },
  {
    title: '尺寸',
    dataIndex: 'ctsz',
    width: 40
  },
  {
    title: '类型',
    dataIndex: 'ctty',
    width: 40
  },
  {
    title: '重量',
    dataIndex: 'ctgw',
    width: 60
  },
  {
    title: '铅封号',
    dataIndex: 'ctsn',
    width: 90
  },
  {
    title: '进场时间',
    dataIndex: 'inTime',
    width: 140
  },
  {
    title: '扣留/放行',
    dataIndex: 'holdPass',
    width: 70
  }
];

const filterColumns = exColumns.slice(1);

export default {
  data() {
    return {
      caag: '', //货代
      filterOption: 'PORT', //过滤条件
      loading: false,
      exHeader: '',
      exCntrs: [], //箱信息列表
      exStatistcs: '', //统计信息
      exStatistcsStr: '',
      //excel export
      headers: [],
      contents: [],
      exColumns,
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
    //导出EXCEL
    exportExcel() {
      let me = this;

      if (me.exCntrs.length > 0) {
        me.headers = me.exColumns.map(item => {
          return item.title;
        });
        me.contents = me.exCntrs.map(item => {
          let tmpStr = JSON.stringify(item);
          me.exColumns.forEach(item => {
            tmpStr = tmpStr.replace(item.dataIndex, item.title);
          });
          return JSON.parse(tmpStr);
        });
        let foot = '统计：' + '已放行：' + me.exStatistcs.rnum + '未放行：' + me.exStatistcs.hnum;
        me.contents.push({ 序号: foot });
        xlsx(me.headers, me.contents, me.caag + '在场出口箱信息', 'LAST');
      }
    },
    listCaagCntr() {
      let me = this;
      me.caag = me.companyId;
      me.loading = true;
      let params = {
        caag: me.companyId,
        ordertype: me.filterOption
      };
      exYardContainerListByCaag(params).then(res => {
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
          me.exStatistcs = data.total;
          me.exHeader =
            swrap('在场出口箱信息') + //
            smwrap('已放行', me.exStatistcs.rnum) +
            smwrap('未放行', me.exStatistcs.hnum);
          me.exStatistcsStr =
            swrap('统计') + //
            smwrap('已放行', me.exStatistcs.rnum) +
            smwrap('未放行', me.exStatistcs.hnum);
          me.exCntrs = data.list == null ? [] : data.list;
          me.exCntrs = me.exCntrs.map(function(item, index) {
            let c = {};
            c.key = index + 1;
            c.cntrId = item.cntrId;
            c.ptds = item.ptds;
            c.vscn = item.vscn;
            c.vsvy = item.vsvy;
            c.cabl = item.cabl.replace(/,/g, '<br/>');
            c.ctsz = item.ctsz;
            c.ctty = item.ctty;
            c.ctgw = item.ctgw;
            c.ctsn = item.ctsn;
            c.inTime = U.isEmpty(item.intime) ? '' : U.compactDateToNormal(item.intime);
            c.holdPass = item.isportpass;
            return c;
          });
        }
      });
    },
    selFilterOption() {
      let me = this;
      me.listCaagCntr();
    }
  },
  components: {
    nbctCompactTable
  },
  mounted() {
    this.listCaagCntr();
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