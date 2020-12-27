<template>
  <div>
    <img src="imgUrl" alt="">
  </div>
</template>

<script>
export default {
name: "imgView",
  data(){
    return {
      imgUrl:''
    }
  },
  created() {
   this.imgUrl = this.$route.query.url
  }
}
</script>

<style scoped>

</style>