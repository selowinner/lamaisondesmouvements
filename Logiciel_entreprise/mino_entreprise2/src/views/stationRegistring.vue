<template>
  <div class="bodyBox">
    <div class="TheBoxBody">
      <!-- <p class="sectionTitle">Gestion Expédition</p> -->
      <v-container fluid class="pouletBr">
        <v-row>
          <v-col cols="12" md="3" lg="3">
            <div class="numberWrapper rightBox">
              <p class="sectionTitle">Enregistrement</p>
              <v-form ref="form1">
                <v-container fluid class="addStation">
                  <v-row>
                    <v-col cols="12" md="12" lg="12">
                      <v-text-field
                        height="60"
                        solo
                        label="Pays"
                        append-icon="mdi-home-city"
                        v-model="new_Station.country"
                        ref="matri"
                        type="text"
                        value=""
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="12">
                      <v-text-field
                        height="60"
                        background-color="#3e886d4a"
                        solo
                        label="Ville"
                        v-model="new_Station.city"
                        append-icon="mdi-map-marker"
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
                        append-icon="mdi-transit-connection-variant"
                        ref="location"
                        type="text"
                        v-model="new_Station.neighborhood"
                        value=""
                        label="Quartier"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="12">
                      <v-text-field
                        height="60"
                        background-color="#3e886d4a"
                        solo
                        append-icon="mdi-robot-happy"
                        v-model="new_Station.other_denomination"
                        ref="transport"
                        type="text"
                        label="Denomination de la gare"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="12">
                      <v-text-field
                        height="60"
                        solo
                        append-icon="mdi-comment-text"
                        ref="pla_number"
                        type="text"
                        v-model="new_Station.description"
                        label="Description"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="12">
                      <v-text-field
                        height="60"
                        background-color="#3e886d4a"
                        solo
                        label="Contact"
                        append-icon="mdi-phone"
                        ref="matri"
                        type="number"
                        v-model="new_Station.contact"
                        value=""
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="12">
                      <v-text-field
                        height="60"
                        solo
                        append-icon="mdi-matrix"
                        ref="location"
                        type="text"
                        v-model="new_Station.matriculation"
                        value=""
                        label="Code D'identification de la gare"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="12">
                      <v-text-field
                        height="60"
                        solo
                        background-color="#3e886d4a"
                        append-icon="mdi-matrix"
                        ref="location"
                        type="text"
                        v-model="new_Station.mino_code"
                        value=""
                        label="Code Mino"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="12">
                      <v-switch
                        v-model="new_Station.package_service_use"
                        label="Service expédition de colis"
                      ></v-switch>
                      <!-- <v-text-field height="60" background-color="#3e886d4a" solo label="Service livraison" v-model="new_Station.complet_name" append-icon="mdi-account-details-outline"  ref="total_name"  type="text"   value=""  persistent-hint required ></v-text-field> -->
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
          <v-col cols="12" md="7" lg="7">
            <div class="numberWrapper middleBox">
              <allStaions :key="forceRerenderReturn"></allStaions>
            </div>
          </v-col>
          <v-col cols="12" md="2" lg="2" class="leftNumber">
            <div class="stat1">
              <div class="element1">
                <div class="N-icon">
                  <v-icon color="mainGreenColor">mdi-account-group</v-icon>
                </div>
                <h5>NOUVEAU code-mino</h5>
              </div>
              <div class="element2">
                <div class="code" v-for="item in Mino_code" :key="item.index">
                  <v-icon color="mainGreenColor">mdi-matrix</v-icon>
                  <p>{{ item.code }}</p>
                </div>
              </div>
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
        Gare Enregistrée avec succes</v-alert
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
        {{ stationaAddingResponse.message }}</v-alert
      >
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import allStaions from "../components/station/allStaions.vue";

export default {
  name: "stationRegistring",
  components: {
    allStaions,
  },

  data: () => ({
    // FOR FORM SENDING
    new_Station: {
      matriculation: "",
      description: "",
      country: "",
      contact: "",
      city: "",
      neighborhood: "",
      other_denomination: "",
      mino_code: "",
      package_service_use: false,
      use_option_id: "1",
      user_id: "1",
      Central_id: "",
    },

    stationaAddingResponse: "",
    addingSuccess: false,
    addingfalse: false,
  }),

  methods: {
    submit1() {
      Vue.prototype.$http
        .post("http://127.0.0.1:3333/station/add", this.new_Station)
        .then((response) => {
          this.stationaAddingResponse = response.data;
          console.log(response.data);
          if (this.stationaAddingResponse.message == "success") {
            this.addingSuccess = !this.addingSuccess;
            setTimeout(() => {
              this.addingSuccess = !this.addingSuccess;
              this.forceRerender1();
            }, 3000);
            this.$refs.form1.reset();
          } else {
            this.addingfalse = !this.addingfalse;
            setTimeout(() => {
              this.addingfalse = !this.addingfalse;
            }, 3000);
          }
        })
        .catch((error) => {
          this.stationaAddingResponse = error.message;
          console.error("There was an error!", error);
        });
    },

    // For table re-render after delete or update an item
    forceRerender1() {
      this.$store.state.stationcomponentKey += 1;
    },
  },

  computed: {
    ...mapGetters(["Mino_code"]),

    forceRerenderReturn() {
      return this.$store.state.stationcomponentKey;
      // console.log(this.componentKey);
    },
  },

  created() {
    this.$store.dispatch("init_mino_code");
    this.new_Station.Central_id = localStorage.getItem("user-central");
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
  height: 62vh;
}
.addStation {
  height: 55vh;
  overflow: auto;
}
.addStation::-webkit-scrollbar {
  width: 15px;
}
.addStation::-webkit-scrollbar-track {
  background: #ffffff;
}

.addStation::-webkit-scrollbar-thumb {
  background-color: var(--main-green-color);
  border-radius: 30px;
  border: 5px solid #ffffff;
}
.element1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
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
  background: var(--main-important-color);
  border-radius: 100px;
}

.element2 {
  height: 40vh;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
}
.element2::-webkit-scrollbar {
  width: 15px;
}
.element2::-webkit-scrollbar-track {
  background: #ffffff;
}

.element2::-webkit-scrollbar-thumb {
  background-color: var(--main-green-color);
  border-radius: 30px;
  border: 5px solid #ffffff;
}
.code {
  border-radius: 5px;
  height: 50px;
  width: 100%;
  background: #3e886d4a;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 5px;
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
  }
}
</style>
