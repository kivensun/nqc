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
      <a-col :span="16"
             :offset="4"
             justify="center">
        <a-skeleton :loading="loading">
          <a-card style="width: 100%">
            <a-row>
              <a-col :span="6"></a-col>

            </a-row>
          </a-card>
        </a-skeleton>
      </a-col>
    </a-row>

  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'cntrainerinfo',
  data () {
    return {
      loading: false,
    }
  }
}

</script>