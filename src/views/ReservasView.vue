<template>
  <v-main>
    <div class="container">
      <SearchRoom></SearchRoom>
    </div>
  </v-main>
</template>

<script>
import SearchRoom from '@/components/searchRoom.vue';

export default{
  components:{
    SearchRoom
  }
}
</script>

<style>
    .container{
    justify-content: center;
    align-items: center;
    margin: 100px;
    margin-top: 20px;
  }
</style>
