<template>
  <AppLayout>
    <v-container>
      <v-row justify="center">
        <v-container>
          <h2 class="mx-4">Site Administration</h2>
        
        
        <br />
        <v-expansion-panels popout focusable tile>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Admin <v-chip class="mx-2" color="blue"> {{admin.length}} </v-chip>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list>
                <v-list-item v-for="row in admin" :key=row.id>
                  <pre>Name:{{ row.name }}     Email:{{ row.email }}</pre>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              User <v-chip class="mx-2" color="blue"> {{normaluser.length}} </v-chip>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list>
                <v-list-item v-for="row in normaluser" :key=row.id>
                  <pre>Name:{{ row.name }}     Email:{{ row.email }}</pre>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
      </v-row>
    </v-container>

  </AppLayout>
</template>
<script>
  import AppLayout from './shared/Layout'
  export default {
    components: {
      AppLayout
    },
    data() {
      return {
        users: [],
        admin: [],
        normaluser: []
      }
    },
    created() {
      this.$http.secured.get('/users')
        .then(response => {
          this.users = response.data
          this.users.forEach(element => {
            if (element.role == 'admin') {
              this.admin.push(element);
            }
            else {
              this.normaluser.push(element);
            }
          });
        })
        .catch(e => {
          self.res = e
          if (e.response.status == '401') {
            this.$store.commit('unsetCurrentUser')
            sessionStorage.signedIn = false
            sessionStorage.token = null
            this.$router.replace('/')
          }
          else {
            self.$router.replace('/accessdenied')
          }
        })

    }
  }
</script>
<style scoped>
  .v-expansion-panel-header>*:not(.v-expansion-panel-header__icon) {
    flex: none !important;
  }
</style>