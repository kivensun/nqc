<template>
  <div>

    <div v-for="(menu,itemIndex) in menus"
         :key="itemIndex">
      <a-row type="flex"
             justify="space-between"
             align="middle"
             style="z-index: 10;text-align: left;">

        <a-col :xs="{span: 22, offset: 1}"
               :sm="{span: 22, offset: 1}"
               :md="{span: 22, offset: 1}"
               :lg="{span: 20, offset: 2}"
               :xl="{span: 16, offset: 4}"
               :xxl="{span: 16, offset: 4}"
               class="menu-list">
          <a-list :grid="{ gutter: 16, xs: 2, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }"
                  :dataSource="menu.children">
            <a-list-item slot="renderItem"
                         slot-scope="submenu">
              <a href="javascript:;"
                 @click="showModel(
                  submenu.path,
                  {parent: menu.title,children: submenu.title})">
                {{submenu.title}}
              </a>
            </a-list-item>
            <div slot="header">
              {{menu.title}}
            </div>
          </a-list>
        </a-col>
      </a-row>
    </div>

    <div v-if="!userId">
      <a-row type="flex"
             justify="space-between"
             align="middle"
             style="z-index: 99;">
        <a-col :xs="{span: 22, offset: 1}"
               :sm="{span: 22, offset: 1}"
               :md="{span: 22, offset: 1}"
               :lg="{span: 20, offset: 2}"
               :xl="{span: 16, offset: 4}"
               :xxl="{span: 16, offset: 4}"
               class="menu-list">
          <div>
            <a-list :grid="{ gutter: 16, xs: 2, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }"
                    :dataSource="noLoginCustomerQuery">
              <a-list-item slot="renderItem"
                           slot-scope="item">
                <a href="javascript:;"
                   @click="showLogin">
                  {{item.title}}
                </a>
              </a-list-item>
              <div slot="header">
                客户服务
              </div>
            </a-list>

          </div>
        </a-col>
      </a-row>
    </div>

  </div>
</template>
<script>

export default {
  name: 'CardMenu',
  props: {
    menus: {
      type: Array,
      require: true
    },
    userId: {
      type: String,
      required: true
    },
    cardNoLoginBodyStyle: {
      textAlign: 'center'
    }
  },
  data () {
    return {
      noLoginCustomerQuery: [{
        title: '点击登录查看详情'
      }]
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
    },
    showLogin () {
      this.$emit('showLogin');
    }
  }

}
</script>
<style  >
.menu-list {
  margin-top: 10px;
  padding: 0px 20px !important;
  background: rgba(255, 255, 255, 0.1) none repeat scroll 0 0 !important; /*实现FF背景透明，文字不透明*/
  filter: Alpha(opacity=90);
  overflow: auto;
  background: #fff; /*实现IE背景透明

width: 100%;
position:fixed;/* 随着鼠标滚动*/

  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1); /*投影*/
  -webkit-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
}
.menu-list .ant-list-header {
  border-bottom: 0px !important;
  font-size: 2em;
  color: #000;
  background-color: #f0ac2d;
  text-align: center;
  margin-left: -20px;
  margin-right: -20px;
  margin-top: -5px;
}
.menu-list .ant-list-item {
  margin-top: 10px;
  height: 64px;
  background: rgba(255, 255, 255, 0.4) none repeat scroll 0 0 !important; /*实现FF背景透明，文字不透明*/
  filter: Alpha(opacity=90);
  background: #fff;
  padding-left: 10px;
  line-height: 30px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1); /*投影*/
  -webkit-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
}

.menu-list a {
  color: #000;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  text-shadow: 0 0 1px rgba(255, 255, 255, 0.3);
  font-size: 1.5em;
  -webkit-transition: color 0.3s;
  -moz-transition: color 0.3s;
  transition: color 0.3s;
  text-decoration: none;
}
.menu-list a:active {
  text-decoration: none;
}

.menu-list a:hover::before,
.menu-list a:focus::before {
  color: #000;
  text-shadow: 10px 0 #fff, -10px 0 #fff;
  text-decoration: none;
}

.menu-list a:hover,
.menu-list a:focus {
  color: #0f307d;
  text-decoration: none;
}
</style>