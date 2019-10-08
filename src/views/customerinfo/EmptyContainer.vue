<template>
  <div>
    <div>
      <span style="margin-top:15px;margin-left:50px;">输入箱主：</span>
      <a-input
        style="width:80px;margin-top:14px;margin-left:5px;"
        @change="lncdtoUpper()"
        size="small"
        v-model="lncd"
      />
      <span style="margin-top:15px;margin-left:20px;">输入箱型：</span>
      <a-input
        style="width: 80px;margin-top:14px;margin-left:5px;"
        @change="cttytoUpper()"
        size="small"
        v-model="ctty"
      />
      <a-button style="margin-left:20px;" @click="getData()" size="small">查找</a-button>
      <a-button style="margin-left:20px;" @click="getDownload()" size="small">下载</a-button>
    </div>
    <div>
      <hr />
      <nbctCompactTable
        :columns="columns"
        :fixedWidth="true"
        fontSize="14"
        textAlign="center"
        :rows="rows"
        :filterColumns="filterColumns"
        :loading="loading"
        style="margin-top:10px;font-size:16px;"
      />
      <hr />
    </div>
  </div>
</template>

<script>
import { getEmptyContainer } from '@/api/api';
import nbctCompactTable from '@/components/NBCTCompactTable.vue';
import xlsx from '@/utils/xlsx';
import { mapState } from 'vuex';
import U from '@/utils/utils.vue';

const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    width: 50
  },
  {
    title: '箱号',
    dataIndex: 'cntrid',
    width: 140
  },
  {
    title: '航次',
    dataIndex: 'vsvy',
    width: 150
  },
  {
    title: '尺寸',
    dataIndex: 'ctsz',
    width: 50
  },
  {
    title: '箱型',
    dataIndex: 'ctty',
    width: 50
  },
  {
    title: '堆场位置',
    dataIndex: 'ydst',
    width: 120
  },
  {
    title: '残损',
    dataIndex: 'indm',
    width: 50
  },
  {
    title: '禁提',
    dataIndex: 'injt',
    width: 50
  },
  {
    title: '毛重',
    dataIndex: 'ctgw',
    width: 50
  },
  {
    title: '进场日期',
    dataIndex: 'intime',
    width: 160
  }
];

const filterColumns = columns.slice(1);

export default {
  data() {
    return {
      lncd: '', //
      ctty: '', //
      columns,
      filterColumns,
      rows: [], //
      loading: false
    };
  },
  computed: {
    ...mapState({
      companyId: state => state.user.companyId
    })
  },
  components: {
    nbctCompactTable
  },
  mounted() {
    (this.lncd = this.companyId), this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      getEmptyContainer({
        lncd: this.lncd,
        ctty: this.ctty
      }).then(res => {
        this.loading = false;
        let { flag, data } = res;
        if (flag) {
          this.rows = data.map((item, index) => {
            return {
              ...item,
              key: index + 1,
              vsvy: U.isEmpty(item.vscdco.trim()) ? '' : item.vscdco + '-' + item.vsvyco.trim() + '/' + item.vsdrco,
              ctsz: item.ctszco,
              ctty: item.cttyco,
              indm: item.indmco,
              lncd: item.lncdco,
              ydst: item.ydstco + '-' + item.ydlnco + '-' + item.ydrwco + '-' + item.ydelco,
              intime: U.isEmpty(item.intime) ? '' : U.compactDateToNormal(item.intime),
              ctgw: item.ctgwco
            };
          });
        } else {
          this.$notification.error({
            message: '出错',
            description: ''
          });
        }
      });
    },
    lncdtoUpper() {
      this.lncd = this.lncd.toUpperCase();
    },
    cttytoUpper() {
      this.ctty = this.ctty.toUpperCase();
    },
    getDownload() {
      const header = this.columns.map(item => {
        let tmp = '';
        tmp = item.title;
        return tmp;
      });
      console.log(header);
      const exportData = this.rows.map(item => {
        delete item.blank;
        delete item.lncd;
        let tmpStr = JSON.stringify(item);
        this.columns.forEach(item => {
          tmpStr = tmpStr.replace(item.dataIndex, item.title);
        });
        return JSON.parse(tmpStr);
      });
      console.log(exportData);
      let title = '在场空箱实时查询';
      xlsx(header, exportData, title);
    }
  }
};
</script>