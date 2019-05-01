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

      <v-card data-test="createJetpackForm">
        <v-card-title class="headline">Créer un jetpack</v-card-title>

        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="name"
              data-test="nameInput"
              label="Nom"
              :rules="[v => !!v || 'Champ obligatoire']"
            ></v-text-field>
            <v-text-field
              ref="inputFileName"
              :value="fileName"
              prepend-inner-icon="image"
              label="Image"
              @click="$refs.inputFile.click()"
              @keyup.enter="$refs.inputFile.click()"
              readonly
              :rules="[v => !!v || 'Champ obligatoire']"
            ></v-text-field>
            <input
              ref="inputFile"
              v-show="false"
              accept="image/*"
              @change="loadImage"
              type="file"
              data-test="imageInput"
            />
            <v-img v-show="image" :src="image" width="150"></v-img>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            data-test="saveBtn"
            :loading="!dialog"
            color="primary"
            outline
            @click="saveJetpack"
            >Créer</v-btn
          >
          <v-btn color="primary" outline @click="dialog = false">Annuler</v-btn>
        </v-card-actions>
      </v-card>
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
import Jetpack from '@/components/Jetpack'
import { encodeImageFile } from '../utils'

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
      fileName: '',
      dialog: false
    }
  },

  created() {
    httpClient.get('/api/jetpacks').then(jetpacks => (this.jetpacks = jetpacks))
  },

  watch: {
    dialog() {
      if (!this.dialog) {
        this.name = ''
        this.image = ''
        this.fileName = ''
        this.$refs.inputFile.value = null
        this.$refs.form.resetValidation()
      }
    }
  },

  methods: {
    saveJetpack() {
      if (!this.$refs.form.validate()) return

      httpClient
        .post('/api/jetpacks', {
          name: this.name,
          image: this.image
        })
        .then(jetpack => this.jetpacks.push(jetpack))
        .finally(() => (this.dialog = false))
    },

    async loadImage({
      target: {
        files: [img]
      }
    }) {
      if (!img) return

      this.fileName = img.name
      this.image = await encodeImageFile(img)
    }
  }
}
</script>
