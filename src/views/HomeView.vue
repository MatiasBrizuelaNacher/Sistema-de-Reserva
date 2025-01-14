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
import salaInfo from '../salaInfo.json'
import ReservationForm from '@/components/reservationForm.vue';
import salaReservada from '../salaReservada.json'

export default{
  components:{
    SearchRoom,
    ReservationForm
  },
  data(){
    return{
      dataSearch:{name:'',capacity:null, date: this.$store.state.now, time:this.$store.state.now.getHours() +":00"},
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
        let newInfo=[]
        salaInfo.forEach(item => {
          //Cambio el fomato
          const month = String(this.dataSearch.date.getMonth() + 1).padStart(2, '0');  // Mes (enero es 0)
          const day = String(this.dataSearch.date.getDate()).padStart(2, '0');  // Día del mes
          const year = this.dataSearch.date.getFullYear();  // Año
          const date = `${month}/${day}/${year}`;

          //Busca una coincidencia entre el nombre,fecha y hora de la salas reservas con la del item, devuelve true si la encuentra
          const isReserved = salaReservada.some(reserva =>reserva.nameRoom === item.name && reserva.date === date && this.dataSearch.time === reserva.time)

          item.state = isReserved ? "Ocupado" : "Disponible"
          newInfo.push(item)
        })
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


