<template>
  <div>
    <div class="loading" v-show="loading">
      <a-spin size="large" style="margin-top:100px;" />
    </div>
    <div style="margin-top:10px;" v-show="!loading">
      <div v-if="header" v-html="header" style="font: bold 15px/20px arial,sans-serif;"></div>
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
          <tr v-for="row in rows" :key="row.key">
            <td v-for="col in columns" :key="col.dataIndex" v-html="row[col.dataIndex]"></td>
          </tr>
        </tbody>
        <tfoot v-if="footer">
          <tr>
            <td :colspan="columns.length" style="font-size:16px;" v-html="footer"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
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
    }
  }
};
</script>

<style scoped>
td {
  width: 100%;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 8px;
  text-align: left;
}
.loading {
  text-align: center;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
</style>