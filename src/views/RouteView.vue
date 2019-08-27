<template>
  <div style="height: calc(100vh - 130px);overflow: auto;textAlign:center">
    <p id="top"></p>
    <a-row type="flex"
           justify="space-between">
      <a-col :span="23">
        <router-view />
      </a-col>
      <a-col :span="1">
        <div class="close_page_btn">
          <a-tooltip placement="left">
            <template slot='title'>
              回到顶部
            </template>
            <a-button type="primary"
                      shape="circle"
                      icon="up-circle"
                      size="large"
                      href="#top" />

          </a-tooltip>
          <a-tooltip placement="left">
            <template slot='title'>
              关闭当前页
            </template>
            <a-button type="primary"
                      shape="circle"
                      icon="close-circle"
                      size="large"
                      @click="onClosePage" />

          </a-tooltip>
        </div>
      </a-col>
    </a-row>

  </div>
</template>
<script>
export default {
  methods: {
    onClosePage () {
      this.$emit('closeDrawer');
    },
    onScrollToTop () {
      window.scroll(0, 0);
    }
  }
}
</script>
<style lang="less" scoped>
.close_page_btn {
  width: 60px;
  position: fixed;
  //right: 60px;
  border-right: -100px;
  bottom: 30px;
  padding: 0;
  overflow: hidden;
  z-index: 9;
  font-size: 30px;
}
</style>