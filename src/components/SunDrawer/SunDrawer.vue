<template>
  <transition name="sun-drawer-fade"
              @after-enter="afterEnter"
              @after-leave="afterLeave">
    <div class="drawer-dialog"
         v-show="visible">
      <a-row type="flex"
             justify="space-around"
             align="middle">
        <a-col :xs="24"
               :sm="24"
               :md="23"
               :lg="22"
               :xl="19"
               style="height:103vh">
          <div class="drawer-container"
               :style="[{width: width },{height: height }]"
               @click.self="handleWrapperClick">
            <div class="drawer-header">
              <a-row type="flex"
                     style="">
                <a-col :xs="{span: 16, offset: 1}"
                       :sm="{span: 14, offset: 1}"
                       :md="{span: 14, offset: 1}"
                       :lg="{span: 14, offset: 1}"
                       :xl="{span: 10, offset: 1}"
                       :xxl="{span: 9, offset: 1}">
                  <a-breadcrumb>
                    <a-breadcrumb-item href="">
                      <a-icon type="home" />
                    </a-breadcrumb-item>
                    <a-breadcrumb-item href="">
                      <span>{{title.parent}}</span>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                      {{title.children}}
                    </a-breadcrumb-item>
                  </a-breadcrumb>
                </a-col>
                <a-col :xs="{span: 3, offset: 2}"
                       :sm="{span: 3, offset: 4}"
                       :md="{span: 3, offset: 4}"
                       :lg="{span: 3, offset: 6}"
                       :xl="{span: 3, offset: 10}"
                       :xxl="{span: 3, offset: 11}">
                  <a-button type="primary"
                            @click="closeDrawer"
                            size="small">
                    关闭当前页
                  </a-button>

                </a-col>
              </a-row>

            </div>
            <a-divider style="margin-top:0px;padding-bottom:0px" />
            <div class="drawer-body">
              <section>
                <slot></slot>
              </section>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>

  </transition>
</template>
<script>
export default {
  name: 'sundrawer',
  props: {
    title: {
      type: Object,
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '90%'
    },
    height: {
      type: String,
      default: '100%'
    },
    wrapperClosable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      closed: false,
    }
  },
  mounted () {
    if (this.visible) {
      this.open();
    }
  },
  methods: {
    afterEnter () {
      this.$emit('opened');
    },
    afterLeave () {
      this.$emit('closed');
    },
    hide () {
      this.$emit('close');
      this.closed = true;
    },
    closeDrawer () {
      this.hide();
    },
    handleWrapperClick () {
      if (this.wrapperClosable) {
        this.closeDrawer();
      }
    }
  }
}
</script>
<style lang="less" >
.drawer-dialog {
  height: 100vh;
  width: 100vw;

  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  z-index: 99;
  background: rgba(255, 255, 255, 0.6) none repeat scroll 0 0 !important; /*实现FF背景透明，文字不透明*/
  filter: Alpha(opacity=90);
  background: #fff; /*实现IE背景透明*/

  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1); /*投影*/
  -webkit-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
}
.drawer-container {
  background: #fff;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
}
.drawer-header {
  height: 50px;
  padding-top: 10px;
  background: #ff9933;
  border-bottom: 2px solid #1d2c6a;
}
.drawer-body {
  padding: 10px;
}

.sun-drawer-fade-enter-active,
.sun-drawer-fade-leave-active {
  transition: opacity 0.5s;
}
.sun-drawer-fade-enter, .sun-drawer-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.viewcard-had-table {
  text-align: center;
}
.viewcard-had-table .ant-table-content {
  width: 100%;
  // white-space: nowrap;
  overflow: auto;
  overflow-x: scroll; /* 1 */
}
.viewcard-had-table .ant-table-content th {
  padding: 5px 5px !important;
}
.viewcard-had-table .ant-table-content td {
  padding: 5px 5px !important;
}
@media screen and (max-width: 1600px) {
  .viewcard-had-table .ant-table-body {
    white-space: nowrap;
  }
}
</style>