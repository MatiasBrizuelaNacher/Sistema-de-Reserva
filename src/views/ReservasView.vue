<template>
  <v-main>
    <div class="container">
      <SearchRoom v-model="dataSearch" :enableTime="false"></SearchRoom>
      <div class="containerTable">
          <v-data-table :headers="headers" :items="items" item-value="id" >
            <template v-slot:[`item.select`]="{ item }">                                  <!-- Revisar v-slot -->
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
import salaReservada from '../salaReservada.json'

export default{
  components:{
    SearchRoom
  },
  data(){
    return{
      dataSearch:{name:'',capacity:null, date: this.$store.state.now},
      //Tabla
      headers: [
        {title:'Reservante', value: 'name'},
        {title:'Sala', value: 'nameRoom'},
        {title:'Capacidad', value: 'capacity'},
        {title:'Fecha', value: 'date'},
        {title:'Horario', value: 'timeTotal'},
        {title:'Seleccionar',value:'select'}
      ],
    }
  },
  methods:{
    changeFormat(date) {
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const year = date.getFullYear()
      return `${month}/${day}/${year}`
    }
  },
  computed:{
    items(){
      let newInfo = salaReservada.map(reservacion => {
        let room = salaInfo.find(sala => sala.id === reservacion.id)
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
          newInfo = newInfo.filter((item) => item.date >= date)
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
