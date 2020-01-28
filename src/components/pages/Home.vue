<template>
  <AppLayout>
    <v-container>
      <v-row class="mx-auto my-auto">
        <pre>  
          
          Welcome to User Home
        </pre>
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
      }
    },
    created() {
      var self = this
      var id = this.$store.state.currentUser.id;
      this.$http.secured.get(`users/image/${id}`)
        .then(response => { 
          if(response.data.path){
            self.$store.commit('getprofileImage', response.data.path)
          }
         })
        .catch(e => {
          self.res = e
        })
    }
  }
</script>