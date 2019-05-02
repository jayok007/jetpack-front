<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <span @click="$router.push('/')">Rocket.js</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="$router.push('/search')">
          <v-icon>search</v-icon> Rechercher</v-btn
        >
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container grid-list-lg>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
