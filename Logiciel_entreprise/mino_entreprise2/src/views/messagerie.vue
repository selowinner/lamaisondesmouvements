<template>
  <div class="bodyBox">
    <div class="TheBoxBody">
      <v-container fluid class="pouletBr">
        <v-row>
          <v-col cols="12" md="3" lg="3">
            <div class="numberWrapper rightBox">
              <p class="sectionTitle">Messagerie</p>
              <v-form ref="form1">
                <v-container fluid class="addMessage">
                  <v-row>
                    <v-col cols="12" md="12" lg="12" style="display:flex; justify-content:center; margin-bottom:-25px">
                      <v-switch
                        inset
                        v-model="switch1"
                        label="Envoyer à mino"

                      ></v-switch>
                    </v-col>
                    <v-col cols="12" md="12" lg="12" style="display:flex; justify-content:center; margin-bottom:-25px">
                      <v-select
                        v-model="new_message.dest"
                        :items="Stations"
                        item-text="neighborhood"
                        item-value="id"
                        label="gare(s) destinataire(s)"
                        multiple
                        solo
                      >
                        <template v-slot:selection="{ item, index }">
                          <v-chip v-if="index === 0">
                            <span>{{ item.neighborhood }}</span>
                          </v-chip>
                          <span
                            v-if="index === 1"
                            class="grey--text text-caption"
                          >
                            (+{{ new_message.dest.length - 1}} autres)
                          </span>
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="12" md="12" lg="12" style="margin-top:0px">
                      <v-text-field dense
                        background-color="#3e886d4a" 
                        solo
                        label="Objet"
                        append-icon="mdi-matrix"
                        ref="matri"
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
                        rows="5"
                        auto-grow
                        name="input-7-4"
                        label="Le message"
                        v-model="new_message.content"
                      ></v-textarea>
                    </div>
                    <v-col cols="12" md="12" lg="12" style="display:flex; justify-content:center; margin-top:-25px;">
                      <v-btn
                        large
                        depressed
                        @click="submit1"
                        color="mainGreenColor"
                        >Enregistrer</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </div>
          </v-col>
          <v-col cols="12" md="9" lg="9">
            <div class="numberWrapper middleBox">
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
        Message envoyé</v-alert
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
import { mapGetters } from "vuex";
import axios from "axios";
import allMessageList from "../components/messageList/alleMessagesList.vue";

export default {
  name: "Messagerie",
  components: {
    allMessageList,
  },

  data: () => ({
    // FOR DEST CHOSING
    items: ['foo', 'bar', 'fizz', 'buzz'],
    // dest: [],

    // FOR DEST CHOSING
    switch1: false,

    // FOR FORM SENDING
    new_message: {
      topic: "",
      content: "",
      dest: [],
      central_creator_id: ""
    },
    manualTopicdata:"",
    messageaAddingResponse: "",
    addingSuccess: false,
    addingfalse: false,
    
    // messagecomponentKey: 1,

    // FOR ANALYTICS
    // theNumberSender = 0,
  }),

  methods: {

    submit1() {
      this.destDEf()
      console.log(this.new_message);
      axios({ url: "central/message/add", data: this.new_message, method: "POST" })
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
        this.new_message.dest.push(0)
      }
      this.new_message.central_creator_id = localStorage.getItem("user-central");
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
    ...mapGetters(["Stations"]),

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
  margin-left: 15px;
  font-size: 18px;
  font-weight: bold;
}
.numberWrapper {
  border-radius: 10px;
  background: white;
}
.rightBox,
.middleBox {
  height: 61vh;
}
.addMessage {
  height: 55vh;
  overflow: auto;
}
.addMessage::-webkit-scrollbar {
  width: 7px;
}
.addMessage::-webkit-scrollbar-track {
  background: #ffffff;
}

.addMessage::-webkit-scrollbar-thumb {
  background-color: var(--main-green-color);
  border-radius: 30px;
  border: 1px solid #ffffff;
}

.stat1 {
  background: white;
  height: 60vh;
  border-radius: 10px;
  margin-bottom: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.N-icon {
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3e886d4a;
  border-radius: 100px;
}

@media (min-width: 960px) {
  .col-md-12 {
    height: 90px;
  }
}
</style>
