<template>
  <div>
    <div>
      <h3>公告时间：{{curDt}}</h3>
      <nbctCompactTable
        :columns="columns"
        textAlign="left"
        fontSize="8"
        fixedWidth:true
        :rows="ocs"
        :loading="loading"
        :filterColumns="filterColumns"
        style="margin-top:10px;"
      />
    </div>
  </div>
</template>

<script>
import { orderreceive } from '@/api/api';
import U from '@/utils/utils.vue';
import nbctCompactTable from '@/components/NBCTCompactTable.vue';

export default {
  data() {
    return {
      curDt: U.formatDate(new Date(), 'yyyy-MM-dd'),
      columns: [
        {
          title: '船名',
          dataIndex: 'cName',
          width: 120
        },
        {
          title: '英文船名',
          dataIndex: 'eName',
          width: 100
        },
        {
          title: '航次',
          dataIndex: 'voyage',
          width: 100
        },
        {
          title: '截单时间',
          dataIndex: 'closeDt',
          width: 120
        },
        {
          title: '计划加载截至时间',
          dataIndex: 'loadDt',
          width: 120
        },
        {
          title: '备注',
          dataIndex: 'mark',
          width: 120
        }
      ],
      filterColumns: [
        {
          title: '船名',
          dataIndex: 'cName'
        },
        {
          title: '英文船名',
          dataIndex: 'eName'
        },
        {
          title: '航次',
          dataIndex: 'voyage'
        }
      ],
      ocs: [], //
      loading: false
    };
  },
  methods: {
    list() {
      let me = this;
      let dt = parseInt(U.formatDate(new Date(), 'yyyyMMdd'));
      let params = { dt };
      me.loading = true;
      orderreceive(params).then(res => {
        let { flag, data, errMsg } = res;
        if (!flag) {
          me.loading = false;
          me.$message.error(errMsg);
        } else {
          me.loading = false;
          me.ocs = data.map(function(item, index) {
            let oc = {};
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
  components: {
    nbctCompactTable
  },
  mounted() {
    this.list();
  }
};
</script>

<style scoped>
</style>