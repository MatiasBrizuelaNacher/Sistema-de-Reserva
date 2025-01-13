<template>
    <v-dialog max-width="500">
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
                        <v-col cols="6">
                            <v-date-input label="Fecha" variant="solo" prepend-icon="" prepend-inner-icon="$calendar"></v-date-input>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field variant="solo" v-model="time" :active="menu" label="Hora" prepend-inner-icon="mdi-clock-time-four-outline">
                            <v-menu v-model="menu" :close-on-content-click="false" activator="parent" transition="scale-transition">
                                <v-time-picker v-if="menu" v-model="time" full-width></v-time-picker>
                            </v-menu>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-select variant="solo" v-model="salaSeleccionada" :items="salas" label="Seleccionar Sala"></v-select>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="isActive.value = false" variant="tonal">Aceptar</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VTimePicker } from 'vuetify/labs/VTimePicker'

export default {
props:['items'],
components: {
    VDateInput,
    VTimePicker,
  },
data(){
    return{
        time:null,
        menu:false,
        salas: this.items.map(salas => salas.name),
        salaSeleccionada: '',
    }
}
}
</script>

