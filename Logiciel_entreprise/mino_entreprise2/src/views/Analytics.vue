<template>
  <div class="bodyBox">
    <div class="TheBoxBody">
      <!-- <p class="sectionTitle">Chiffres Importants</p> -->
      <v-container fluid class="pouletBr">
        <v-row>
          <v-col cols="12" md="8" lg="8">
            <v-row>
              <v-col cols="12" md="3" lg="3">
                <div class="numberWrapper">
                  <div>
                    <v-icon color="white" large> mdi-bus-clock </v-icon>
                  </div>
                  <div>
                    <h1>{{ Analytics.TravelDo }}</h1>
                    <p>voyages éffectuées</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="3" lg="3">
                <div class="numberWrapper">
                  <div>
                    <v-icon color="#c99c33" large> mdi-package-variant-closed</v-icon>
                  </div>
                  <div>
                    <h1>{{ Analytics.ExpeditionsDo }}</h1>
                    <p>expeditions éffectuées</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="3" lg="3">
                <div class="numberWrapper">
                  <div><v-icon color="white" large> mdi-archive </v-icon></div>
                  <div>
                    <h1>{{ Analytics.FindObjet }}</h1>
                    <p>Obejts Trouvés</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="3" lg="3">
                <div class="numberWrapper">
                  <div>
                    <v-icon color="#c99c33" large> mdi-account-group </v-icon>
                  </div>
                  <div>
                    <h1>
                      {{ Analytics.ExpeditionsDo + Analytics.TicketsoldNumber }}
                    </h1>
                    <p>clients mino</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="12" lg="12">
                <div class="statWrapper">
                  <!-- <p class="sectionTitle">Statistique <v-select height="20" :items="periode" v-model="chosingPerod" class="period" v-on:change= "perodeDef" outlined></v-select></p> -->
                  <div class="leHerder">
                    <p class="sectionTitle">Statistiques</p>
                    <!-- remplacer cette manière de selecrtionner la période, par l'utilisation de boutons radio -->
                    <div style="width: 190px">
                      <v-select
                        dense
                        :items="periode"
                        v-model="chosingPerod"
                        class="period"
                        v-on:change="perodeDef"
                        outlined
                      ></v-select>
                    </div>
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
            </v-row>
          </v-col>
          <v-col cols="12" md="4" lg="4">
            <div class="statWrapper1">
              <div class="noteTitle">
                <p>
                  <span>GAINS</span> <br />
                  VOYAGE
                </p>
                <p>PLUS LES</p>
                <p>
                  <span>GAINS</span> <br />
                  EXPEDITION
                </p>
              </div>
              <div class="noteWrapper">
                <div class="gainVoayage">
                  <p
                    v-for="item in Financials.GraphData.series[0].data"
                    :key="item.index"
                  >
                    {{ item }}
                  </p>
                </div>
                <span style="color: #c99c33; font-weight: bold; font-size: 25px"
                  >+</span
                >
                <div class="gainExpedition">
                  <p
                    v-for="item in Financials.GraphData.series[1].data"
                    :key="item.index"
                  >
                    {{ item }}
                  </p>
                </div>
              </div>
              <div class="noteDefWrapper">
                {{ Financials.totalGain }} <span>frCFA</span>
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
  name: "Analytics",
  components: {
    // HelloWorld
  },

  data: () => ({
    /* FOR  PARIOD*/
    periode: ["de l'année", "du trimestre", "du mois", "de la semaine"],
    chosingPerod: "de l'année",
    travelAnalyticsPeriod: 1,

    // TRAVELS and EXPEDITION GAIN
    series: [
      {
        //   name: 'Series 2',
        //   data: [0, 10, 100, 10, 50, 90],
      },
      {
        //   name: 'Objets trouvé',
        //   data: [80, 50, 30, 40, 100, 20],
      },
    ],

    chartOptions: {
      chart: {
        id: "FirstChart",
        type: "area",
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#c99c33", "#3e886d"],
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
      legend: {
        position: "top",
      },
      yaxis: {},
      fill: {
        opacity: [0.1, 1],
      },
      //   markers: {
      //       size: 4,
      //       colors: ['#4c5d70'],
      //       strokeColor: '#FFF',
      //       strokeWidth: 2,
      //     },
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
      this.series[0] = this.Financials.GraphData.series[0];
      this.series[1] = this.Financials.GraphData.series[1];
      this.chartOptions = {
        ...this.chartOptions,
        ...{
          xaxis: {
            categories: this.Financials.GraphData.month,
          },
        },
      };
    },

    // Analytics periode
    perodeDef() {
      if (this.chosingPerod == "du trimestre") {
        this.travelAnalyticsPeriod = 2;
        this.chosingPerod = "du trimestre";
        // localStorage.setItem('Analitics-period', this.travelAnalyticsPeriod)
      } else if (this.chosingPerod == "du mois") {
        this.travelAnalyticsPeriod = 3;
        this.chosingPerod = "du mois";
        // localStorage.setItem('Analitics-period', this.travelAnalyticsPeriod)
      } else if (this.chosingPerod == "de la semaine") {
        this.travelAnalyticsPeriod = 4;
        this.chosingPerod = "de la semaine";
        // localStorage.setItem('Analitics-period', this.travelAnalyticsPeriod)
      } else if (this.chosingPerod == "de l'année") {
        this.travelAnalyticsPeriod = 1;
        this.chosingPerod = "de l'année";
        // localStorage.setItem('Analitics-period', this.travelAnalyticsPeriod)
      }
      this.$store.dispatch("init_financial", this.travelAnalyticsPeriod);
      setTimeout(() => {
        this.updateChart();
        this.showChart = true;
      }, 500);
    },
  },

  computed: {
    ...mapGetters(["Analytics", "Financials"]),
  },

  created() {
    this.$store.dispatch("init_financial", this.travelAnalyticsPeriod);
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
  padding: 15px 0px;
  height: 170px;
  border-radius: 10px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.numberWrapper div:nth-child(1) {
  height: 50px;
  width: 50px;
  border-radius: 100px;
  background: var(--main-important-color);
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.numberWrapper div:nth-child(2) {
  width: 80%;
  /* background: rgb(0, 255, 21); */
  margin-left: 20px;
}
.numberWrapper div:nth-child(2) > h1 {
  font-size: 45px;
  margin-bottom: -5px;
}
.numberWrapper div:nth-child(2) > p {
  font-size: 13px;
  margin: 0px 0px;
}

.statWrapper {
  height: 290px;
  /* padding: 5px; */
  border-radius: 10px;
  background: white;
}
.leHerder {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background: red; */
  height: 50px;
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
  margin-top: 40px;
  margin-right: 15px;
}
/* .statWrapper .sectionTitle{
    font-size: 18px;
    margin-left: 15px;
    font-weight: bold;
    background: red;
} */
.statWrapper > div:nth-child(2) {
  height: 83.3%;
  width: 100%;
  /* background: red; */
}
.statWrapper > p {
  padding: 5px 5px 0px 5px !important;
}
.statWrapper1 {
  height: 465px;
  border-radius: 10px;
  padding-top: 10px;
  background: var(--main-important-color);
}
.noteTitle {
  padding: 0px 15px;
  height: 100px;
  color: white;
  font-size: 17px;
  font-weight: bold;
  /* background: chartreuse; */
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: flex-end;
}
.noteTitle p:nth-child(1) {
  /* background: red; */
}
.noteTitle p:nth-child(2) {
  /* background: blue; */
  font-weight: normal;
  font-size: 15px;
}
.noteTitle p:nth-child(3) {
  /* background: pink; */
}
.noteTitle span {
  font-size: 13px;
  font-weight: normal;
}
/* .statWrapper1 h4{
    margin-left: 10px;
} */
.noteWrapper {
  height: 60%;
  color: #ffffff96;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.gainVoayage {
  width: 35%;
}
.gainVoayage > p {
  margin: 0px;
  margin-left: 15px;
}
.gainExpedition {
  width: 35%;
}
.gainExpedition > p {
  margin: 0px;
  text-align: end;
  margin-right: 15px;
}

.noteDefWrapper {
  background: var(--main-very-important-color);
  height: 22%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 40px;
  font-weight: bold;
}
.noteDefWrapper span {
  font-size: 20px;
  color: #ffffff96;
}




/*++++++++++++++++
===> MEDIUM Large tablet to laptop	960px > < 1264px*<===
+++++++++++++++++*/
@media screen and (min-width: 1100px) and (max-width: 1264px){
  .numberWrapper div:nth-child(2) > h1 {
    font-size: 40px;
    margin-bottom: -5px;
  }
  /* Calculation part */
  .noteTitle {
    font-size: 14px;
  }
  .noteTitle p:nth-child(2) {
    font-size: 11px;
  }
  .noteDefWrapper {
    font-size: 30px;
  }
}

@media screen and (min-width: 960px) and (max-width: 1100px){
  /* Calculation part */
  .noteTitle {
    font-size: 12px;
  }
  .noteTitle p:nth-child(2) {
    font-size:0px;
  }
  .noteDefWrapper {
    font-size: 25px;
  }
}
</style>
