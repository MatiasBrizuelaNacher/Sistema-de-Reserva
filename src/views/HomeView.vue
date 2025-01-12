<template>
  <v-main>
    <div class="container">
      <div>
        <v-card class="mx-auto"  title="Buscar Sala" id="card">
          <v-form>
          <v-container fluid>
            <v-row>
              <v-col cols="5">
                <v-text-field variant="solo" :label="labelName" v-model="dateName"></v-text-field>
              </v-col>
              <v-col cols="3.5">
                <v-text-field :label="labelCapacity" v-model="dateCapacity" variant="solo" type="number" ></v-text-field>
              </v-col>
              <v-col cols="3.5">
                <v-date-input :label="labelDay" v-model="dateDay" variant="solo"></v-date-input>
              </v-col>
              <v-col cols="auto" class="btnLimpiar">
                <v-btn @click="cleanData">Limpiar</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
      </div>
      <p>{{ dateDay }}</p>
      <div>
        <v-data-table :headers="headers" :items="items" item-value="id"></v-data-table>
      </div>
    </div>
  </v-main>  
</template>

<script>
import { VDateInput } from 'vuetify/labs/VDateInput'
import salaInfo from '../salaInfo.json'

  export default{
    components: {
    VDateInput,
  },
    data () {
      return{
        //Fomulario de Busqueda
        dateName:'',
        labelName:'Nombre de la Sala',
        dateCapacity: null,
        labelCapacity:'Capacidad',
        dateDay:null,
        labelDay:'Fecha',
        fechaSeleccionada: null,

        //Tabla
        headers: [
          {title:'Sala', value: 'name'},
          {title:'Capacidad', value: 'capacity'},
          {title:'Estado', value: 'state'},
          {title:'Reservar', value: 'actions', sortable: false}
        ],
        items: salaInfo
      }
    },
    methods:{
      cleanData(){
        this.dateName=''
        this.dateCapacity=null
        this.dateDay=null
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
</style>


