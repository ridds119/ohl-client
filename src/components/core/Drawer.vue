<template>
    <v-navigation-drawer
      id="app-drawer"
      v-model="drawer"
      app
      persistent
      light
      mobile-break-point="991"
      width="260"
    >
      <v-img
        height="100%"
      >
        <v-layout
          class="fill-height items"
          tag="v-list"
          column
        >
         
          <v-list-item
            v-for="(link, i) in links"
            :key="i"
            :to="link.to"
            :active-class="color"
            avatar
            class="v-list-item"
          >
            <v-list-item-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title
              v-text="link.text"
            />
          </v-list-item>
        </v-layout>
      </v-img>
    </v-navigation-drawer>
  </template>
  
  <script>
  export default {
    data: () => ({
      logo: 'favicon.ico',
      links: [
        {
          to: '/',
          icon: 'mdi-view-dashboard',
          text: 'Dashboard'
        },
        {
          to: '/user-profile',
          icon: 'mdi-account',
          text: 'User Profile'
        },
        {
          icon: 'mdi-clipboard-outline',
          text: 'Table List'
        },
        {
          icon: 'mdi-format-font',
          text: 'Typography'
        },
        {
          icon: 'mdi-chart-bubble',
          text: 'Icons'
        },
        {
          icon: 'mdi-map-marker',
          text: 'Maps'
        },
        {
          icon: 'mdi-bell',
          text: 'Notifications'
        }
      ]
    })
  }
  </script>
  
  <style >
    #app-drawer {
      margin-top: 70px !important;
      background: #fff !important;
    }
    #app-drawer .v-list__tile {
      border-radius: 4px;
    }    
  
    #app-drawer .v-list__tile .--buy {
      margin-top: auto;
      margin-bottom: 17px;
        
    }
    #app-drawer  .items {
      overflow: auto !important;
    }
  
    ::-webkit-scrollbar {
      background-color: transparent;
    }
    .v-navigation-drawer .v-list{
      background-color: white !important;
    }
  </style>