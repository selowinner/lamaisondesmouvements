<template>

    <div class="bodyBox">
        <div class="TheBoxBody">
            <p class="sectionTitle">Statistiques  </p>
            <v-container fluid class="pouletBr">
                <v-row>

                    <v-col cols="12" md="3" lg="3">
                        <div class="numberWrapper rightBox">
                            <div class="travelsum">
                                <div class="dest">
                                    <div class="N-iconForSumTravel">
                                        <v-icon color="mainGreenColor" style="font-size:25px">mdi-bus-multiple</v-icon>
                                    </div>
                                    <div class="trueSum">
                                        <p style="font-size:14px;">Petit-Yamoussoukro</p>
                                        <div class="sum">
                                            <p ><span class="pufff">150000 fr</span></p>
                                            <p ><span class="pufff">70 Tickets</span></p>
                                        </div>
                                    </div>                            
                                </div>
                               
                            </div>
                            <div class="travelsum">
                                <div class="dest">
                                    <div class="N-iconForSumTravel">
                                        <v-icon color="mainGreenColor" style="font-size:25px">mdi-bus-multiple</v-icon>
                                    </div>
                                    <div class="trueSum">
                                        <p style="font-size:14px;">Petit-Yamoussoukro</p>
                                        <div class="sum">
                                            <p ><span class="pufff">150000 fr</span></p>
                                            <p ><span class="pufff">70 Tickets</span></p>
                                        </div>
                                    </div>                            
                                </div>
                               
                            </div>
                            <div class="travelsum">
                                <div class="dest">
                                    <div class="N-iconForSumTravel">
                                        <v-icon color="mainGreenColor" style="font-size:25px">mdi-bus-multiple</v-icon>
                                    </div>
                                    <div class="trueSum">
                                        <p style="font-size:14px;">Petit-Yamoussoukro</p>
                                        <div class="sum">
                                            <p ><span class="pufff">150000 fr</span></p>
                                            <p ><span class="pufff">70 Tickets</span></p>
                                        </div>
                                    </div>                            
                                </div>
                               
                            </div>
                            <div class="travelsum">
                                <div class="dest">
                                    <div class="N-iconForSumTravel">
                                        <v-icon color="mainGreenColor" style="font-size:25px">mdi-bus-multiple</v-icon>
                                    </div>
                                    <div class="trueSum">
                                        <p style="font-size:14px;">Petit-Yamoussoukro</p>
                                        <div class="sum">
                                            <p ><span class="pufff">150000 fr</span></p>
                                            <p ><span class="pufff">70 Tickets</span></p>
                                        </div>
                                    </div>                            
                                </div>
                               
                            </div>
                            <div class="travelsum">
                                <div class="dest">
                                    <div class="N-iconForSumTravel">
                                        <v-icon color="mainGreenColor" style="font-size:25px">mdi-bus-multiple</v-icon>
                                    </div>
                                    <div class="trueSum">
                                        <p style="font-size:14px;">Petit-Yamoussoukro</p>
                                        <div class="sum">
                                            <p ><span class="pufff">150000 fr</span></p>
                                            <p ><span class="pufff">70 Tickets</span></p>
                                        </div>
                                    </div>                            
                                </div>
                               
                            </div>
                            <div class="travelsum">
                                <div class="dest">
                                    <div class="N-iconForSumTravel">
                                        <v-icon color="mainGreenColor" style="font-size:25px">mdi-bus-multiple</v-icon>
                                    </div>
                                    <div class="trueSum">
                                        <p style="font-size:14px;">Petit-Yamoussoukro</p>
                                        <div class="sum">
                                            <p ><span class="pufff">150000 fr</span></p>
                                            <p ><span class="pufff">70 Tickets</span></p>
                                        </div>
                                    </div>                            
                                </div>
                               
                            </div>
                            <div class="travelsum">
                                <div class="dest">
                                    <div class="N-iconForSumTravel">
                                        <v-icon color="mainGreenColor" style="font-size:25px">mdi-bus-multiple</v-icon>
                                    </div>
                                    <div class="trueSum">
                                        <p style="font-size:14px;">Petit-Yamoussoukro</p>
                                        <div class="sum">
                                            <p ><span class="pufff">150000 fr</span></p>
                                            <p ><span class="pufff">70 Tickets</span></p>
                                        </div>
                                    </div>                            
                                </div>
                               
                            </div>
                            <div class="travelsum">
                                <div class="dest">
                                    <div class="N-iconForSumTravel">
                                        <v-icon color="mainGreenColor" style="font-size:25px">mdi-bus-multiple</v-icon>
                                    </div>
                                    <div class="trueSum">
                                        <p style="font-size:14px;">Petit-Yamoussoukro</p>
                                        <div class="sum">
                                            <p ><span class="pufff">150000 fr</span></p>
                                            <p ><span class="pufff">70 Tickets</span></p>
                                        </div>
                                    </div>                            
                                </div>
                               
                            </div>
                        </div>
                    </v-col>


                    <v-col cols="12" md="6" lg="6">
                        <div class="numberWrapper middleBox">
                        <apexchart type="line" height="100%" :options="productchartOptions" :series="series"></apexchart>
                        </div>
                    </v-col>


                     <v-col cols="12" md="3" lg="3" class="leftNumber">
                        <div class="stat1">
                            <div class="N-icon">
                                <v-icon color="mainGreenColor">mdi-bus-multiple</v-icon>
                            </div>
                            <h1>45</h1>
                            <h5>voyages éffectués</h5>
                        </div>
                        <div class="stat1">
                            <div class="N-icon">
                                <v-icon color="mainGreenColor">mdi-bus-alert</v-icon>
                            </div>
                            <h1>32</h1>
                            <h5>voyages annulés</h5>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
  
  
</template>











<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "TravelStat",
  components: {
    // HelloWorld
  },

data: () => ({
    /* FOR  SERVICE STATS */
    series: [{
    name: 'series7',
    type:'area',
    data: [31, 40, 28, 51, 42, 109, 100]
    },
    {
    name: 'series2',
    type:'bar',
    data: [11, 32, 45, 32, 34, 52, 41]
    }],

     productchartOptions: {
        grid: {
        show: false,
        },
        chart: {
          type: 'area',
          toolbar: {
          show: false,
          },
          
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '15%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        colors:['#3e886d'],
        stroke: {
          show: true,
          width: 2,
          // colors: ['transparent']
          curve: 'smooth'
        },
        xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {
          
        },
        fill: {
          opacity: [0.1, 1]
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands"
            }
          }
        }
      },

  }),

};


</script>











<style scoped>

.sectionTitle{
    margin: 0;
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: bold;
}
.numberWrapper{
    border-radius: 10px;
    background: white;
}

.rightBox, .middleBox{
    height: 60vh;
}
.rightBox{
   padding: 10px;
   overflow-y: scroll;
}
.rightBox::-webkit-scrollbar{
  width: 20px;
}
.rightBox::-webkit-scrollbar-track {
  background: #ffffff;
}

.rightBox::-webkit-scrollbar-thumb {
  background-color: var(--main-green-color);
  border-radius: 30px;
  border: 7px solid #ffffff;
}



.travelsum{
    /* background: red; */
    height: 100px;
    width: 100%;
    margin-bottom: 20px;
}
.dest{
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    background: #3e886d4a;
    border-radius: 10px;
}
.N-iconForSumTravel{
    display: flex;
    justify-content: center;
    align-items: center;
    background: #3e886d4a;
    margin: 0px 7px;
    padding: 12px;
    border-radius: 10px;
}
.trueSum{
    /* background: pink; */
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.trueSum p{
    margin: 0;
    padding: 0;
}
.sum{
    text-align: center;
    font-size:13px;
    display: flex;
    align-items: center;
    margin-top: 5px;
    
    background: white;
    padding: 5px;
    border-radius: 5px;
    width: 85%;
}
.sum > p{
   font-weight: bold;
}
.sum p:first-child{
    margin-right:15px;
}
/* .pufff{
    background: white;
    padding: 5px;
    border-radius: 5px; */
/* } */








.stat1{
  background: white;
  height: 250px;
  border-radius: 10px;
  margin-bottom: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.N-icon{
    height: 60px;
    width: 60px;
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




























</style>