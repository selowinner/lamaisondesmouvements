<template>
  <div class="TheBoxBody ForTravelDeclaration">
    <p class="MaintTitle">GESTION DES OBJETS EGARE</p>
    <div>
      <div class="formRadio">
        <v-radio-group v-model="row" row dense mandatory>
          <v-radio
            label="ListE DES OBJETS EGARES"
            value="radio-1"
            v-on:click="DayType = 0"
          ></v-radio>
        </v-radio-group>
      </div>
      <v-row>
        <v-col cols="12" md="4" lg="4"></v-col>
        <v-col cols="12" md="4" lg="4">
          <v-text-field
            v-model="search"
            dense
            outlined
            hide-details
            prepend-inner-icon="mdi-search"
            label="Rechercher"
            class="theSeachBar"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" lg="4"></v-col>
      </v-row>
    </div>

    <div class="tableWrapperDiv" v-if="DayType == 0">
      <!-- STATISTIC DIALOG for OBJET EGARE-->
      <v-dialog
        v-model="dialog"
        max-width="410"
        overlay-color="black"
        overlay-opacity="0.8"
      >
        <v-card>
          <v-card-text>
            <p class="mainGreenColor dialogTitle">DETAILS OBJET EGARE</p>
            <div class="mainGreenColor dialogWrapper">
              <div class="imgAndTitle"></div>
              <p class="subtitle">INFORMATION OBJET</p>
              <div class="backBoad backBoad-1">
                <div class="basicInfo">
                  <p>{{ editedItem.description }}</p>
                </div>
                <div class="travelResume">
                  <div class="part">
                    <p>
                      <span>{{ editedItem.nature }}</span
                      ><br />Nature
                    </p>
                    <p>
                      <span>{{ editedItem.weight }} Kg</span><br />poids
                    </p>
                    <p>
                      <span>{{ editedItem.size }} m</span><br />Taille
                    </p>
                  </div>
                  <div class="part">
                    <p>
                      <span>{{ editedItem.contact }}</span
                      ><br />Contact
                    </p>
                    <p>
                      <span>{{
                        editedItem.ticket_number_or_identification
                      }}</span
                      ><br />ticket
                    </p>
                    <p>
                      <span>{{ editedItem.departure_date }}</span
                      ><br />Date du depart
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-data-table
        dense
        :headers="headers"
        :items="LostObjets"
        :search="Seach"
        hide-default-footer
        class="backgroundTree"
      >
        <!-- FOR SEE DETAILS AND STATISTIC DIALOG for OBJET EGARE -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon color="mainGreenColor" @click="editItem(item)"
            ><v-icon small> mdi-eye </v-icon></v-btn
          >
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MinoStationLostObjetList",

  components: {},

  data: () => ({
    row: "check",
    DayType: 0,

    //for the list
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    search: "",
    headers: [
      {
        text: "CONTACT",
        align: "start",
        sortable: false,
        value: "contact",
      },
      { text: "NATURE", value: "nature" },
      { text: "LIEU EMBARCARTION", value: "departure_place" },
      { text: "DETAILS", value: "actions", sortable: false },
    ],

    editedItem: {
      name: "",
      date: "",
      heure: "",
      details: {
        vendus: 0,
        aVendre: 0,
        restant: 0,
        annules: 0,
        gains: 0,
      },
    },

    dialog: false,
  }),

  methods: {
    editItem: function (item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      console.log(item.name);
    },
  },

  computed: {
    ...mapGetters(["LostObjets"]),

    StationOne() {
      return this.$store.state.OneSTationForLost;
    },

    Seach() {
      return this.$store.state.seachAll;
    },
  },

  created() {
    this.$store.dispatch("init_lostObjets", this.StationOne);
  },
};
</script>

<style scoped>
.TheBoxBody {
  height: 60vh;
  overflow-y: hidden;
}

.ForTravelDeclaration {
  background: var(--backgroundTree);
  text-align: center;
  border-radius: 10px;
}

.MaintTitle {
  background: var(--font-color);
  line-height: 40px;
  text-align: center;
  font-weight: bold;
  color: white;
  font-size: 17px;
  margin-top: 0;
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
  padding-bottom: 80px;
  padding-top: 50px;
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
/* .theme--light.v-btn {
    
} */

.tableWrapperDiv {
  height: 63%;
  overflow-y: auto;
}
.tableWrapperDiv::-webkit-scrollbar {
  width: 20px;
}
.tableWrapperDiv::-webkit-scrollbar-track {
  background: var(--backgroundTree);
}

.tableWrapperDiv::-webkit-scrollbar-thumb {
  background-color: var(--main-green-color);
  border-radius: 30px;
  border: 7px solid var(--backgroundTree);
}

.v-data-table {
  line-height: 1.5;
  max-width: 100%;
  margin: 0px;
  margin-left: 70px;
}
.v-btn {
  font-weight: bold;
  letter-spacing: normal;
  text-transform: none;
}

.theme--light.v-card {
  background-color: transparent;
  color: rgba(0, 0, 0, 0.87);
}

.dialogTitle {
  margin: 0;
  display: inline-block;
  padding: 2px 10px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: -0.5px;
  font-size: 13px;
  color: white;
}
.dialogWrapper {
  width: 100%;
  margin: 0px;
  padding: 5px;
  border-radius: 0px 0px 5px 5px;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%),
    0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
}

.imgAndTitle {
  margin: 0px 0px;
  height: 220px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  background: linear-gradient(
      180deg,
      rgb(0 0 0 / 58%),
      rgb(0 0 0 / 19%),
      rgb(0 0 0 / 60%)
    ),
    url(../../assets/img/abstract-1278060_1920.jpg);
  background-position: center;
  background-size: cover;
}

.subtitle {
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: -0.5px;
  font-size: 13px;
  text-align: center;
  margin: 5px 0px;
  color: white;
}

.backBoad {
  background: var(--backgroundTree);
  color: var(--Important-font-color);
}
.basicInfo {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-bottom: solid 1px var(--Important-font-color);
  padding-bottom: 10px;
  margin-bottom: 15px;
}
.basicInfo p {
  /* width: 100px; */
  margin-top: 15px;
  margin-bottom: 5px;
  font-weight: 200;
}

.nowIDontKnowHerUsing {
  height: 100px;
  border-bottom: solid 1px var(--Important-font-color);
}

.travelResume {
  width: 100%;
  display: flex;
}
.part {
  width: 50%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  margin-left: 20px;
}
.part p {
  margin: 5px 0px;
}
.part span {
  font-weight: bold;
  color: #8e8f91;
}

/* FOR VOYAGE DECLARE */
.backBoad-1 .part p {
  margin: 10px 0px;
}

/* FOR VOYAGE DECLARE */
.backBoad-2 .part p {
  margin-left: 25px;
}

@media (min-width: 960px) {
  .col-md-4 {
    padding-bottom: 30px !important;
    padding-top: 10px !important;
  }
}
</style>
