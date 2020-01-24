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
                      <v-card>
                        <v-card-title class="grey lighten-2" >
                          Select an image to upload (maximum size 2MB)
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <!-- <v-file-input label="Select Image.." outlined show-size shaped prepend-icon="mdi-camera" @change="previewImage"></v-file-input> -->
         
                          <input type="file" @change="previewImage" accept="image/*">
          
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-spacer>
                          </v-spacer>
                            <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
                            <v-btn color="primary" text @click="onImageUpload">Upload</v-btn> 
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <div class="image-preview" v-if="imageData.length > 0">
                      <img class="preview" :src="imageData">
                  </div>
                  </div>
                  <v-img v-if="profileImage" :src="profileImage"></v-img>
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
        file: [],
        imageData: '',
        res: ''
        
      }
    },
    created (){
      this.username = this.$store.state.currentUser.name;
    },
    methods: {
      onImageUpload () {
        console.log(this.file)
        console.log(this.file.type)
        this.$store.commit('getFile', this.file[0])
        this.dialog = false
      },
      previewImage: function(event) {
            // Reference to the DOM input element
            var input = event.target;
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                // create a new FileReader to read this image and convert to base64 format
                var reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.imageData = e.target.result;
                    var imageBase = this.imageData.split(',')[1];
                    console.log(imageBase)
                    var id = this.$store.state.currentUser.id;
                    console.log(id)
                    this.$http.secured.patch(`users/${id}`,{ user: { avatar: imageBase} })
                    .then(response => { self.res = response.data })
                    .catch(e => {
                      self.res = e
                    })
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
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