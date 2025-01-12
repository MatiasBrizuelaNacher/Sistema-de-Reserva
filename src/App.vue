<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>Sistema de Reservas</v-app-bar-title>
      <router-link to='/'>
        <button class="btnTopBar">Home</button>
      </router-link>
      <v-divider vertical></v-divider>
      <router-link to='/Reservas'>
        <button class="btnTopBar">Reservas</button>
      </router-link>
    </v-app-bar>
    <router-view/>
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

</style>
<script>


export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
