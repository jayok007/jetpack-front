<template>
  <div>
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
  name: 'Home',

  components: {
    Jetpack
  },

  data() {
    return {
      jetpacks: []
    }
  },

  created() {
    httpClient.get('/api/jetpacks').then(jetpacks => (this.jetpacks = jetpacks))
  }
}
</script>
