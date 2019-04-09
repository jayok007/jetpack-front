<template>
  <div>
    <jetpack
      v-for="(jetpack, i) in jetpacks"
      :key="i"
      :id="jetpack.id"
      :name="jetpack.name"
      :image="jetpack.image"
    ></jetpack>

    <v-text-field type="text" v-model="text"></v-text-field>
    {{ text }}
    <v-btn @focus="validate">Valider</v-btn>
  </div>
</template>

<script>
import Jetpack from '../components/Jetpack'

export default {
  name: 'Home',

  components: {
    Jetpack
  },

  data() {
    return {
      jetpacks: [],
      text: 'toto'
    }
  },

  created() {
    window
      .fetch('/jetpacks')
      .then(res => res.json())
      .then(jetpacks => (this.jetpacks = jetpacks))
  },

  methods: {
    validate() {
      console.log(this.text)
    }
  }
}
</script>
