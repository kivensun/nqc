<template>
  <div :key="menuKey">
    <swiper :options="swiperOption"
            ref="mySwiper">

      <!-- slides -->
      <swiper-slide v-for="(menu,itemIndex) in menus"
                    :key="itemIndex">
        <div class="homeSwiperItem"
             :style="{ backgroundImage: 'url(' + menu.backgroundImage + ') ',
             backgroundRepeat: 'no-repeat',
             backgroundPositionX: 'center',
             backgroundPositionY: 'center',
             overflow: 'hidden',
             backgroundSize:'cover' }">

          <a-row style="top: 30%;z-index: 10;text-align: left;">
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
                <div slot="header"
                     style="font-size:3em;color: #fff;">
                  {{menu.title}}
                </div>
              </a-list>

            </a-col>
          </a-row>
        </div>
      </swiper-slide>
      <swiper-slide v-if="!userId">
        <div class="homeSwiperItem"
             :style="{ backgroundImage: 'url(' + require('@/assets/home3.jpg') + ')',
             backgroundRepeat: 'no-repeat',
             overflow: 'hidden',
             backgroundSize:'cover'  }">
          <a-row style="top: 30%;z-index: 10">
            <a-col :xs="{span: 22, offset: 1}"
                   :sm="{span: 22, offset: 1}"
                   :md="{span: 22, offset: 1}"
                   :lg="{span: 20, offset: 2}"
                   :xl="{span: 16, offset: 4}"
                   :xxl="{span: 16, offset: 4}"
                   class="menu-list">
              <div>
                <a-list :dataSource="noLoginCustomerQuery">
                  <a-list-item slot="renderItem"
                               slot-scope="item">
                    <a href="javascript:;"
                       @click="showLogin">
                      {{item.title}}
                    </a>
                  </a-list-item>
                  <div slot="header"
                       style="font-size:3em;color: #fff;">
                    客户服务
                  </div>
                </a-list>

              </div>
            </a-col>
          </a-row>
        </div>
      </swiper-slide>

      <!-- Optional controls -->
      <div class="swiper-pagination"
           slot="pagination"></div>
    </swiper>

  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
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
    selectedPage: {
      type: Number,
      default: 0
    },
    cardNoLoginBodyStyle: {
      textAlign: 'center'
    }
  },
  data () {
    return {
      menuKey: 1,
      noLoginCustomerQuery: [{
        title: '点击登录查看详情'
      }],
      swiperOption: {
        notNextTick: true,//notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        direction: 'vertical',//水平方向移动
        setWrapperSize: true,//Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
        autoHeight: true,//自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化
        slidesPerView: 1,//设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
        mousewheel: true,//开启鼠标滚轮控制Swiper切换。可设置鼠标选项，默认值false
        mousewheelControl: true,//同上
        height: window.innerHeight, // 高度设置，占满设备高度
        resistanceRatio: 0,//抵抗率。边缘抵抗力的大小比例。值越小抵抗越大越难将slide拖离边缘，0时完全无法拖离。本业务需要
        observeParents: true,//将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新
        initialSlide: 0,
        speed: 800,
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        //debugger: true,
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        on: {
          //监听滑动切换事件，返回swiper对象
          slideChange: () => {
            let swiper = this.$refs.mySwiper.swiper;
            console.log(swiper.activeIndex); //滑动打印当前索引
            this.$emit('changeCardMenu', swiper.activeIndex);
          }
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper;
    }

  },
  watch: {
    selectedPage: {
      deep: true,
      handler (nv) {
        this.selectedPage = nv;
        this.swiper.slideTo(nv, 800, false);
      }
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
.homeSwiperItem {
  height: 100%;
}

.card-menu {
  margin: 30px 0 15px 0;
  border: 0px !important;
}
.menu-list {
  padding: 10px 20px !important;
  background: rgba(255, 255, 255, 0.1) none repeat scroll 0 0 !important; /*实现FF背景透明，文字不透明*/
  filter: Alpha(opacity=90);
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
}
.menu-list .ant-list-item {
  margin-top: 10px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2) none repeat scroll 0 0 !important; /*实现FF背景透明，文字不透明*/
  filter: Alpha(opacity=90);
  background: #fff;
  padding-left: 10px;
  line-height: 30px;
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1); /*投影*/
  -webkit-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
}

.menu-list a {
  color: #fff;
  width: 100%;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 400;
  text-shadow: 0 0 1px rgba(255, 255, 255, 0.3);
  font-size: 1.35em;
  -webkit-transition: color 0.3s;
  -moz-transition: color 0.3s;
  transition: color 0.3s;
}

.menu-list a:hover::before,
.menu-list a:focus::before {
  color: #fff;
  text-shadow: 10px 0 #fff, -10px 0 #fff;
}

.menu-list a:hover,
.menu-list a:focus {
  color: #0f307d;
}
</style>