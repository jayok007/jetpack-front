<template>
  <div class="home">
    <h1>Formulaire de Recherche et de Réservation de Jetpack</h1>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 lg6>
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateFormatted"
                label="Date"
                hint="MM/DD/YYYY"
                persistent-hint
                prepend-icon="event"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu1 = false"
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
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="computedDateFormatted"
                label="Date (read only text field)"
                hint="MM/DD/YYYY"
                persistent-hint
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
      <div class="text-xs-center">
        <v-btn round color="" @click="searchJetpack" dark>Rechercher </v-btn>
      </div>
    </v-container>
    <v-container>
      <h1 v-if="jetpacks.length">Resultat :</h1>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="(jetpack, i) in jetpacks" :key="i">
          <jetpack
            :id="jetpack.id"
            :name="jetpack.name"
            :image="jetpack.image"
          ></jetpack>
        </v-flex>
      </v-layout>
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
  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    jetpacks: []
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    }
  },

  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date)
    }
  },

  methods: {
    searchJetpack() {
      httpClient
        .get('/api/jetpacks')
        .then(jetpacks => (this.jetpacks = jetpacks))
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>
