<template>
  <div>
    <div>
      <h1>在场集卡查询</h1>
      <a-table bordered
               :dataSource="ocs"
               :columns="columns" />
    </div>
  </div>
</template>

<script>
import {yardTruck} from "@/api/publicInfo";

export default {
  data(){
    return {
      columns:[
        {
          title:'车牌号',
          dataIndex:'trnr',
          width: "20%"
        },
        {
          title:'港区编号',
          dataIndex:'trcd',
          width: "20%"
        },
        {
          title:'集卡在港滞留时间(分钟)',
          dataIndex:'delayminutes',
          width: "20%"
        }
      ],
      ocs: [],
    };
  },
  methods: {
    list(){
      //let me=this;//test
      yardTruck().then(res =>{
        let {flag,data, errMsg}=res;
        if(!flag){
          this.$message.error(errMsg);
        }else{
          //console.info(data);
          this.ocs=data.map(function(item,index){
            let oc={}
            oc.key = index;
            oc.trnr = item.trnrwk;
            oc.trcd=item.trcdwk;
            oc.delayminutes= item.delayMinutes;
            return oc;
          });
          //console.log(this.ocs);
        }
      });
      
    }
  },
  mounted () {
    this.list();
  }
};
</script>


<style scoped>
</style>
