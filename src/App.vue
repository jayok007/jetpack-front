<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <span>Rocket.js</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container grid-list-lg>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
