import { createStore } from 'vuex'

export default createStore({
  state: {
    now: new Date(),
    roomsInfo: JSON.parse(localStorage.getItem('roomsInfo') || '[]'),
    roomsReserved: JSON.parse(localStorage.getItem('roomsReserved') || '[]'),
  },
  getters: {
    getDate(state) {
      return state.now
    },
    getRoomsInfo(state) {
      return state.roomsInfo
    },
    getRoomsReserved(state) {
      return state.roomsReserved
    }
  },
  mutations: {
    addReservation(state, newReservation) {
      state.roomsReserved.push(newReservation)
      localStorage.setItem('roomsReserved', JSON.stringify(state.roomsReserved))
    },
    deleteReservation(state, newRoomsReserved) {
      state.roomsReserved = newRoomsReserved
      localStorage.setItem('roomsReserved', JSON.stringify(state.roomsReserved))
    }
  },
  actions: {
    addReservationAction({ commit }, newReservation) {
      //Aca podria hacer el control de que los datos sean los adecuados antes de agregarlo al array
      newReservation.id = (this.state.roomsReserved).length + 1
      commit('addReservation', newReservation);
    },
    deleteReservationAction({ commit }, list) {
      //La lista contiene las id de las reservaciones que se quieren eliminar
      let newRoomsReserved = this.state.roomsReserved.filter(item => !list.some(id => item.id === id))
      commit('deleteReservation', newRoomsReserved)
    }
  },
  modules: {
  }
})
