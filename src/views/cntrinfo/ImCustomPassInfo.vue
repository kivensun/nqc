<template>
  <div>
    <a-row>
      <a-col :span="16"
             :offset="4"
             justify="center">
        <a-input-search placeholder="输入箱号"
                        @search="onGetData"
                        enterButton="查 找"
                        size="large"
                        style="width: 300px" />
      </a-col>
    </a-row>
    <a-divider />
    <a-skeleton :loading="loading">
      <div v-if="showResults">
        <a-row type="flex"
               justify="center">
          <a-col :span="16">
            <a-alert :message="alertTitle"
                     :description="alertMessage"
                     :type="alertType" />
          </a-col>
        </a-row>
        <div v-if="hadCustRelease">
          <a-row style="margin-top:60px">
            <a-col :span="22"
                   :offset="1"
                   justify="center">
              <a-card style="width: 100%;text-align: left; background:#f5f7fa">

                <a-row type="flex"
                       justify="start">
                  <a-col :span="3">
                    <div>箱号:</div>
                  </a-col>
                  <a-col :span="5">
                    <div class="wrap-content">{{ctnrInfo.cntrId}}</div>
                  </a-col>
                  <a-col :span="3">
                    <div>船名/航次:</div>
                  </a-col>
                  <a-col :span="5">
                    <div class="wrap-content">{{ctnrInfo.vscn + '/' + ctnrInfo.vsvy + '-'+ ctnrInfo.vsdr}}</div>
                  </a-col>
                </a-row>

                <a-divider />
                <a-row>
                  <a-col :span="3">
                    <div>提单号:</div>
                  </a-col>
                  <a-col :span="5">
                    <div class="wrap-content">{{ctnrInfo.cabl}}</div>
                  </a-col>
                  <a-col :span="3">
                    <div>位置:</div>
                  </a-col>
                  <a-col :span="5">
                    <div class="wrap-content">{{ctnrInfo.yardcn}}</div>
                  </a-col>
                  <a-col :span="3">
                    <div>是否转关箱:</div>
                  </a-col>
                  <a-col :span="5">
                    <div class="wrap-content">{{ctnrInfo.istp}}</div>
                  </a-col>
                </a-row>
              </a-card>
            </a-col>
          </a-row>
        </div>

      </div>
    </a-skeleton>
  </div>
</template>
<script>
import { imCustomPassInfo } from "@/api/containerInfo";
export default {
  data () {
    return {
      loading: false,
      showResults: false,
      hadCustRelease: false,
      alertMessage: '',
      alertType: 'success',
      alertTitle: '成功',
      ctnrInfo: {
        cntrId: '',
        vscn: '',
        vsvy: '',
        vsdr: '',
        cabl: '',
        yardcn: '',
        istp: ''
      }
    }
  },
  methods: {
    onGetData (value) {
      this.loading = true;
      value = value.trim();
      console.log('箱号:' + value);
      if (value === '') {
        this.$notification.error({
          message: '出错',
          description: '请输入箱号'
        });
        this.ctnrInfo = {
          cntrId: '',
          vscn: '',
          vsvy: '',
          vsdr: '',
          cabl: '',
          yardcn: '',
          istp: ''
        };
        this.loading = false;
        return false;
      }
      imCustomPassInfo({ "cntrId": value }).then(response => {
        console.log(response);
        const { flag, data, errMsg, outMsg } = response;
        if (flag) {
          this.showResults = true;
          this.hadCustRelease = true;
          this.alertType = "success";
          this.alertMessage = outMsg;
          this.alertTitle = "成功";
          if (data) {
            this.ctnrInfo = data;
          }
        } else {
          this.showResults = true;
          this.hadCustRelease = false;
          this.alertType = "error";
          this.alertMessage = errMsg;
          this.alertTitle = "错误";
        }
        this.loading = false;
      });

    }
  }
}
</script>
<style lang="less" scoped>
.wrap-content {
  word-break: break-all;
}
</style>  