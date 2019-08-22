import Card from 'ant-design-vue/es/card';

export default {
  name: 'CMenu',
  props: {
    menu: { type: Array, require: true },
    theme: {
      type: String,
      require: false,
      default: 'light'
    }
  },
  data() {},
  computed: {},
  mounted() {},
  watch: {},
  methods: {
    updateMenu() {}
  },
  render() {}
};
