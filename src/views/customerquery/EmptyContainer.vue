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
import { emptycontainer} from '@/api/containerInfo';
export default {
  data () {
    return {
      columns: [
        {
          title: '箱号',
          dataIndex: 'cntrid',
          width: "15%"
        },
        {
          title: '船舶代码',
          dataIndex: 'vscd',
          width: "15%"
        },
        {
          title: '航次',
          dataIndex: 'vsvy',
          width: "15%"
        },
        {
          title: '进出口类型',
          dataIndex: 'vsdr',
          width: "10%"
        },
        {
          title: '尺寸',
          dataIndex: 'ctsz',
          width: "15%"
        },
        {
          title: '箱型',
          dataIndex: 'ctty',
          width: "10%"
        },
        {
          title: '箱主',
          dataIndex: 'lncd',
          width: "10%"
        }
      ],
      ocs: [], //
    };
  },
  methods: {
    list () {
      let me = this;
      let params = {};
      params.lncd=this.lncd;
      params.ctty=this.ctty;
      emptycontainer(params).then(res => {
        let { flag, data, errMsg } = res;
        if (!flag) {
          this.$message.error(errMsg);
        } else {
          console.info(data);
          me.ocs = data.map(function (item, index) {
            let oc = {}
            oc.key = index;
            oc.cntrid = item.cntrid;
            oc.vscd = item.vscd;
            oc.vsvy = item.vsvy;
            oc.vsdr = item.vsdr;
            oc.ctsz = item.ctsz;
            oc.ctty = item.ctty;
            oc.lncd = item.lncd;
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