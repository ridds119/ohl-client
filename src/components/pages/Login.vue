<!-- ohl@admin.com password:ohl@admin -->
<template>
  <v-content>
    <v-container>
      <br/><br/>
      <v-card class="mx-auto my-12 outer-card"
          max-width="374">
        <v-card-title>
         <v-card class="v-header py-2 mx-auto my-n12" max-width="364" raised>
           <v-card-title>
             <v-row justify="center" color="white">
               <h4>Login</h4>
             </v-row>
           </v-card-title>
           <v-card-actions>
             <v-row justify="center" color="white">
             
             <v-btn icon color="white">
               <v-icon>mdi-facebook</v-icon>
             </v-btn>
             <v-btn icon color="white">
               <v-icon>mdi-twitter</v-icon>
             </v-btn>
             <v-btn icon color="white">
               <v-icon>mdi-google-plus</v-icon>
             </v-btn>
             </v-row>
           </v-card-actions>
          </v-card>
        </v-card-title><br />

         <v-card-text class="my-4">
           <v-text-field label="Email" 
             prepend-icon="mdi-email"
             color="purple"
             v-model="inputData.email"
             autocomplete="off"></v-text-field>
           <v-text-field type="password" label="Password"
             prepend-icon="mdi-lock-outline"
             color="purple"
             v-model="inputData.password"
             autocomplete="off"></v-text-field>
         </v-card-text>
         <v-card-actions>
          <v-row justify="center">
            <v-btn normal text color="success" @click="login">               GET STARTED
            </v-btn> 
          </v-row>
         </v-card-actions>
      </v-card>
      <p v-if="token">{{ token }}</p>
    </v-container>
  </v-content>
</template>

<script>
// import axios from "axios"
export default {
    name: 'HelloWorld',
    data () {
      return {
        inputData: {
          email: '',
          password: ''
        },
        res: {},
        token: ''
      }
      
    },
    methods: {
      login () {
        var self = this
        this.$http.plain.post('/login', { user: self.inputData })
        .then(response => { self.res = response
          if(self.res.headers.authorization){
            self.token = self.res.headers.authorization
            localStorage.access = self.token
            self.$store.commit('setCurrentUser', { currentUser: response.data, token: response.headers.authorization } )
            if(self.$store.state.admin){
              self.$router.replace('/admin/home')
            }
            else{
              self.$router.replace('/home')
            }
            
          }
          
          })
        .catch(e => {
          self.res = e
        })
      }
    },
    created () {
      delete localStorage.access
    }
  }
</script>

<style>
  .v-header{
  background-image:linear-gradient(60deg,#66bb6a,#388e3c);
  text-align: center;
  width: 100%;
  margin-top: -40px;
  }
  h4{
    font-family: "Times New Roman", Times, serif;
    color: white;
  }
  .outer-card{
    border-radius: 8px !important;
  }
  .v-input__icon--prepend .v-icon { 
      color: black;
  }
</style>