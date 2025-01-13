<template>
  <v-main>
    <div class="container">
      <div>
        <SearchRoom v-model="dataSearch"></SearchRoom>
      </div>
      <div class="containerTable">
        <v-data-table :search="dataSearch.name" :headers="headers" :items="items" item-value="id" ></v-data-table>
      </div>
      <ReservationForm :items="items"></ReservationForm>
    </div>
  </v-main> 
</template>

<script>
import SearchRoom from '@/components/searchRoom.vue';
import salaInfo from '../salaInfo.json'
import ReservationForm from '@/components/reservationForm.vue';

export default{
  components:{
    SearchRoom,
    ReservationForm
  },
  data(){
    return{
      dataSearch:{name:'',capacity:null,date:null},
      //Tabla
      headers: [
          {title:'Sala', value: 'name'},
          {title:'Capacidad', value: 'capacity'},
          {title:'Estado', value: 'state'},
        ],
        items:salaInfo
    }
  },
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


