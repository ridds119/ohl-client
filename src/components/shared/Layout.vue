<template>
  <div>
    <v-card elevation="2">
      <v-navigation-drawer id="app-drawer" v-model="drawer" app fixed mobile-break-point="991" width="240">
        <v-list-item v-if="!responsive" class="apptitle py-1">
          <v-row justify="center" class="px-auto mx-auto">
            <v-list-item-avatar class="mr-2">
              <v-img :src="logo" contain height="50"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="title">
                OpenHealthLine
              </v-list-item-title>
            </v-list-item-content>
          </v-row>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense shaped class="pr-6">
          <v-list-item v-for="(link,i) in links" :key="i" :to="link.to">
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>

    <v-app-bar dark app class="core-toolbar" clipped-left elevation="12">
      <v-app-bar-nav-icon class="ml-2" v-if="!drawer" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <v-col class="hidden-xs-only" sm="1">
        <v-avatar>
          <v-img :src="logo" contain height="50"></v-img>
        </v-avatar>
      </v-col>
      <v-col class="hidden-xs-only" sm="1" md="1">
          <strong>OpenHealthLine</strong>
      </v-col> -->
      <!-- <a>
        <v-avatar>
          <v-img :src="logo" contain height="50"></v-img>
          <v
        </v-avatar>
        <v-toolbar-title>OpenHealthLine</v-toolbar-title>
      </a> -->

      <!-- <v-list-item  class=" py-1">
        <v-row justify="center" class="px-auto mx-auto">
          <v-list-item-avatar class="mr-2">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">
              OpenHealthLine
            </v-list-item-title>
          </v-list-item-content>
        </v-row>
      </v-list-item> -->
      <template v-if="responsive">
        <v-list-item class="mx-0 px-0" avatar>
          <v-list-item-avatar color="white">
            <v-img
              :src="logo"
              contain
              height="50"
            />
          </v-list-item-avatar>
          <v-list-item-title class="mx-0 px-0 title">
            OpenHealthLine
          </v-list-item-title>
        </v-list-item>
        <v-spacer></v-spacer>
      </template>


      <v-text-field class="mt-8 mr-2 d-none d-md-flex" style="padding-left: 263px;" label="Search.." color="white" dense
        outlined prepend-inner-icon="mdi-magnify">
      </v-text-field>
      <!-- <v-text-field class="mr-4 whites-input" label="Search..." hide-details color="white" outlined /> -->
      <router-link class="toolbar" v-ripple to="/dashboard">
        <v-icon color="white">mdi-view-dashboard</v-icon>
      </router-link>
      <v-menu bottom left content-class="dropdown-menu" offset-y transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <router-link class="toolbar" v-on="on" v-ripple to="/notfound">
            <v-badge color="error" overlap>
              <template slot="badge">
                {{ notifications.length }}
              </template>
              <v-icon color="white">mdi-bell</v-icon>
            </v-badge>
          </router-link>
        </template>

        <v-card>
          <v-list dense>
            <v-list-item v-for="notification in notifications" :key="notification">
              <v-list-item-title v-text="notification" />
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      <router-link class="toolbar" v-ripple to="/home">
        <v-icon color="white">mdi-account</v-icon>
      </router-link>
      <router-link class="toolbar" v-ripple to="/myprofile">
        <v-avatar size="27px" color="#9428a3">
          <img v-if="profileAvatar" alt="Avatar" :src="profileAvatar">
          <v-icon v-else dark>mdi-account-circle</v-icon>
        </v-avatar>
      </router-link>

      <v-toolbar-items class="toolbar">
        <v-btn icon @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>


    <slot />



    <v-footer absolute elevation="24">
      <span>&copy; 2020</span>
    </v-footer>
  </div>
</template>
<script>
  export default {
    data: () => ({
      profileAvatar: '',
      drawer: null,
      user_id: null,
      logo: 'favicon.ico',
      res: '',
      notifications: [
        'Mike, John responded to your email',
        'You have 5 new tasks',
        'You\'re now a friend with Andrew',
        'Another Notification',
        'Another One'
      ],
      responsive: false,
      links: [
        {
          to: '/home',
          icon: 'mdi-home',
          text: 'Home'
        },
        {
          to: '/dashboard',
          icon: 'mdi-view-dashboard',
          text: 'Dashboard'
        },
        {
          to: '/notfound',
          icon: 'mdi-clipboard-outline',
          text: 'Table List'
        },
        {
          to: '/notfound',
          icon: 'mdi-bell',
          text: 'Notifications'
        }
      ]
    }),
    created() {
      if(!this.profileAvatar){
        this.profileAvatar = this.$store.state.profileImage
      }    
    },
    mounted() {
      if(!this.profileAvatar){
        this.profileAvatar = this.$store.state.profileImage
      }
      this.onResponsiveInverted()
      window.addEventListener('resize', this.onResponsiveInverted)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResponsiveInverted)
    },
    methods: {
      logout() {
        this.$http.secured.delete('/logout')
          .then(response => {
            this.res = response
            this.$store.commit('unsetCurrentUser')
          })
      },
      onResponsiveInverted() {
        if (window.innerWidth < 991) {
          this.responsive = true
        } else {
          this.responsive = false
        }
      }
    }
  }
</script>
<style>
  div.v-list-item {
    padding: none;
    left: 0;
  }

  .core-toolbar {
    color: white;
    background-image: linear-gradient(to right, #9428a3, #e96843);
    box-shadow: 0 6px 20px 0 rgba(255, 110, 64, .5) !important;
  }

  .core-toolbar a {
    text-decoration: none;
    ;
  }

  .v-toolbar .v-toolbar__content {
    padding-left: 0 !important;
  }

  .v-toolbar {
    padding-left: 0px !important;
  }

  #core-view {
    padding-bottom: 50px;
  }

  #app-drawer {
    /* margin-top: 66px !important; */
    background: #fff !important;
    height: 100%;
    box-shadow: 0 4px 7px 0 rgba(0, 0, 0, .2);
  }

  #app-drawer .v-list__item {
    border-radius: 4px;
  }

  #app-drawer .v-list__item .--buy {
    margin-top: auto;
    margin-bottom: 17px;

  }

  ::-webkit-scrollbar {
    background-color: inherit;
    display: none;
  }

  .v-navigation-drawer .v-list {
    padding-top: 0px;


  }

  .v-list .item:hover {

    background: linear-gradient(to right, #9428a3, #e96843) !important;
  }

  .v-list-item .title {
    color: white;
    text-shadow: 2px 2px purple;
    font-variant: small-caps;
  }

  .apptitle {
    top: 0;
    background-color: rgb(165, 51, 148);
  }


  .fill-height {
    height: 100% !important;
  }

  .v-navigation-drawer__content {
    height: 100%;

  }

  a.v-list-item--active.v-list-item.v-list-item--link.theme--light {
    background-image: linear-gradient(45deg, rgb(142, 36, 170), rgb(255, 110, 64));
    color: white;
    box-shadow: 3px 3px 20px 0 rgba(255, 110, 64, .5);
  }

  .toolbar i.v-icon {
    padding: 12px;
    line-height: 1.8;
  }

  .toolbar i.v-icon:hover {
    background-color: rgba(0, 0, 0, .1);
  }

  .theme--dark.v-text-field>.v-input__control>.v-input__slot:before {
    border-color: rgba(255, 255, 255, 0.7);
  }

  .theme--dark.v-text-field:not(.v-input--has-state)>.v-input__control>.v-input__slot:hover:before {
    border-color: #FFFFFF;
  }

  .theme--dark.v-text-field--outlined fieldset {
    border: 1px solid rgba(230, 230, 230, .05);
    background: rgba(230, 230, 230, .3);
  }

  .theme--dark.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)>.v-input__control>.v-input__slot:hover fieldset {
    border: 1px solid rgba(230, 230, 230, .1);
    background: rgba(230, 230, 230, .1);
  }
  .v-application--is-ltr .v-list-item__avatar:first-child {
    margin-right: 8px;
}
</style>