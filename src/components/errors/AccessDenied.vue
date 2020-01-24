<template>
    <layout>
     <v-container>
       <v-container>
        <v-row justify="center">
          <v-row class="mx-auto">
            <v-card width="100%" height="300">
              <v-card-title>
                <br/><br/>
                <v-img :src="logo" contain aspect-ratio="1" height="100"></v-img>
              </v-card-title>
              <v-card-text>
                <v-row justify="center"><h2>THE ACCESS IS DENIED</h2></v-row>
              </v-card-text>
              <v-card-text>
                <v-row justify="center"><h3>Please contact you system administrator for more information</h3></v-row>
              </v-card-text>
            </v-card>
          </v-row>
          
          
    </v-row>
       </v-container>
     </v-container>
    </layout>
  </template>
    
    <script>
    import layout from '../shared/Error' 
    export default {
      data () {
          return {
            logo: 'accessdenial.jpeg'
          }
      },
      components: {
        layout
      }
    }
    </script>