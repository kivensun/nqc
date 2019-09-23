<template>
  <div style="height:60px;padding:10px;border:1px solid black;">
    <div style="overflow:hidden;text-align:left;">
      <span style="float:left;margin-top:15px;margin-left:120px;" class="title">输入箱主：</span>

      <a-input style="width: 80px;margin-top:14px;margin-left:5px;" size="small" v-model="lncd" />

      <span style="margin-top:15px;margin-left:20px;" class="title">输入箱型：</span>

      <a-input style="width: 80px;margin-top:14px;margin-left:5px;" size="small" v-model="ctty" />

      <a-button style="margin-left:20px;" size="small">查找</a-button>

      <a-button style="margin-left:20px;" size="small">下载</a-button>
    </div>
    <div style="margin-top:20px;padding:5px;border:1px solid black;">
      <nbctCompactTable :columns="columns" :rows="ocs" :loading="loading" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import moment from 'moment';
import { getEmptyContainer } from '@/api/customerInfo';
import xlsx from '@/utils/xlsx';
import nbctCompactTable from '@/components/NBCTCompactTable.vue';

export default {
  data() {
    return {
      lncd:"",
      ctty:"",
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
      tableData: []
    };
  },
  computed: {
    ...mapState({
      // 动态主路由
      userType: state => state.user.userType,
      companyId: state => state.user.companyId,
      companyHadCodes: state => state.user.companyHadCodes
    })
  },
  components: {
    nbctCompactTable
  },
  mounted() {
    this.options = this.companyHadCodes;
  },
  methods: {
    handleSelChange(value) {
      this.selValue = value;
      console.log(`selected ${value}`);
    },
    getData() {


          getEmptyContainer({
            lncd:this.lncd,
            ctty:this.ctty,
          }).then(res => {
            let { flag, data } = res;
            if (flag) {
        
            
                data.forEach(element => {
                  let tmp = {};
                  tmp.cntrid = cntrid;
                  tmp.vscd = vscd;
                  tmp.vsvy = vsvy;
                  tmp.vscd = vsdr;
                  tmp.ctsz = ctsz;
                  tmp.ctty = ctty;
                  tmp.indm = indm;
                  tmp.lncd = lncd;   
                });
              
        } else {
          this.$notification.error({
            message: '出错',
            description: '请选择箱主'
          });
        }
    }),
  }
  }
}
</script>