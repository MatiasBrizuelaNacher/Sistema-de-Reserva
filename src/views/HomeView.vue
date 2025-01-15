<template>
  <v-main>
    <div class="container">
      <div>
        <SearchRoom v-model="dataSearch" :enableTime="true"></SearchRoom>
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
      dataSearch:{name:'',capacity:null, date: this.$store.state.now, timeInit:this.$store.state.now.getHours() +":00", timeEnd: (this.$store.state.now.getHours()+1) +":00"},
      // Tabla
      headers: [
        { title: 'Sala', value: 'name' },
        { title: 'Capacidad', value: 'capacity' },
        { title: 'Estado', value: 'state' },
      ],
    };
  },
  computed: {
    items() {
      let newInfo = [];
      salaInfo.forEach((item) => {
        // Cambio el formato
        const date = this.changeFormat(this.dataSearch.date)

        // Conversión del tiempo
        const timeInitTotal = this.changeTimeNumber(this.dataSearch.timeInit)
        const timeEndTotal = this.changeTimeNumber(this.dataSearch.timeEnd)

        // Busca una coincidencia entre el nombre, fecha y hora de las salas reservadas con la del item
        const isReserved = salaReservada.some((reserva) => {
          const timeInitTotalReserved = this.changeTimeNumber(reserva.timeInit)
          const timeEndTotalReserved = this.changeTimeNumber(reserva.timeEnd)
          return (reserva.nameRoom === item.name && reserva.date === date && timeInitTotal < timeEndTotalReserved && timeEndTotal > timeInitTotalReserved)
        })

        item.state = isReserved ? "Ocupado" : "Disponible"
        newInfo.push(item)
      })

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
  methods: {
    changeFormat(date) {
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const year = date.getFullYear()
      return `${month}/${day}/${year}`
    },
    changeTimeNumber(time) {
      const [hour, minute] = time.split(':').map(Number)
      return hour * 60 + minute
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


