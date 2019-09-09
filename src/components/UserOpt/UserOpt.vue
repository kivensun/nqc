<template>
  <div>

    <a-form :form="addUserForm">
      <a-form-item v-bind="formItemLayout"
                   label="用户名:">
        <a-input v-decorator="['userId',
              {
                rules: [{
                  required: true, message: '请输入用户名',
                }]
              }
              ]"
                 placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout"
                   label="用户姓名:">
        <a-input v-decorator="['userId',{}]"
                 placeholder="请输入用户姓名" />
      </a-form-item>

      <a-form-item v-bind="formItemLayout"
                   label="单位代码:">
        <a-input v-decorator="[
              'userId',
              {
                rules: [{
                  required: true, message: '请输入用户名',
                }]
              }
            ]"
                 placeholder="请输入单位代码" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout"
                   label="用户类别:">
        <a-select defaultValue="D">
          <a-select-option value="D">堆场</a-select-option>
          <a-select-option value="C">海关</a-select-option>
          <a-select-option value="V">船公司</a-select-option>
          <a-select-option value="H">货代公司</a-select-option>

        </a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout"
                   label="单位名称:">
        <a-input v-decorator="['userId',{}]"
                 placeholder="请输入单位名称" />

      </a-form-item>
      <a-form-item v-bind="formItemLayout"
                   label="单位地址:">
        <a-input v-decorator="['userId',{}]"
                 placeholder="请输入单位地址" />

      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary"
                  html-type="submit">
          提 交
        </a-button>
      </a-form-item>
    </a-form>

  </div>
</template>
<script>
export default {
  data () {
    return {
      addOrEdit: 'add',
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
            offset: 8,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      }
    }
  },
  beforeCreate () {
    this.addUserForm = this.$form.createForm(this);
  },
}
</script>