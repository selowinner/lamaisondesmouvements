<template>
  <div class="bodyBox">
    <div class="TheBoxBody">
      <p class="sectionTitle">Messagerie</p>
      <v-container fluid class="pouletBr">
        <v-row>
          <v-col cols="12" md="3" lg="3">
            <div class="numberWrapper">
              <v-form ref="form1">
                <v-container fluid class="addMessage">
                  <v-row>
                    <v-col cols="12" md="12" lg="12" style="display:flex; justify-content:center">
                      <v-switch
                        inset
                        v-model="switch1"
                        :label="`ENVOYER A : ${dest}`"
                      ></v-switch>
                    </v-col>
                    <v-col cols="12" md="12" lg="12" style="margin-top:-25px"> 
                      <v-text-field height="60" 
                        background-color="#3e886d4a" 
                        solo
                        label="Objet"
                        append-icon="mdi-matrix"
                        ref="topic"
                        type="text"
                        :value="MailResponseTopic"
                        @keyup="manualTopicdata = $event.target.value"
                        @change="TopicManualDefinition"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <div style="width:100%; padding: 0px 10px">
                      <v-textarea
                        solo
                        clearable
                        clear-icon="mdi-close-circle"
                        rows="7"
                        name="input-7-4"
                        label="Solo textarea"
                        class="the-message-area"
                        v-model="new_message.content"
                      ></v-textarea>
                    </div>
                    <v-col cols="12" md="12" lg="12" style="display:flex; justify-content:center">
                      <v-btn
                        large
                        depressed
                        color="mainGreenColor"
                        v-on:click.prevent="submit1"
                        >Enregistrer</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </div>
          </v-col>
          <v-col cols="12" md="9" lg="9">
            <div class="numberWrapper">
              <allMessageList :key="forcemessageListeRerender"></allMessageList>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <transition name="slide">
      <v-alert
        v-if="addingSuccess"
        elevation="13"
        type="success"
        max-width="300"
        class="alert"
        color="mainGreenColor"
      >
        Mail Envoyé avec succes</v-alert
      >
    </transition>
    <transition name="slide">
      <v-alert
        v-if="addingfalse"
        elevation="13"
        type="error"
        max-width="300"
        class="alert"
        color="error"
      >
        {{ messageaAddingResponse.message }}</v-alert
      >
    </transition>
  </div>
</template>












<script>
import axios from "axios";
import allMessageList from "../components/messageList/alleMessagesList.vue";

export default {
  name: "Messagerie",
  components: {
    allMessageList,
  },

  data: () => ({
    // FOR DEST CHOSING
    switch1: false,


    // FOR FORM SENDING
    new_message: {
      topic: "",
      content: "",
      dest: 0,
      station_creator_id: ""
    },
    manualTopicdata:"",
    messageaAddingResponse: "",
    addingSuccess: false,
    addingfalse: false,
    
    messagecomponentKey: 1,

  }),

  methods: {
    submit1() {
      this.destDEf()
      axios({ url: "station/message/add", data: this.new_message, method: "POST" })
      .then((response) => {
        this.messageaAddingResponse = response.data;
        console.log(response.data);
        if (this.messageaAddingResponse.message == "success") {
          this.addingSuccess = !this.addingSuccess;
          setTimeout(() => {
            this.addingSuccess = !this.addingSuccess;
            this.forceRerender1();
          }, 3000);
        } else {
          this.addingfalse = !this.addingfalse;
          setTimeout(() => {
            this.addingfalse = !this.addingfalse;
          }, 3000);
        }
      })
      .catch((error) => {
        this.messageaAddingResponse = error.message;
        console.error("There was an error!", error);
      });

      this.$store.state.response_of_id = 0
      this.$refs.form1.reset();
    },

    // For table re-render after delete or update an item
    forceRerender1() {
      this.$store.state.MessageListRerender += 1;
    },

    destDEf() {
      if (this.switch1) {
        this.new_message.dest = 0
      } else {
        this.new_message.dest = 1
      }
      this.new_message.station_creator_id = localStorage.getItem("user-station");
      this.new_message.topic = this.MailResponseTopic
      if (this.MailResponseInitMailid != 0) {
        this.new_message.response_of_id = this.MailResponseInitMailid
      }
    },

    TopicManualDefinition() {
      // this.$store.state.ResponseTopic = this.manualTopicdata
      this.$store.state.ResponseTopic = this.manualTopicdata
    //  console.log(this.$store.state.ResponseTopic);
    },
  },

  computed: {
    dest() {
      return this.switch1? 'MINO':'Centrale'
    },
    MailResponseTopic() {
      return this.$store.state.ResponseTopic
    },
    MailResponseInitMailid() {
      return this.$store.state.response_of_id
    },

    forcemessageListeRerender () {
      return this.$store.state.MessageListRerender
    },
    
  },
};
</script>


















<style scoped>
.sectionTitle {
  margin: 0;
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: bold;
}
.numberWrapper {
  border-radius: 10px;
  background: white;
}
/* .rightBox,
.middleBox {
  height: 60vh;
} */
.addMessage {
   overflow-y: auto;
}

.addMessage::-webkit-scrollbar {
  width: 7px;
}
.addMessage::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
}

.addMessage::-webkit-scrollbar-thumb {
  background-color: var(--main-green-color);
  border-radius: 30px;
  border: 1px solid rgb(255, 255, 255);
}

.the-message-area{
  /* background: chocolate !important; */
}






@media (min-width: 960px) {
  .col-md-12 {
    height: 90px;
  }
}

/*++++++++++++++++
===> MEDIUM Large tablet to laptop	960px > < 1264px*<===
+++++++++++++++++*/
@media screen and (min-width: 960px) and (max-width:1100px){
  .addMessage {
    height: 65.5vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .v-btn:not(.v-btn--round).v-size--large {
    width: 100%;
}
    
}
</style>
