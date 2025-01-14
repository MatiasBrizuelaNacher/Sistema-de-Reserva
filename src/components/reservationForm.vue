<template>
    <v-dialog max-width="500" persistent @click="updateRoom">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" text="Formilario de Reserva" color="surface-variant"></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card>
                <v-card-title>Formulario de Reserva</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field variant="solo" label="Nombre"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field variant="solo" label="Apellido"></v-text-field>
                        </v-col>  
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field variant="solo" label="Email" placeholder="johndoe@gmail.com" type="email"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-select variant="solo" v-model="salaSeleccionada" :items="salasDisponible" label="Seleccionar Sala"></v-select>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="isActive.value = false" color="surface-variant">Cancelar</v-btn>
                    <v-btn @click="isActive.value = false" color="surface-variant">Aceptar</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
export default {
    props:['items'],
    data(){
        return{
            salaSeleccionada: '',
            salasDisponible:[],
        }
    },
    methods:{
        //Es necesario esta funcion ya que items no se actualiza cuando la lista de la tabla se modifica
        updateRoom(){
            this.salasDisponible = this.items.filter(salas => salas.state === "Disponible").map(sala => sala.name)
        }
    }
    }
</script>