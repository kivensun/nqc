<template>
  <div>
    <a-row>
      <a-col :span="16"
             :offset="4"
             justify="center">
        <a-input-search placeholder="输入箱号"
                        @search="onSearch"
                        enterButton="查 找"
                        size="large"
                        style="width: 300px" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
</style>  