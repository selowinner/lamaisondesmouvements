<template>
  <div class="bodyBox">
    <div class="TheBoxBody ForTravelDeclaration">
      <!-- <p class="MaintTitle">Déclaration de voyage</p> -->
      <p class="sectionTitle">Déclaration de voyage</p>
      <!-- <div>
              <h1>Déclaration de voyage</h1>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit reprehenderit atque voluptatem animi architecto nihil, iste, rerum maiores.</p>
            </div> -->
      <!-- <div class="formRadio">
              <v-radio-group v-model="row" row dense mandatory>
                <v-radio label="JOUR D'APRES" value="radio-1" v-on:click= "DayType = true"></v-radio>
                <v-radio label="AUTRE JOUR" value="radio-2" v-on:click= "DayType = false"></v-radio>
              </v-radio-group>
            </div> -->
      <v-form>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="4" lg="4">
              <v-text-field
                outlined
                v-model="newTravel_1.departure_place"
                ref="dep_place"
                color="red"
                type="text"
                value="Lieu de départ"
                label="Lieu de départ"
                persistent-hint
                required
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" lg="4">
              <v-text-field
                outlined
                ref="dep_place"
                color="red"
                type="text"
                value=""
                label="Lieu de départ"
                persistent-hint
                required
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" lg="4">
              <v-text-field
                v-on:click="dateGeneration"
                outlined
                v-model="newTravel_1.destination"
                ref="dest_place"
                type="text"
                label="Destination"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" lg="4">
              <v-text-field
                outlined
                v-model="newTravel_1.departure_time"
                ref="dep_time"
                type="time"
                label="Heure départ"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" lg="4">
              <v-text-field
                outlined
                v-model="newTravel_1.total_car_place_number"
                ref="pla_number"
                type="number"
                label="Nombre de place à disponible"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" lg="4">
              <v-text-field
                outlined
                v-model="newTravel_1.car_informations"
                ref="car_infos"
                type="text"
                label="type de car. ex: climatisé, dernière generation ..."
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" lg="4">
              <v-text-field
                outlined
                v-model="newTravel_1.car_matriculation"
                ref="car_matri"
                type="text"
                label="Matricule du car"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" lg="4">
              <v-text-field
                outlined
                v-model="newTravel_1.place_price"
                ref="pl_price"
                type="number"
                label="Prix du ticket"
                persistent-hint
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" lg="4">
              <v-text-field
                outlined
                v-model="newTravel_1.Intemediatestation"
                ref="st_inter"
                type="text"
                label="atation intermediaires"
                persistent-hint
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" lg="4">
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
    <transition name="slide">
      <v-alert
        v-if="addingSuccess"
        elevation="13"
        type="success"
        max-width="300"
        class="alert"
        color="mainGreenColor"
      >
        Voyage ajouté avec succes</v-alert
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
        {{ traveladdingResponse.message }}</v-alert
      >
    </transition>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "TravelDeclaration",
  components: {},

  data: () => ({
    row: "check",
    DayType: true,

    // FOR FORM SENDING
    newTravel_1: {
      car_informations: "",
      car_matriculation: "",
      departure_place: "Abidjan",
      destination: "",
      departure_time: "",

      departure_date: "",
      // place_to_sell_by_mino_number : '',
      total_car_place_number: "",
      place_price: "",
      Intemediatestation: "",

      company_id: "1",
      user_id: "1",
    },
    newTravel_2: {
      car_informations: "",
      car_matriculation: "",
      departure_place: "Abidjan",
      destination: "",
      departure_time: "",

      departure_date: "",
      // place_to_sell_by_mino_number : '',
      total_car_place_number: "",
      place_price: "",

      company_id: "1",
      user_id: "1",
    },
    traveladdingResponse: "",
    addingSuccess: false,
    addingfalse: false,
  }),

  methods: {
    submit1() {
      // for intermadiate station
      if (this.newTravel_1.Intemediatestation) {
        this.newTravel_1.Intemediatestation = this.newTravel_1.Intemediatestation.split(
          " "
        );
        for (
          let index = 0;
          index < this.newTravel_1.Intemediatestation.length;
          index++
        ) {
          this.newTravel_1.Intemediatestation[index] = {
            station_name: this.newTravel_1.Intemediatestation[index],
          };
        }
      }

      Vue.prototype.$http
        .post("http://127.0.0.1:3333/travel/add", this.newTravel_1)
        .then((response) => {
          this.traveladdingResponse = response.data;
          console.log(response.data);
          if (this.traveladdingResponse.message == "success") {
            this.addingSuccess = !this.addingSuccess;
            setTimeout(() => {
              this.addingSuccess = !this.addingSuccess;
            }, 3000);
          } else {
            this.addingfalse = !this.addingfalse;
            setTimeout(() => {
              this.addingfalse = !this.addingfalse;
            }, 3000);
          }
        })
        .catch((error) => {
          this.traveladdingResponse = error.message;
          console.error("There was an error!", error);
        });

      this.newTravel_1.Intemediatestation = "";
    },

    dateGeneration() {
      const CurrentDate = new Date();
      var day = CurrentDate.getDate() + 1;
      var year = CurrentDate.getFullYear();
      var month = CurrentDate.getMonth() + 1;
      this.newTravel_1.departure_date = year + "-" + month + "-" + day;
    },
  },
};
</script>

<style scoped>
/* .TheBoxBody{
    height: 60vh;
   
} */

.ForTravelDeclaration {
  background: red;
}

.MaintTitle {
  background: var(--main-green-color);
  line-height: 40px;
  text-align: center;
  font-weight: bold;
  color: var(--main-white-color);
  font-size: 17px;
}
.sectionTitle {
  margin: 0;
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: bold;
  /* text-align: start; */
}

.ForTravelDeclaration > div:nth-child(2) {
  border-bottom: solid 0.5px var(--font-color);
  margin: 0 45px;
}

.v-form {
  padding: 0 35px;
}

.col-lg-4,
.col-md-4 {
  padding-bottom: 0px;
}

.formRadio {
  display: flex;
  justify-content: center;
}

.v-input--selection-controls {
  margin-top: 20px;
  padding-top: 0px;
}
.v-btn:not(.v-btn--round).v-size--large {
  height: 58px;
  min-width: 100%;
  padding: 0 19.5555555556px;
  color: white;
}

.alert {
  position: absolute;
  top: -90px;
  left: 82%;
}
/* .theme--light.v-btn {
    
} */

.slide-enter {
  transform: translateX(-500px);
}
.slide-enter-active {
  transform: translateX(500px);
}
.slide-leave {
  /* transform: translateX(0) */
}
.slide-leave-active {
  transform: translateX(-20px);
}

@media (min-width: 960px) {
  .col-md-4 {
    height: 75px;
  }
}
</style>
