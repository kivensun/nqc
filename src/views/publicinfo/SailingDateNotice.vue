
<template>
  <div>
    <a-row>
      <a-col :xs="{span: 24}"
             :sm="{span: 24}"
             :md="{span: 4, offset:1}"
             :lg="{span: 4}"
             :xl="{span: 3, offset:2}"
             :xxl="{span: 3, offset: 2}">
        <div style="margin-top:20px;">查询时间：</div>
      </a-col>
      <a-col :xs="{span: 9}"
             :sm="{span: 10}"
             :md="{span: 6}"
             :lg="{span: 6}"
             :xl="{span: 6}"
             :xxl="{span: 6}"
             style="text-align: right;">
        <a-date-picker format="YYYYMMDD"
                       style="margin-top:10px;"
                       v-model="startDate" />
      </a-col>
      <a-col :xs="{span: 9,offset: 1}"
             :sm="{span: 9,offset: 1}"
             :md="{span: 6,offset: 1}"
             :lg="{span: 6,offset: 1}"
             :xl="{span: 6,offset: 1}"
             :xxl="{span: 6,offset: 1}"
             style="text-align: left;">
        <a-date-picker format="YYYYMMDD"
                       style="margin-top:10px;"
                       v-model="endDate" />
      </a-col>
      <a-col :xs="{span: 3,offset:1}"
             :sm="{span: 3}"
             :md="{span: 3,offset:1}"
             :lg="{span: 3, offset: 1}"
             :xl="{span: 3, offset: 1}"
             :xxl="{span: 3, offset: 1}">
        <a-button type="primary"
                  @click="getData"
                  style="margin-top:10px; ">查 找</a-button>
      </a-col>
    </a-row>
    <a-divider />
    <a-skeleton :loading="loading">
      <a-card :title="cardTitle"
              :bordered="false"
              class="viewcard-had-table">
        <a-table :columns="columns"
                 :dataSource="tableData"
                 size="small"
                 :rowClassName="setRowColor">
          <div slot="filterDropdown"
               slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
               style="padding: 8px">
            <a-input v-ant-ref="c => searchInput = c"
                     :placeholder="`查找 ${column.title}`"
                     :value="selectedKeys[0]"
                     @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                     @pressEnter="() => handleSearch(selectedKeys, confirm)"
                     style="width: 188px; margin-bottom: 8px; display: block;" />
            <a-button type="primary"
                      @click="() => handleSearch(selectedKeys, confirm)"
                      icon="search"
                      size="small"
                      style="width: 90px; margin-right: 8px">查找</a-button>
            <a-button @click="() => handleReset(clearFilters)"
                      size="small"
                      style="width: 90px">重置</a-button>
          </div>
          <a-icon slot="filterIcon"
                  slot-scope="filtered"
                  type="search"
                  :style="{ color: filtered ? '#108ee9' : undefined }" />

          <template slot="footer">
            <a-row>
              <a-col :span="5"
                     style="background:#FF99FF">粉红:计划未定</a-col>
              <a-col :span="5"
                     style="background:#ffffff">白色:计划已定</a-col>
              <a-col :span="5"
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
      searchText: '',
      searchInput: null,
      startDate: moment(),
      endDate: moment(),
      columns: [
        {
          title: "船公司",
          dataIndex: "lncd",
          width: 100,
          key: 'lncd',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) => record.lncd.toString().toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: "中文船名",
          dataIndex: "cnvsname",
          width: 180,
          key: 'cnvsname',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) => record.cnvsname.toString().toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: "英文船名",
          dataIndex: "engvsname",
          width: 150,
          key: 'engvsname',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) => record.engvsname.toString().toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: "航次",
          dataIndex: "vsvy",
          width: 150,
          key: 'vsvy',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) => record.vsvy.toString().toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: "泊位号",
          dataIndex: "btno",
          width: 100,
          key: "btno",

        },
        {
          title: "计划靠泊时间",
          dataIndex: "estberthdate",
          width: 150,
          key: "estberthdate",

        },
        {
          title: "计划离泊时间",
          dataIndex: "estunberthdate",
          width: 150,
          key: "estunberthdate",

        },
        {
          title: "实际靠泊时间",
          dataIndex: "realberthdate",
          width: 150,
          key: "realberthdate",

        },
        {
          title: "实际离泊时间",
          dataIndex: "realunberthdate",
          width: 150,
          key: "realunberthdate",


        },
        {
          title: "进箱时间",
          dataIndex: "cntrindate",
          width: 120,
          key: "cntrindate",

        },
        {
          title: "截箱时间",
          dataIndex: "cntroutdate",
          width: 120,
          key: "cntroutdate",

        },
        {
          title: "发布时间",
          dataIndex: "pubdate",
          width: 150,
          key: "pubdate",

        }
      ],
      tableData: [],
      cardTitle: ""
    }

  },
  mounted () {
    this.getData();
  },
  methods: {
    getData () {
      this.loading = true;
      const params = {}

      params.startdate = this.startDate.format('YYYYMMDD');
      params.enddate = this.endDate.format('YYYYMMDD');
      this.cardTitle = '报表时间: ' +
        this.startDate.format('YYYY-MM-DD') +
        ' ---- ' +
        this.endDate.format('YYYY-MM-DD')

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

      this.loading = false;
    },
    setRowColor (record) {
      if (!record.estberthdate)
        return 'sdn-noplan';
      if (record.realunberthdate)
        return 'sdn-had-leave'
      return '';
    },
    handleSearch (selectedKeys, confirm) {
      confirm();
      this.searchText = selectedKeys[0];
    },
    handleReset (clearFilters) {
      clearFilters();
      this.searchText = '';
    },
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
.sdn-highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>