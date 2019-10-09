<template>
  <div>
    <a-row>
      <a-col :xs="{span: 20}"
             :sm="{span: 20}"
             :md="{span: 4,offset: 1}"
             :lg="{span: 4}"
             :xl="{span: 4}"
             :xxl="{span: 4}">
        <div style="margin-top:20px;">查询时间：</div>
      </a-col>
      <a-col :xs="{span: 20}"
             :sm="{span: 20}"
             :md="{span: 13}"
             :lg="{span: 13}"
             :xl="{span: 13}"
             :xxl="{span: 13}">
        <a-range-picker format="YYYYMMDD"
                        :placeholder="['开始日期', '结束日期']"
                        style="margin-top:10px;"
                        v-model="selDates" />
      </a-col>
      <a-col :xs="{span: 3,offset: 1}"
             :sm="{span: 3}"
             :md="{span: 3}"
             :lg="{span: 3}"
             :xl="{span: 3}"
             :xxl="{span: 3}">
        <a-button type="primary"
                  @click="getCntrInCloseDate"
                  style="margin-top:10px;">查 找</a-button>
      </a-col>
    </a-row>
    <a-divider />
    <a-skeleton :loading="loading">
      <a-card :title="cardTitle"
              :bordered="false">
        <a-table :columns="columns"
                 :dataSource="tableData"
                 size="small"></a-table>
      </a-card>
    </a-skeleton>
  </div>
</template>
<script>
import { cntrInCloseDate } from "@/api/publicInfo";
import moment from 'moment';
export default {
  data () {
    return {
      loading: false,
      selDates: [moment(), moment()],
      columns: [
        {
          title: "中文船名",
          dataIndex: "cnname",
          width: 150
        },
        {
          title: "英文船名",
          dataIndex: "engname",
          width: 150
        },
        {
          title: "船舶代码",
          dataIndex: "vscd",
          width: 150
        },
        {
          title: "出口航次",
          dataIndex: "exvsvy",
          width: 150
        },
        {
          title: "进箱开始时间",
          dataIndex: "startdate",
          width: 250
        },
        {
          title: "进箱截止时间",
          dataIndex: "enddate",
          width: 250
        }
      ],
      tableData: [],
      cardTitle: ""
    }

  },
  mounted () {
    this.getCntrInCloseDate();
  },
  methods: {
    getCntrInCloseDate () {
      this.loading = true;
      const params = {}
      if (this.selDates.length > 0) {
        params.startdate = this.selDates[0].format('YYYYMMDD');
        params.enddate = this.selDates[1].format('YYYYMMDD');
        this.cardTitle = '报表时间: ' +
          this.selDates[0].format('YYYY-MM-DD') +
          ' ---- ' +
          this.selDates[1].format('YYYY-MM-DD')

        console.log(params);
        cntrInCloseDate(params).then((response) => {
          console.log(response);
          const { flag, data, errMsg } = response;
          if (flag) {
            console.log(data);
            this.tableData = data.map((item, index) => {
              const tmp = {};
              tmp.key = index;
              tmp.cnname = item.cnname;
              tmp.engname = item.engname;
              tmp.vscd = item.vscd;
              tmp.exvsvy = item.exvsvy;
              tmp.startdate = item.startdate;
              tmp.enddate = item.enddate;
              return tmp;
            });
          } else {
            this.$notification.error({
              message: '出错',
              description: '发生错误' + errMsg
            });

          }
        });
      } else {
        this.$notification.error({
          message: '出错',
          description: '请选择日期'
        })
      }

      this.loading = false;
    }
  }
}
</script>