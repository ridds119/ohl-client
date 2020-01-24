<template>
    <v-app-bar
      dark
      id="core-toolbar"
      app
    >
  
      <div class="v-toolbar-title">
        <v-toolbar-title
          class="white--text font-weight-light"
        >
          <slot/>
        </v-toolbar-title>
      </div>
      <v-list-tile avatar>
        <v-list-tile-avatar
          color="white"
        >
          <v-img
            :src="logo"
            contain
            height="50"
          />
        </v-list-tile-avatar>
        <v-list-tile-title v-if="!responsive"  class="title">
          Open Health Line
        </v-list-tile-title>
      </v-list-tile>
  
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
            to="/"
          >
            <v-icon color="white">mdi-view-dashboard</v-icon>
          </router-link>
          <v-menu
            bottom
            left
            content-class="dropdown-menu"
            offset-y
            transition="slide-y-transition">
            <router-link
              v-ripple
              slot="activator"
              class="toolbar-items"
              to="/home"
            >
              <v-badge
                color="error"
                overlap
              >
                <template slot="badge">
                  {{ notifications.length }}
                </template>
                <v-icon color="white">mdi-bell</v-icon>
              </v-badge>
            </router-link>
            <v-card>
              <v-list dense>
                <v-list-tile
                  v-for="notification in notifications"
                  :key="notification"
                  @click="onClick"
                >
                  <v-list-tile-title
                    v-text="notification"
                  />
                </v-list-tile>
              </v-list>
            </v-card>
          </v-menu>
          <router-link
            v-ripple
            class="toolbar-items"
            to="/user-profile"
          >
            <v-icon color="white">mdi-account</v-icon>
          </router-link>
        </v-flex>
      </v-toolbar-items>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    data: () => ({
      logo: 'favicon.ico',
      notifications: [
        'Mike, John responded to your email',
        'You have 5 new tasks',
        'You\'re now a friend with Andrew',
        'Another Notification',
        'Another One'
      ],
      title: null,
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