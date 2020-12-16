<template>
  <div class="edit-account-info">
<a-page-header
      title="账号信息"
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
    name:"EditAccountInfo",
    data(){
        return{
            
        }
    }

}
</script>

<style>

</style>