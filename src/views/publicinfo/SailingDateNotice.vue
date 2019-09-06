
<template>
  <div>
    <a-row type="flex"
           justify="center"
           align="middle">
      <a-col :span="2">查询时间：</a-col>
      <a-col :span="8">
        <a-range-picker format="YYYYMMDD"
                        :placeholder="['开始日期', '结束日期']"
                        v-model="selDates" />
      </a-col>
      <a-col :span="2"
             :offset="1">
        <a-button type="primary"
                  @click="getData">查 找</a-button>
      </a-col>
    </a-row>
    <a-divider />
    <a-skeleton :loading="loading">
      <a-card :title="cardTitle"
              :bordered="false">
        <a-table :columns="columns"
                 :dataSource="tableData"
                 size="small"
                 :rowClassName="setRowColor">
          <template slot="footer">
            <a-row>
              <a-col :span="3"
                     style="background:#FF99FF">粉红:计划未定</a-col>
              <a-col :span="3"
                     style="background:#ffffff">白色:计划已定</a-col>
              <a-col :span="3"
                     style="background:#99FFFF">浅绿:已经离泊</a-col>
            </a-row>

          </template>
        </a-table>
      </a-card>
    </a-skeleton>
  </div>
</template>

<script>
import { sailingDateNotice } from "@/api/publicInfo";
import moment from 'moment';
export default {
  data () {
    return {
      loading: false,
      selDates: [moment(), moment()],
      columns: [
        {
          title: "船公司",
          dataIndex: "lncd",
          width: 80,
          key: 1
        },
        {
          title: "中文船名",
          dataIndex: "cnvsname",
          width: 150,
          key: 2
        },
        {
          title: "英文船名",
          dataIndex: "engvsname",
          width: 150,
          key: 3
        },
        {
          title: "航次",
          dataIndex: "vsvy",
          width: 150,
          key: 4
        },
        {
          title: "泊位号",
          dataIndex: "btno",
          width: 150,
          key: 5
        },
        {
          title: "计划靠泊时间",
          dataIndex: "estberthdate",
          width: 250,
          key: 6
        },
        {
          title: "计划离泊时间",
          dataIndex: "estunberthdate",
          width: 150,
          key: 7
        },
        {
          title: "实际靠泊时间",
          dataIndex: "realberthdate",
          width: 150,
          key: 8
        },
        {
          title: "实际离泊时间",
          dataIndex: "realunberthdate",
          width: 150,
          key: 9
        },
        {
          title: "进箱时间",
          dataIndex: "cntrindate",
          width: 150,
          key: 10
        },
        {
          title: "截箱时间",
          dataIndex: "cntroutdate",
          width: 250,
          key: 11
        },
        {
          title: "发布时间",
          dataIndex: "pubdate",
          width: 250,
          key: 12
        }
      ],
      tableData: [],
      cardTitle: ""
    }

  },
  methods: {
    getData () {
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
        sailingDateNotice(params).then((response) => {
          console.log(response);
          const { flag, data, errMsg } = response;
          if (flag) {
            console.log(data);

            this.tableData = data.map((item, index) => {
              let tmp = {};
              tmp.key = index;
              tmp.lncd = item.lncd;
              tmp.cnvsname = item.cnvsname;
              tmp.engvsname = item.engvsname;
              tmp.vsvy = item.imvsvy + '/' + item.exvsvy;
              tmp.realberthdate = item.realberthdate;
              tmp.realunberthdate = item.realunberthdate;
              tmp.cntrindate = item.cntrindate;
              tmp.cntroutdate = item.cntroutdate;
              tmp.estberthdate = item.estberthdate;
              tmp.estunberthdate = item.estunberthdate;
              tmp.pubdate = item.pubdate;
              tmp.btno = item.btno;
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
    },
    setRowColor (record) {
      if (!record.estberthdate)
        return 'sdn-noplan';
      if (record.realunberthdate)
        return 'sdn-had-leave'
      return '';
    }
  }
}
</script>
<style lang="less" >
.sdn-noplan {
  background: #ff99ff;
}
.sdn-planed {
  background: #ffffff;
}
.sdn-had-leave {
  background: #99ffff;
}
</style>