<template>
  <v-main>
    <img class="imagen" :src="require('../assets/imagen/Study-room-books_2880x1800.jpg')">
    <div class="divSearchRoom">
      <SearchRoom v-model="dataSearch" :enableTime="true" ></SearchRoom>
    </div>
    <div class="containerTable">
      <div>
        <v-data-table :headers="headers" :items="items" item-value="id" ></v-data-table>
        <ReservationForm :items="items" :info="dataSearch" :changeFormat="changeFormat"></ReservationForm>
      </div>
    </div>
  </v-main> 
</template>

<script>
import SearchRoom from '@/components/searchRoom.vue'
import ReservationForm from '@/components/reservationForm.vue'

export default{
  components:{
    SearchRoom,
    ReservationForm
  },
  props:['changeFormat', 'changeTimeNumber'],
  data(){
    return{
      dataSearch:{name:'',capacity:null, date: this.$store.getters.getDate, timeInit:this.$store.getters.getDate.getHours() +":00", timeEnd: (this.$store.getters.getDate.getHours()+1) +":00"},
      // Tabla
      headers: [
        { title: 'Sala', value: 'name' },
        { title: 'Capacidad', value: 'capacity' },
        { title: 'Estado', value: 'state' },
      ],
    };
  },
  computed: {
    prueba:{
      get(){
        return this.$store.state.prueba
      },
      set(value){
        this.$store.state.prueba = value
      }
    },
    items() {
      let newInfo = []
      this.$store.getters.getRoomsInfo.forEach((item) => {
        // Cambio el formato
        const date = this.changeFormat(this.dataSearch.date)

        // Conversión del tiempo
        const timeInitTotal = this.changeTimeNumber(this.dataSearch.timeInit)
        const timeEndTotal = this.changeTimeNumber(this.dataSearch.timeEnd)

        // Busca una coincidencia entre el nombre, fecha y hora de las salas reservadas con la del item
        const isReserved = this.$store.state.roomsReserved.some((reserva) => {
          const timeInitTotalReserved = this.changeTimeNumber(reserva.timeInit)
          const timeEndTotalReserved = this.changeTimeNumber(reserva.timeEnd)
          return (reserva.idRoom === item.id && reserva.date === date && timeInitTotal < timeEndTotalReserved && timeEndTotal > timeInitTotalReserved)
        })

        item.state = isReserved ? "Ocupado" : "Disponible"
        newInfo.push(item)
      })

      //Filtrado
      if (this.dataSearch.name === '' && this.dataSearch.capacity === null) {
        return newInfo
      } else {
        if (this.dataSearch.name !== '') {
          newInfo = newInfo.filter((item) => item.name.toLowerCase().includes(this.dataSearch.name.toLowerCase()))
        }
        if (this.dataSearch.capacity !== null) {
          newInfo = newInfo.filter((item) => item.capacity >= this.dataSearch.capacity)
        }
        return newInfo
      }
    },
  },
}
</script>

<style>
.imagen{
  width: 100%;
  height: 300px;
  object-fit: cover;
  filter: blur(1px);
}

.divSearchRoom{
  position: relative;
  top: -80px;
  left: 50%; /* Mueve el elemento hasta el 50% del ancho del contenedor */
  transform: translateX(-50%);
  width: 90%;
}

.containerTable{
  height: 700px;
  margin: -3% 10% 3% 10%;
}
</style>

