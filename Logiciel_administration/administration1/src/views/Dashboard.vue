<template>
  <div class="bodyBox">
    <div class="TheBoxBody">
      <p class="sectionTitle">Statistiques</p>

      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6" md="3" lg="3" class="box">
            <div class="boxWrapper">
              <p>
                NOMBRE TOTAL <br />
                DE PLACES VENDUS DANS <br />
                L'ANNEE
              </p>
              <div class="palabre" v-if="showChart">
                <apexchart
                  height="250"
                  :options="chartOptions"
                  :series="series"
                ></apexchart>
              </div>
              <p>{{ Analytics.soldPlacesNumber }}</p>
              <p>PLACES VENDUS</p>
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="3" lg="3" class="box">
            <div class="boxWrapper">
              <p>
                NOMBRE TOTAL <br />
                DE COMPAGNIES <br />ACQUISES DANS L'ANNEE
              </p>
              <div class="palabre" v-if="showChart">
                <apexchart
                  height="250"
                  :options="chartOptions2"
                  :series="series2"
                ></apexchart>
              </div>
              <p>{{ Analytics.CompaniesGetNumber }}</p>
              <p>COMPAGNIES</p>
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="3" lg="3" class="box">
            <div class="boxWrapper">
              <p>NOMBRE TOTAL<br />DE GARES <br />ACQUISES DANS L'ANNEE</p>
              <div class="palabre" v-if="showChart">
                <apexchart
                  height="250"
                  :options="chartOptions3"
                  :series="series3"
                ></apexchart>
              </div>
              <p>{{ Analytics.CompaniesstationGetNumber }}</p>
              <p>GARES</p>
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="3" lg="3" class="box">
            <div class="boxWrapper">
              <p>
                LA COMPAGNIE <br />
                LA MIEUX <br />
                NOTEE
              </p>
              <div class="palabre">
                <apexchart
                  height="250"
                  :options="chartOptions4"
                  :series="series4"
                ></apexchart>
              </div>
              <p>UTB</p>
              <p>MOYENNE = 3,8</p>
            </div>
          </v-col>
        </v-row>
        <div style="height:160px"></div>
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
    showChart: true,
    // TICKET STATS
    series: [
      {
        // name: 'Series 1',
        // data: [80, 50, 30, 40, 100, 20],
      },
    ],

    chartOptions: {
      chart: {
        id: "FirstChart",
        type: "radar",
        sparkline: {
          enabled: true,
        },
      },
      colors: ["#4c5d70"],
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: "#535559",
          },
        },
      },
      markers: {
        size: 4,
        colors: ["#4c5d70"],
        strokeColor: "#FFF",
        strokeWidth: 2,
      },
      xaxis: {
        categories: ["January", "February", "March", "April", "May", "June"],
      },
    },

    // LOST OBJET STATS
    series2: [
      {
        // name: 'Series 2',
        // data: [30, 50, 90, 50, 100, 20],
      },
    ],

    chartOptions2: {
      chart: {
        id: "FirstChart",
        type: "radar",
        sparkline: {
          enabled: true,
        },
      },
      colors: ["#3e886d"],
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: "#535559",
          },
        },
      },
      markers: {
        size: 4,
        colors: ["#4c5d70"],
        strokeColor: "#FFF",
        strokeWidth: 2,
      },
      xaxis: {
        categories: ["January", "February", "March", "April", "May", "June"],
      },
    },

    // EXPEDITION STATS
    series3: [
      {
        // name: 'Series 2',
        // data: [100, 10, 10, 70, 50, 30],
      },
    ],

    chartOptions3: {
      chart: {
        id: "FirstChart",
        type: "radar",
        sparkline: {
          enabled: true,
        },
      },
      colors: ["#4c5d70"],
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: "#535559",
          },
        },
      },
      markers: {
        size: 4,
        colors: ["#4c5d70"],
        strokeColor: "#FFF",
        strokeWidth: 2,
      },
      xaxis: {
        categories: ["January", "February", "March", "April", "May", "June"],
      },
    },

    // NOTE STATS
    series4: [
      {
        name: "Series 2",
        data: [0, 10, 100, 10, 50, 90],
      },
    ],

    chartOptions4: {
      chart: {
        id: "FirstChart",
        type: "radar",
        sparkline: {
          enabled: true,
        },
      },
      colors: ["#3e886d"],
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: "#535559",
          },
        },
      },
      markers: {
        size: 4,
        colors: ["#4c5d70"],
        strokeColor: "#FFF",
        strokeWidth: 2,
      },
      xaxis: {
        categories: ["January", "February", "March", "April", "May", "June"],
      },
    },
  }),

  mounted() {
    setTimeout(() => {
      this.updateChart();
      // this.showChart = true;
    }, 500);
  },

  methods: {
    // ------------------------
    // DATA
    // ------------------------
    updateChart() {
      this.series[0] = this.Analytics.GraphData.series[0];
      this.series2[0] = this.Analytics.GraphData.series[1];
      this.series3[0] = this.Analytics.GraphData.series[2];
      this.chartOptions = {
        ...this.chartOptions,
        ...{
          xaxis: {
            categories: this.Analytics.GraphData.month,
          },
        },
      };
      this.chartOptions2 = {
        ...this.chartOptions,
        ...{
          xaxis: {
            categories: this.Analytics.GraphData.month,
          },
        },
      };
      this.chartOptions3 = {
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
.bodyBox {
  /* height: inherit; */
  /* background: red; */
}

.boxWrapper {
  background: var(--backgroundTree);
  text-align: center;
  padding: 5px 25px;
  border-radius: 10px;
}
.boxWrapper p:nth-child(1) {
  font-size: 13px;
  margin-bottom: 20px;
  color: white;
}
.boxWrapper p:nth-child(3) {
  font-size: 45px;
  font-weight: bold;
  margin: 0px;
}
.boxWrapper p:nth-child(4) {
  font-size: 15px;
  font-weight: bold;
  margin: 0px;
  margin-top: -10px;
  margin-bottom: 5px;
}
.palabre {
  height: 250px;
  min-width: 100px;
  margin: 0 auto;
  /* background: #35373a; */
  margin-bottom: 0px;
}
</style>
