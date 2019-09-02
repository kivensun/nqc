<template>
  <div>
    <div>
      <h3>公告时间：{{curDt}}</h3>
      <a-table bordered
               :dataSource="ocs"
               :columns="columns" />
    </div>
  </div>
</template>

<script>
import { orderreceive } from '@/api/api';
import U from '@/utils/utils.vue';

export default {
  data () {
    return {
      curDt: U.formatDate(new Date(), 'yyyy-MM-dd'),
      columns: [
        {
          title: '船名',
          dataIndex: 'cName',
          width: "15%"
        },
        {
          title: '英文船名',
          dataIndex: 'eName',
          width: "10%"
        },
        {
          title: '航次',
          dataIndex: 'voyage',
          width: "10%"
        },
        {
          title: '截单时间',
          dataIndex: 'closeDt',
          width: "15%"
        },
        {
          title: '计划加载截至时间',
          dataIndex: 'loadDt',
          width: "15%"
        },
        {
          title: '备注',
          dataIndex: 'mark',
          width: "30%"
        }
      ],
      ocs: [], //
    };
  },
  methods: {
    list () {
      let me = this;
      let dt = parseInt(U.formatDate(new Date(), 'yyyyMMdd'));
      let params = { dt };
      orderreceive(params).then(res => {
        let { flag, data, errMsg } = res;
        if (!flag) {
          this.$message.error(errMsg);
        } else {
          console.info(data);
          me.ocs = data.map(function (item, index) {
            let oc = {}
            oc.key = index;
            oc.cName = item.cnnmvr;
            oc.eName = item.vscdcs;
            oc.voyage = U.trim(item.exvycs);
            oc.closeDt = U.convertNumToDate(item.dtcscs, item.tmcscs);
            oc.loadDt = U.convertNumToDate(item.dtldcs, item.tmldcs);
            oc.mark = U.trim(item.remkcs);
            return oc;
          });
        }
      });
    }
  },
  mounted () {
    this.list();
  }
};
</script>

<style scoped>
</style>