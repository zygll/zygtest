<template>
    <div>
      VUE_APP_BASE_URL: {{ apiKey }} store {{ store }}
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        apiKey: process.env.VUE_APP_BASE_URL,
        store:this.$store.state.options.key
      }
    },
    created() {
      console.log(this.$store.state.options.key,'store')
    }
  }
  </script>
  