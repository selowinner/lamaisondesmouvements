<template>
  <div class="bodyBox">
    <div class="TheBoxBody">
      <p class="sectionTitle">Gestion livreurs</p>
      <v-container fluid class="pouletBr">
        <v-row>
          <v-col cols="12" md="3" lg="3">
            <div class="numberWrapper">
              <v-form ref="form1">
                <v-container fluid class="addSender">
                  <v-row>
                    <v-col cols="12" md="12" lg="12">
                      <v-text-field
                        height="60"
                        solo
                        label="Matricule"
                        append-icon="mdi-matrix"
                        ref="matri"
                        type="text"
                        value=""
                        persistent-hint
                        required
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="12">
                      <v-text-field
                        height="60"
                        background-color="#3e886d4a"
                        solo
                        label="Nom complet"
                        v-model="new_Sender.complet_name"
                        append-icon="mdi-account-details-outline"
                        ref="total_name"
                        type="text"
                        value=""
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="12">
                      <v-text-field
                        height="60"
                        solo
                        append-icon="mdi-map-marker"
                        ref="location"
                        type="text"
                        v-model="new_Sender.city"
                        value=""
                        label="Lieu d'habitation"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="12">
                      <v-text-field
                        height="60"
                        background-color="#3e886d4a"
                        solo
                        append-icon="mdi-motorbike"
                        v-model="new_Sender.conveyance"
                        ref="transport"
                        type="text"
                        label="Moyen de transport"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="12">
                      <v-text-field
                        height="60"
                        solo
                        append-icon="mdi-phone"
                        ref="pla_number"
                        type="number"
                        v-model="new_Sender.contact"
                        label="Numero de téléphone"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="12">
                      <v-btn
                        large
                        depressed
                        color="mainGreenColor"
                        style="color: white"
                        v-on:click.prevent="submit1"
                        >Enregistrer</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </div>
          </v-col>
          <v-col cols="12" md="8" lg="8">
            <div class="numberWrapper">
              <allSendersList :key="forceRerenderReturn"></allSendersList>
            </div>
          </v-col>
          <v-col cols="12" md="1" lg="1" class="leftNumber">
            <div class="stat1">
              <div class="N-icon">
                <v-icon color="mainGreenColor">mdi-account-group</v-icon>
              </div>
              <h1>{{ SenderNumber }}</h1>
              <h5 style="text-align: center">livreurs</h5>
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
        Livreur Enregistré avec succes</v-alert
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
        {{ senderaAddingResponse.message }}</v-alert
      >
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import allSendersList from "../components/expeditionList/alleSendersList.vue";

export default {
  name: "Expedition",
  components: {
    allSendersList,
  },

  data: () => ({
    // FOR FORM SENDING
    new_Sender: {
      complet_name: "",
      contact: "",
      city: "",
      conveyance: "",
      matriculation: "",
      company_id: "",
    },

    senderaAddingResponse: "",
    addingSuccess: false,
    addingfalse: false,

    sendercomponentKey1: 0,

    // FOR ANALYTICS
    // theNumberSender = 0,
  }),

  methods: {
    submit1() {
      this.matriculeGeneration();
      Vue.prototype.$http
        .post("http://127.0.0.1:3333/expedition/addsender", this.new_Sender)
        .then((response) => {
          this.senderaAddingResponse = response.data;
          console.log(response.data);
          if (this.senderaAddingResponse.message == "success") {
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
          this.senderaAddingResponse = error.message;
          console.error("There was an error!", error);
        });

      this.$refs.form1.reset();
    },

    matriculeGeneration() {
      let CurrentDate = new Date();
      let time = CurrentDate.getTime();
      let matricule = "SENDER" + time;

      this.new_Sender.matriculation = matricule;
    },

    // For table re-render after delete or update an item
    forceRerender1() {
      this.$store.state.sendercomponentKey += 1;
    },
  },

  computed: {
    forceRerenderReturn() {
      return this.$store.state.sendercomponentKey;
      // console.log(this.componentKey);
    },

    SenderNumber() {
      // let sernders = this.$store.getters.Senders
      // for (let index = 0; index < sernders.length; index++) {
      //     if (sernders[index].activation_state == 1) {

      //     }

      // }

      return this.$store.getters.Senders.length;
      // console.log(this.componentKey);
    },
  },

  created() {
    this.company_id = localStorage.getItem("user-station");
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
  height: 100%; /*100% de Thebody qui est dans le CSS global*/
  border-radius: 10px;
  background: white;
}
/* ,
.middleBox {
  height: 57vh;
} */
/* .addSender {
  height: 150px;
} */

.stat1 {
  background: white;
  height: 100%;
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

/* 
.statWrapper{
    height: 270px;
    border-radius: 10px;
    background: white;
}
.statWrapper1{
    height: 300px;
    border-radius: 10px;
    padding-top: 10px;
    background: white;
}
.statWrapper1 h4{
    margin-left: 10px;
} */

@media (min-width: 960px) {
  .col-md-12 {
    height: 78px;
  }
}

/*------------------------
    ---RESPONSIVE--- 
--------------------------*/

/*++++++++++++++++
===> MEDIUM Large tablet to laptop	960px > < 1264px*<===
+++++++++++++++++*/
@media screen and (min-width: 960px) and (max-width: 1190px){
  .stat1 {
    font-size: 12px;
  }
  .N-icon {
    height: 35px;
    width: 35px;
  }
  .v-btn:not(.v-btn--round).v-size--large {
    width: 100%;
  }
}
/*-------END------------*/
</style>
