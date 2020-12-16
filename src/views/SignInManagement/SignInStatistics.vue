<template>
  <div class="signin-statistics">
<a-page-header
      title="签到统计"
      sub-title=""
      @back="() => null"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { PageHeader,Table} from "ant-design-vue";
Vue.use(PageHeader).use(Table);
export default {
    name:"SignInStatistics",
    data(){
        return{
            
        }
    }

}
</script>

<style>

</style>