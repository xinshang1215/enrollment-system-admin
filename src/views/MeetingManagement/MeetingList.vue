<template>
  <div class="meeting-list">
<a-page-header
      title="会议列表"
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
    name:"MeetingList",
    data(){
        return{
            
        }
    }

}
</script>

<style>

</style>