<template>
    <v-container>
      <v-row>
        <v-app-bar
        dark
        id="core-toolbar"
        app
      >
    
        <div class="v-toolbar-title">
          <v-toolbar-title dark
          >
          </v-toolbar-title>
        </div>
        <v-list-item avatar>
          <v-list-item-avatar
            color="white"
          >
            <v-img
              :src="logo"
              contain
              height="50"
            />
          </v-list-item-avatar>
          <v-list-item-title v-if="!responsive">
            Open Health Line
          </v-list-item-title>
        </v-list-item>
    
        <v-spacer />
        <v-toolbar-items>
          <v-flex
            align-center
            layout
            py-2
          >
            <v-text-field
              class="mr-4 whites-input"
              label="Search..."
              hide-details
              color="white"
            />
            <router-link
              v-ripple
              class="toolbar-items"
              to="/home"
            >
              <v-icon color="white">mdi-home</v-icon>
            </router-link>
          </v-flex>
        </v-toolbar-items>
      </v-app-bar>
      <v-container class="mx-auto my-auto">
        <slot />
      </v-container>
      </v-row>
    </v-container>
  </template>
    
    <script>
    export default {
      data: () => ({
        logo: 'favicon.ico',
        responsive: false
      }),
    
      watch: {
        '$route' (val) {
          this.title = val.name
        }
      },
    
      mounted () {
        this.onResponsiveInverted()
        window.addEventListener('resize', this.onResponsiveInverted)
      },
      beforeDestroy () {
        window.removeEventListener('resize', this.onResponsiveInverted)
      },
    
      methods: {
        onClick () {
          //
        },
        onResponsiveInverted () {
          if (window.innerWidth < 991) {
            this.responsive = true
          } else {
            this.responsive = false
          }
        }
      }
    }
    </script>
    
    <style >
      #core-toolbar a {
        text-decoration: none;
      }
      .v-toolbar .v-toolbar__content {
        color: white;
        background-image: linear-gradient(to right, #9428a3, #e96843);
      }
      .v-toolbar{
        padding-left: 0px !important;
      }
    </style>