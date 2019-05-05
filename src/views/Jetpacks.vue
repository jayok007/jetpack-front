<template>
  <div>
    <v-dialog v-model="dialog" width="400">
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          fab
          color="primary"
          fixed
          left
          bottom
          v-on="on"
          data-test="createJetpackBtn"
        >
          <v-icon dark>add</v-icon>
        </v-btn>
      </template>

      <jetpack-form
        data-test="createJetpackForm"
        @addJetpack="saveJetpack"
        @cancel="dialog = false"
      ></jetpack-form>
    </v-dialog>

    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="(jetpack, i) in jetpacks" :key="i">
        <jetpack
          data-test="jetpack"
          @update="updateJetpack"
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
import Jetpack from '@/components/Jetpack'
import JetpackForm from '@/components/JetpackForm'

export default {
  name: 'Jetpacks',

  components: {
    Jetpack,
    JetpackForm
  },

  data() {
    return {
      jetpacks: [],
      dialog: false
    }
  },

  created() {
    httpClient.get('/api/jetpacks').then(jetpacks => (this.jetpacks = jetpacks))
  },

  methods: {
    saveJetpack({ name, image }) {
      httpClient
        .post('/api/jetpacks', {
          name,
          image
        })
        .then(jetpack => this.jetpacks.push(jetpack))
        .finally(() => (this.dialog = false))
    },

    updateJetpack({ id, name, image }) {
      console.log(id)
      httpClient
        .put(`/api/jetpacks/${id}`, { name, image })
        .then(updatedJetpack => {
          const jetpack = this.jetpacks.find(j => j.id === id)
          Object.assign(jetpack, updatedJetpack)
        })
    }
  }
}
</script>
