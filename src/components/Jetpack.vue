<template>
  <v-card>
    <v-img :src="image" aspect-ratio="1" height="100"></v-img>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ name }}</h3>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn flat color="orange">Share</v-btn>
      <v-btn flat color="orange">Explore</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Jetpack',

  props: {
    id: String,
    name: String,
    image: String
  }
}
</script>
