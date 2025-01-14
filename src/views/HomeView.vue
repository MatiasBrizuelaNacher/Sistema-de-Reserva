<template>
  <v-main>
    <div class="container">
      <div>
        <SearchRoom v-model="dataSearch"></SearchRoom>
      </div>
      <div class="containerTable">
        <v-data-table :headers="headers" :items="items" item-value="id" ></v-data-table>
      </div>
      <ReservationForm :items="items"></ReservationForm>
    </div>
  </v-main> 
</template>

<script>
import SearchRoom from '@/components/searchRoom.vue';
import salaInfo from '../salaInfoV2.json'
import ReservationForm from '@/components/reservationForm.vue';

export default{
  components:{
    SearchRoom,
    ReservationForm
  },
  data(){
    return{
      dataSearch:{name:'',capacity:null,date:null,time:null},
      //Tabla
      headers: [
          {title:'Sala', value: 'name'},
          {title:'Capacidad', value: 'capacity'},
          {title:'Estado', value: 'state'},
        ],
    }
  },
  computed:{
    items: {
      get(){
        let newInfo=salaInfo.filter(item => item.state='Disponible')
        if (this.dataSearch.name==='' && this.dataSearch.capacity===null && this.dataSearch.date===null && this.dataSearch.time ===null) {
          return newInfo
        }else{
          if (this.dataSearch.name !== '') {
            newInfo = newInfo.filter(item => item.name.toLowerCase().includes(this.dataSearch.name.toLowerCase()))
          }
          if (this.dataSearch.capacity !== null){
            newInfo = newInfo.filter(item => item.capacity >= this.dataSearch.capacity)
          }
          return newInfo
        }
      }
    },
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


