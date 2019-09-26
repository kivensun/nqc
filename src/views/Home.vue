<template>
  <div class="outer-container">
    <div class="inner-container">
      <div class="content">
        <a-layout style="min-height: 100vh;">
          <a-layout-header class="global-header">
            <a-row>
              <a-col :xs="{span: 10, offset:1}"
                     :sm="{span: 5, offset:1}"
                     :md="{span: 5, offset: 2}"
                     :lg="{span: 5, offset: 3}"
                     :xl="{span: 3, offset: 4}"
                     :xxl="{span: 3, offset: 4}">
                <img src="@/assets/logo.png" />
              </a-col>
              <a-col :xs="{span: 11, offset:1}"
                     :sm="{span: 11, offset: 6}"
                     :md="{span: 10, offset: 5}"
                     :lg="{span: 10, offset: 3}"
                     :xl="{span: 10, offset: 3}"
                     :xxl="{span: 4, offset: 9}">
                <div v-if="userId">
                  <a-button style="float: right;margin-top: 32px;margin-left: 16px; "
                            size="small"
                            @click="handleLoginout">注销</a-button>
                  <a-button size="small"
                            style="float: right;margin-top: 32px;margin-left: 16px;"
                            @click="handleChangePwModel">修改密码</a-button>
                  <a-avatar :size="55"
                            shape="square"
                            style="color: #000000; backgroundColor: #f6ad3c;float: right;margin-top: 8px;margin-left: 16px;">
                    {{userId}}
                  </a-avatar>

                </div>
              </a-col>

            </a-row>

          </a-layout-header>
          <a-layout-content style="margin-top:80px; background-image:url('../assets/homebar1.jpg')">
            <a-row>
              <a-col :xs="{span: 22, offset: 1}"
                     :sm="{span: 22, offset: 1}"
                     :md="{span: 20, offset: 2}"
                     :lg="{span: 18, offset: 3}"
                     :xl="{span: 16, offset: 4}"
                     :xxl="{span: 16, offset: 4}">

                <a-carousel autoplay>
                  <div>
                    <img alt="example"
                         src="../assets/homebar1.jpg"
                         slot="cover"
                         style="display: block;margin: auto;" />
                  </div>
                  <div>
                    <img alt="example"
                         src="../assets/homebar2.jpg"
                         slot="cover" />
                  </div>
                  <div>
                    <img alt="example"
                         src="../assets/homebar3.jpg"
                         slot="cover" />
                  </div>
                  <div>
                    <img alt="example"
                         src="../assets/homebar4.jpg"
                         slot="cover"
                         style="display: block;margin: auto;" />
                  </div>
                  <div v-if="hadNotice">
                    <p> notice </p>
                  </div>
                </a-carousel>

                <card-menu :menus=cardMenu
                           @showDrawer="showDrawer" />
                <div v-if="!userId">
                  <a-card title="客户服务"
                          :headStyle="cardNoLoginTileStyle"
                          :bodyStyle="cardNoLoginBodyStyle">
                    <p style="width:100%">
                      <a-button type="link"
                                @click="showLogin">点击登录查看详情</a-button>
                    </p>
                  </a-card>
                </div>

              </a-col>
            </a-row>

          </a-layout-content>
          <a-layout-footer class="global-footer">NBCTCustomerQuery ©2018 Created by Ant </a-layout-footer>
        </a-layout>

        <sun-drawer :visible="visible"
                    @close="onDrawerClose"
                    width="95%"
                    height="95%"
                    :title="aDrawerTitle" style="margin-bottom: 30px">
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

      </div>
    </div>
  </div>
</template>
<script>
import CardMenu from '@/components/CardMenu';
import SunDrawer from '@/components/SunDrawer';
import RouteView from '@/views/RouteView'
import * as utility from 'utility';
import { mapState, mapActions } from 'vuex'
import { changePasswordUser } from '@/api/user';

export default {
  name: 'home',
  data () {
    return {
      visible: false,
      placement: 'left',
      aDrawerTitle: {},
      hadNotice: true,
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
    RouteView
  },
  computed: {
    ...mapState({
      // 动态主路由
      groups: state => state.user.groups,
      userId: state => state.user.userId,
      cardMenu: state => state.permission.allowedMenuMap
    }),
  },
  beforeCreate () {
    this.loginForm = this.$form.createForm(this);
    this.changePwForm = this.$form.createForm(this);
  },
  created () {
    this.reGetDateOnRefresh();
    this.InitMenu(this.groups);

  },
  // mounted () {
  //   this.reGetDateOnRefresh();
  // },
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
  height: 65px;
  padding: 0;
  position: fixed;
  width: 100%;
  z-index: 10;
  max-width: 100%;
  background: rgba(255, 255, 255, 0.1) none repeat scroll 0 0 !important; /*实现FF背景透明，文字不透明*/
  filter: Alpha(opacity=90);
  background: #fff; /*实现IE背景透明

width: 100%;
position:fixed;/* 随着鼠标滚动*/

  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1); /*投影*/
  -webkit-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 1px 1px 1px 1gba (0, 0, 0, 0.1);
  -o-box-shadow: 0px 1px 1px 1px 1gba (0, 0, 0, 0.1);
}
.global-footer {
  background: #002f7b;
  color: #fff;
  height: 50px;
  padding-top: 16px;
  text-align: center;
}

.homebar1 {
  background: url('../assets/homebar1.jpg') center bottom no-repeat;
  z-index: 1;
  display: block;
}
.homebar2 {
  background: url('../assets/homebar2.jpg') center bottom no-repeat;
  z-index: 1;
  display: block;
}
.homebar3 {
  background: url('../assets/homebar3.jpg') center bottom no-repeat;
  z-index: 1;
  display: block;
}
.homebar4 {
  background: url('../assets/homebar4.jpg') center bottom no-repeat;
  z-index: 1;
  display: block;
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