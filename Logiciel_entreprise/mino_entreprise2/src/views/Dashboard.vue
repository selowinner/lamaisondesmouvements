<template>
  <div class="bodyBox">
    <div class="TheBoxBody">
      <!-- <p class="sectionTitle">Chiffres Importants</p> -->
      <v-container fluid class="pouletBr">
        <v-row>
          <v-col cols="12" md="6" lg="6">
            <div class="Jumbultron">
              <div>
                <h2>Binvenue sur <span style="color: #c99c33">Mino</span></h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  <br />
                  Sunt, repellat odit? Corrupti earum natus ullam iusto
                  doloribus esse?
                </p>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="2" lg="2">
            <div class="numberWrapper">
              <div>
                <h1>{{ Analytics.registredStationNumber }}</h1>
                <h5>Gares mino</h5>
              </div>
              <div>
                <apexchart
                  height="100%"
                  :options="chartOptions"
                  :series="series"
                ></apexchart>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="2" lg="2">
            <div class="numberWrapper">
              <div>
                <h1>{{ Analytics.TicketsoldNumber }}</h1>
                <h5>Tickets vendus</h5>
              </div>
              <div>
                <apexchart
                  height="100%"
                  :options="chartOptions2"
                  :series="series2"
                ></apexchart>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="2" lg="2">
            <div class="numberWrapper">
              <div>
                <h1>{{ Analytics.ExpeditionsNumber }}</h1>
                <h5>Expeditions</h5>
              </div>
              <div>
                <apexchart
                  height="100%"
                  :options="chartOptions3"
                  :series="series3"
                ></apexchart>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="9" lg="9">
            <div class="statWrapper">
              <p class="sectionTitle">Statistique</p>
              <div>
                <apexchart
                  height="100%"
                  :options="chartOptions4"
                  :series="series4"
                ></apexchart>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="3" lg="3">
            <div class="statWrapper1">
              <h4>Notes clients</h4>
              <div class="noteWrapper">
                <apexchart
                  height="100%"
                  :options="chartOptions5"
                  :series="series5"
                ></apexchart>
              </div>
            </div>
          </v-col>
        </v-row>
        <div style="height:120px;"></div>
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
    // TICKET STATS
    series: [
      {
        //   name: 'Series 1',
        //   data: [80, 50, 30, 40, 100, 20],
      },
    ],

    chartOptions: {
      chart: {
        id: "FirstChart",
        type: "area",
        sparkline: {
          enabled: true,
        },
      },
      colors: ["#c99c33"],
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["Jul", "Feb", "Mar", "Apr", "May", "Jun"],
      },
      markers: {
        size: 4,
        colors: ["#4c5d70"],
        strokeColor: "#FFF",
        strokeWidth: 2,
      },
    },

    // LOST OBJET STATS
    series2: [
      {
        //   name: 'Series 2',
        //   data: [30, 50, 90, 50, 100, 20],
      },
    ],

    chartOptions2: {
      chart: {
        id: "FirstChart",
        type: "area",
        sparkline: {
          enabled: true,
        },
      },
      colors: ["#3e886d"],
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["Jul", "Feb", "Mar", "Apr", "May", "Jun"],
      },
      markers: {
        size: 4,
        colors: ["#4c5d70"],
        strokeColor: "#FFF",
        strokeWidth: 2,
      },
    },

    // EXPEDITION STATS
    series3: [
      {
        //   name: 'Series 2',
        //   data: [55, 50, 70, 80, 90, 70],
      },
    ],

    chartOptions3: {
      chart: {
        id: "FirstChart",
        type: "area",
        sparkline: {
          enabled: true,
        },
      },
      colors: ["#4c5d70"],
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["Jul", "Feb", "Mar", "Apr", "May", "Jun"],
      },
      markers: {
        size: 4,
        colors: ["#4c5d70"],
        strokeColor: "#FFF",
        strokeWidth: 2,
      },
    },

    // GENERAL STATS
    series4: [
      // {
      //   name: 'Voyage Declarés',
      //   data: [0, 10, 100, 10, 50, 90],
      // },
      // {
      //   name: 'Objets trouvé',
      //   data: [80, 50, 30, 40, 100, 20],
      // },
      // {
      //   name: 'Expeditions demandées',
      //   data: [0, 50, 60, 50, 100, 40],
      // }
    ],
    chartOptions4: {
      chart: {
        id: "FirstChart",
        type: "area",
        //   zoom: {
        //         enabled: true
        //     },
        sparkline: {
          enabled: true,
        },
      },

      colors: ["#3e886d", "#c99c33", "#4c5d70"],
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
      markers: {
        size: 4,
        colors: ["#4c5d70"],
        strokeColor: "#FFF",
        strokeWidth: 2,
      },
      legend: {
        show: true,
        position: "top",
      },
    },

    // NOTES
    series5: [42, 57, 72],
    chartOptions5: {
      chart: {
        width: 380,
        type: "polarArea",
      },
      labels: ["Voyage", "Expedition", "Objets trouvé"],
      colors: ["#3e886d", "#c99c33", "#4c5d70"],
      fill: {
        opacity: 1,
      },
      stroke: {
        width: 1,
        colors: undefined,
      },
      yaxis: {
        show: false,
      },
      legend: {
        position: "bottom",
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0,
          },
          spokes: {
            strokeWidth: 0,
          },
        },
      },
      theme: {
        monochrome: {
          enabled: false,
          shadeTo: "light",
          shadeIntensity: 0.6,
        },
      },
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
      this.series[0] = this.Analytics.GraphData.series[0];
      this.chartOptions = {
        ...this.chartOptions,
        ...{
          xaxis: {
            categories: this.Analytics.GraphData.month,
          },
        },
      };
      this.series2[0] = this.Analytics.GraphData.series[1];
      this.chartOptions2 = {
        ...this.chartOptions2,
        ...{
          xaxis: {
            categories: this.Analytics.GraphData.month,
          },
        },
      };
      this.series3[0] = this.Analytics.GraphData.series[2];
      this.chartOptions3 = {
        ...this.chartOptions3,
        ...{
          xaxis: {
            categories: this.Analytics.GraphData.month,
          },
        },
      };
      this.series4[0] = this.Analytics.GraphData.series[3];
      this.series4[1] = this.Analytics.GraphData.series[4];
      this.series4[2] = this.Analytics.GraphData.series[6];
      this.chartOptions4 = {
        ...this.chartOptions4,
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
  font-size: 18px;
  margin-left: 15px;
  font-weight: bold;
}
.numberWrapper {
  height: 170px;
  border-radius: 10px;
  background: white;
  /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
}
.numberWrapper div:nth-child(1) {
  height: 80px;
  /* background: tomato; */
  margin-left: 20px;
}
.numberWrapper div:nth-child(1) > h1 {
  font-size: 45px;
  margin-bottom: -15px;
}
.numberWrapper div:nth-child(2) {
  height: 90px;
  margin-left: -20px;
}

.Jumbultron {
  height: 170px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  display: flex;
  align-items: flex-start;
  padding-left: 30px;
  background: var(--main-important-color);
  color: white;
}
.Jumbultron p {
  font-size: 13px;
}

.statWrapper {
  height: 260px;
  border-radius: 10px;
  background: white;
}
.statWrapper > div {
  height: 79%;
  width: 100%;
  /* background: red; */
}
.statWrapper > p {
  padding: 10px 10px 0px 10px !important;
}
.statWrapper1 {
  height: 300px;
  border-radius: 10px;
  padding-top: 10px;
  background: white;
}
.statWrapper1 h4 {
  margin-left: 10px;
}
.noteWrapper {
  /* margin-top: 5%; */
  /* background: red; */
  /* width: 100%; */
  height: 100%;
}


/*++++++++++++++++
===> MEDIUM Large tablet to laptop	960px > < 1264px*<===
+++++++++++++++++*/
@media screen and (min-width: 960px) and (max-width: 1100px){
  .Jumbultron p {
    font-size: 12px;
  }
  .numberWrapper {
    font-size: 14px;
  }
  .numberWrapper div:nth-child(1) > h1 {
    font-size: 28px;
    margin-bottom: -7px;
  }
}
/*-------END------------*/
</style>
