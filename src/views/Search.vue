<template>
  <div class="home">
    <h1>Formulaire de Recherche et de Réservation de Jetpack</h1>
    <v-container data-test="searchForm" grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 lg6>
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                data-test="dateStart"
                :disabled="!isSearchOn"
                v-model="dateStart"
                label="Date de début"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateStart"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-flex>

        <v-flex xs12 lg6>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                data-test="dateEnd"
                :disabled="!isSearchOn"
                v-model="dateEnd"
                label="Date de fin"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateEnd"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
      <div class="text-xs-center">
        <v-btn
          data-test="searchBtn"
          round
          color=""
          v-if="isSearchOn"
          @click="searchJetpack"
          dark
          >Rechercher
        </v-btn>
      </div>
    </v-container>
    <v-container v-if="!isSearchOn">
      <h3 data-test="searchResult">
        {{ this.jetpacks.length }} jetpack(s) disponnible :
      </h3>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="(jetpack, i) in jetpacks" :key="i">
          <jetpack
            :id="jetpack.id"
            :name="jetpack.name"
            :image="jetpack.image"
            :showBooking="true"
            @book="bookJetpack"
          ></jetpack>
        </v-flex>
      </v-layout>
      <div class="text-xs-center">
        <v-btn round color="" data-test="newSearch" @click="newSearch" dark>
          Nouvelle recherche
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Jetpack from '@/components/Jetpack.vue'
import httpClient from '@/httpClient'

export default {
  name: 'Search',
  components: {
    Jetpack
  },
  data: () => ({
    dateStart: new Date().toISOString().substr(0, 10),
    dateEnd: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false,
    isSearchOn: true,
    jetpacks: []
  }),
  methods: {
    newSearch() {
      this.isSearchOn = true
    },
    searchJetpack() {
      this.isSearchOn = false
      httpClient
        .get('/api/availability/jetpacks', {
          params: { dateStart: this.dateStart, dateEnd: this.dateEnd }
        })
        .then(jetpacks => (this.jetpacks = jetpacks))
    },
    bookJetpack(idJetpack) {
      httpClient
        .post('/api/booking', {
          idJetpack: idJetpack,
          dateStart: this.dateStart,
          dateEnd: this.dateEnd
        })
        .then(jetpacks => (this.jetpacks = jetpacks))
        .finally(() => (this.isSearchOn = true))
    }
  }
}
</script>
