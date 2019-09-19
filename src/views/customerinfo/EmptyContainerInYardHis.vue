<template>
  <div>
    <a-row type="flex"
           justify="center"
           align="middle">
      <a-col :span="2">箱主：</a-col>
      <a-col :span="3">
        <a-select placeholder="箱主"
                  style="width: 100%"
                  showSearch
                  :value="selValue"
                  @change="handleSelChange">
          <a-select-option v-for="item in options"
                           :key="item"
                           :value="item">{{item}}</a-select-option>

        </a-select>
      </a-col>
      <a-col :span="2">日期:</a-col>
      <a-col :span="8">
        <a-range-picker format="YYYYMMDD"
                        :placeholder="['开始日期', '结束日期']"
                        v-model="selDates"
                        style="width:100%" />
      </a-col>
      <a-col :span="2"
             :offset="1">
        <a-button type="primary"
                  @click="getData"
                  style="width:100%;text-align:center">查 找</a-button>
      </a-col>
      <a-col :span="2"
             :offset="1">
        <a-button type="primary"
                  @click="getDownload"
                  style="width:100%">下 载</a-button>
      </a-col>
    </a-row>
    <a-divider />
    <a-skeleton :loading="loading">
      <a-card :title="cardTitle"
              :bordered="false">
        <a-table :columns="columns"
                 :dataSource="tableData"
                 size="small">

        </a-table>
      </a-card>
    </a-skeleton>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import moment from 'moment';
import { getEmptyContainerInYardHis } from '@/api/customerInfo';
import xlsx from '@/utils/xlsx';

export default {
  data () {
    return {
      options: [],
      selValue: '',
      selDates: [moment(), moment()],
      loading: false,
      cardTitle: '',
      columns: [
        {
          title: "日期",
          dataIndex: "dtco",
          width: 80,
          key: 1
        },
        {
          title: "进出口标志",
          dataIndex: "inie",
          width: 80,
          key: 2
        },
        {
          title: "箱型",
          dataIndex: "ctsz",
          width: 80,
          key: 3
        },
        {
          title: "箱量(moves)",
          dataIndex: "moves",
          width: 80,
          key: 4
        },
        {
          title: "总计(TEU)",
          dataIndex: "teu",
          width: 80,
          key: 5
        },
      ],
      tableData: [],
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      userType: state => state.user.userType,
      companyId: state => state.user.companyId,
      companyHadCodes: state => state.user.companyHadCodes
    }),
  },
  mounted () {
    this.options = this.companyHadCodes;
  },
  methods: {
    handleSelChange (value) {
      this.selValue = value;
      console.log(`selected ${value}`);
    },
    getData () {
      console.log('getData');
      this.loading = true;
      const params = {}
      if (this.selDates.length > 0) {
        if (this.selValue) {
          params.dtbg = this.selDates[0].format('YYYYMMDD');
          params.dted = this.selDates[1].format('YYYYMMDD');
          this.cardTitle = '箱主:' + this.selValue + ' 报表时间: ' +
            this.selDates[0].format('YYYY-MM-DD') +
            ' ---- ' +
            this.selDates[1].format('YYYY-MM-DD')
          params.lncd = this.selValue;
          getEmptyContainerInYardHis(params).then(res => {
            let { flag, data } = res;
            if (flag) {
              let emptyContainerInYardHis = [];
              let original = data.eCTInHis;
              if (Array.isArray(original)) {
                let old = original[0];
                let moves = 0;
                let teu = 0;
                let index = 0;
                original.forEach(element => {
                  if (old.dtco === element.dtco) {
                    element.key = index;
                    emptyContainerInYardHis.push(element);
                    moves = moves + parseInt(element.moves);
                    teu = teu + parseInt(element.teu);
                    index = index + 1;
                  } else {
                    let tmp = {};
                    tmp.dtco = '合计';
                    tmp.inie = '';
                    tmp.ctsz = '';
                    tmp.moves = moves;
                    tmp.teu = teu;
                    tmp.key = index;
                    index = index + 1;
                    emptyContainerInYardHis.push(tmp);
                    element.key = index;
                    emptyContainerInYardHis.push(element);
                    index = index + 1;
                    moves = parseInt(element.moves);
                    teu = parseInt(element.teu);
                    old = element;
                  }
                });
                this.tableData = emptyContainerInYardHis;
              } else {
                this.tableData = [];
              }
            }

          })
        } else {
          this.$notification.error({
            message: '出错',
            description: '请选择箱主'
          })
        }
        console.log(params);
        this.loading = false;
      } else {
        this.$notification.error({
          message: '出错',
          description: '请选择日期'
        })
      }
    },

    getDownload () {
      const header = this.columns.map(item => {
        let tmp = "";
        tmp = item.title;
        return tmp;
      });
      console.log(header);

      const exportData = this.tableData.map(item => {
        delete item.key;
        delete item.move;
        delete item.lncd;
        let tmpStr = JSON.stringify(item);
        this.columns.forEach(item => {
          tmpStr = tmpStr.replace(item.dataIndex, item.title);
        })
        return JSON.parse(tmpStr);
      });
      console.log(exportData);
      let title = '历史空箱在场查询';
      xlsx(header, exportData, title);
    }
  }

}
</script>