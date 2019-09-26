<template>
  <div>

    <div class="table-operations">
      <a-button @click="addUser()">新增用户</a-button>
      <a-button @click="refreshUsers()">刷新数据</a-button>

    </div>
    <a-table :dataSource="tableData"
             :columns="columns"
             :pagination="pagination"
             size="small">
      <div slot="filterDropdown"
           slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
           class="custom-filter-dropdown">
        <a-input v-ant-ref="c => searchInput = c"
                 :placeholder="`查找${column.title}`"
                 :value="selectedKeys[0]"
                 @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                 @pressEnter="() => handleSearch(selectedKeys, confirm)"
                 style="width:148px; margin-bottom:8px; display:block;" />
        <a-button type="primary"
                  @click="() => handleSearch(selectedKeys,confirm)"
                  icon="search"
                  size="small"
                  style="width: 70px; margin-right: 8px">查找</a-button>
        <a-button @click="() => handleReset(clearFilters)"
                  size="small"
                  style="width: 70px">重置</a-button>
      </div>
      <a-icon slot="filterIcon"
              slot-scope="filtered"
              type='search'
              :style="{ color: filtered ? '#108ee9' : undefined }" />
      <template slot="customRender"
                slot-scope="text">
        <span v-if="searchText">
          <template v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})`, 'i'))">
            <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                  :key="i"
                  class="highlight">{{fragment}}</mark>
            <template v-else>{{fragment}}</template>
          </template>
        </span>
        <template v-else>{{text}}</template>

      </template>
      <span slot="action"
            slot-scope="text, record">
        <a href="javascript:;"
           @click="onUserInforChange(record.userId)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm v-if="tableData.length"
                      title="真的需要删除吗?"
                      @confirm="() => onUserDelete(record.userId)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>
        <a-divider type="vertical" />
        <a-popconfirm v-if="tableData.length"
                      title="真的需要重置密码吗?"
                      @confirm="() => onUserPasswordReset(record.userId)">
          <a href="javascript:;">密码重置</a>
        </a-popconfirm>
      </span>
    </a-table>
    <user-opt :visible="userInfoModifyVisible"
              :userId="toChangeUserId"
              :isAdd="isAddForm"
              @refreshUsers="refreshUsers"
              @changeUserOptVisibility="changeUserOptVisibility" />

  </div>
</template>
<script>
//import UserOpt from '@/components/UserOpt';
import { getUsers, deleteUser, resetPwUser } from '@/api/user'
import { mapState } from 'vuex'

function getUserType (userType) {
  switch (userType) {
    case 'A':
      return 'A(管理员)';
    case 'C':
      return 'C(海关)';
    case 'D':
      return 'D(堆场)';
    case 'H':
      return 'H(货代)';
    case 'V':
      return 'V(船公司)';
  }
}
export default {
  data () {
    return {
      tableData: [],
      searchText: '',
      searchInput: null,
      userInfoModifyVisible: false,
      toChangeUserId: '',
      isAddForm: true,
      pagination: {
        pageSize: 40,
      },
      columns: [{
        title: '用户名',
        dataIndex: 'userId',
        key: 'userId',
        width: 80,
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.userId.toLowerCase().startsWith(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0)
          }
        },
      }, {
        title: '用户姓名',
        dataIndex: 'userName',
        key: 'userName',
        width: 80,
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.userName.toLowerCase().startsWith(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0)
          }
        },
      }, {
        title: '单位名称',
        dataIndex: 'company',
        key: 'company',
        width: 200,
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.company.toLowerCase().startsWith(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0)
          }
        },
      }, {
        title: '单位代码',
        dataIndex: 'companyId',
        key: 'companyId',
        width: 80,
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.companyId.toLowerCase().startsWith(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0)
          }
        },
      }, {
        title: '用户类别',
        dataIndex: 'userType',
        key: 'userType',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        width: 80,
        onFilter: (value, record) => record.userType.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0)
          }
        },
      },
      {
        title: '功能',
        dataIndex: 'action',
        key: 'action',
        width: 100,
        scopedSlots: {
          customRender: 'action',
        },
      }
      ]
    }
  },
  components: {
    'UserOpt': () => import('@/components/UserOpt')
  },
  computed: {
    ...mapState({
      // 动态主路由    
      userId: state => state.user.userId,
    }),
  },
  mounted () {
    this.refreshUsers();
  },
  methods: {
    handleSearch (selectedKeys, confirm) {
      confirm()
      this.searchText = selectedKeys[0]
    },

    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },
    onUserDelete (key) {
      let params = {};
      if (key) {
        params.userId = key;
        params.opUser = this.userId;
        deleteUser(params).then((response) => {
          let { flag, errMsg } = response;
          if (flag) {
            this.$notification.success({
              message: '成功',
              description: '删除用户成功'
            });
            const tableData = [...this.tableData]
            this.tableData = tableData.filter(item => item.userId !== key)
          } else {
            this.$notification.error({
              message: '出错',
              description: '发生错误' + errMsg
            })
          }
        })
      }
    },
    onUserPasswordReset (key) {
      let params = {};
      if (key) {
        params.userId = key;
        params.opUser = this.userId;
        resetPwUser(params).then(response => {
          let { flag, errMsg } = response;
          if (flag) {
            this.$notification.success({
              message: '成功',
              description: '重置用户密码成功'
            });
          } else {
            this.$notification.error({
              message: '出错',
              description: '发生错误' + errMsg
            })
          }
        })
      }
    },
    onUserInforChange (userId) {
      this.userInfoModifyVisible = true;
      this.toChangeUserId = userId;
      this.isAddForm = false;
    },
    refreshUsers () {
      console.log('refreshUsers');
      getUsers().then(response => {
        let { flag, data, errMsg } = response;
        if (flag) {
          let users = data.users;
          if (users.length > 0) {
            this.tableData = users.map((item, index) => {
              let tmp = {};
              tmp.userId = item.userId;
              tmp.userName = item.userName ? item.userName : " ";
              tmp.company = item.company ? item.company : " ";
              tmp.companyId = item.companyId ? item.companyId : " ";
              tmp.userType = getUserType(item.userType);
              tmp.key = index;
              return tmp;
            });
          }
        } else {
          this.$notification.error({
            message: '出错',
            description: '发生错误' + errMsg
          })
        }
      })
    },
    addUser () {
      this.userInfoModifyVisible = true;
      this.toChangeUserId = '';
      this.isAddForm = true;
    },
    changeUserOptVisibility (visible) {
      this.userInfoModifyVisible = visible;
    }

  }
}
</script>
<style scoped>
.custom-filter-dropdown {
  padding: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>