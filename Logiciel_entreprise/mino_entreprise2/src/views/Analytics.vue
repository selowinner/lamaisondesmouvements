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
                                    <div><v-icon color="white" large> mdi-bus-clock </v-icon></div>
                                    <div>
                                        <h1>{{Analytics.TravelDo}}</h1>
                                        <p>voyages éffectuées</p>
                                    </div>
                                </div>
                            </v-col>
                            <v-col cols="12" md="3" lg="3">
                                <div class="numberWrapper">
                                    <div><v-icon color="#c99c33" large> mdi-bullseye-arrow </v-icon></div>
                                    <div>
                                        <h1>{{Analytics.ExpeditionsDo}}</h1>
                                        <p>expeditions éffectuées</p>
                                    </div>
                                </div>
                            </v-col>
                            <v-col cols="12" md="3" lg="3">
                                <div class="numberWrapper">
                                    <div><v-icon color="white" large> mdi-archive </v-icon></div>
                                    <div>
                                        <h1>{{Analytics.FindObjet}}</h1>
                                        <p>Obejts Trouvés</p>
                                    </div>
                                </div>
                            </v-col>
                            <v-col cols="12" md="3" lg="3">
                                <div class="numberWrapper">
                                    <div><v-icon color="#c99c33" large> mdi-account-group </v-icon></div>
                                    <div>
                                        <h1>{{Analytics.ExpeditionsDo + Analytics.TicketsoldNumber}}</h1>
                                        <p>clients mino</p>
                                    </div>
                                </div>
                            </v-col>
                            <v-col cols="12" md="12" lg="12">
                                <div class="statWrapper">
                                    <p class="sectionTitle">Statistique</p>
                                    <div>
                                    <apexchart height="100%" :options="chartOptions" :series="series"></apexchart>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="4" lg="4">
                        <div class="statWrapper1">
                            <div class="noteTitle">
                                <p><span>GAINS</span> <br> VOYAGE</p>
                                <p>PLUS LES </p>
                                <p><span>GAINS</span> <br> EXPEDITION</p>
                            </div>
                            <div class="noteWrapper">
                               <div class="gainVoayage">
                                   <p v-for="item in Financials.GraphData.series[0].data" :key="item.index">{{item}}</p>
                               </div>
                               <span style="color:#c99c33; font-weight:bold; font-size:25px">+</span>
                               <div class="gainExpedition">
                                   <p v-for="item in Financials.GraphData.series[1].data" :key="item.index">{{item}}</p>
                               </div>
                            </div>
                            <div class="noteDefWrapper">
                               {{ Financials.totalGain}} <span>frCFA</span> 
                            </div>
                        </div>
                    </v-col>
                </v-row>
              




                <!-- <v-row>
                    <v-col cols="12" md="9" lg="9">
                        <div class="statWrapper">
                             <p class="sectionTitle">Statistique</p>

                        </div>
                    </v-col>
                    <v-col cols="12" md="3" lg="3">
                        <div class="statWrapper1">
                            <h4>Notes clients</h4>
                            <div class="noteWrapper">
                               
                            </div>
                        </div>
                    </v-col>
                </v-row> -->
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



     // TRAVELS and EXPEDITION GAIN
    series: [{
        //   name: 'Series 2',
        //   data: [0, 10, 100, 10, 50, 90],
        },
        {
        //   name: 'Objets trouvé',
        //   data: [80, 50, 30, 40, 100, 20],
        },],
        
    chartOptions: {
      chart: {
          id: 'FirstChart',
          type: 'area',
          toolbar: {
            show: false,
          },         
      },
       grid: {
        show: false,
        },
      dataLabels: {
        enabled: false
      },
      colors:['#c99c33', '#3e886d'],
      stroke: {
          curve: 'smooth',
      },
      xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      },
      legend: {
        position: 'top'
        },
      yaxis: {
        
      },
    fill: {
    opacity: [0.1, 1]
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
        this.series[0] = this.Financials.GraphData.series[0]
        this.series[1] = this.Financials.GraphData.series[1]
        this.chartOptions = {
            ...this.chartOptions, ...{
                xaxis: {
                    categories: this.Financials.GraphData.month
                }
            }
        }
    }
    

  },






 computed:{
    ...mapGetters([
      'Analytics',
      'Financials'
    ])
  },


 created(){
    this.$store.dispatch('init_financial')
  }


};




</script>











<style scoped>

.sectionTitle{
    font-size: 18px;
    margin-left: 15px;
    font-weight: bold;
}
.numberWrapper{
    padding: 15px 0px;
    height: 200px;
    border-radius: 10px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.numberWrapper div:nth-child(1){
   height: 60px;
   width: 60px;
   border-radius: 100px;
   background: var(--main-important-color);
   margin-left: 20px;
   display: flex;
   justify-content: center;
   align-items: center;
}
.numberWrapper div:nth-child(2){
    width: 80%;
    /* background: rgb(0, 255, 21); */
    margin-left: 20px;
}
.numberWrapper div:nth-child(2) > h1{
    font-size: 50px;
    margin-bottom: -5px;
}
.numberWrapper div:nth-child(2) > p{
    font-size: 13px;
    margin: 0px 0px;
}







.statWrapper{
    height: 300px;
    /* padding: 5px; */
    border-radius: 10px;
    background: white;
}
.statWrapper > div{
    height: 83.3%;
    width: 100%;
    /* background: red; */
}
.statWrapper >p{
    padding: 5px 5px 0px 5px !important;
}
.statWrapper1{
    height: 542px;
    border-radius: 10px;
    padding-top: 10px;
    background: var(--main-important-color);
}
.noteTitle{
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
.noteTitle p:nth-child(1){
    /* background: red; */
}
.noteTitle p:nth-child(2){
    /* background: blue; */
    font-weight: normal;
    font-size: 15px;
}
.noteTitle p:nth-child(3){
    /* background: pink; */
}
.noteTitle span{
    font-size: 13px;
    font-weight: normal;
}
/* .statWrapper1 h4{
    margin-left: 10px;
} */
.noteWrapper{
    height: 60%;
    color: #ffffff96;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.gainVoayage{
    width: 35%;
}
.gainVoayage > p{
    margin: 0px;
    margin-left: 15px;
}
.gainExpedition{
    width: 35%;
}
.gainExpedition > p{
    margin: 0px;
    text-align: end;
    margin-right: 15px;
}


.noteDefWrapper{
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
.noteDefWrapper span{
    font-size: 20px;
    color: #ffffff96;
}


























</style>