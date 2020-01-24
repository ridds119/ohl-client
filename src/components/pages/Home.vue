<template>
  <AppLayout>
    <v-container>
      <v-row class="mx-auto my-auto">
        <pre>  
          
          Welcome to User Home
          <p v-if="res"> {{ res }} </p></pre>
      </v-row>
    </v-container>
  </AppLayout>
</template>
<script>
  import AppLayout from '../shared/Layout'
  export default {
    components: {
      AppLayout
    },
    data() {
      return {
        res: ''
      }
    },
    created() {
      var self = this
      this.$http.secured.get('/welcome/index')
        .then(response => { self.res = response.data })
        .catch(e => {
          self.res = e
        })
    }
  }
</script>