<template>
  <div>
    <a-card hoverable
            style="width: 230px">
      <a-avatar :size="55"
                shape="square"
                style="color: #000000; backgroundColor: #f6ad3c;float: right;margin-top: 8px;margin-left: 16px;">
        CMA
      </a-avatar>
      <template class="ant-card-actions"
                slot="actions">
        <span>
          <a-icon type="lock" />修改密码
        </span>

        <span>
          <a-icon type="tool" />修改信息
        </span>
        <span>
          <a-icon type="poweroff" />注销
        </span>
      </template>
      <a-card-meta title="Card title"
                   description="This is the description">

      </a-card-meta>
    </a-card>
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style>
</style>