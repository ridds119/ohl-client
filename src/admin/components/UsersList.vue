<template>
  <AppLayout>
    <v-container>
      <v-data-table
      :headers="headers"
      :items="users"
      sort-by="created_at"
      class="elevation-4 mb-12"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="mx-4 tablehead">Users</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn text color="primary" dark class="mb-2" v-on="on">New User</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row v-if="newUserForm">
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="newItem.name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="newItem.email" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field type="password" v-model="newItem.password" label="Password"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="newItem.role" label="Role"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="!newUserForm">
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select :items="roles" v-model="editedItem.role" hint="Role"></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
        mdi-account-edit
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Refresh</v-btn>
      </template>
    </v-data-table>
    </v-container>
  </AppLayout>

</template>
<script>
  import AppLayout from './shared/Layout'
  export default {
    data: () => ({
      res: '',
      error: '',
      dialog: false,
      roles: ["user","admin"],
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name',
        },
        { text: 'Email', value: 'email' },
        { text: 'Created At', value: 'created_at' },
        { text: 'Updated At', value: 'updated_at' },
        { text: 'Role', value: 'role' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        role: '',
      },
      defaultItem: {
        name: '',
        email: '',
        role: 'user',
      },
      newItem: {
        name: '',
        email: '',
        role: '',
        password: ''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      newUserForm () {
        return this.editedIndex === -1
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    methods: {
      editItem (item) {
        this.editedIndex = item.id
        this.editedItem = Object.assign({}, {name: item.name, email: item.email ,role: item.role })
        this.dialog = true
      },

      deleteItem (item) {
        const id = item.id
        if(confirm("Do you really want to delete this user?")){
          this.$http.secured.delete('/users/'+id)
          .then(response => {
            this.$store.commit('UserStore/many', response.data)
            this.users = this.$store.state.UserStore.users
          })
          .catch(error => {
              this.error = error
          })
        }
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.newItem.password = ''
          this.newItem = Object.assign({}, this.defaultItem)
        }, 200)
      },

      save () {
        if (this.editedIndex > -1) {
          //edit is being performed
          this.$http.secured.patch(`users/${this.editedIndex}`,{ user: this.editedItem })
          .then( response => {
            this.$store.commit('UserStore/many', response.data)
            this.users = this.$store.state.UserStore.users
          })
        }
        else{
          //new user is being created
          this.$http.secured.post(`users/`,{ user: this.newItem })
          .then( response => {
            this.$store.commit('UserStore/many', response.data)
            this.users = this.$store.state.UserStore.users
          })
        } 
        this.close()
      },
      initialize () {
        self.$http.secured.get('http://ohl.api.localhost/users')
        .then(response => { self.res = response
          self.$store.commit('UserStore/many', self.res.data)
          self.users = self.res.data
        })
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
    },
    components:{
      AppLayout
    },
    created () {
      var self = this
      self.$http.secured.get('http://ohl.api.localhost/users')
      .then(response => { 
        self.res = response
        self.$store.commit('UserStore/many', self.res.data)
        self.users = this.$store.state.UserStore.users
      })
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
        // self.$router.replace('/accessdenied')
      })
    }

  }
</script>
<style>
  p {
    overflow:auto;
    margin: 10px;
  }
  .tablehead {
    background-image: none !important;
  }
</style>