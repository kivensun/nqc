<template>
  <div>
    <a-row type="flex"
           justify="center"
           align="middle">
      <a-col :xs="{span: 19}"
             :sm="{span: 20}"
             :md="{span: 8}"
             :lg="{span: 8}"
             :xl="{span: 8}"
             :xxl="{span: 5}">
        <div style="margin-top:20px;">箱号:</div>
      </a-col>
      <a-col :xs="{span: 19}"
             :sm="{span: 20}"
             :md="{span: 8}"
             :lg="{span: 8}"
             :xl="{span: 8}"
             :xxl="{span: 5}">
        <a-input placeholder="箱号"
                 style="width:100%;margin-top:10px;"
                 v-model="cntrId" />
      </a-col>
      <a-col :xs="{span: 19}"
             :sm="{span: 20}"
             :md="{span: 8}"
             :lg="{span: 8}"
             :xl="{span: 8}"
             :xxl="{span: 5}">
        <a-button type="primary"
                  style="margin-top: 10px"
                  @click="loadData">查 找</a-button>
      </a-col>
    </a-row>

    <a-divider />
    <h3>{{queryTime}}</h3>
    <a-row type="flex"
           justify="center"
           style="margin-top:6px"
           v-if="(yardContainerInfor.cntrId !== '')&&(yardContainerInfor.cntrId !== undefined)">
      <a-col :span="22">
        <a-card title="集装箱在场信息"
                style="text-align: left;">
          <a-row>
            <a-col :xs="{span: 19}"
                   :sm="{span: 11}"
                   :md="{span: 11}"
                   :lg="{span: 12}"
                   :xl="{span: 8}"
                   :xxl="{span: 5}">
              箱号：<span>{{yardContainerInfor.cntrId}}</span>
            </a-col>
            <a-col :xs="{span: 19}"
                   :sm="{span: 13}"
                   :md="{span: 13}"
                   :lg="{span: 12}"
                   :xl="{span: 8}"
                   :xxl="{span: 4}">
              <span>箱主：{{yardContainerInfor.lncd}}</span>
            </a-col>
            <a-col :xs="{span: 19}"
                   :sm="{span: 11}"
                   :md="{span: 11}"
                   :lg="{span: 12}"
                   :xl="{span: 8}"
                   :xxl="{span: 4}">
              <span>尺码类型：{{yardContainerInfor.ctszty}}</span>
            </a-col>
            <a-col :xs="{span: 19}"
                   :sm="{span: 13}"
                   :md="{span: 13}"
                   :lg="{span: 12}"
                   :xl="{span: 8}"
                   :xxl="{span: 6}">
              <span>船名航次：{{yardContainerInfor.vscdvy}}</span>
            </a-col>
            <a-col :xs="{span: 19}"
                   :sm="{span: 12}"
                   :md="{span: 12}"
                   :lg="{span: 12}"
                   :xl="{span: 8}"
                   :xxl="{span: 4}">
              <span>重/空：{{yardContainerInfor.infe}}</span>
            </a-col>
          </a-row>
          <a-divider />
          <a-row>
            <a-col :xs="{span: 19}"
                   :sm="{span: 11}"
                   :md="{span: 11}"
                   :lg="{span: 12}"
                   :xl="{span: 8}"
                   :xxl="{span: 5}">
              <p>总重：{{yardContainerInfor.ctgw}}</p>
            </a-col>
            <a-col :xs="{span: 19}"
                   :sm="{span: 13}"
                   :md="{span: 13}"
                   :lg="{span: 12}"
                   :xl="{span: 8}"
                   :xxl="{span: 4}">
              <p>铅封号：{{yardContainerInfor.ctsn}}</p>
            </a-col>
            <a-col :xs="{span: 19}"
                   :sm="{span: 11}"
                   :md="{span: 11}"
                   :lg="{span: 12}"
                   :xl="{span: 8}"
                   :xxl="{span: 4}">
              <p>装/卸港：{{yardContainerInfor.ptldds}}</p>
            </a-col>
            <a-col :xs="{span: 19}"
                   :sm="{span: 13}"
                   :md="{span: 13}"
                   :lg="{span: 12}"
                   :xl="{span: 8}"
                   :xxl="{span: 6}">
              <p>目的地：{{yardContainerInfor.fdcd}}</p>
            </a-col>

          </a-row>
          <a-divider />
          <a-row>
            <a-col :xs="{span: 19}"
                   :sm="{span: 11}"
                   :md="{span: 11}"
                   :lg="{span: 12}"
                   :xl="{span: 8}"
                   :xxl="{span: 5}">
              <p>坏箱：{{yardContainerInfor.indm}}</p>
            </a-col>
            <a-col :xs="{span: 19}"
                   :sm="{span: 11}"
                   :md="{span: 11}"
                   :lg="{span: 12}"
                   :xl="{span: 8}"
                   :xxl="{span: 4}">
              <p>危险品：{{yardContainerInfor.inhz}}</p>
            </a-col>
            <a-col :xs="{span: 19}"
                   :sm="{span: 13}"
                   :md="{span: 13}"
                   :lg="{span: 12}"
                   :xl="{span: 8}"
                   :xxl="{span: 6}">
              <p>温控箱：{{yardContainerInfor.inth}}</p>
            </a-col>
            <a-col :xs="{span: 19}"
                   :sm="{span: 12}"
                   :md="{span: 12}"
                   :lg="{span: 12}"
                   :xl="{span: 8}"
                   :xxl="{span: 4}">
              <p>超限箱：{{yardContainerInfor.inog}}</p>
            </a-col>
          </a-row>
          <a-divider />
          <a-row>
            <a-col :xs="{span: 19}"
                   :sm="{span: 11}"
                   :md="{span: 11}"
                   :lg="{span: 12}"
                   :xl="{span: 8}"
                   :xxl="{span: 5}">
              <p>堆场位置：{{yardContainerInfor.pos}} </p>
            </a-col>
            <a-col :xs="{span: 19}"
                   :sm="{span: 11}"
                   :md="{span: 11}"
                   :lg="{span: 12}"
                   :xl="{span: 8}"
                   :xxl="{span: 4}">
              <p>货代公司：{{yardContainerInfor.caag}}</p>
            </a-col>
            <a-col :xs="{span: 19}"
                   :sm="{span: 13}"
                   :md="{span: 13}"
                   :lg="{span: 12}"
                   :xl="{span: 8}"
                   :xxl="{span: 6}">
              <p>内外贸标志：{{yardContainerInfor.intd}}</p>
            </a-col>
          </a-row>
          <a-divider />
          <a-row>
            <a-col span="24">
              <p>备注：</p>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-row type="flex"
           justify="center"
           style="margin-top:6px">
      <a-col :span="22">
        <a-card title="集装箱历史信息"
                style="text-align:left;">
          <a-list :dataSource="listCntrHis"
                  itemLayout="vertical">
            <a-list-item slot="renderItem"
                         slot-scope="item"
                         key="item.title">
              <template slot="actions">
                <span key="detail">
                  <a-icon type="book"
                          style="margin-right: 8px" />
                  <a-button type="link"
                            @click="getCntrHisDetail(item.accd,item.jbnr,item.jbns)">明细信息</a-button>
                </span>
                <span key="cabl">
                  <a-icon type="hdd"
                          style="margin-right: 8px" />
                  <a-button type="link"
                            @click="getCntrHisCabl(item.accd,item.jbnr,item.jbns,item.vscdvy)">提单信息</a-button>
                </span>
              </template>

              <a-list-item-meta>
                <a slot="title"
                   href="#">
                  <span>操作时间:{{item.dttr}}</span>
                </a>
                <a-avatar slot="avatar"
                          size="large"
                          style="color: #000000; backgroundColor: #f6ad3c;"
                          shape="square">
                  {{item.opcd}}
                </a-avatar>
                <p slot="description">
                  <a-row>
                    <a-col :xs="{span: 19}"
                           :sm="{span: 20}"
                           :md="{span: 14}"
                           :lg="{span: 12}"
                           :xl="{span: 8}"
                           :xxl="{span: 6}">
                      <p>船名航次:{{item.vscdvy}}</p>
                    </a-col>
                    <a-col :xs="{span: 19}"
                           :sm="{span: 20}"
                           :md="{span: 14}"
                           :lg="{span: 12}"
                           :xl="{span: 6}"
                           :xxl="{span: 6}">
                      <p>作业号:{{item.acjns}}</p>
                    </a-col>
                    <a-col :xs="{span: 12}"
                           :sm="{span: 12}"
                           :md="{span: 14}"
                           :lg="{span: 12}"
                           :xl="{span: 6}"
                           :xxl="{span: 6}">
                      <p>贸易:{{item.cnintd}}</p>
                    </a-col>
                    <a-col :xs="{span: 12}"
                           :sm="{span: 12}"
                           :md="{span: 10}"
                           :lg="{span: 12}"
                           :xl="{span: 6}"
                           :xxl="{span: 6}">
                      <p>操作用户:{{item.opuser}}</p>
                    </a-col>
                  </a-row>
                </p>
              </a-list-item-meta>

            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
    <a-modal title="集装箱历史明细信息"
             v-model="detailVisible"
             :width="800"
             :footer="null">
      <div style="text-align: left;">
        <a-row>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 6}">
            <p>箱号：{{cntrHisDetail.cntrId}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 13}"
                 :md="{span: 13}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 5}">
            <p>该作业操作者：{{cntrHisDetail.opuser}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 5}">
            <p>作业号：{{cntrHisDetail.acjnns}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 13}"
                 :md="{span: 13}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 7}">
            <p>箱主：{{cntrHisDetail.lncd}}</p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 6}">
            <p>操作：{{cntrHisDetail.opcd}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 13}"
                 :md="{span: 13}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 5}">
            <p>船名/航次：{{cntrHisDetail.vsvy}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 5}">
            <p>尺码/类型：{{cntrHisDetail.ctszty}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 6}">
            <p>重量：{{cntrHisDetail.wt}}</p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 6}">
            <p>重/空：{{cntrHisDetail.infe}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 13}"
                 :md="{span: 13}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 5}">
            <p>装/卸港：{{cntrHisDetail.plds}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 5}">
            <p>铅封号：{{cntrHisDetail.ctsn}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 6}">
            <p>坏箱：{{cntrHisDetail.indm}}</p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 6}">
            <p>目的地：{{cntrHisDetail.fnpt}} </p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 5}">
            <p>装箱地点：{{cntrHisDetail.zxdd}}</p>
          </a-col>
          <a-col :xs="{span: 23}"
                 :sm="{span: 23}"
                 :md="{span: 23}"
                 :lg="{span: 24}"
                 :xl="{span: 14}"
                 :xxl="{span: 13}">
            <p>货代公司：{{cntrHisDetail.caag}}</p>
          </a-col>

        </a-row>
        <a-row>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 6}">
            <p>集卡：{{cntrHisDetail.trcd}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 5}">
            <p>备注：{{cntrHisDetail.rmks}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 5}">
            <p>进箱方式：{{cntrHisDetail.inway}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 6}">
            <p>船箱位：{{cntrHisDetail.vsba}} </p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="{span: 19}"
                 :sm="{span: 19}"
                 :md="{span: 19}"
                 :lg="{span: 19}"
                 :xl="{span: 19}"
                 :xxl="{span: 19}">
            <p>堆场位置：{{cntrHisDetail.yd}}</p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 6}">
            <p>装船日期：{{cntrHisDetail.dtld}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 5}">
            <p>卸船日期：{{cntrHisDetail.dtds}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 5}">
            <p>预进日期：{{cntrHisDetail.dtpe}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 6}">
            <p>进门日期：{{cntrHisDetail.dtgi}}</p>
          </a-col>
        </a-row>

        <a-row>
          <a-col :xs="{span: 19}"
                 :sm="{span: 23}"
                 :md="{span: 23}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 6}">
            <p>龙门吊作业日期：{{cntrHisDetail.dtrg}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 6}">
            <p>出门日期：{{cntrHisDetail.dtgo}}</p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 6}">
            <p>危险品：{{cntrHisDetail.inhz}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 5}">
            <p>温控箱：{{cntrHisDetail.inth}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 4}">
            <p>超限箱：{{cntrHisDetail.inog}}</p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 6}">
            <p>海关放行者：{{cntrHisDetail.imuser}}</p>
          </a-col>

          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 8}">
            <p>海关放行号：{{cntrHisDetail.imctps}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 23}"
                 :md="{span: 23}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 8}">
            <p>放行日期及时间：{{cntrHisDetail.imdt}}</p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 6}">
            <p>内外贸标志：{{cntrHisDetail.intd}}</p>
          </a-col>
          <a-col :xs="{span: 19}"
                 :sm="{span: 11}"
                 :md="{span: 11}"
                 :lg="{span: 12}"
                 :xl="{span: 8}"
                 :xxl="{span: 16}">
            <p>龙门吊编号及称重：{{cntrHisDetail.lmd}}</p>
          </a-col>
        </a-row>
      </div>
    </a-modal>

    <a-modal title="集装箱提单信息"
             v-model="cablVisible"
             :footer="null">
      <div style="text-align: left;">
        <a-row>
          <a-col :span="11">
            <p>箱号：{{cablInfo.cntrId}}</p>
          </a-col>
          <a-col :span="11">
            <p> 船名航次：{{cablInfo.vsvy}} </p>
          </a-col>
          <a-table :columns="cablColumns"
                   :dataSource="cablData"
                   bordered>
          </a-table>

        </a-row>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { getYardContainerInfo, getContainerHisList, getContainerHisDetail, getContainerHisCabl } from '@/api/containerInfo'

function getDateTimeString (dt, tm) {
  let str = '';
  if (dt !== '0') {
    str = dt.slice(0, 4) + '-' +
      dt.slice(4, 6) + '-' +
      dt.slice(6) + ' ' +
      tm.slice(0, 2) + ':' +
      tm.slice(2, 4) + ':' +
      tm.slice(4);
  } else {
    str = '';
  }
  return str;
}
export default {

  data () {
    return {
      cntrId: '',
      cardTitle: '',
      queryTime: '',
      detailVisible: false,
      cablVisible: false,
      listCntrHis: [],
      cablColumns: [
        {
          title: '提单号',
          dataIndex: 'cabl',
          key: '1',
        },
        {
          title: '货类',
          dataIndex: 'cacd',
          key: '2',
        },
        {
          title: '体积',
          dataIndex: 'cacm',
          key: '3',
        }, {
          title: '件数',
          dataIndex: 'capq',
          key: '4',
        },
        {
          title: '票重',
          dataIndex: 'cawt',
          key: '5',
        }, {
          title: ' 货代',
          dataIndex: 'caag',
          key: '6',
        }

      ],
      cablData: [],
      cablInfo: {},
      yardContainerInfor: {
        cntrId: '',
        lncd: '',
        ctszty: '',
        vscdvy: '',
        infe: '',
        ctgw: '',
        ctsn: '',
        ptldds: '',
        fdcd: '',
        indm: '',
        inhz: '',
        inth: '',
        inog: '',
        pos: '',
        caag: '',
        intd: ''
      },
      cntrHisDetail: {
        cntrId: '',
        opuser: '',
        acjnns: '',
        lncd: '',
        opcd: '',
        vsvy: '',
        ctszty: '',
        wt: '',
        infe: '',
        plds: '',
        ctsn: '',
        indm: '',
        fnpt: '',
        zxdd: '',
        caag: '',
        trcd: '',
        rmks: '',
        inway: '',
        vsba: '',
        yd: '',
        dtld: '',
        dtds: '',
        dtpe: '',
        dtgi: '',
        dtrg: '',
        dtgo: '',
        inhz: '',
        inth: '',
        inog: '',
        imuser: '',
        imctps: '',
        imdt: '',
        intd: '',
        lmd: ''
      }

    }
  },
  methods: {
    loadData () {
      let params = {};
      params.cntrid = this.cntrId;
      getYardContainerInfo(params).then(res => {
        let { flag, data } = res;
        if (flag) {
          if (data) {
            this.yardContainerInfor.cntrId = data.cntrId;
            this.yardContainerInfor.lncd = data.lncd;
            this.yardContainerInfor.ctszty = data.ctsz + '/' + data.ctty;
            this.yardContainerInfor.vscdvy = data.vscd.trim() + '/' + data.vsvy.trim() + ' - ' + data.vsdr.trim();
            this.yardContainerInfor.infe = data.infe;
            this.yardContainerInfor.ctgw = data.ctgw;
            this.yardContainerInfor.ctsn = data.ctsn;
            this.yardContainerInfor.ptldds = data.ptld ? data.ptld : ''
              + '/' + data.ptds ? data.ptds : '';
            this.yardContainerInfor.fdcd = data.fdcd;
            this.yardContainerInfor.indm = data.indm;
            this.yardContainerInfor.inhz = data.inhz;
            this.yardContainerInfor.inth = data.inth;
            this.yardContainerInfor.inog = data.inog;
            this.yardContainerInfor.pos = data.ydst + ' ' + data.ydrw + ' ' + data.ydln + ' ' + data.ydel;
            this.yardContainerInfor.caag = data.caag;
            this.yardContainerInfor.intd = data.intd;
          } else {
            this.yardContainerInfor = {};
          }
        } else {
          this.yardContainerInfor = {};
        }
      });
      console.log(this.yardContainerInfor);

      getContainerHisList(params).then(res => {
        let { flag, data } = res;
        if (flag) {
          if (data) {
            this.listCntrHis = data.map(item => {
              let tmp = {};
              tmp.dttr = item.dttr + ' ' + item.tmtr;
              tmp.acjns = item.accd + ' ' + item.jbnr + ' ' + item.jbns;
              tmp.opcd = item.opcd;
              tmp.cnintd = item.intd;
              tmp.opuser = item.opuser;
              tmp.vscdvy = item.vscd.trim() + '/' + item.vsvy.trim() + ' - ' + item.vsdr.trim();
              tmp.accd = item.accd;
              tmp.jbnr = item.jbnr;
              tmp.jbns = item.jbns;
              return tmp;
            })
          } else {
            this.listCntrHis = [];
          }
        } else {
          this.listCntrHis = [];
        }
      });

    },
    getCntrHisDetail (accd, jbnr, jbns) {
      console.log(accd, jbnr, jbns);
      let params = {};
      params.accd = accd;
      params.jbnr = jbnr;
      params.jbns = jbns;
      getContainerHisDetail(params).then(res => {
        let { flag, data } = res;
        if (flag) {
          if (data) {
            this.cntrHisDetail.cntrId = data.cntrId;
            this.cntrHisDetail.opuser = data.opuser + ' / ' + data.usr2;
            this.cntrHisDetail.ctsn = data.ctsn;
            this.cntrHisDetail.indm = data.indm;
            this.cntrHisDetail.fnpt = data.fdcd;
            this.cntrHisDetail.zxdd = '';
            this.cntrHisDetail.caag = data.caag;
            this.cntrHisDetail.trcd = data.trcd;
            this.cntrHisDetail.rmks = data.rmks;
            this.cntrHisDetail.inway = data.inway;
            this.cntrHisDetail.vsba = data.vsba + ' ' + data.vscl + ' ' + data.vsel;
            this.cntrHisDetail.yd = data.ydst + ' ' + data.ydrw + ' ' + data.ydln + ' ' + data.ydel;
            this.cntrHisDetail.acjnns = data.accd + ' ' + data.jbnr + ' ' + data.jbns;
            this.cntrHisDetail.dtld = getDateTimeString(data.dtld, data.tmld);
            this.cntrHisDetail.dtds = getDateTimeString(data.dtds, data.tmds);
            this.cntrHisDetail.dtpe = getDateTimeString(data.dtpe, data.tmpe);
            this.cntrHisDetail.dtgi = getDateTimeString(data.dtgi, data.tmgi);
            this.cntrHisDetail.dtrg = getDateTimeString(data.dtrg, data.tmrg);
            this.cntrHisDetail.dtgo = getDateTimeString(data.dtgo, data.tmgo);
            this.cntrHisDetail.inhz = data.inhz;
            this.cntrHisDetail.inth = data.inth;
            this.cntrHisDetail.inog = data.inog;
            this.cntrHisDetail.imuser = data.imuser;
            this.cntrHisDetail.lncd = data.lncd;
            this.cntrHisDetail.imctps = data.imctps;
            this.cntrHisDetail.imdt = data.imdt;
            this.cntrHisDetail.intd = data.intd;
            this.cntrHisDetail.lmd = data.ydeq + "/" + data.wtlm;
            this.cntrHisDetail.opcd = data.opcd;
            this.cntrHisDetail.vsvy = data.vscd.trim() + '/' + data.vsvy.trim() + ' - ' + data.vsdr.trim();
            this.cntrHisDetail.ctszty = data.ctsz + '/' + data.ctty;
            this.cntrHisDetail.wt = data.ctgw + "/" + data.ctnw + '(KG)';
            this.cntrHisDetail.infe = data.infe === 'F' ? '重箱' : '空箱';
            this.cntrHisDetail.plds = data.ptld + '/' + data.ptds;
          } else {
            this.cntrHisDetail = {};
          }
        } else {
          this.cntrHisDetail = {};
        }

      });
      this.detailVisible = true;

    },
    getCntrHisCabl (accd, jbnr, jbns, vsvy) {
      console.log(accd, jbnr, jbns);
      let params = {};
      params.accd = accd;
      params.jbnr = jbnr;
      params.jbns = jbns;
      getContainerHisCabl(params).then(res => {
        let { flag, data } = res;
        if (flag) {
          if (data) {
            this.cablInfo.vsvy = vsvy;
            this.cablInfo.cntrId = this.cntrId;
            this.cablData = data.map((item, index) => {
              let tmp = {};
              tmp.key = index;
              tmp.cabl = item.cabl;
              tmp.cacd = item.cacd;
              tmp.cacm = item.cacm;
              tmp.capq = item.capq;
              tmp.cabl = item.cabl;
              tmp.cawt = item.cawt;
              tmp.caag = item.caag;

              return tmp;
            });
          } else {
            this.cablData = [];
          }
        } else {
          this.cablData = [];
        }
      });
      this.cablVisible = true;

    }


  }
}
</script>

<style>
</style>