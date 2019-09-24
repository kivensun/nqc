<template>
  <div>
    <a-row type="flex"
           justify="center"
           align="middle">
      <a-col :span="3">查询开始日期：</a-col>
      <a-col :span="8">
        <a-date-picker style="width:100%"
                       v-model="selDate" />
      </a-col>
      <a-col :span="2">
        <a-button type="primary"
                  @click="loadData">查 找</a-button>
      </a-col>
    </a-row>

    <a-row type="flex"
           justify="center"
           style="margin-top:6px">
      <a-col :span="22">

        <a-collapse accordion
                    defaultActiveKey="1">
          <a-collapse-panel header="对账单(I)"
                            key="1">
            <a-list itemLayout="vertical"
                    size="small"
                    :pagination="pagination"
                    :dataSource="listDzdIData"
                    :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }">
              <a-list-item slot="renderItem"
                           slot-scope="item"
                           key="item.skey">

                <a-button type="link"
                          @click="downloadEfinReport(item.fnPyCocd,item.skey, item.fileName)">
                  {{item.fileName }}
                </a-button>
                <a href="#">

                </a>

              </a-list-item>
            </a-list>
          </a-collapse-panel>
          <a-collapse-panel header="对账单(E)"
                            key="2">
            <a-list itemLayout="vertical"
                    size="small"
                    :pagination="pagination"
                    :dataSource="listDzdEData"
                    :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }">
              <a-list-item slot="renderItem"
                           slot-scope="item"
                           key="item.title">

                <a-button type="link"
                          @click="downloadEfinReport(item.fnPyCocd,item.skey,item.fileName)">
                  {{item.fileName }}
                </a-button>
              </a-list-item>
            </a-list>
          </a-collapse-panel>
          <a-collapse-panel header="应收账款"
                            key="3">
            <a-list itemLayout="vertical"
                    size="small"
                    :pagination="pagination"
                    :dataSource="listYszkData"
                    :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }">
              <a-list-item slot="renderItem"
                           slot-scope="item"
                           key="item.title">

                <a-button type="link"
                          @click="downloadEfinReport(item.fnPyCocd,item.skey,item.fileName)">
                  {{item.fileName}}
                </a-button>
              </a-list-item>
            </a-list>
          </a-collapse-panel>
        </a-collapse>
      </a-col>
    </a-row>

  </div>
</template>
<script>
import { getEfinreports, getEfinreportFile } from '@/api/customerInfo';
import { mapState } from 'vuex';
import moment from 'moment';
import fs from 'file-saver';

export default {
  data () {
    return {
      selDate: moment().subtract(62, 'days'),
      listDzdIData: [],
      listDzdEData: [],
      listYszkData: [],
      pagination: {
        pageSize: 100,
      },
    }
  },
  mounted () {
    this.loadData();
  },
  computed: {
    ...mapState({
      // 动态主路由
      companyId: state => state.user.companyId,
    }),
  },
  methods: {
    loadData () {
      let params = {};
      if (this.companyId === 'YYY') {
        params.fnPyCocd = '';
      } else {
        params.fnPyCocd = this.companyId;
      }
      params.dtbg = this.selDate.format('YYYYMMDD');
      console.log(params);
      getEfinreports(params).then(response => {
        let { flag, data } = response;
        if (flag) {
          this.listDzdIData = data.filter(item => item.inIE === 'I');
          console.log(this.listDzdIData);
          this.listDzdEData = data.filter(item => item.inIE === 'E');
          this.listYszkData = data.filter(item => item.inIE === 'K');
        }
      })
    },
    downloadEfinReport (fnPyCocd, skey, filename) {
      let params = {};
      params.fnPyCocd = fnPyCocd;
      params.skey = skey;
      getEfinreportFile(params).then(response => {
        if (response) {
          fs.saveAs(response, filename + '.xlsx');
        }
      });
    }
  }

}
</script>