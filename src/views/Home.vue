<template>
  <div class="outer-container">
    <div class="inner-container">
      <div class="content">
        <a-layout>
          <a-layout-header class="global-header">
            <a-row>
              <a-col :span="24"
                     style="text-align: center;background-color: #55aaff;height:20px;line-height:20px">
                <a href="http://www.nbct.com.cn/query/index.html"
                   style="color:#fff;margin-top:5px;">回到旧版查询>>>>></a>
              </a-col>
            </a-row>
            <a-row>
              <a-col :xs="{span: 7, offset:1}"
                     :sm="{span: 5, offset:1}"
                     :md="{span: 5, offset: 1}"
                     :lg="{span: 5, offset: 2}"
                     :xl="{span: 3, offset: 4}"
                     :xxl="{span: 3, offset: 4}">
                <img src="@/assets/logo.png" />
              </a-col>

              <a-col :xs="{span: 12}"
                     :sm="{span: 14,offset:1}"
                     :md="{span: 13, offset: 1}"
                     :lg="{span: 11, offset: 1}"
                     :xl="{span: 8, offset: 2}"
                     :xxl="{span:6, offset:4}">
                <a-menu mode="horizontal"
                        class="header-meun">
                  <a-menu-item v-for="(item,index) in cardMenus"
                               :key="index">
                    <div style="color: #0f317d">{{item.title}}</div>
                  </a-menu-item>
                  <a-menu-item v-if="!userId"
                               key="99">
                    <div style="color: #0f317d"
                         @click="showLogin">客户查询</div>
                  </a-menu-item>
                </a-menu>
              </a-col>
              <a-col :xs="{span: 1, offset: 1}"
                     :sm="{span: 1}"
                     :md="{span: 2}"
                     :lg="{span: 2}"
                     :xl="{span: 2}"
                     :xxl="{span: 2}">

                <div v-if="userId">
                  <a-popover>
                    <template slot="content">
                      <a-card hoverable
                              style="width: 230px">

                        <template class="ant-card-actions"
                                  slot="actions">
                          <span @click="handleChangePwModel">
                            <a-icon type="lock" />修改密码
                          </span>

                          <span>
                            <a-icon type="tool" />修改信息
                          </span>
                          <span @click="handleLoginout">
                            <a-icon type="poweroff" />注销
                          </span>
                        </template>
                        <a-card-meta :title="'公司: '+ companyId"
                                     :description="'用户类别: ' + userType">

                        </a-card-meta>
                      </a-card>
                    </template>
                    <a-avatar :size="55"
                              style="color: #000000; backgroundColor: #36a678;#float: right;margin-top: -1px;">
                      <p>
                        <a-icon type="user"
                                style="font-size:1.2em; " />
                        {{userId}}</p>
                    </a-avatar>

                  </a-popover>

                </div>
              </a-col>

            </a-row>

          </a-layout-header>
          <a-layout-content class="global-content">
            <div class="content-menus">

              <card-menu :menus=cardMenus
                         :userId=userId
                         @showDrawer="showDrawer"
                         @showLogin="showLogin" />
            </div>
          </a-layout-content>

        </a-layout>

        <sun-drawer :visible="visible"
                    @close="onDrawerClose"
                    width="95%"
                    height="95%"
                    :title="aDrawerTitle">
          <route-view @closeDrawer="onDrawerClose" />
        </sun-drawer>

        <!-- 登录框 -->
        <a-modal :visible="loignVisible"
                 @ok="loginSubmit"
                 @cancel="loginCancel"
                 :confirmLoading="loginConfirmLoading"
                 cancelText="取消"
                 okText="登录"
                 :destroyOnClose=true
                 :centered=true
                 :width=350
                 :maskClosable=false>
          <a-form :form="loginForm">
            <img src="../assets/logo.png"
                 style="margin-bottom:10px;" />
            <a-form-item>
              <a-input v-decorator="[
            'userId',
            {rules: [{ required: true, message: '请输入你用户名!' }] }
          ]"
                       placeholder="用户名">
                <a-icon slot="prefix"
                        type="user"
                        style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input v-decorator="[
          'password',
            { rules: [{ required: true, message: '请输入你的密码!' }] }
        ]"
                       type="password"
                       placeholder="密码">
                <a-icon slot="prefix"
                        type="lock"
                        style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
          </a-form>
        </a-modal>

        <!--修改密码 -->
        <a-modal v-model="changePwModeVisible"
                 title="修改密码"
                 onOk="handleOk"
                 :width=350
                 :centered=true
                 :maskClosable=false>
          <template slot="footer">
            <a-button key="back"
                      @click="handleChangePwModelCancel">取 消</a-button>
            <a-button key="submit"
                      type="primary"
                      :loading="loginConfirmLoading"
                      @click="handleChangePwModeOk">
              提 交
            </a-button>
          </template>

          <a-form :form="changePwForm">
            <a-form-item>
              <a-input v-decorator="[
          'oldpassword',
            { rules: [{ required: true, message: '请输入原密码 !' }],
             initialValue: ''}
        ]"
                       type="password"
                       placeholder="老密码">
                <a-icon slot="prefix"
                        type="lock"
                        style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input v-decorator="[
          'newpassword',
            {  
              rules: [{
                required: true, message: '请输入新密码!',
              }, {
                validator: validateToNextPassword,
              }], 
            }
        ]"
                       type="password"
                       placeholder="新密码">
                <a-icon slot="prefix"
                        type="lock"
                        style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input v-decorator="[
         'confirm',
          {
            rules: [{
              required: true, message: '请再输入一遍新密码!',
            }, {
              validator: compareToFirstPassword,
            }],
          }
        ]"
                       type="password"
                       @blur="handleChangePwConfirmBlur"
                       placeholder="再输入新密码">
                <a-icon slot="prefix"
                        type="lock"
                        style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
          </a-form>
        </a-modal>
        <public-notice :visible="hadNotice"
                       :content="noticeCotent"
                       :noticeId="noticeId"
                       @hideNotice="hideNotice" />
      </div>
    </div>
  </div>
</template>
<script>
import CardMenu from '@/components/CardMenu';
import SunDrawer from '@/components/SunDrawer';
import RouteView from '@/views/RouteView'
import PublicNotice from '@/components/PublicNotice';
import * as utility from 'utility';
import { mapState, mapActions } from 'vuex'
import { changePasswordUser } from '@/api/user';
import { getNotices } from '@/api/notice';

export default {
  name: 'home',
  data () {
    return {
      visible: false,
      placement: 'left',
      aDrawerTitle: {},
      titleMenus: [],
      hadNotice: false,
      noticeCotent: '',
      noticeId: '',
      cardNoLoginTileStyle: {
        background: '#ff9933',
        color: '#000000'
      },
      cardNoLoginBodyStyle: {
        textAlign: 'center'
      },
      loignVisible: false,
      loginConfirmLoading: false,
      changePwModeVisible: false,
    }
  },
  components: {
    CardMenu,
    SunDrawer,
    RouteView,
    PublicNotice
  },
  computed: {
    ...mapState({
      // 动态主路由
      groups: state => state.user.groups,
      userId: state => state.user.userId,
      cardMenus: state => state.permission.allowedMenuMap,
      companyId: state => state.user.companyId,
      userType: state => state.user.userType,
    }),
  },
  beforeCreate () {
    this.loginForm = this.$form.createForm(this);
    this.changePwForm = this.$form.createForm(this);
  },
  created () {
    this.reGetDateOnRefresh();
    this.InitMenu(this.groups);
    this.titleMenus = this.cardMenus.map((item, index) => {
      let tmp = {};
      tmp.key = index;
      tmp.title = item.title;
      console.log(tmp);
      return tmp;
    })

  },
  mounted () {
    this.checkNotice();
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.onDrawerClose, false);
    }

  },
  destroyed () {
    window.removeEventListener('popstate', this.onDrawerClose, false);
  },
  methods: {
    ...mapActions(['RenewMenu', 'Login', 'InitMenu', 'refreshUser', 'Logout']),

    changeMenu () {
      this.RenewMenu(this.groups);
      console.log('changeMenu');
    },
    showDrawer (param) {
      console.log("router");
      const { path, data } = param;
      if (path.includes('http://')) {

        window.open(path, '_blank');
      } else {
        this.aDrawerTitle = data;
        this.$router.push({ path: path }, () => { });
        this.visible = true;
      }
    },
    onDrawerClose () {
      this.visible = false
      this.$router.push({ path: '/' }, () => { })
    },
    reGetDateOnRefresh () {
      this.refreshUser();
    },
    showLogin () {
      console.log('showLogin');
      this.loignVisible = true;
    },
    loginSubmit (e) {
      console.log('loginSubmit');
      e.preventDefault();
      const { Login } = this;
      this.loginForm.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          const loginParams = {};
          loginParams.userId = values.userId;
          loginParams.password = utility.md5(values.password);
          this.loginConfirmLoading = true;
          Login(loginParams)
            .then(res => this.loginSuccess(res))
            .catch(err => this.loginFailed(err));
        }
      });
    },
    loginSuccess (res) {
      console.log(res);
      //延迟1秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: '欢迎回来'
        });
        this.changeMenu();
        this.loignVisible = false;
        this.loginConfirmLoading = false;
      }, 1000);
      this.titleMenus = this.cardMenus.map((item, index) => {
        let tmp = {};
        tmp.key = index;
        tmp.title = item.title;
        console.log(tmp);
        return tmp;
      })
    },
    loginFailed (err) {
      console.log(err);
      setTimeout(() => {
        this.$notification.error({
          message: '出错',
          description: '出错信息' + err
        });
        this.loginConfirmLoading = false;
      }, 1000);
    },
    loginCancel () {
      console.log('loginCancel');
      this.loignVisible = false;
    },
    handleLoginout () {
      const { Logout } = this;
      Logout().then(() => {
        this.changeMenu();
      });
    },
    handleChangePwModel () {
      const form = this.changePwForm;
      setTimeout(() => {
        form.setFieldsValue(
          { oldpassword: '', newpassword: '', confirm: '' });
      }, 100)

      this.changePwModeVisible = true;
    },
    handleChangePwModeOk (e) {
      e.preventDefault();

      this.changePwForm.validateFields((err, values) => {
        if (!err) {

          let params = {};
          params.userId = this.userId;
          params.newPassword = utility.md5(values.newpassword);
          params.oldPassword = utility.md5(values.oldpassword);
          params.opUser = this.userId;
          this.loginConfirmLoading = true;
          changePasswordUser(params).then(response => {
            let { flag, outMsg, errMsg } = response;
            if (flag) {
              setTimeout(() => {
                this.$notification.success({
                  message: '成功',
                  description: outMsg
                });
              }, 1000);
              this.changePwModeVisible = false;
              this.loginConfirmLoading = false;
            } else {
              setTimeout(() => {
                this.$notification.success({
                  message: '失败',
                  description: errMsg
                });

              }, 1000);
              this.loginConfirmLoading = false;
            }
          })
        }
      });

    },
    handleChangePwModelCancel () {
      this.changePwModeVisible = false;
    },
    handleChangePwConfirmBlur (e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword (rule, value, callback) {
      const form = this.changePwForm;
      if (value && value !== form.getFieldValue('newpassword')) {
        callback('两次输入的密码不匹配！');
      } else {
        callback();
      }
    },
    validateToNextPassword (rule, value, callback) {
      const form = this.changePwForm;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    hideNotice () {
      this.hadNotice = false;
    },
    checkNotice () {
      //this.hadNotice = true;
      let noticeLs = this.$ls.get('NOTICESID')
      getNotices().then(res => {
        let { flag, data, errMsg } = res;
        if (flag) {
          if (data) {
            let notices = data.notices;
            if (notices) {
              let notice = notices[0];
              if ((noticeLs) && (noticeLs === notice.dttr)) {
                this.hadNotice = false;
              } else {
                if (notice.content === null || notice.content === '') {
                  this.hadNotice = false;
                } else {
                  this.noticeCotent = notice.content;
                  this.noticeId = notice.dttr;
                  this.hadNotice = true;
                }

              }
            }
          }
        } else {
          setTimeout(() => {
            this.$notification.error({
              message: '失败',
              description: errMsg
            });

          }, 1000);
        }
      })
    }
  }
}
</script>
<style scoped>
.ant-carousel {
  text-align: center;
}
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 300px;
  line-height: 300px;
  background: #364d79;
}
.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}

.global-header {
  height: 85px;
  padding: 0;
  position: fixed;
  width: 100%;
  z-index: 10;
  max-width: 100%;
  background: #f0f2f5;

  position: fixed; /* 随着鼠标滚动*/

  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1); /*投影*/
  -webkit-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 1px 1px 1px 1gba (0, 0, 0, 0.1);
  -o-box-shadow: 0px 1px 1px 1px 1gba (0, 0, 0, 0.1);
}
.global-content {
  height: 100vh;
}

.header-meun {
  background: rgba(255, 255, 255, 0) none repeat scroll 0 0 !important; /*实现FF背景透明，文字不透明*/
  filter: Alpha(opacity=90);
  background: #fff;
  line-height: 55px;
  border-bottom: 0px !important;
  text-align: right;
}
.header-meun .ant-menu-item {
  margin-top: 7px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 1.35em;
  font-weight: 800;
}

.global-footer {
  background: #002f7b;
  color: #fff;
  height: 50px;
  padding-top: 16px;
  text-align: center;
}
.content-menus {
  margin-top: 120px;
  background-color: #f0f2f5;
}
.content,
.outer-container {
  width: 100vw;
  height: 100vh;
}

.outer-container {
  position: relative;
  overflow: hidden;
}

.inner-container {
  position: absolute;
  left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}

.inner-container::-webkit-scrollbar {
  display: none;
}
</style>