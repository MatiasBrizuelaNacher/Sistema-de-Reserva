<template>
    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" text="Open Dialog"></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card>
                <v-card-title>Formulario de Reserva</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field label="First name"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Last name"></v-text-field>
                        </v-col>  
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Email address" placeholder="johndoe@gmail.com" type="email"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-select v-model="location" :items="locations" label="Location"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                            v-model="time"
                            :active="menu2"
                            :focus="menu2"
                            label="Picker in menu"
                            prepend-inner-icon="mdi-clock-time-four-outline"
                            readonly
                            >
                            <v-menu
                                v-model="menu2"
                                :close-on-content-click="false"
                                activator="parent"
                                transition="scale-transition"
                            >
                                <v-time-picker
                                v-if="menu2"
                                v-model="time"
                                full-width
                                ></v-time-picker>
                            </v-menu>
                            </v-text-field>
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
import { VTimePicker } from 'vuetify/labs/VTimePicker'

export default {
components: {
VTimePicker,
},

data: () => ({
    locations: [
    'top',
    'bottom',
    'start',
    'end',
    'center',
    ],
    location: 'end',
}),
}
</script>

