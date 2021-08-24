<template>
  <div class="TheBoxBody">
    <p class="sectionTitle">Statistiques</p>

    <v-container fluid>
      <v-row>
        <v-col cols="12" md="3" lg="3" class="box">
          <div class="statboxWrapper">
            <apexchart
              height="100%"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
        </v-col>
        <v-col cols="12" md="9" lg="9" class="box">
          <div class="stationListboxWrapper">
            <v-data-iterator
              :items="Stations"
              :items-per-page.sync="itemsPerPage"
              :page="page"
              :search="search"
              :sort-by="sortBy.toLowerCase()"
              :sort-desc="sortDesc"
              hide-default-footer
            >
              <template v-slot:header>
                <v-row>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field
                      v-model="search"
                      dense
                      outlined
                      hide-details
                      prepend-inner-icon="mdi-search"
                      label="Rechercher"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2" lg="2"></v-col>
                </v-row>

                <!-- PRODUCT DETAILS MODAL TEMPLATE FOR EACH PRODUCT -->
                <v-dialog
                  v-model="dialog"
                  transition="dialog-bottom-transition"
                  width="1200"
                  overlay-color="black"
                  overlay-opacity="0.8"
                  mainGreenColor
                >
                  <v-card tile>
                    <!-- <v-toolbar flat color="Importantcolor Importantcolor--text" >
                              <v-btn icon dark @click="dialog = false">
                                <v-icon class="Titlecolor--text">mdi-close</v-icon>
                              </v-btn> 
                              <v-toolbar-title>POUET</v-toolbar-title>
                            </v-toolbar>             -->

                    <v-card-text>
                      <v-container>
                        <v-row class="detailsTemplate">
                          <MinoOneTravelCompany></MinoOneTravelCompany>
                        </v-row>
                      </v-container>
                    </v-card-text>
                  </v-card>
                </v-dialog>
                <!-- END PRDUCT DETAILS MODAL TEMPLATE FOR EACH PRODUCT -->
              </template>

              <template v-slot:default="props">
                <v-row>
                  <v-col
                    v-for="item in props.items"
                    :key="item.name"
                    cols="12"
                    md="3"
                    lg="3"
                  >
                    <div
                      :class="getClass(item.travelNumber)"
                      @click="openDialog(item)"
                    >
                      <div>
                        <v-icon>mdi-bus-marker</v-icon>
                        <p>{{ item.travelNumber }}</p>
                        <p>{{ item.denomination }}</p>
                      </div>
                      <div class="price">
                        <v-icon>mdi-calendar</v-icon>
                        <p>{{ item.anagramme }}</p>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </template>

              <template v-slot:footer>
                <v-row class="mt-2" align="center" justify="center">
                  <v-spacer></v-spacer>

                  <span class="mr-4 grey--text">
                    Page {{ page }} sur {{ numberOfPages }}
                  </span>
                  <v-btn
                    fab
                    dark
                    color="mainGreenColor "
                    class="mr-1"
                    @click="formerPage"
                  >
                    <v-icon>mdi-chevron-left</v-icon>
                  </v-btn>
                  <v-btn
                    fab
                    dark
                    color="mainGreenColor "
                    class="ml-1"
                    @click="nextPage"
                  >
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-row>
              </template>
            </v-data-iterator>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MinoOneTravelCompany from "./mino-allTravelsListManagement.vue";
import { mapGetters } from "vuex";

export default {
  name: "MinoTravelsHome",

  components: {
    MinoOneTravelCompany,
  },

  data: () => ({
    // For the list dialog
    dialog: false,
    selectedItem: {},
    /* FOR DATA ITERATOR */
    itemsPerPageArray: [4, 8, 12],
    search: "",
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 8,
    sortBy: "name",
    keys: ["id", "Name", "Quantity", "price"],
    items: [],

    // FOR STAT
    series: [
      {
        // name: 'series1',
        // data: [31, 40, 28, 51, 42, 109,31, 40, 28, 70, 30, 1]
      },
    ],

    chartOptions: {
      chart: {
        id: "FirstChart",
        type: "line",
        sparkline: {
          enabled: true,
        },
      },
      // dataLabels: {
      //     enabled: false
      // },
      colors: ["#3e886d"],
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      markers: {
        size: 4,
        colors: ["#4c5d70"],
        strokeColor: "#FFF",
        strokeWidth: 2,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#4c5d70"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
    },
  }),

  mounted() {
    setTimeout(() => {
      this.updateChart();
    }, 100);
  },

  computed: {
    ...mapGetters(["Stations", "Analytics"]),

    numberOfPages() {
      return Math.ceil(this.Stations.length / this.itemsPerPage);
    },
  },

  methods: {
    /* FOR DIFFERENCIATION BETWEEN PRODUCT */
    getClass(quantity) {
      if (quantity <= 30) return "InvBox";
      else return "InvBox2";
    },
    /* FOR DATA ITERRATOR */
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },

    /* FOR ITEM DIALOG OPEN */
    openDialog(item) {
      this.selectedItem = Object.assign({}, item);
      this.$store.state.OneSTation = this.selectedItem.id;

      this.$store.state.forceRdeDeclared += 1;

      this.dialog = !this.dialog;
    },

    /* FOR QNALYTICS */
    updateChart() {
      this.series[0] = this.Analytics.GraphData.series[3];
      this.chartOptions = {
        ...this.chartOptions,
        ...{
          xaxis: {
            categories: this.Analytics.GraphData.month,
          },
        },
      };
    },
  },
};
</script>

<style scoped>
.bodyBox {
  height: inherit;
}

.statboxWrapper {
  background: var(--backgroundTree);
  border-radius: 10px;
  height: 55vh;
}

.stationListboxWrapper {
  background: var(--backgroundTree);
  border-radius: 10px;
  /* height: 53vh; */
  padding: 15px;
}

.InvBox {
  height: 170px;
  border-radius: 10px;
  background: #35373a;
  line-height: 14px;
  padding-left: 30px;
  color: var(--Important-font-color);
  display: flex;
  justify-content: space-around;
}

.price {
  padding-top: 25px;
  width: 40%;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 15px;
}
.price > p {
  font-size: 12px;
}
.price .v-icon {
  font-size: 15px;
  color: white;
}

.InvBox div:first-child {
  width: 70%;
}

.InvBox div:first-child .v-icon {
  margin-top: 20px;
  font-size: 35px;
  color: var(--font-color);
}
.InvBox div:first-child p:nth-child(2) {
  font-size: 30px;
  font-weight: bold;
  color: white;
}

.InvBox2 {
  height: 170px;
  border-radius: 10px;
  background: var(--font-color);
  line-height: 10px;
  padding-left: 30px;
  color: #35373a;
  display: flex;
  justify-content: space-around;
}
.InvBox2 div:first-child {
  width: 70%;
}
.InvBox2 div:first-child .v-icon {
  margin-top: 20px;
  font-size: 35px;
  color: #35373a;
}
.InvBox2 div:first-child p:nth-child(2) {
  font-size: 30px;
  font-weight: bold;
  color: white;
}
.InvBox2 div:first-child p:nth-child(3) {
  line-height: 15px;
}

/* FOR THE TRAVEL LISTE DIALOG */
.splxoverlay {
  width: 50% !important;
}
.theme--light.v-card {
  background-color: #ffffff00;
}
</style>
