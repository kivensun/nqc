<template>
  <div>
    <a-modal title="修改用户信息"
             :visible="visible"
             :destroyOnClose="true"
             :closable="false">
      <template slot="footer">
        <a-button key="back"
                  @click="handleCancel">返回</a-button>
        <a-button key="submit"
                  type="primary"
                  :loading="loading"
                  @click="handleSubmit">
          保存
        </a-button>
      </template>
      <a-form :form="userForm">
        <a-form-item v-bind="formItemLayout"
                     label="用户名:">
          <a-input placeholder="请输入用户名"
                   v-decorator="[
          'userId',
          {
            rules: [{ 
              required: true, message: '请输入用户名!' 
            },{ 
              validator: validatorUserIdExists,
            },
            {
              initialValue:initialValues.userId
            }],
          }
        ]"
                   :disabled="!isAdd" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout"
                     label="用户姓名:">
          <a-input v-decorator="['userName',{initialValue:initialValues.userName}]"
                   placeholder="请输入用户姓名" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout"
                     label="电话:">
          <a-input v-decorator="['telephone',{initialValue:initialValues.telephone}]"
                   placeholder="请输入电话" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout"
                     label="用户类别:">
          <a-select v-decorator="
        ['userType',{initialValue: initialValues.userType}]">
            <a-select-option value="D">堆场</a-select-option>
            <a-select-option value="C">海关</a-select-option>
            <a-select-option value="V">船公司</a-select-option>
            <a-select-option value="H">货代公司</a-select-option>
            <a-select-option value="A">全部</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-bind="formItemLayout"
                     label="单位代码:">
          <a-input v-decorator="[
              'companyId',
              {
                rules: [{
                  required: true, message: '请输入单位代码',
                },{
                  initialValue:initialValues.companyId
                }]
              }]"
                   placeholder="请输入单位代码" />
        </a-form-item>

        <a-form-item v-bind="formItemLayout"
                     label="单位名称:">
          <a-input v-decorator="['company',{
            initialValue:initialValues.company
          }]"
                   placeholder="请输入单位名称" />

        </a-form-item>
        <a-form-item v-bind="formItemLayout"
                     label="单位地址:">
          <a-input v-decorator="['address',{
            initialValue:initialValues.address
          }]"
                   placeholder="请输入单位地址" />

        </a-form-item>
      </a-form>
    </a-modal>

  </div>
</template>
<script>

import { addUser, editUser, getUser } from '@/api/user';

export default {
  data () {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 16,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 2,
          },
        },
      },
      userIdInput: {
        value: '',
        errorMsg: ''
      },
      loading: false,
      initialValues: {
        userId: '',
        userName: '',
        telephone: '',
        userType: 'D',
        companyId: '',
        address: ''      }

    }
  },
  props: {
    isAdd: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.initData();
      }
    }
  },
  mounted () {
    console.log('mounted');

  },
  beforeCreate () {
    this.userForm = this.$form.createForm(this);
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault();
      this.userForm.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log(values);
          this.loading = true;
          //let params = {};
          let params = {};
          params.userId = values.userId;
          params.userName = values.userName ? values.userName : '';
          params.password = '';
          /**
           * 用户类型 A(管理员),C(海关),D(堆场),H(货代),V(船公司)
           */
          params.userType = values.userType;
          /**
           * 用户对应功能组
           */
          switch (values.userType) {
            case 'A':
              params.groups = '1000,2001,2002,2003,2004,3000,4000,5000';
              break;
            case 'C':
              params.groups = '1000,2004,3000,4000';
              break;
            case 'D':
              params.groups = '1000,2003,3000,4000,';
              break;
            case 'H':
              params.groups = '1000,2002,3000,4000';
              break;
            case 'V':
              params.groups = '1000,2001,,3000,4000';
              break;
          }
          params.telephone = values.telephone ? values.telephone : '';
          params.address = values.address ? values.address : '';
          params.company = values.company ? values.company : '';
          params.companyId = values.companyId.toUpperCase();
          params.opUser = this.userId;
          console.log(params);
          if (this.isAdd) {
            addUser(params).then(response => {
              let { flag, errMsg } = response;
              if (flag) {
                this.$notification.success({
                  message: '成功',
                  description: '新增用户成功'
                });
                this.$emit('changeUserOptVisibility', false);
                this.$emit('refreshUsers');
              } else {
                this.$notification.error({
                  message: '错误',
                  description: '新增用户信息失败:' + errMsg
                });
              }
            })

          } else {
            editUser(params).then(response => {
              let { flag, errMsg } = response;
              if (flag) {
                this.$notification.success({
                  message: '成功',
                  description: '修改用户信息成功'
                });
                this.$emit('changeUserOptVisibility', false);
                this.$emit('refreshUsers');
              } else {
                this.$notification.error({
                  message: '错误',
                  description: '修改用户信息失败:' + errMsg
                });
              }
            });
          }
          this.loading = false;
        }
      });
    },
    validatorUserIdExists (rule, value, callback) {
      let userId = value ? value : '';
      if (this.isAdd) {
        if (userId.length > 1) {
          let params = {};
          params.userId = userId;
          getUser(params).then(response => {
            let { flag } = response;
            //console.log(data);
            if (flag) {
              callback('该用户名已存在!');
            } else {
              callback();
            }
          });
        } else {
          callback();
        }
      } else {
        callback();
      }
    },
    handleCancel () {
      this.$emit('changeUserOptVisibility', false);
    },
    initData () {
      if (!this.isAdd) {
        console.log('setFieldsValue');
        let params = {};
        params.userId = this.userId;
        getUser(params).then(response => {
          let { flag, data, errMsg } = response;
          console.log(data);
          if (flag) {
            let fieldsValue = {
              userId: data.user.userId,
              userName: data.user.userName,
              telephone: data.user.telephone,
              company: data.user.company,
              companyId: data.user.companyId,
              address: data.user.address
            }
            this.userForm.setFieldsValue(fieldsValue);

          } else {
            this.$notification.error({
              message: '出错',
              description: '读取用户信息出错-' + errMsg
            });
          }
        });
      } else {
        console.log('initialValues');
        this.initialValues = {
          userId: '',
          userName: '',
          telephone: '',
          userType: 'D',
          companyId: '',
          address: ''
        }

      }
    }
  }
}
</script>