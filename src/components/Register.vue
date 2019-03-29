<template>
  <v-app style="background-color: rgb(240, 240, 240)">
    <v-toolbar height=90 dark color="blue-grey darken-1">
    <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat @click = "redirect('login')" color="white">login</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md8 lg4 xl4>
            <v-card class="elevation-14">
              <v-toolbar dark color="blue-grey darken-1">
                <v-toolbar-title>Registration form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="firstName" name="firstName" label="First name" type="text"></v-text-field>
                  <v-text-field v-model="surName" name="firstName" label="Surname" type="text"></v-text-field>
                  <v-text-field v-model="email" name="email" label="Email" type="text"></v-text-field>
                  <v-text-field v-model="password" name="password" label="Password" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer>
                  <div class="err" v-html="error" />
                </v-spacer>
                <v-btn class="white--text" @click = "register" color="blue-grey darken-1">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import RequestService from '@/services/RequestService'
export default {
  data () {
    return {
      firstName: '',
      surName: '',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await RequestService.register({
          firstName: this.firstName,
          surName: this.surName,
          email: this.email,
          password: this.password
        })
        console.log(response.data) // User information
        this.redirect('login')
      } catch (error) {
        this.error = error.response.data.error
      }
    },

    redirect (route) {
      this.$router.push(route)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.err{
  color:red
}

</style>
