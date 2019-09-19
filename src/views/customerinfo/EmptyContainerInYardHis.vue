<template>
  <div>
    <a-row type="flex"
           justify="center"
           align="middle">
      <a-col :span="1">箱主：</a-col>
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
      <a-col :span="1">日期:</a-col>
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
                 size="small">

        </a-table>
      </a-card>
    </a-skeleton>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import moment from 'moment';
//import { getUserCompanyHadCodes } from '@/api/customerInfo';
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
    }
  }

}
</script>