<template>
  <v-main>
    <div class="container">
      <SearchRoom v-model="dataSearch"></SearchRoom>
      <div class="containerTable">
          <v-data-table :headers="headers" :items="items" item-value="id" >
            <template v-slot:[`item.select`]="{ item }">
              <v-checkbox-btn @click="item.select = !item.select"></v-checkbox-btn>
            </template>
          </v-data-table>
      </div>
      <v-btn text="Eliminar Reserva" color="surface-variant"></v-btn>
    </div>
  </v-main>
</template>

<script>
import SearchRoom from '@/components/searchRoom.vue';
import salaInfo from '../salaInfo.json'

export default{
  data(){
    return{
      dataSearch:{name:'',capacity:null, date: this.$store.state.now, time:this.$store.state.now.getHours() +":00"},
      //Tabla
      headers: [
        {title:'Sala', value: 'name'},
        {title:'Capacidad', value: 'capacity'},
        {title:'Estado', value: 'state'},
        {title:'Seleccionar', value: 'select'}
      ],
      items:salaInfo
    }
  },
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
  .containerTable{
    padding-top: 1%;
  }
</style>
