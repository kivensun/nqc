<template>
  <div class="login-form">
    <div v-if="!isLogin">
      <a-form :form="form"
              @submit="handleLogin">
        <img src="../../assets/logo.png" />
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
        <a-form-item>

          <a-button type="primary"
                    html-type="submit"
                    class="login-form-button">
            登 录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div v-else>
      <div class="logined">
        <a-row type="flex"
               justify="center">

          <a-col :span="24">
            <img src="@/assets/logo.png" />
          </a-col>

        </a-row>
        <a-row>
          <a-col :span="24"
                 style="height:70px;margin-top:15px">
            <a-avatar :size="64"
                      style="color: #000000; backgroundColor: #f6ad3c">{{avatar_userid}}</a-avatar>

          </a-col>
        </a-row>
        <a-row style="margin-top:15px">
          <a-col :span="24">
            欢迎 {{avatar_userid}}
          </a-col>
        </a-row>
        <a-row>
          <div v-if="isAdmin">
            <a-col :span="8">
              <a-button type="link"
                        @click="handleManageUserModel">
                用户管理</a-button>
            </a-col>
            <a-col :span="8">
              <a-button type="link"
                        @click="handleChangePwModel">修改密码</a-button>
            </a-col>
            <a-col :span="8">
              <a-button type="link"
                        @click="handleLoginout">注销</a-button>
            </a-col>
          </div>
          <div v-else>
            <a-col :span="12">
              <a-button type="link"
                        @click="handleChangePwModel">修改密码</a-button>
            </a-col>
            <a-col :span="12">
              <a-button type="link"
                        @click="handleLoginout">注销</a-button>
            </a-col>
          </div>
        </a-row>

      </div>

    </div>
    <a-modal v-model="changePwModeVisible"
             title="修改密码"
             onOk="handleOk"
             :maskClosable=false>
      <template slot="footer">
        <a-button key="back"
                  @click="handleChangePwModelCancel">取 消</a-button>
        <a-button key="submit"
                  type="primary"
                  :loading="changePwModeloading"
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
</template>
<script>
import * as utility from 'utility';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'userLogin',
  data () {
    return {
      avatar_userid: '',
      isLogin: false,
      isAdmin: false,
      changePwModeVisible: false,
      changePwModeloading: false,
      confirmDirty: false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
    this.changePwForm = this.$form.createForm(this);
  },
  created () {
    this.isLogin = this.userId ? true : false;
    this.avatar_userid = this.userId ? this.userId : '';
    this.isAdmin = this.groups ? this.groups.includes('5000') : false;
  },
  computed: {
    ...mapState({
      // 动态主路由
      groups: state => state.user.groups,
      userId: state => state.user.userId
    }),
  },
  methods: {
    ...mapActions(['Login', 'Logout']),

    handleLogin (e) {
      e.preventDefault();
      const { Login } = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          const loginParams = {};
          loginParams.userId = values.userId;
          loginParams.password = utility.md5(values.password);
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
        this.isLogin = true;
        this.isAdmin = this.groups.includes('5000');
        this.avatar_userid = this.userId;
        this.$emit('changeMenu');
      }, 1000);
    },
    loginFailed (err) {
      console.log(err);
      setTimeout(() => {
        this.$notification.error({
          message: '出错',
          description: '出错信息' + err
        });
        this.isLogin = false;
      }, 1000);
    },
    handleLoginout () {
      const { Logout } = this;
      Logout({userId:this.userId}).then(() => {
        this.isLogin = false;
        this.isAdmin = false;
        this.$emit('changeMenu');
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
      this.changePwForm.validateFields((err) => {
        if (!err) {
          this.changePwModeloading = true;
          setTimeout(() => {
            this.changePwModeVisible = false;
            this.changePwModeloading = false;
          }, 3000);
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
    handleManageUserModel () {
      let data = {};
      data.parent = '首页';
      data.children = '用户管理';
      let path = "/usermanage";
      this.$emit('showDrawer', { path, data });
    }

  }

}
</script>
<style lang="less" scoped>
.login-form {
  min-height: 300px;
  min-width: 210px;
  max-width: 300px;
  border: #ebeef5;
  background: #ffffff;
  padding: 15px 15px;
  margin: 0 10px 0 10px;
  text-align: center;
}
.logined {
  height: 100%;
}
.logined .ant-row {
  min-height: 45px;
}
</style>