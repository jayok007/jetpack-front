<template>
  <v-card data-test="jetpack">
    <v-img :src="image" aspect-ratio="1.5"></v-img>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ name }}</h3>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-dialog v-model="dialog" width="400">
        <template v-slot:activator="{ on }">
          <v-btn flat icon data-test="updateBtn" v-on="on">
            <v-icon>visibility</v-icon>
          </v-btn>
        </template>

        <jetpack-form
          data-test="updateForm"
          title="Modifier un jetpack"
          save-text="Modifier"
          :defaultName="name"
          :defaultImage="image"
          @addJetpack="emitUpdate"
          @cancel="dialog = false"
        ></jetpack-form>
      </v-dialog>

      <v-btn flat icon>
        <v-icon>delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import JetpackForm from '@/components/JetpackForm'

export default {
  name: 'Jetpack',

  components: {
    JetpackForm
  },

  props: {
    id: String,
    name: String,
    image: String
  },

  data() {
    return {
      dialog: false
    }
  },

  methods: {
    emitUpdate({ name, image }) {
      this.$emit('update', {
        id: this.id,
        name,
        image
      })
    }
  }
}
</script>
