<template>
  <div class="edit-password">
<a-page-header
      title="修改密码"
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
    name:"EditPassword",
    data(){
        return{

        }
    }

}
</script>

<style>

</style>