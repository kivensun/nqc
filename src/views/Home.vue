<template>
  <div>
    <a-layout style="min-height: 100vh;">
      <a-layout-header class="global-header"></a-layout-header>
      <a-layout-content style="textAlign:center;padding: 0 50px;margin:0 auto;max-width:80vw">
        <a-row type="flex"
               justify="center"
               style="margin:30px 0px 30px 0px;">
          <a-col :span="16"
                 style="background: #ffffff;">
            <a-carousel autoplay>
              <div>
                <img alt="example"
                     src="../assets/homebar1.jpg"
                     slot="cover"
                     style="display: block;
margin: auto;" />
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
                     style="display: block;
margin: auto;" />
              </div>
            </a-carousel>
          </a-col>
          <a-col :span="4">
            <user @changeMenu="changeMenu" />
          </a-col>
        </a-row>
        <a-row type="flex"
               justify="center">
          <a-col :span="20">
            <card-menu :menus=cardMenu
                       @showDrawer="showDrawer" />
          </a-col>
        </a-row>

      </a-layout-content>
      <a-layout-footer class="global-footer">NBCTCustomerQuery ©2018 Created by Ant </a-layout-footer>
    </a-layout>
    <sun-drawer :visible="visible"
                @close="onDrawerClose"
                width="80%"
                height="95%"
                :title="aDrawerTitle">
      <route-view @closeDrawer="onDrawerClose" />
    </sun-drawer>
  </div>
</template>
<script>
import CardMenu from '@/components/CardMenu';
import User from '@/components/User';
import SunDrawer from '@/components/SunDrawer';
import RouteView from '@/views/RouteView'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      visible: false,
      placement: 'left',
      aDrawerTitle: {}
    }
  },
  components: {
    CardMenu,
    User,
    SunDrawer,
    RouteView
  },
  computed: {
    ...mapState({
      // 动态主路由
      groups: state => state.user.groups,
      cardMenu: state => state.permission.allowedMenuMap
    }),
  },
  created () {
    this.reGetDateOnRefresh();
    this.InitMenu(this.groups);

  },
  // mounted () {
  //   this.reGetDateOnRefresh();
  // },
  methods: {
    ...mapActions(['RenewMenu', 'Login', 'InitMenu', 'refreshUser']),
    changeMenu () {
      this.RenewMenu(this.groups);
      console.log('');
    },
    showDrawer (param) {
      console.log("router");
      const { path, data } = param;
      this.aDrawerTitle = data;
      this.$router.push({ path: path });
      this.visible = true;
    },
    onDrawerClose () {
      this.visible = false
    },
    reGetDateOnRefresh () {
      this.refreshUser();
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
  background: #002f7b;
  height: 40px;
}
.global-footer {
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
</style>