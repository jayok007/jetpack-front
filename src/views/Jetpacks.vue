<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          fab
          color="indigo"
          fixed
          left
          bottom
          v-on="on"
          data-test="createJetpackBtn"
        >
          <v-icon dark>add</v-icon>
        </v-btn>
      </template>

      <div data-test="createJetpackForm">
        <v-card>
          <v-card-title class="headline">Créer un jetpack</v-card-title>

          <v-card-text>
            <v-text-field v-model="name" data-test="nameInput"></v-text-field>
            <v-text-field v-model="image" data-test="imageInput"></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn data-test="saveBtn" @click="saveJetpack">Ajouter</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-dialog>

    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="(jetpack, i) in jetpacks" :key="i">
        <jetpack
          data-test="jetpack"
          :id="jetpack.id"
          :name="jetpack.name"
          :image="jetpack.image"
        ></jetpack>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import httpClient from '@/httpClient'
import Jetpack from '../components/Jetpack'

export default {
  name: 'Jetpacks',

  components: {
    Jetpack
  },

  data() {
    return {
      jetpacks: [],
      name: '',
      image: '',
      dialog: false,
      addForm: false
    }
  },

  created() {
    httpClient.get('/api/jetpacks').then(jetpacks => (this.jetpacks = jetpacks))
  },

  methods: {
    saveJetpack() {
      httpClient
        .post('/api/jetpacks', {
          name: this.name,
          image: this.image
        })
        .then(jetpack => this.jetpacks.push(jetpack))
    }
  }
}
</script>
