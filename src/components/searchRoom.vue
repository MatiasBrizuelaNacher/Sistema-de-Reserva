<template>
    <v-card class="mx-auto" id="card" elevation="5" >
      <v-card-title class="custom-title">Buscar Sala</v-card-title>
        <v-form>
          <v-container fluid>
            <v-row>
              <v-col cols="5">
                <v-text-field :label="labelName" v-model="dataName" variant="solo" ></v-text-field>
              </v-col>
              <v-col cols="3.5">
                <v-text-field :label="labelCapacity" v-model="dataCapacity" variant="solo" type="number" ></v-text-field>
              </v-col>
              <v-col cols="3.5">
                <v-date-input :label="labelDate" v-model="date" variant="solo" prepend-icon="" prepend-inner-icon="$calendar"></v-date-input>
              </v-col>
              <v-col cols="auto" class="btnLimpiar">
                <v-btn @click="cleanData" color="surface-variant">Limpiar</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form> 
        <p>{{ dataName }}</p>
    </v-card>
</template>

<script>
import { VDateInput } from 'vuetify/labs/VDateInput'

export default{
    components: {
    VDateInput,
  },
  props: ['modelValue'],
  emits: ['update:modelValue'],
  data () {
      return{
      //Fomulario de Busqueda
      labelName:'Nombre de la Sala',
      dataCapacity: null,
      labelCapacity:'Capacidad',
      date:null,
      labelDate:'Fecha',
      fechaSeleccionada: null,
      }
  },
  methods:{
      cleanData(){
      this.dataName=''
      this.dataCapacity=null
      this.date=null
    },
  },
  computed:{
    dataName:{
      get(){
        return this.modelValue
      },
      set(value){
        console.log(value)
        this.$emit('update:modelValue', value);
      }
    }
  }
}
</script>

<style>
.custom-title {
  font-size: 20px;
  margin-bottom: -15px;
}
</style>
