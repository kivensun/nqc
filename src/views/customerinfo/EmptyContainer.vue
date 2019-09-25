<template>
  <div style="height:60px;padding:10px;border:1px solid black;">
    <div style="overflow:hidden;text-align:left;">
      <span style="float:left;margin-top:15px;margin-left:120px;" class="title">输入箱主：</span>
      <a-input style="width: 80px;margin-top:14px;margin-left:5px;" @change="lncdtoUpper()" size="small" v-model="lncd" />
      <span style="margin-top:15px;margin-left:20px;" class="title">输入箱型：</span>
      <a-input style="width: 80px;margin-top:14px;margin-left:5px;"  @change="cttytoUpper()" size="small" v-model="ctty" />
      <a-button style="margin-left:20px;" @click="getData()"  size="small">查找</a-button>
      <a-button style="margin-left:20px;" @click="getDownload()" size="small">下载</a-button>
    </div>
    <div style="margin-top:20px;padding:5px;border:1px solid black;">
      <nbctCompactTable :columns="columns" :rows="rows" />
    </div>
  </div>
</template>

<script>
import { getEmptyContainer } from '@/api/api';
import nbctCompactTable from '@/components/NBCTCompactTable.vue';
import xlsx from '@/utils/xlsx';

export default {
  data() {
    return {
      lncd: '', //
      ctty: '', //
      columns: [
        {
          title: '序号',
          dataIndex: 'key',
          width: 50,
        },
        {
          title: '箱号',
          dataIndex: 'cntrid',
          width: 120,
        },
        {
          title: '航次',
          dataIndex: 'vsvy',
          width: 150,
        },
        {
          title: '尺寸',
          dataIndex: 'ctsz',
          width: 50,
        },
        {
          title: '箱型',
          dataIndex: 'ctty',
          width: 50,
        },
        {
          title: '残损',
          dataIndex: 'indm',
          width: 50,
        },
        {
          title: '箱主',
          dataIndex: 'lncd',
          width: 70,
        },
        {
          title: ' ',
          dataIndex: 'blank',
        }
      ],
      rows: [] //
    };
  },
  components: {
    nbctCompactTable
  },
  methods: {
    getData() {
      getEmptyContainer({
        lncd: this.lncd,
        ctty: this.ctty
      }).then(res => {
        let { flag, data } = res;
        if (flag) {
          this.rows = data.map((item,index) =>{
            let rows = {};
            rows.key = index+1;
            rows.cntrid = item.cntrid;
            rows.vsvy = item.vscdco +'-'+item.vsvyco.trim() +'/'+item.vsdrco;
            rows.ctsz = item.ctszco;
            rows.ctty = item.cttyco;
            rows.indm = item.indmco;
            rows.lncd = item.lncdco;
            return rows;
          });
        } else {
          this.$notification.error({
            message: '出错',
            description: ''
          });
        }
      });
    },
    lncdtoUpper(){
      this.lncd = this.lncd.toUpperCase();
    },
    cttytoUpper(){
      this.ctty = this.ctty.toUpperCase();
    },
      getDownload() {
      const header = this.columns.map(item => {
        let tmp = "";
        tmp = item.title;
        return tmp;
      });
      console.log(header);
      const exportData = this.rows.map(item => {
        delete item.blank;
        let tmpStr = JSON.stringify(item);
        this.columns.forEach(item => {
          tmpStr = tmpStr.replace(item.dataIndex, item.title);
        })
        return JSON.parse(tmpStr);
      });
      console.log(exportData);
      let title = '在场空箱实时查询';
      xlsx(header, exportData, title);
    }
  }
};
</script>