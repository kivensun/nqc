<template>
  <div>
    <a-tabs defaultActiveKey="1"
            tabPosition="left"
            style="height: 100%">
      <a-tab-pane tab="用户新增"
                  key="1">
        <user-opt />
      </a-tab-pane>
      <a-tab-pane tab="用户管理"
                  key="2">用户管理</a-tab-pane>

    </a-tabs>
  </div>
</template>
<script>
import UserOpt from '@/components/UserOpt';
export default {
  components: {
    UserOpt
  }
}
</script>