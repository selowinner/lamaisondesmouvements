<template>
  <div class="bodyBox">
    <div class="TheBoxBody">
      <div class="leHerder">
        <p class="sectionTitle">Statistiques</p>
        <!-- remplacer cette manière de selecrtionner la période, par l'utilisation de boutons radio -->
        <div style="width: 150px">
          <v-select
            :items="periode"
            v-model="chosingPerod"
            class="period"
            v-on:change="perodeDef"
            solo
          ></v-select>
        </div>
      </div>
      <v-container fluid class="pouletBr">
        <v-row>
          <v-col cols="12" md="4" lg="3">
            <div class="numberWrapper rightBox">
              <div
                class="travelsum"
                v-for="item in TravelAnalytics.travelMade"
                :key="item.index"
              >
                <div class="dest">
                  <div class="N-iconForSumTravel">
                    <v-icon color="mainGreenColor" style="font-size: 25px"
                      >mdi-bus-multiple</v-icon
                    >
                  </div>
                  <div class="trueSum">
                    <p style="font-size: 14px">{{ item.destination }}</p>
                    <div class="sum">
                      <p>
                        <span class="pufff"> {{ item.totalGain }} fr</span>
                      </p>
                      <p>
                        <span class="pufff">
                          {{ item.ticketsSoldNumber }} Tickets</span
                        >
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6" lg="6">
            <div class="numberWrapper middleBox">
              <apexchart
                height="100%"
                :options="productchartOptions"
                :series="series"
                v-if="showChart"
              ></apexchart>
            </div>
          </v-col>

          <v-col cols="12" md="2" lg="3" class="leftNumber">
            <div class="stat1">
              <div class="N-icon">
                <v-icon color="mainGreenColor">mdi-bus-multiple</v-icon>
              </div>
              <h1>{{ TravelAnalytics.travelMadeTotalGain }}</h1>
              <h5>Gain Total</h5>
            </div>
            <div class="stat1">
              <div class="N-icon">
                <v-icon color="mainGreenColor">mdi-bus-alert</v-icon>
              </div>
              <h1>{{ TravelAnalytics.travelMadeNumber }}</h1>
              <h5>voyages éffectués</h5>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TravelStat",
  components: {
    // HelloWorld
  },

  data: () => ({
    /* FOR  PARIOD*/
    periode: ["de l'année", "du trimestre", "du mois", "de la semaine"],
    chosingPerod: "de l'année",
    travelAnalyticsPeriod: 1,
    /* FOR  SERVICE STATS */
    showChart: false,
    tools: [],

    series: [
      // {
      // name: 'series7',
      // type:'area',
      // data: [31, 40, 28, 51, 42, 109, 100, 40, 28, 51, 42, 109]
      // },
      // {
      // name: 'series2',
      // type:'bar',
      // data: [11, 32, 45, 32, 34, 52, 41, 32, 45, 32, 34, 52]
      // }
    ],

    productchartOptions: {
      grid: {
        show: false,
      },
      chart: {
        type: "area",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "15%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#3e886d", "#4c5d70"],
      stroke: {
        show: true,
        width: 2,
        // colors: ['transparent']
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
      yaxis: {},
      fill: {
        opacity: [0.1, 1],
      },
      // tooltip: {
      // y: {
      //     formatter: function (val) {
      //     return "$ " + val + " thousands"
      //     }
      // }
      // }
    },
  }),

  mounted() {
    setTimeout(() => {
      this.updateChart();
      this.showChart = true;
    }, 500);
  },

  methods: {
    // ------------------------
    // DATA
    // ------------------------
    updateChart() {
      this.series = this.TravelAnalytics.GraphData.series;
      this.productchartOptions = {
        ...this.productchartOptions,
        ...{
          xaxis: {
            categories: this.TravelAnalytics.GraphData.month,
          },
        },
      };
    },

    // Analytics periode
    perodeDef() {
      if (this.chosingPerod == "du trimestre") {
        this.travelAnalyticsPeriod = 2;
        this.chosingPerod = "du trimestre";
      } else if (this.chosingPerod == "du mois") {
        this.travelAnalyticsPeriod = 3;
        this.chosingPerod = "du mois";
      } else if (this.chosingPerod == "de la semaine") {
        this.travelAnalyticsPeriod = 4;
        this.chosingPerod = "de la semaine";
      } else if (this.chosingPerod == "de l'année") {
        this.travelAnalyticsPeriod = 1;
        this.chosingPerod = "de l'année";
      }
      this.$store.dispatch("init_travel_analitic", this.travelAnalyticsPeriod);
      setTimeout(() => {
        this.updateChart();
        this.showChart = true;
      }, 500);
    },
  },

  computed: {
    ...mapGetters(["TravelAnalytics"]),
  },

  created() {
    this.$store.dispatch("init_travel_analitic", this.travelAnalyticsPeriod);
  },
};
</script>

<style scoped>
.leHerder {
  display: flex;
  justify-content: space-between;
  margin-top: -15px;
  padding: 0 15px;
}
.leHerder > div {
  display: flex;
  align-items: center;
  font-weight: bold;
  /* color:red !important; */
}

.sectionTitle {
  /* margin: 0; */
  /* margin-bottom: 5px; */
  font-size: 18px;
  font-weight: bold;
}
.period {
  width: 50px !important;
}
.numberWrapper {
  border-radius: 10px;
  background: white;
}

.rightBox,
.middleBox {
  height: 54vh;
}
.rightBox {
  padding: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.rightBox::-webkit-scrollbar {
  width: 15px;
}
.rightBox::-webkit-scrollbar-track {
  background: #f9f9f9;
}

.rightBox::-webkit-scrollbar-thumb {
  background-color: var(--main-green-color);
  border-radius: 30px;
  border: 5px solid #ffffff;
}

.travelsum {
  /* background: red; */
  height: 100px;
  width: 100%;
  margin-bottom: 20px;
}
.dest {
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  background: #3e886d4a;
  border-radius: 10px;
}
.N-iconForSumTravel {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3e886d4a;
  margin: 0px 7px;
  padding: 12px;
  border-radius: 10px;
}
.trueSum {
  /* background: pink; */
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.trueSum p {
  margin: 0;
  padding: 0;
}
.sum {
  text-align: center;
  font-size: 13px;
  display: flex;
  align-items: center;
  margin-top: 5px;

  background: white;
  padding: 5px;
  border-radius: 5px;
  width: 90%;
}
.sum > p {
  font-weight: bold;
}
.sum p:first-child {
  margin-right: 15px;
}
.pufff{
    /* background: white;
    padding: 5px;
    border-radius: 5px; */
}

.stat1 {
  background: white;
  height: 26vh;
  border-radius: 10px;
  margin-bottom: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.N-icon {
  height: 50px;
  width: 50px;
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



/*------------------------
    ---RESPONSIVE--- 
--------------------------*/

/*++++++++++++++++
===> MEDIUM Large tablet to laptop	960px > < 1264px*<===
+++++++++++++++++*/
@media screen and (min-width: 960px) and (max-width: 1264px){
  .stat1 h1{
    font-size: 20px;
  }
}
/*-------END------------*/
</style>
