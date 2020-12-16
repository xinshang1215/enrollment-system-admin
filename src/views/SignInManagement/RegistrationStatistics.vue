<template>
  <div class="registration-statistics">
    <a-page-header title="报名统计" sub-title="【XXX科技大会】" @back="() => null" />
  </div>
</template>

<script>
import Vue from "vue";
import { PageHeader,Table} from "ant-design-vue";
Vue.use(PageHeader).use(Table);
export default {
  name: "RegistrationStatistics",
  data() {
    return {
      columns:[
        {
          title: 'Name',
          dataIndex: 'name',
          sorter: true,
          width: '20%',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          width: '20%',
        }
       
      ]
    };
  },
};
</script>

<style></style>
