<template>
  <div class="bodyBox">
    <div class="TheBoxBody">
      <p class="sectionTitle">Chiffres Importants</p>
      <v-container fluid class="pouletBr">
        <v-row>
          <v-col cols="12" md="3" lg="3">
            <div class="numberWrapper">
              <div class="N-icon">
                <v-icon color="mainGreenColor">mdi-bus-multiple</v-icon>
              </div>
              <h1>{{ Analytics.declaredTravelNumber }}</h1>
              <h5>voyages declarés</h5>
            </div>
          </v-col>
          <v-col cols="12" md="3" lg="3">
            <div class="numberWrapper">
              <div class="N-icon">
                <v-icon color="mainGreenColor">mdi-account-group</v-icon>
              </div>
              <h1>{{ Analytics.clientsNumber }}</h1>
              <h5>clients</h5>
            </div>
          </v-col>
          <v-col cols="12" md="3" lg="3">
            <div class="numberWrapper">
              <div class="N-icon">
                <v-icon color="mainGreenColor">mdi-archive</v-icon>
              </div>
              <h1>{{ Analytics.findThingNumber }}</h1>
              <h5>objets trouvés</h5>
            </div>
          </v-col>
          <v-col cols="12" md="3" lg="3">
            <div class="numberWrapper">
              <div class="N-icon">
                <v-icon color="mainGreenColor">mdi-truck-delivery</v-icon>
              </div>
              <h1>{{ Analytics.expeditionDo }}</h1>
              <h5>colis expédiés</h5>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="9" lg="9">
            <p class="sectionTitle">Statistique</p>
            <div class="statWrapper">
              <!-- <apexchart height="100%" :options="chartOptions" :series="Analytics.GraphData.series"></apexchart> -->
              <apexchart
                height="100%"
                :options="chartOptions"
                :series="series"
                v-if="showChart"
              ></apexchart>
            </div>
          </v-col>
          <v-col cols="12" md="3" lg="3">
            <div class="statWrapper1">
              <h4>Notes clients</h4>
              <div class="noteWrapper">
                <apexchart
                  height="100%"
                  :options="chartOptions2"
                  :series="series2"
                ></apexchart>
              </div>
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
  name: "Dashboard",
  components: {
    // HelloWorld
  },

  data: () => ({
    /* FOR  SERVICE STATS */
    showChart: false,

    series: [
      //     {
      // name: 'series7',
      // data: [31, 40, 28, 51, 42, 109,31, 40, 28, 70, 30, 1]
      // },
      // {
      // name: 'series2',
      // data: [11, 32, 22, 12, 30, 52,0, 32, 45, 33, 14, 22]
      // },
      // {
      // name: 'series3',
      // data: [20, 50, 10, 83, 56, 22,20, 50, 20, 19, 30, 120]
      // }
    ],

    chartOptions: {
      chart: {
        id: "FirstChart",
        type: "area",
        sparkline: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#3e886d", "#4c5d70", "#b6bbc2"],
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
    },

    /* FOR SERVICE MARCK */
    series2: [44, 55, 67],

    chartOptions2: {
      chart: {
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "16px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total",
              formatter: function () {
                return 249;
              },
            },
          },
        },
      },

      colors: ["#3e886d", "#4c5d70", "#b6bbc2"],
      labels: ["Apples", "Oranges", "Bananas", "Berries"],
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
      this.series = this.Analytics.GraphData.series;
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

  computed: {
    ...mapGetters(["Analytics"]),
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
  height: 170px;
  border-radius: 10px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.N-icon {
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3e886d4a;
  border-radius: 100px;
}
.numberWrapper h1 {
  margin-bottom: -15px;
  font-size: 45px;
}
.numberWrapper h5 {
  color: var(--font-color);
}

.statWrapper {
  height: 230px;
  border-radius: 10px;
  background: white;
}
.statWrapper1 {
  height: 270px;
  border-radius: 10px;
  padding-top: 10px;
  background: white;
}
.statWrapper1 h4 {
  margin-left: 10px;
}
.noteWrapper {
  margin-top: 5%;
  height: 80%;
}

</style>
