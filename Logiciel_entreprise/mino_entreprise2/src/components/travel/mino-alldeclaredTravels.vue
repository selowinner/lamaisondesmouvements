<template>
    <div class="tableWrapperDiv">
           <!-- SHOW DIALOG -->
            <v-dialog v-model="dialog" max-width="370">
            <v-card>
                <v-card-text>
                <v-container>
                    <div class="imgAndTitle">
                    <!-- <p>GESTION DES TICKETS</p> -->
                    <p>Bilan des voyages-détails {{StationOne}} </p>
                    </div>
                    <p class="subtitle">{{editedItem.destination}}</p>
                    <div class="backBoad backBoad-1">
                      <div class="travelResume">
                          <div class="part">
                          <!-- <p> <span>{{editedItem.departure_date}}</span><br>date de départ</p> -->
                          <p> <span>{{editedItem.departure_place}}</span><br>lieu de départ</p>
                          <p> <span>{{editedItem.place_to_sell_by_mino_number}}</span><br>place à vendre</p>
                          <p> <span>{{editedItem.car_informations}}</span><br>type de car</p>
                          </div>
                          <div class="part">
                          <p> <span>{{editedItem.departure_time}}</span><br>heure de départ</p>
                          <p> <span>{{editedItem.destination}}</span><br>destination</p>
                          <p> <span>{{editedItem.place_price}}</span><br>prix du ticket</p>
                          </div>
                      </div>
                    </div>
                    <div class="statElment">

                    </div>
                </v-container>
                </v-card-text>
                <!-- <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

                <v-card-text>
                Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="green darken-1"
                    text
                    @click="dialog = false"
                >
                    Disagree
                </v-btn>

                <v-btn
                    color="green darken-1"
                    text
                    @click="dialog = false"
                >
                    Agree
                </v-btn>
                </v-card-actions> -->
            </v-card>
            </v-dialog>

            <v-data-table dense :headers="headers" :items="TravelsDeclared" :search="Seach"  hide-default-footer class="backgroundTree">
            <!-- FOR SEE DETAILS AND STATISTIC DIALOG for VOYAGES DECLARES -->
            <template v-slot:[`item.actions`]="{ item }"> 
            <v-btn  icon color="mainGreenColor"  @click="editItem(item)"><v-icon small> mdi-eye </v-icon></v-btn>
            </template>
            </v-data-table>

    </div>
</template>











<script>
import { mapGetters } from "vuex";
export default  {
  name: "MinoallDeclaredTravel",

  components: {
    
  },

  data: () => ({

    //for the list
    search: '',
    headers: [
      {
        text: 'DESTINATION',
        align: 'start',
        sortable: false,
        value: 'destination',
      },
      { text: 'DATE DE DEPART', value: 'departure_date' },
      { text: 'HEURE DE DEPART', value: 'departure_time' },
      { text: 'DETAILS', value: 'actions', sortable: false },
    ],
       items: [
      //   {
      //   name: 'Frozen Yogurt',
      //   date: '21-01-2021',
      //   heure: '09:00',
      //   details:{
      //     vendus: 30,
      //     aVendre: 45,
      //     restant: 15,
      //     annules: 5,
      //     gains: 150000
      //   }
      // },
      // {
      //   name: 'Ice cream sandwich',
      //   date: '01-01-2021',
      //   heure: '09:00',
      //   details:{
      //     vendus: 45,
      //     aVendre: 45,
      //     restant: 0,
      //     annules: 5,
      //     gains: 160000
      //   }
      // },
      // {
      //   name: 'Eclair',
      //   date: '25-03-2021',
      //   heure: '09:00',
      //   details:{
      //     vendus: 30,
      //     aVendre: 20,
      //     restant: 10,
      //     annules: 0,
      //     gains: 350000
      //   }
      // },
      // {
      //   name: 'Cupcake',
      //   date: '25-03-2021',
      //   heure: '09:00',
      //   details:{
      //     vendus: 30,
      //     aVendre: 45,
      //     restant: 15,
      //     annules: 5,
      //     gains: 150000
      //   }
      // },
      // {
      //   name: 'Gingerbread',
      //   date: '25-04-2021',
      //   heure: '09:00',
      //   details:{
      //     vendus: 30,
      //     aVendre: 45,
      //     restant: 15,
      //     annules: 5,
      //     gains: 150000
      //   }
      // },
      // {
      //   name: 'Jelly bean',
      //   date: '25-03-2021',
      //   heure: '09:00',
      //   details:{
      //     vendus: 30,
      //     aVendre: 45,
      //     restant: 15,
      //     annules: 5,
      //     gains: 150000
      //   }
      // },
      // {
      //   name: 'Lollipop',
      //   date: '25-03-2021',
      //   heure: '09:00',
      //   details:{
      //     vendus: 30,
      //     aVendre: 45,
      //     restant: 15,
      //     annules: 5,
      //     gains: 150000
      //   }
      // },
      // {
      //   name: 'Honeycomb',
      //   date: '15-02-2021',
      //   heure: '09:00',
      //   details:{
      //     vendus: 30,
      //     aVendre: 45,
      //     restant: 15,
      //     annules: 5,
      //     gains: 150000
      //   }
      // },
      // {
      //   name: 'Donut',
      //   date: '25-03-2021',
      //   heure: '09:00',
      //   details:{
      //     vendus: 30,
      //     aVendre: 45,
      //     restant: 15,
      //     annules: 5,
      //     gains: 150000
      //   }
      // },
      // {
      //   name: 'KitKat',
      //   date:'25-03-2021',
      //   heure: '09:00',
      //   details:{
      //     vendus: 30,
      //     aVendre: 45,
      //     restant: 15,
      //     annules: 5,
      //     gains: 150000
      //   }
      // },
    ],
   

      editedItem: {
        name: '',
        date:'',
        heure: '',
        details:{
          vendus: 0,
          aVendre: 0,
          restant: 0,
          annules: 0,
          gains: 0
        }
      },



    dialog: false
    
  }),

  methods: {
    editItem: function (item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      console.log(item.name);
    },
  },


  computed: {

    ...mapGetters([
      'TravelsDeclared',
    ]),

    StationOne () {
      return this.$store.state.OneSTation
    },
    
    Seach () {
      return this.$store.state.seachAllTravel
    },
  },

  
  created(){
    this.$store.dispatch('init_travelsDeclared', this.StationOne)
  }


};


</script>












<style scoped>
.tableWrapperDiv{
  height: 63%;
  overflow-y: auto;
}
.tableWrapperDiv::-webkit-scrollbar{
  width: 20px;
}
.tableWrapperDiv::-webkit-scrollbar-track {
  background: white;
}

.tableWrapperDiv::-webkit-scrollbar-thumb {
  background-color: var(--main-green-color);
  border-radius: 30px;
  border: 7px solid white;
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
    /* background-color: transparent; */
    /* color: rgba(0, 0, 0, 0.87); */
}



/* Show details */
.imgAndTitle{
  margin-top: 15px;
  height: 220px;
  width: 297.5px;
  border-radius: 7px 7px 0px 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  background: linear-gradient(180deg, rgb(0 0 0 / 0%),rgb(0 0 0 / 19%), rgb(0 0 0)), url(../../assets/img/traffic-vehicle-urban-reflections-city.jpg);
  background-position: center;
  background-size: cover;
}
.imgAndTitle > p:first-child{
    font-size: 21px;
    font-weight: bold;
    margin: 0px;
    margin-left: 20px;
    color: white;
}
.imgAndTitle > p:last-child{
    font-size: 15px;
    font-weight: bold;
    margin: 0px 0px 10px 20px;
    color: white;
}

.statElment{
  margin-bottom: 15px;
  display: flex;
}
.statElment >div{
  margin-left: 10px;
}
.statElment  h2{
  font-size: 21px;
  color: var(--main-green-color)
}









/* FOR VOYAGE DECLARE */
.backBoad-1 .part  p{
  margin: 10px 0px;
}

/* FOR VOYAGE DECLARE */
.backBoad-2 .part  p{
  margin-left: 25px;
}









.subtitle{
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: -0.5px;
  font-size: 17px;
  text-align: center;
  margin: 0px 0px;
  padding: 10px;
  border-radius: 0px 0px 7px 7px;
  color: white;
  background: var(--main-important-color);
}

.backBoad{
  background: var(--backgroundTree);
  color: var(--Important-font-color);
}
.basicInfo{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-bottom: solid 1px var(--Important-font-color);
  padding-bottom: 10px;
  margin-bottom: 15px;
}
.basicInfo p{
  /* width: 100px; */
  margin-top: 15px;
  margin-bottom: 5px;
  font-weight: 200;
}


.nowIDontKnowHerUsing{
  height: 100px;
  border-bottom: solid 1px var(--Important-font-color);
}


.travelResume{
  width: 100%;
  display: flex;
}
.part{
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  /* align-items: center; */
}
.part p{
  margin: 5px 0px;
  margin-left: 15px;
}
.part span{
  font-weight: bold;
  color: #8e8f91;
}








/* FOR VOYAGE DECLARE */
.backBoad-1 .part  p{
  margin: 10px 0px;
}

/* FOR VOYAGE DECLARE */
.backBoad-2 .part  p{
  margin-left: 25px;
}










@media (min-width: 960px){
  .col-md-4 {
    padding-bottom: 30px !important; 
    padding-top: 10px !important;
}
}





</style>