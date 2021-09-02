<template>
  <div class="tableWrapperDiv">
    <!-- STATISTIC DIALOG for VOYAGES DECLARES-->
    <v-dialog
      v-model="dialog"
      max-width="410"
      overlay-color="black"
      overlay-opacity="0.8"
    >
      <v-card>
        <v-card-text>
          <p class="mainGreenColor dialogTitle">DETAILS VOYAGE DECLARE</p>
          <div class="mainGreenColor dialogWrapper">
            <div class="imgAndTitle"></div>
            <p class="subtitle">{{ editedItem.destination }}</p>
            <div class="backBoad backBoad-1">
              <div class="basicInfo">
                <p>
                  <v-icon color="mainGreenColor" small> mdi-arrow-right </v-icon
                  >{{ editedItem.car_matriculation }}
                </p>
              </div>
              <div class="travelResume">
                <div class="part">
                  <!-- <p> <span>{{editedItem.departure_date}}</span><br>date de départ</p> -->
                  <p>
                    <span>{{ editedItem.departure_place }}</span
                    ><br />lieu de départ
                  </p>
                  <p>
                    <span>{{ editedItem.place_to_sell_by_mino_number }}</span
                    ><br />place à vendre
                  </p>
                  <p>
                    <span>{{ editedItem.car_informations }}</span
                    ><br />type de car
                  </p>
                </div>
                <div class="part">
                  <p>
                    <span>{{ editedItem.departure_time }}</span
                    ><br />heure de départ
                  </p>
                  <p>
                    <span>{{ editedItem.destination }}</span
                    ><br />destination
                  </p>
                  <p>
                    <span>{{ editedItem.place_price }}</span
                    ><br />prix du ticket
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
      :items="TravelsDeclared"
      :items-per-page="-1"
      :search="Seach"
      hide-default-footer
      class="backgroundTree"
    >
      <!-- FOR SEE DETAILS AND STATISTIC DIALOG for VOYAGES DECLARES -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon color="mainGreenColor" @click="editItem(item)"
          ><v-icon small> mdi-eye </v-icon></v-btn
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MinoallDeclaredTravel",

  components: {},

  data: () => ({
    //for the list
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    // search: '',
    headers: [
      {
        text: "DESTINATION",
        align: "start",
        sortable: false,
        value: "destination",
      },
      { text: "DATE DE DEPART", value: "departure_date" },
      { text: "HEURE DE DEPART", value: "departure_time" },
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
    ...mapGetters(["TravelsDeclared"]),

    StationOne() {
      return this.$store.state.OneSTation;
    },

    Seach() {
      return this.$store.state.seachAll;
    },
  },

  created() {
    this.$store.dispatch("init_travelsDeclared", this.StationOne);
  },
};
</script>

<style scoped>
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
  margin-left: 30px;
  /* align-items: center; */
}
.part p {
  margin: 5px 0px;
  margin-left: 15px;
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
