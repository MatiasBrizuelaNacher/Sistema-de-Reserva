<template>
    <v-card class="mx-auto" id="card" elevation="5" >
      <v-card-title class="custom-title">Buscar Sala</v-card-title>
        <v-form>
          <v-container fluid>
            <v-row>
              <v-col cols="5">
                <v-text-field :label="labelName" v-model="data.name" variant="solo" ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field :label="labelCapacity" v-model="data.capacity" variant="solo" type="number" ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-date-input :label="labelDate" v-model="data.date" variant="solo" prepend-icon="" prepend-inner-icon="$calendar"></v-date-input>
              </v-col>
              <v-col cols="2">
                <v-text-field variant="solo" v-model="data.time" :active="menu" :label="labelTime" prepend-inner-icon="mdi-clock-time-four-outline" readonly>
                  <v-menu v-model="menu" :close-on-content-click="false" activator="parent" transition="scale-transition">
                    <v-time-picker  v-if="menu" v-model="data.time" full-width format="24hr"></v-time-picker>
                  </v-menu>
                </v-text-field>
              </v-col>
              <v-col cols="1" class="btnLimpiar">
                <v-btn @click="cleanData" color="surface-variant">Limpiar</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form> 
    </v-card>
</template>

<script>
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VTimePicker } from 'vuetify/labs/VTimePicker'


export default{
    components: {
    VDateInput,
    VTimePicker,
  },
  props: ['modelValue'],
  emits: ['update:modelValue'],
  data () {
      return{
      menu:false,
      //Fomulario de Busqueda
      labelName:'Nombre de la Sala',
      labelCapacity:'Capacidad',
      labelDate:'Fecha',
      labelTime:'Hora',
      }
  },
  methods:{
      cleanData(){
      console.log(typeof this.time)
      this.data = { name: '', capacity: null, date: this.$store.state.now,time:this.$store.state.now.getHours() +":00"}
    },
  },
  computed:{
    data:{
      get(){
        return this.modelValue
      },
      set(value){
        this.$emit('update:modelValue', value)
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
