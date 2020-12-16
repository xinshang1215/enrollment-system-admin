<template>
  <div class="">
<a-page-header
      title="历史报名表"
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
    name:"ApplyFormList",
    data(){
        return{
            
        }
    }

}
</script>

<style>

</style>