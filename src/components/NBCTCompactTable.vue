<template>
  <div>
    <div :style="{width:totalWidth}" style="margin:0 auto;">
      <div class="loading" v-show="loading">
        <a-spin size="large" style="margin-top:100px;" />
      </div>
      <div style="margin-top:10px;" v-show="!loading">
        <div style="overflow:hidden;margin-bottom:2px;">
          <div
            v-if="header"
            v-html="header"
            style="float:left;font:bold 15px/20px arial,sans-serif;text-align:left;"
          ></div>
          <div v-if="doFilter" style="float:right;">
            <a-select
              size="small"
              placeholder="过滤列"
              style="width: 120px;margin-left:5px;display:inline-block;"
              @change="handleFilter"
              v-model="filterCol"
            >
              <a-select-option v-for="col in filterColumns" :key="col.dataIndex">{{col.title}}</a-select-option>
            </a-select>
            <a-input
              size="small"
              placeholder="过滤内容"
              style="width:120px;margin-left:5px;display:inline-block;"
              v-model="filterContent"
              @change="handleFilter"
            />
          </div>
        </div>
        <table border="1" style="width:100%;table-layout: fixed;">
          <thead style="background:#80b3ff;">
            <tr>
              <th
                v-for="col in columns"
                :key="col.dataIndex"
                :style="{width:col.width+'px'}"
              >{{col.title}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in curPageRows" :key="row.key">
              <td
                v-for="col in columns"
                :key="col.dataIndex"
                v-html="row[col.dataIndex]"
                :style="cellStyle"
              ></td>
            </tr>
          </tbody>
          <tfoot v-if="footer">
            <tr>
              <td :colspan="columns.length" style="font-size:16px;text-align:left;" v-html="footer"></td>
            </tr>
          </tfoot>
        </table>
        <div v-show="pagination" style="margin-top:10px;">
          <a-pagination
            showSizeChanger
            :pageSize.sync="pageSize"
            :defaultCurrent="1"
            :total="filterRows.length"
            :showTotal="total => `总数： ${total} 条记录`"
            v-model="currentPage"
            style="font-size:13px;"
          >
            <template slot="buildOptionText" slot-scope="props">
              <span>{{props.value}}条/页</span>
            </template>
          </a-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import U from '@/utils/utils.vue';

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      curPageRows: [],
      totalWidth: 0,
      //外部样式
      outerStyle: {
        width: this.totalWidth + 'px',
        margin: '0 auto'
      },
      //格子内容样式
      cellStyle: {
        fontSize: this.fontSize + 'px',
        textAlign: this.textAlign
      },
      doFilter: false, //有无过滤项
      filterCol: '', //过滤列
      filterContent: '', //过滤内容
      filterRows: '' //过滤后的行
    };
  },
  methods: {
    handleFilter() {
      let me = this;
      //过滤内容
      if (!U.isEmpty(me.filterCol) && !U.isEmpty(me.filterContent)) {
        me.filterRows = me.rows.filter(item => {
          return item[me.filterCol].toUpperCase().includes(me.filterContent.toUpperCase());
        });
      } else {
        me.filterRows = me.rows;
      }
      //调整页面内容
      me.adjuestPage();
    },
    adjuestWidth() {
      let me = this;
      if (me.fixedWidth) {
        me.totalWidth = 0;
        me.columns.forEach(col => {
          if (col.width) {
            me.totalWidth += col.width;
          }
        });
        me.totalWidth = me.totalWidth + 'px';
      } else {
        me.totalWidth = '100%';
      }
    },
    adjuestPage() {
      let me = this;
      me.curPageRows = me.filterRows.filter((item, index) => {
        if (index >= (me.currentPage - 1) * me.pageSize && index <= me.currentPage * me.pageSize - 1) {
          return true;
        }
      });
    },
    filter() {
      let me = this;
      if (me.filterColumns && me.filterColumns.length > 0) {
        me.doFilter = true;
        me.filterCol = me.filterColumns[0].dataIndex;
      }
    }
  },
  created() {
    this.adjuestWidth();
    this.filter();
  },
  watch: {
    rows(val) {
      let me = this;
      me.filterRows = val;
      if (!me.pagination) {
        me.curPageRows = val;
      } else {
        me.curPageRows = val.filter((item, index) => {
          if (index <= me.pageSize - 1) {
            return true;
          }
        });
      }
    },
    pageSize() {
      this.adjuestPage();
    },
    currentPage() {
      this.adjuestPage();
    }
  },
  props: {
    //表格列定义
    columns: {
      type: Array,
      default: () => []
    },
    //表格上方标题栏(表格外)
    header: {
      type: String,
      default: ''
    },
    //行内容
    rows: {
      type: Array,
      default: () => []
    },
    //末尾统计内容(表格内)
    footer: {
      type: String,
      default: ''
    },
    //载入标记
    loading: {
      type: Boolean,
      default: false
    },
    //分页
    pagination: {
      type: Boolean,
      default: true
    },
    //固定宽度
    fixedWidth: {
      type: Boolean,
      default: false
    },
    //表格内容字体大小
    fontSize: {
      type: String,
      default: '8'
    },
    //表格内容对齐
    textAlign: {
      type: String,
      default: 'left'
    },
    //过滤项设置
    filterColumns: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
td {
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.loading {
  text-align: center;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
</style>