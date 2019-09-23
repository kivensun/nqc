<template>
  <div style="height:60px;padding:10px;border:1px solid black;">
    <div style="overflow:hidden;text-align:left;">
      <span style="float:left;margin-top:15px;margin-left:120px;" class="title">输入箱主：</span>
      <a-input style="width: 80px;margin-top:14px;margin-left:5px;" size="small" v-model="lncd" />
      <span style="margin-top:15px;margin-left:20px;" class="title">输入箱型：</span>
      <a-input style="width: 80px;margin-top:14px;margin-left:5px;" size="small" v-model="ctty" />
      <a-button style="margin-left:20px;" @click="getData1()" size="small">查找</a-button>
      <a-button style="margin-left:20px;" size="small">下载</a-button>
    </div>
    <div style="margin-top:20px;padding:5px;border:1px solid black;">
      <nbctCompactTable :columns="columns" :rows="rows" :loading="loading" />
    </div>
  </div>
</template>

<script>
import { getEmptyContainer } from '@/api/api';
import nbctCompactTable from '@/components/NBCTCompactTable.vue';

export default {
  data() {
    return {
      lncd: 'CMA', //
      ctty: 'GP', //
      columns: [
        {
          title: '箱号',
          dataIndex: 'cntrid',
          width: 100,
          key: 1
        },
        {
          title: '船舶代码',
          dataIndex: 'vscd',
          width: 50,
          key: 2
        },
        {
          title: '航次',
          dataIndex: 'vsvy',
          width: 80,
          key: 3
        },
        {
          title: '尺寸',
          dataIndex: 'ctsz',
          width: 50,
          key: 4
        },
        {
          title: '箱型',
          dataIndex: 'ctty',
          width: 50,
          key: 5
        },
        {
          title: '残损',
          dataIndex: 'lndm',
          width: 50,
          key: 5
        },
        {
          title: '箱主',
          dataIndex: 'lncd',
          width: 50,
          key: 5
        }
      ],
      rows: [] //
    };
  },
  components: {
    nbctCompactTable
  },
  methods: {
    getData1() {
      getEmptyContainer({
        lncd: this.lncd,
        ctty: this.ctty
      }).then(res => {
        let { flag, data } = res;
        if (flag) {
          this.rows = data.map((item,index) =>{
            
          });
        } else {
          this.$notification.error({
            message: '出错',
            description: ''
          });
        }
      });
    }
  }
};
</script>