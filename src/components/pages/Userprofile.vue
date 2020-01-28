<template>
  <AppLayout>
    <v-container style="background-color: #f2f4f8">
      <v-container class="flex-column pb-0">
        <v-img contains cover :src='coverImage'></v-img>
      </v-container>
      <v-container class="pt-0" fluid>
        <v-row class="d-flex" no-gutters style="height: 150px;">
          <v-col class="align-start flex-column flex-grow-0 flex-sm-shrink-1" lg="3" >
            <v-row justify="center" class="my-n12">
                <v-avatar class="profile my-n12" color="grey" size="200">
                  <div class="text-center">
                    <v-dialog v-model="dialog" width="600">
                      <form @submit.prevent="previewImage">
                      <v-card>
                        <v-card-title class="grey lighten-2" >
                          Select an image to upload (maximum size 2MB)
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          
                            <input type="file" @change="getImage" accept="image/*">
                            
                         
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-spacer>
                          </v-spacer>
                            <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
                            <!-- <input type="submit" value="Upload"> -->
                            <v-btn color="primary" text type="submit">Upload</v-btn> 
                        </v-card-actions>
                      </v-card>
                    </form>
                    </v-dialog>
                  </div>
                  <v-img contain v-if="profileImage" :src="profileImage"></v-img>
                  <!-- <v-file-input show-size  rounded :rules="rules" accept="image/png, image/jpeg, image/jpg, imagr/bmp" prepend-icon="mdi-camera"></v-file-input> -->
                  <v-btn v-else text icon color="white" ripple @click="dialog = true"><v-icon large >mdi-camera</v-icon></v-btn>
                </v-avatar>         
            </v-row>
          </v-col>
          <v-col class="align-start flex-column flex-grow-1 flex-shrink-0" style="background-color: white">
            <v-row class="px-4">
              <v-col class="pa-8"> 
                <h2 style="font-weight: normal;">{{ username.toUpperCase() }}</h2>
              </v-col>
              
            </v-row>
          </v-col>
          <v-col lg="3" class="align-end flex-column flex-grow-0 flex-shrink-1"  >
            <p v-if="res"></p>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </AppLayout>
</template>
<script>
  import AppLayout from '../shared/Layout'
  export default{
    components: {
      AppLayout
    },
    data () {
      return {
        coverImage: 'profile-bg.png',
        username: '',
        profileImage: '',
        rules: [
          value => !value || value.size < 2000000 || 'Image size should be less than 2MB!'
        ],
        dialog: false,
        user: {
          avatar: null
        },
        file: null,
        imageData: '',
        res: '',
        formData: null
        
      }
    },
    created (){
      this.username = this.$store.state.currentUser.name;
      this.profileImage = this.$store.state.profileImage;
    },
    methods: {
      onImageUpload () {
        this.$store.commit('getFile', this.file[0])
        this.dialog = false
      },
        previewImage (){
          let id = this.$store.state.currentUser.id;
          const formData = new FormData()
          formData.append('avatar', this.file);
          var self=this
          this.$http.image.post(`users/image/${id}`,formData)
            .then(response => {
            if(response.data.path){
              self.$store.commit('getprofileImage', response.data.path)
              self.profileImage = response.data.path
              self.dialog = false
            }
            })
            .catch(e => {
              self.res = e
              self.dialog = false
              })
        },
        getImage (event){
          this.file = event.target.files[0]
        }
    }
  }
</script>
<style>
  .dp-cover{
    background-image: image('profile-bg.png');
    height: 100px;
  }
</style>