<template>
  <v-main>
      <div class="container">
        <SearchRoom v-model="dataSearch" :enableTime="false"></SearchRoom>
        <div class="containerTable">
            <v-data-table :headers="headers" :items="items" item-value="idReservation" >
              <template v-slot:[`item.select`]="{ item }">                                  <!-- Revisar v-slot -->
                <v-checkbox-btn @click="addDeleteReservetion(item)"></v-checkbox-btn>
              </template>
            </v-data-table>
        </div>
        <v-btn text="Eliminar Reserva" color="surface-variant" @click="deleteReservetion"></v-btn>
      </div>
  </v-main>
</template>

<script>
import SearchRoom from '@/components/searchRoom.vue'

export default{
  components:{
    SearchRoom
  },
  props:['changeFormat'],
  data(){
    return{
      listIdReservationToDelete:[],
      dataSearch:{name:'',capacity:null, date: this.$store.getters.getDate},
      //Tabla
      headers: [
        {title:'Reservante', value: 'name'},
        {title:'Email',value: 'email'},
        {title:'Sala', value: 'nameRoom'},
        {title:'Capacidad', value: 'capacity'},
        {title:'Fecha', value: 'date'},
        {title:'Horario', value: 'timeTotal'},
        {title:'Seleccionar',value:'select'}
      ],
    }
  },
  methods:{
    deleteReservetion(){
      this.$store.dispatch('deleteReservationAction',this.listIdReservationToDelete)
    },
    addDeleteReservetion(reservation){
      if(!reservation.select){
        this.listIdReservationToDelete.push(reservation.id)
      }else{
        this.listIdReservationToDelete = this.listIdReservationToDelete.filter(item => item != reservation.id)
      }
      reservation.select= !reservation.select
    }
  },
  computed:{
    items(){
      //Creo un nuevo array agregando propiedades a los objetos
      let newInfo = this.$store.getters.getRoomsReserved.map(reservacion => {
        let room = this.$store.getters.getRoomsInfo.find(sala => sala.id === reservacion.id)
        reservacion.nameRoom = room.name
        reservacion.capacity = room.capacity
        reservacion.timeTotal= `${reservacion.timeInit}-${reservacion.timeEnd}`
        return reservacion
    })
    if (this.dataSearch.name === '' && this.dataSearch.capacity === null && this.dataSearch.date === null) {
        return newInfo
      } else {
        if (this.dataSearch.name !== '') {
          newInfo = newInfo.filter((item) => item.nameRoom.toLowerCase().includes(this.dataSearch.name.toLowerCase()))
        }
        if (this.dataSearch.capacity !== null) {
          newInfo = newInfo.filter((item) => item.capacity >= this.dataSearch.capacity)
        }
        if (this.dataSearch.date !== null) {
          let date = this.changeFormat(this.dataSearch.date)
          newInfo = newInfo.filter((item) => item.date === date)
        }
        return newInfo
      }   
    }
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
