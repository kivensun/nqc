<template>
  <div>
    <a-row>
      <a-col :span="4"
             :offset="1">公告内容:</a-col>
      <a-col :span="18">
        <a-textarea placeholder="请输入公告内容"
                    v-model="notice.content"
                    :autosize="{ minRows: 18, maxRows: 22 }" />
      </a-col>
    </a-row>
    <a-row type="flex"
           justify="center"
           style="margin-top:20px;">
      <a-col :span="6">
        <a-button type="primary"
                  style="width:100%"
                  @click="handleSave">保 存</a-button>

      </a-col>

    </a-row>

  </div>
</template>

<script>
import { getNotices, updateNotice } from '@/api/notice';

export default {
  data () {
    return {
      notice: {
        content: '',
        dttr: ''
      }
    }
  },
  beforeMount () {
    this.getContent();
  },
  methods: {
    getContent () {
      getNotices().then(res => {
        let { flag, data, errMsg } = res;
        if (flag) {
          if (data) {
            let notices = data.notices;
            if (notices) {
              this.notice = notices[0];
            }
          }
        } else {
          setTimeout(() => {
            this.$notification.error({
              message: '失败',
              description: errMsg
            });
          }, 1000);
        }
      })
    },
    handleSave (e) {
      e.preventDefault();

      updateNotice(this.notice).then(res => {
        let { flag, errMsg, outMsg } = res;
        if (flag) {
          setTimeout(() => {
            this.$notification.success({
              message: '成功',
              description: outMsg
            });
          }, 1000);
          this.getContent();
        } else {
          setTimeout(() => {
            this.$notification.error({
              message: '失败',
              description: errMsg
            });
          }, 1000);
        }
      });
    }
  }

}
</script>

<style>
</style>