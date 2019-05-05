<template>
  <v-card>
    <v-card-title class="headline">{{ title }}</v-card-title>

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
      <v-btn data-test="saveBtn" color="primary" flat @click="saveJetpack">
        {{ saveText }}
      </v-btn>

      <v-btn color="primary" flat @click="resetForm" data-test="cancelBtn"
        >Annuler</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { encodeImageFile } from '../utils'

export default {
  name: 'JetpackForm',

  props: {
    title: {
      type: String,
      default: 'Créer un jetpack'
    },
    defaultName: {
      type: String
    },
    defaultImage: {
      type: String
    },
    saveText: {
      String,
      default: 'Créer'
    }
  },

  data() {
    return {
      name: '',
      image: '',
      fileName: ''
    }
  },

  watch: {
    defaultName: {
      immediate: true,
      handler() {
        if (this.defaultName) this.name = this.defaultName
      }
    },
    defaultImage: {
      immediate: true,
      handler() {
        if (this.defaultImage) this.image = this.defaultImage
      }
    }
  },

  methods: {
    saveJetpack() {
      if (!this.$refs.form.validate() || !this.image) return

      this.$emit('addJetpack', {
        name: this.name,
        image: this.image
      })
      this.resetForm()
    },

    resetForm() {
      this.fileName = ''
      this.name = this.defaultName ? this.defaultName : ''
      this.image = this.defaultImage ? this.defaultImage : ''
      this.$refs.inputFile.value = null
      this.$refs.form.resetValidation()
      this.$emit('cancel')
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
