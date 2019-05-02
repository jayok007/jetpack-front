<template>
  <v-card data-test="jetpack">
    <v-img :src="image" aspect-ratio="1.5"></v-img>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ name }}</h3>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn flat icon v-if="showBooking" @click="book">
        <v-icon>bookmark</v-icon>
      </v-btn>
      <v-btn flat icon>
        <v-icon>visibility</v-icon>
      </v-btn>
      <v-btn flat icon>
        <v-icon>delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Jetpack',

  props: {
    id: String,
    name: String,
    image: String,
    showBooking: { type: Boolean, default: false }
  },
  methods: {
    book() {
      this.$emit('book', this.id)
    }
  }
}
</script>
