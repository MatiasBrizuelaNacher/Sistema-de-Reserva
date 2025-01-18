<template>
  <v-app>
    <v-app-bar scroll-behavior="hide" scroll-threshold="0">
      <v-app-bar-title class="TitlePag" >Sistema de Reservas</v-app-bar-title>
      <router-link to='/'>
        <button class="btnTopBar">Home</button>
      </router-link>
      <v-divider vertical></v-divider>
      <router-link to='/reservas'>
        <button class="btnTopBar">Reservas</button>
      </router-link>
    </v-app-bar>
    <router-view :changeFormat="changeFormat" :changeTimeNumber="changeTimeNumber"/>
  </v-app>
</template>

<style>
.btnTopBar{
  height: 100%;
  padding: 10px 16px;
  min-width: 100px;
  color: black;
}

.btnTopBar:hover{
  font-weight:bold;
}

.TitlePag{
  font-size: 20px; 
  font-weight: bold;
}
</style>
<script>

export default {
  methods:{
    changeFormat(date) {
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const year = date.getFullYear()
      return `${month}/${day}/${year}`
    },
    changeTimeNumber(time) {
      const [hour, minute] = time.split(':').map(Number)
      return hour * 60 + minute
    }
  }
}
</script>
