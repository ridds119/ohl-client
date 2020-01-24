<template>
    <AppLayout>
        <p>Welcome to HomePage</p>
        <p v-if="res"> {{ res }} </p>
    </AppLayout>
  </template>
  <script>
    import AppLayout from './shared/Layout'
    export default{
      components: {
        AppLayout
      },
      data () {
        return{
          res: ''
        }
      },
      created () {
        if(!(this.$store.state.admin)){
          if(this.$store.state.signedIn){
            this.$router.replace('/accessdenied')
          }
          else{
            sessionStorage.signedIn = false
            this.$router.replace('/')
          }
        }
        else{
          var self = this
          this.$http.secured.get('http://ohl.api.localhost/welcome/index', {
            contentType: "application/json"
          })
          .then(response => { self.res = response.data})
          .catch(e => {
            self.res = e
            if(e.response.status == '401'){
              this.$store.commit('unsetCurrentUser')
              sessionStorage.signedIn = false
          sessionStorage.token = null
              this.$router.replace('/')
            }
            else if(e.response.status == '403'){
              self.$router.replace('/accessdenied')
            }
          })
        }
        
      }
    }
  </script>