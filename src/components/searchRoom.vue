<template>
    <v-card class="mx-auto" id="card" elevation="5" >
      <v-card-title class="custom-title">Buscar Sala</v-card-title>
        <v-form>
          <v-container fluid>
            <v-row>
              <v-col cols="3">
                <v-text-field :label="labelName" v-model="data.name" variant="solo" ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field :label="labelCapacity" v-model="data.capacity" variant="solo" type="number" ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-date-input :label="labelDate" v-model="data.date" variant="solo" prepend-icon="" prepend-inner-icon="$calendar"></v-date-input>
              </v-col>
              <v-col cols="2">
                <v-text-field variant="solo" v-model="data.timeInit" :active="menu" :label="labelTimeInit" prepend-inner-icon="mdi-clock-time-four-outline" readonly :disabled="enableTimePicker">
                  <v-menu v-model="menu" :close-on-content-click="false" activator="parent" transition="scale-transition">
                    <v-card>
                      <v-time-picker v-model="timeInit" full-width format="24hr" min="06:00" max="21:00"></v-time-picker>
                      <v-card-actions>
                        <v-spacer/>
                        <v-btn @click="close" :disabled="enableBtn" variant="text" >Cancelar</v-btn>
                        <v-btn @click="closeOk" :disabled="enableBtn" variant="text">OK</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field variant="solo" v-model="data.timeEnd" :active="menu2" :label="labelTimeEnd" prepend-inner-icon="mdi-clock-time-four-outline" :disabled="enableTimePicker" readonly>
                  <v-menu v-model="menu2" :close-on-content-click="false" activator="parent" transition="scale-transition">
                    <v-card>
                      <v-time-picker v-model="timeEnd" full-width format="24hr" :min="minTime"></v-time-picker>
                      <v-card-actions>
                        <v-spacer/>
                        <v-btn @click="close" :disabled="enableBtn" variant="text">Cancelar</v-btn>
                        <v-btn @click="closeOk" :disabled="enableBtn" variant="text">OK</v-btn>
                      </v-card-actions>
                    </v-card>
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
  props: ['modelValue','enableTime'],
  emits: ['update:modelValue'],
  data () {
      return{
      //Time Picker      
      timeInit:'',
      timeEnd:'',
      menu:false,
      menu2:false,
      //Fomulario de Busqueda
      labelName:'Nombre de la Sala',
      labelCapacity:'Capacidad',
      labelDate:'Fecha',
      labelTimeInit:'Hora de Inicio',
      labelTimeEnd:'Hora de Finalizacion',
      }
  },
  methods:{
      cleanData(){
      if(this.enableTime){
        this.data = { name: '', capacity: null, date: this.$store.getters.getDate, timeInit:this.$store.getters.getDate.getHours() +":00", timeEnd: (this.$store.getters.getDate.getHours()+1) +":00"}
      }else{
        this.data = { name: '', capacity: null, date:null}
      }      
    },
    close(){
      this.timeInit=''
      this.timeEnd=''
      this.menu=false
      this.menu2=false
    },
    closeOk(){
      if(this.timeInit !== ''){
        this.data.timeInit=this.timeInit
        const [hours,minutes] = this.data.timeInit.split(':').map(Number)
        if (minutes >=10 && hours >=10) {
          this.data.timeEnd= `${hours+1}:${minutes}`
        }else{
          if (minutes <=10 && hours >=10) {
            this.data.timeEnd= `${hours+1}:0${minutes}`
          }
          if (minutes >=10 && hours <=10) {
            this.data.timeEnd= `0${hours+1}:${minutes}`
          }
          if (minutes <=10 && hours <=10) {
            this.data.timeEnd= `0${hours+1}:0${minutes}`
          }
        }
      }  
      if(this.timeEnd !== '') this.data.timeEnd=this.timeEnd
      this.close()
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
    },
    enableBtn:{
      get(){
        return this.timeInit !== '' || this.timeEnd !== ''? false : true
      }
    },
    enableTimePicker:{
      get(){
        return !this.enableTime
      }
    },
    minTime() {
      const [hours,minutes] = this.data.timeInit.split(':').map(Number)
      return `${hours+1}:${minutes}`
    },
  }
}

</script>

<style>
.custom-title {
  font-size: 20px;
  margin-bottom: -15px;
}
</style>
