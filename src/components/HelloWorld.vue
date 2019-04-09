<template>
  <div>
    <h1>Welcome to Your Vue.js App</h1>
    <div>{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',

  props: {
    msg: String
  }
}
</script>
