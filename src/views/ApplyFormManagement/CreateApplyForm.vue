<template>
  <div class="create-apply-form">
<a-page-header
      title="创建报名表"
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
    name:"CreateApplyForm",
    data(){
        return{
            
        }
    }

}
</script>

<style>

</style>