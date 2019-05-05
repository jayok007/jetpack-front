<template>
  <v-card data-test="jetpack">
    <v-img :src="image" aspect-ratio="1.5"></v-img>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ name }}</h3>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn flat icon v-if="showBooking" data-test="bookingBtn" @click="book">
        <v-icon>bookmark</v-icon>
      </v-btn>
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
  data() {
    return {
      dialog: false
    }
  },
  props: {
    id: String,
    name: String,
    image: String,
    showBooking: { type: Boolean, default: false }
  },
  methods: {
    book() {
      this.$emit('book', this.id)
    },
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
