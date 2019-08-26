<template>
  <transition name="sun-drawer-fade"
              @after-enter="afterEnter"
              @after-leave="afterLeave">
    <div class="drawer-dialog"
         v-show="visible">
      <div class="drawer-container"
           :style="[{width: width },{height: height }]"
           @click.self="handleWrapperClick">
        <div class="drawer-header">
          <a-row type="flex"
                 justify="space-around"
                 align="middle"
                 style="height:100%">
            <a-col :span="24">
              <a-row type="flex"
                     justify="space-between">
                <a-col :span="7"
                       style="margin-left:30px;">
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
                <a-col :span="7"
                       style="text-align:right;margin-right:15px;">
                  <a-button type="primary"
                            @click="closeDrawer">
                    关闭当前页
                  </a-button>
                </a-col>
              </a-row>
            </a-col>
          </a-row>

        </div>
        <a-divider style="margin-top:0px" />
        <div>
          <section>
            <slot></slot>
          </section>
        </div>
      </div>
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
<style lang="less" scoped>
.drawer-dialog {
  height: 100vh;
  width: 100vw;
  background: #cecece;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  z-index: 99;
}
.drawer-container {
  background: #fff;
  position: absolute;
  border-radius: 15px;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
}
.drawer-header {
  height: 60px;
}

.sun-drawer-fade-enter-active,
.sun-drawer-fade-leave-active {
  transition: opacity 0.5s;
}
.sun-drawer-fade-enter, .sun-drawer-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>