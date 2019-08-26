<template>
  <div :key="menuKey">
    <a-card :title=menu.title
            class="card-menu"
            v-for="(menu,itemIndex) in menus"
            :key="itemIndex">
      <a-card-grid style="width:25%;textAlign:'center';min-width:160px;"
                   v-for="(submenu,itemIndex) in menu.children"
                   :key="itemIndex">
        <a-button type="link"
                  :block="true"
                  @click="showModel(
                  submenu.path,
                  {parent: menu.title,children: submenu.title})">
          <p>{{submenu.title}}</p>
        </a-button>
      </a-card-grid>
    </a-card>
  </div>
</template>
<script>
export default {
  name: 'CardMenu',
  props: {
    menus: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      menuKey: 1
    }
  },
  mounted () {
    this.showRoute();
  },
  methods: {
    showRoute () {
    },
    showModel (path, data) {
      this.$emit('showDrawer', { path, data });
    }
  }

}
</script>
<style lang="less" scoped>
.card-menu {
  margin: 30px 0 15px 0;
}
</style>