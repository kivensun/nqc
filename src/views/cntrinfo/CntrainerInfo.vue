<template>
  <div>
    <a-row>
      <a-col :span="16"
             :offset="4"
             justify="center">
        <a-input-search placeholder="输入箱号"
                        @search="onSearch"
                        enterButton="查 找"
                        size="large"
                        style="width: 300px" />
      </a-col>
    </a-row>
    <a-row style="margin-top:30px">
      <a-col :span="22"
             :offset="1"
             justify="center">
        <a-skeleton :loading="loading">
          <a-card style="width: 100%;text-align: left; background:#f5f7fa">
            <a-row>
              <a-col :span="3">
                <p>箱号:</p>
              </a-col>
              <a-col :span="5"
                     s>
                <p>{{container.cntrId}}</p>
              </a-col>
              <a-col :span="3">
                <p>进港类型:</p>
              </a-col>
              <a-col :span="5">{{container.inPortType}}</a-col>
            </a-row>
            <a-divider />
            <a-row>
              <a-col :span="3">
                <div>进口船名/航次:</div>
              </a-col>
              <a-col :span="5">
                <div>{{container.imvsvy}}</div>
              </a-col>
              <a-col :span="3">
                <div>出口船名/航次:</div>
              </a-col>
              <a-col :span="5">
                <div>{{container.exvsvy}}</div>
              </a-col>
              <a-col :span="3">
                <div>是否装船:</div>
              </a-col>
              <a-col :span="2">
                <div>{{ container.loaded ? container.loaded === 'Y' ? '是':'否' : ''}}</div>
              </a-col>
            </a-row>
            <a-divider />
            <a-row>
              <a-col :span="3">
                <div>进场时间:</div>
              </a-col>
              <a-col :span="5">
                <div>{{container.inYardDt}}</div>
              </a-col>
              <a-col :span="3">
                <div>出场时间:</div>
              </a-col>
              <a-col :span="5">
                <div>{{container.outYardDt}}</div>
              </a-col>
              <a-col :span="3">
                <div>堆存天数: </div>
              </a-col>
              <a-col :span="5">
                <div>{{container.storageDays ? container.storageDays + '天 (非费收依据)' : ''}} </div>
              </a-col>
            </a-row>
            <a-divider />
            <a-row>
              <a-col :span="2">
                <p>箱主:</p>
              </a-col>
              <a-col :span="4">
                <p>{{container.lncd}}</p>
              </a-col>
              <a-col :span="2">
                <p>
                  尺码/类型:</p>
              </a-col>
              <a-col :span="4">
                <p> {{container.ctsz}}{{container.ctty}}</p>
              </a-col>
              <a-col :span="2">
                <div>
                  内/外贸: </div>
              </a-col>
              <a-col :span="4">
                <div>{{ container.intd ? container.intd === 'N'? '内贸':'外贸' : ''}}</div>
              </a-col>
              <a-col :span="2">
                <div>
                  重/空:</div>
              </a-col>
              <a-col :span="4">
                <div>{{ container.infe ? container.infe === 'F'? '重':'空' : ''}}</div>
              </a-col>
            </a-row>
            <a-divider />
            <a-row>
              <a-col :span="2">
                <div>
                  装/卸货港:</div>
              </a-col>
              <a-col :span="4">
                <div>{{container.port}}</div>
              </a-col>
              <a-col :span="2">
                <div>提单号:</div>
              </a-col>
              <a-col :span="4">
                <div>{{container.cabl}}</div>
              </a-col>
              <a-col :span="2">
                <div>货代代码:</div>
              </a-col>
              <a-col :span="4">
                <div>{{container.caag}}</div>
              </a-col>
              <a-col :span="2">
                <div>输单重量:</div>
              </a-col>
              <a-col :span="4">
                <div>{{container.weight ? container.weight + '千克':''}} </div>
              </a-col>
            </a-row>
            <a-divider />

            <a-row>
              <a-col :span="3">
                <div>海关是否放行:</div>
              </a-col>
              <a-col :span="3">
                <div>{{container.customRelease ? container.customRelease === 'Y' ? '已放行':'未放行':''}}</div>
              </a-col>
              <a-col :span="3">
                <div>码头是否放行:</div>
              </a-col>
              <a-col :span="3">
                <div>{{container.terminalRelease ? container.terminalRelease === 'Y' ? '已放行':'未放行': ''}}</div>
              </a-col>
            </a-row>
            <a-divider />
            <a-row>
              <a-col :span="3">
                <div> VGM称重方式:</div>
              </a-col>
              <a-col :span="3">
                <div> {{container.weighingWayVGM === 'null' ? '':container.weighingWayVGM}}</div>
              </a-col>
              <a-col :span="3">
                <div>VGM重量:</div>
              </a-col>
              <a-col :span="3">
                <div>{{container.weightVGM ? container.weightVGM === 'null' ? '':container.weightVGM + '千克' : ''}}</div>
              </a-col>
              <a-col :span="3">
                <div>VGM签名:</div>
              </a-col>
              <a-col :span="3">
                <div>{{container.signVGM === 'null' ? '':container.signVGM}}</div>
              </a-col>
            </a-row>
            <a-divider />
            <a-row>
              <a-col :span="3">
                <div> 超限箱: </div>
              </a-col>
              <a-col :span="3">
                <div> {{container.inog ? container.inog === 'Y' ? '是':'否' : ''}} </div>
              </a-col>
              <a-col :span="3">
                <div>温控箱:</div>
              </a-col>
              <a-col :span="3">
                <div>{{container.inth ? container.inth === 'Y' ? '是':'否': ''}}</div>
              </a-col>
              <a-col :span="3">
                <div>危险品:</div>
              </a-col>
              <a-col :span="3">
                <div>{{container.inhz ? container.inhz === 'Y' ? '是':'否': ''}}</div>
              </a-col>
              <a-col :span="3">
                <div>坏箱:</div>
              </a-col>
              <a-col :span="3">
                <div>{{container.indm ? container.indm === 'Y' ? '是':'否': ''}}</div>
              </a-col>

            </a-row>

          </a-card>
        </a-skeleton>
      </a-col>
    </a-row>

  </div>
</template>

<script>
// @ is an alias to /src
import { containerInfo } from '@/api/containerInfo'
export default {
  name: 'cntrainerinfo',
  data () {
    return {
      loading: false,
      container: {

      }
    }
  },
  mounted () {
    this.container = {}
  },
  methods: {
    onSearch (value) {
      console.log('箱号:' + value);
      if (value === '') {
        this.$notification.error({
          message: '出错',
          description: '请输入箱号'
        });
        this.container = {};
        return false;
      }
      const params = {};
      params.cntrId = value;
      containerInfo(params).then(response => {
        console.log(response);
        const { flag, data, errMsg } = response;
        if (flag) {
          if (data) {
            this.container = data;
          }

        } else {
          this.$notification.error({
            message: '出错',
            description: '出错信息' + errMsg
          });
        }

      });
    }
  }
}

</script>