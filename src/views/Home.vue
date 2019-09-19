<template>
  <div class="outer-container">
    <div class="inner-container">
      <div class="content">
        <a-layout style="min-height: 100vh;">
          <a-layout-header class="global-header"></a-layout-header>
          <a-layout-content>
            <a-row type="flex"
                   justify="space-around"
                   align="middle">
              <a-col :xs="24"
                     :sm="24"
                     :md="21"
                     :lg="21"
                     :xl="19">
                <a-row type="flex"
                       justify="center"
                       style="margin-top:30px;">
                  <a-col :xs="20"
                         :sm="20"
                         :md="20"
                         :lg="15"
                         :xl="15"
                         style="background: #ffffff;">
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
                    </a-carousel>
                  </a-col>
                  <a-col :xs="20"
                         :sm="20"
                         :md="20"
                         :lg="4"
                         :xl="4"
                         style="background:#fff;width:100% text-align:center; ">
                    <user-login @changeMenu="changeMenu"
                                @showDrawer="showDrawer"
                                style="margin:auto;" />
                  </a-col>
                </a-row>
                <a-row type="flex"
                       justify="center">
                  <a-col :xs="20"
                         :sm="20"
                         :md="20"
                         :lg="19"
                         :xl="19">
                    <card-menu :menus=cardMenu
                               @showDrawer="showDrawer" />
                  </a-col>
                </a-row>
              </a-col>
            </a-row>

          </a-layout-content>
          <a-layout-footer class="global-footer">NBCTCustomerQuery ©2018 Created by Ant </a-layout-footer>
        </a-layout>

        <sun-drawer :visible="visible"
                    @close="onDrawerClose"
                    width="95%"
                    height="95%"
                    :title="aDrawerTitle">
          <route-view @closeDrawer="onDrawerClose" />
        </sun-drawer>

      </div>
    </div>
  </div>
</template>
<script>
import CardMenu from '@/components/CardMenu';
import UserLogin from '@/components/UserLogin';
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
    UserLogin,
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
      this.$router.push({ path: path }, () => { });
      this.visible = true;
    },
    onDrawerClose () {
      this.visible = false
      this.$router.push({ path: '/' }, () => { })
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