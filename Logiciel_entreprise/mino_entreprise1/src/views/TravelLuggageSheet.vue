<template>
  <div class="bodyBox">
    <div class="TheBoxBody">
      <p class="sectionTitle">Gestion des bagages</p>
      <v-container fluid class="pouletBr">
        <v-row>
          <v-col cols="12" md="3" lg="3">
            <div class="numberWrapper">
              <v-form ref="form1">
                <v-container fluid class="addluggage">
                  <v-row>
                    <v-col cols="12" md="12" lg="12">
                      <v-text-field
                        height="60"
                        solo
                        label="Nature"
                        append-icon="mdi-pen"
                        ref="matri"
                        v-model="new_luggage.denomination"
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
                        label="Description"
                        append-icon="mdi-file-document-edit-outline"
                        ref="desc"
                        v-model="new_luggage.description"
                        type="text"
                        value=""
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="6">
                      <v-text-field
                        height="60"
                        background-color="#3e886d4a"
                        solo
                        label="Taille min"
                        v-model="new_luggage.min_size"
                        append-icon="mdi-arrow-up-down"
                        ref="total_name"
                        type="number"
                        value=""
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="6">
                      <v-text-field
                        height="60"
                        solo
                        append-icon="mdi-arrow-up-down"
                        ref="location"
                        type="number"
                        v-model="new_luggage.max_size"
                        value=""
                        label="Taille max"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="6">
                      <v-text-field
                        height="60"
                        background-color="#3e886d4a"
                        solo
                        append-icon="mdi-weight-kilogram"
                        v-model="new_luggage.min_weight"
                        ref="transport"
                        type="number"
                        label="Poids min"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="6">
                      <v-text-field
                        height="60"
                        solo
                        append-icon="mdi-weight-kilogram"
                        ref="pla_number"
                        type="number"
                        v-model="new_luggage.max_weight"
                        label="Poids max"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="12">
                      <v-text-field
                        height="60"
                        solo
                        append-icon="mdi-cash-multiple"
                        ref="cash"
                        type="number"
                        v-model="new_luggage.unit_price"
                        label="Prix"
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
          <v-col cols="12" md="9" lg="9">
            <div class="numberWrapper ">
              <allLuggageList :key="forceRerenderReturn"></allLuggageList>
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
        Nouveau type Enregistré avec succes</v-alert
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
        {{ luggageaAddingResponse.message }}</v-alert
      >
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import allLuggageList from "../components/travelListe/allLuggageList.vue";

export default {
  name: "TravelLuggage",
  components: {
    allLuggageList,
  },

  data: () => ({
    // FOR FORM SENDING
    new_luggage: {
      denomination: "",
      min_weight: "",
      max_weight: "",
      min_size: "",
      max_size: "",
      unit_price: "",
      description: "",
      company_id: "1",
    },

    luggageaAddingResponse: "",
    addingSuccess: false,
    addingfalse: false,

    luggagecomponentKey1: 0,

    // FOR ANALYTICS
    // theNumberluggage = 0,
  }),

  methods: {
    submit1() {
      Vue.prototype.$http
        .post("http://127.0.0.1:3333/Luggage/add", this.new_luggage)
        .then((response) => {
          this.luggageaAddingResponse = response.data;
          console.log(response.data);
          if (this.luggageaAddingResponse.message == "success") {
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
          this.luggageaAddingResponse = error.message;
          console.error("There was an error!", error);
        });

      this.$refs.form1.reset();
    },

    // For table re-render after delete or update an item
    forceRerender1() {
      this.$store.state.luggagecomponentKey += 1;
    },
  },

  computed: {
    forceRerenderReturn() {
      return this.$store.state.luggagecomponentKey;
    },
  },
};
</script>

<style scoped>
.TheBoxBody{
    
}
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
  height: 57vh;
} */
/* .addluggage {
  height: 57vh;
  overflow-y: auto;
} */
.addluggage::-webkit-scrollbar {
  width: 7px;
}
.addluggage::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
}

.addluggage::-webkit-scrollbar-thumb {
  background-color: var(--main-green-color);
  border-radius: 30px;
  border: 1px solid rgb(255, 255, 255);
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
    height: 90px;
    margin-bottom: -15px;
  }
  .col-md-6 {
    height: 90px;
    margin-bottom: -15px;
  }
}



/*++++++++++++++++
===> MEDIUM Large tablet to laptop	960px > < 1264px*<===
+++++++++++++++++*/
@media screen and (min-width: 960px) and (max-width: 1264px){
  .addluggage {
    height: 57vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .v-btn:not(.v-btn--round).v-size--large {
    width: 100%;
}
    
}
</style>
