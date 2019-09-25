<template>
  <div>
    <div>
      <h1>在场集卡查询</h1>
      <nbctCompactTable
        :columns="columns"
        :rows="tableData"
        :loading="loading"
        :fixedWidth="true"
        fontSize="14"
        textAlign="center"
        style="margin-top:10px;font-size:16px;"
      />
    </div>
  </div>
</template>

<script>
import { yardTruck } from '@/api/publicInfo';
import U from '@/utils/utils.vue';
import nbctCompactTable from '@/components/NBCTCompactTable.vue';

export default {
  data() {
    return {
      loading: false,
      columns: [
        {
          title: '车牌号',
          dataIndex: 'trnr',
          width: 100
        },
        {
          title: '港区编号',
          dataIndex: 'trcd',
          width: 100
        },
        {
          title: '集卡在港滞留时间(分钟)',
          dataIndex: 'delayminutes',
          width: 200
        },
        {
          title: '集卡进场时间',
          dataIndex: 'intime',
          width: 200
        }
      ],
      tableData: []
    };
  },
  methods: {
    list() {
      //let me=this;//test
      yardTruck().then(res => {
        let { flag, data, errMsg } = res;
        if (!flag) {
          this.$message.error(errMsg);
        } else {
          //console.info(data);
          this.tableData = data.map(function(item, index) {
            let oc = {};
            oc.key = index;
            oc.trnr = item.trnrwk;
            oc.trcd = item.trcdwk;
            oc.delayminutes = item.delayMinutes;
            oc.intime = U.isEmpty(item.intime) ? '' : U.compactDateToNormal(item.intime);
            return oc;
          });
          //console.log(this.ocs);
        }
      });
    }
  },
  mounted() {
    this.list();
  },
  components: {
    nbctCompactTable
  }
};
</script>


<style scoped>
</style>
