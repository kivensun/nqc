<template>
  <div>
    <a-modal title="公告"
             centered
             :visible="visible"
             :footer="null"
             :closable="false">
      <pre style="white-space: pre-wrap;word-wrap: break-word;">{{content}}</pre>
      <p style="text-align:center">

        <a-checkbox :defaultChecked="false"
                    @change="onNoSeeChange">我已知晓 下次不再显示</a-checkbox>
      </p>
      <p style="text-align:center">
        <a-button type="primary"
                  style="width:100px;"
                  @click="handleOk">好的</a-button>
      </p>

    </a-modal>
  </div>
</template>
<script>
export default {
  name: 'publicnotice',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    noticeId: {
      type: String,
    },
    content: {
      type: String,
      default: 'sfsfsjl'
    }
  },
  data () {
    return {
      noSee: false,
    };
  },
  methods: {
    handleOk (e) {
      e.preventDefault();
      if (this.noSee) {
        this.$ls.set('NOTICESID', this.noticeId);
      } else {
        this.$ls.set('NOTICESID', '');
      }
      this.$emit('hideNotice');
    },
    onNoSeeChange (e) {
      this.noSee = e.target.checked;
      console.log(this.noSee);
    }
  }

}
</script>