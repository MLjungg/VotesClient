<!-- TODO: Fixa storlek på bilden -->
<template>
  <v-app style="background-color: rgb(240, 240, 240)">
    <v-toolbar dark color="blue-grey darken-1">
      <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat color="white" @click = "redirect('login')" >Sign Out</v-btn>
        </v-toolbar-items>
    </v-toolbar>
      <v-alert
      class="ma-0 pa-3"
      v-model="noMoreVideo"
      dismissible
      icon=" "
      type="info"
    >Thanks for voting, there is no more video to vote on!</v-alert>
    <v-container grid-list-md>
      <v-layout align-content-center justify-center>
        <v-flex xs10 align-self-center align-content-center>
          <iframe id="myiframe" :src= video width="780" height="700" frameborder="0" style="" allowfullscreen webkitallowfullscreen msallowfullscreen display:none></iframe>        </v-flex>
      </v-layout>
      <v-layout justify-center row wrap>
        <v-flex xs10 md3>
          <v-btn :disabled= buttonDisabled color="red darken-1" @click = "vote(1)">Väldigt oengagerad</v-btn>
        </v-flex>
        <v-flex xs10 md2>
          <v-btn :disabled= buttonDisabled color="red lighten-3" @click = "vote(2)">Oengagerad</v-btn>
        </v-flex>
        <v-flex xs10 md2>
          <v-btn :disabled= buttonDisabled color="yellow" @click = "vote(3)">Neutral</v-btn>
        </v-flex>
        <v-flex xs10 md2>
          <v-btn :disabled= buttonDisabled color="green lighten-3" @click = "vote(4)">Engagerad</v-btn>
        </v-flex>
        <v-flex xs10 md2>
           <v-btn :disabled= buttonDisabled color="green darken-1" @click = "vote(5)">Väldigt engagerad</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import RequestService from '@/services/RequestService'

export default {
  data () {
    return {
      user: this.$cookies.get('user'),
      video: '',
      videoId: '',
      noMoreVideo: '',
      alert: false,
      buttonDisabled: false
    }
  },
  mounted () {
    this.getVideo()
  },

  methods: {
    redirect (route) {
      if (route === 'login') {
        this.$cookies.remove('token')
        this.$cookies.remove('user')
      }
      this.$router.push(route)
    },

    async getVideo () {
      try {
        const response = await RequestService.getVideo({userId: this.user})
        this.video = response.data.path
        console.log(this.video)
        this.videoId = response.data.id
      } catch (error) {
        // No video to vote on
        this.noMoreVideo = true
        this.video = ''
        this.videoId = ''
      }
    },

    async vote (vote) {
      // Disable buttons for 8 sec after vote.
      this.disableButton()
      try {
        const response = await RequestService.vote({
          UserId: this.user,
          Vote: vote,
          VideoId: this.videoId
        })
        console.log(response) // User information

        // Load new video
        this.getVideo()
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    disableButton () {
      this.buttonDisabled = true
      setTimeout(this.enableButton, 7500)
    },
    enableButton () {
      this.buttonDisabled = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.preview-header-wrapper >{
    display: none;
}

</style>
