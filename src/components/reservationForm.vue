<template>
    <v-dialog max-width="500" persistent v-model="dialog">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" text="Formilario de Reserva" color="surface-variant" @click="updateRoom"></v-btn>
        </template>
        <v-card>
            <v-card-title>Formulario de Reserva</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="6">
                        <v-text-field variant="solo" label="Nombre" v-model="firtName" :rules="[required]"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field variant="solo" label="Apellido" v-model="lastName" :rules="[required]"></v-text-field>
                    </v-col>  
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field variant="solo" label="Email" placeholder="johndoe@gmail.com" type="email" v-model="email" :rules="[required]"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-select variant="solo" v-model="salaSeleccionada" :items="salasDisponible" label="Seleccionar Sala" :rules="[required]"></v-select>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="dialog = false" color="surface-variant">Cancelar</v-btn>
                <v-btn @click="addReservation" color="surface-variant">Aceptar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    props:['items','info','changeFormat'],
    data(){
        return{
            dialog: false,
            firtName:'',
            lastName:'',
            email:'',
            salaSeleccionada: '',
            salasDisponible:[],
        }
    },
    methods:{
        //Es necesario esta funcion ya que items no se actualiza cuando la lista de la tabla se modifica
        updateRoom(){
            this.salasDisponible = this.items.filter(salas => salas.state === "Disponible").map(sala => sala.name)
        },
        required (value) {
            return !!value || '*Campo Requerido*'
        },
        addReservation(){
            if (this.salaSeleccionada !== '' && this.firtName!=='' && this.lastName!=='' && this.email!=='') {
                let room = this.$store.getters.getRoomsInfo.find(room => room.name === this.salaSeleccionada)
                let newReservation = {idRoom:room.id,name:`${this.firtName}, ${this.lastName}`, email: this.email,date:this.changeFormat(this.info.date), timeInit:this.info.timeInit,timeEnd:this.info.timeEnd}
                console.log(newReservation)
                this.$store.dispatch('addReservationAction',newReservation)
                this.cleanInfo()
                this.dialog = false
            }
        },
        cleanInfo(){
            this.firtName='',
            this.lastName='',
            this.email='',
            this.salaSeleccionada= ''
        }
    },
}
</script>