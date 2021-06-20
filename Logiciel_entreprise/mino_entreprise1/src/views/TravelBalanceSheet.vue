<template>


  <div class="bodyBox">
      <div class="TheBoxBody ForTravelDeclaration">
          <p class="MaintTitle">GESTION DES TICKETS</p>

          <div>
            <h1>Bilan des voyages</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit reprehenderit atque voluptatem animi architecto nihil, iste, rerum maiores.</p>
          </div>


           <div class="tableWrapperDiv">
             
              <!-- STATISTIC DIALOG -->
              <v-dialog v-model="dialog" max-width="370">
                <v-card>
                  <v-card-text>
                    <v-container>
                      <div class="imgAndTitle">
                        <p>GESTION DES TICKETS</p>
                        <p>Bilan des voyages-détails</p>
                      </div>
                      <div class="statElment">
                        <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
                        <div>
                          <h2> {{ editedItem.details.vendus }} TICKETS</h2>
                          <h4>nombre de tickets vendus</h4>
                        </div>
                      </div>
                      <div class="statElment">
                        <v-icon  color="mainGreenColor"> mdi-arrow-right </v-icon>
                        <div>
                          <h2>{{ editedItem.details.aVendre }} TICKETS</h2>
                          <h4>nombre de tickets à vendre</h4>
                        </div>
                      </div>
                      <div class="statElment">
                        <v-icon  color="mainGreenColor"> mdi-arrow-right </v-icon>
                        <div>
                          <h2>{{ editedItem.details.restant }} TICKETS</h2>
                          <h4>nombre de tickets restant</h4>
                        </div>
                      </div>
                      <div class="statElment">
                        <v-icon  color="mainGreenColor"> mdi-arrow-right </v-icon>
                        <div>
                          <h2>{{ editedItem.details.annules }} TICKETS</h2>
                          <h4>nombre de tickets annulés</h4>
                        </div>
                      </div>
                      <div class="statElment">
                        <v-icon  color="mainGreenColor"> mdi-arrow-right </v-icon>
                        <div>
                          <h2>{{ editedItem.details.gains }} TICKETS</h2>
                          <h4>gains total des ventes de tickets</h4>
                        </div>
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

              <v-data-table dense :headers="headers" :items="Travels" :search="search"  hide-default-footer>
                <!-- FOR SEE DETAILS AND STATISTIC DIALOG -->
                <template v-slot:[`item.actions`]="{ item }"> <!-- modification avec CESINHIO  a la base on avait v-slot:[item.actions="{ item }"-->
                <v-btn  icon color="mainGreenColor"  @click="editItem(item)"><v-icon small> mdi-arrow-right </v-icon> voir details</v-btn>
                </template>
              </v-data-table>

            </div>
          
      </div>
  </div>
  
  
</template>


















<script>
import { mapGetters } from "vuex";


export default {
  name: "TravelBalanceSheet",
  components: {
    
  },

  data: () => ({
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    search: '',
    headers: [
        {
          text: 'DESTINATION',
          align: 'start',
          sortable: false,
          value: 'destination',
        },
        { text: 'DEPARTURE DATE', value: 'departure_date' },
        { text: 'DEPARTURE HEURE', value: 'departure_time' },
        { text: 'DETAILS', value: 'actions', sortable: false },
      ],
    desserts: [
     
    ],


      editedItem: {
        destination: '',
        departure_date:'',
        departure_time: '',
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


  computed:{
    ...mapGetters([
      'Travels'
    ])
    // travels () {
    //   return this.$store.getters.travels
    // }
  },

  created(){
    console.log('poulet');
    this.$store.dispatch('init_travelListe')
  }

};


</script>






















<style scoped>

.TheBoxBody{
    height: 58vh;
    margin-top: -20px;
}
.ForTravelDeclaration{
  background: white;
  text-align: center;
}
.MaintTitle{
  background:  var(--main-green-color);
  line-height: 40px;
  text-align: center;
  font-weight: bold;
  color: var(--main-white-color);
  font-size: 17px;
  margin-top: 0px;
}



.tableWrapperDiv{
  height: 63%;
  overflow-y: scroll;
}
.tableWrapperDiv::-webkit-scrollbar{
  width: 20px;
}
.tableWrapperDiv::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
}

.tableWrapperDiv::-webkit-scrollbar-thumb {
  background-color: var(--main-green-color);
  border-radius: 30px;
  border: 7px solid rgb(255, 255, 255);
}

.v-data-table {
  line-height: 1.5;
  max-width: 100%;
  margin: 0px 45px;
}
.v-btn {
    font-weight: bold;
    letter-spacing: normal;
    text-transform: none;
}






.imgAndTitle{
  margin: 15px 0px;
  height: 220px;
  width: 300px;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  background: linear-gradient(180deg, rgb(0 0 0 / 0%),rgb(0 0 0 / 19%), rgb(0 0 0)), url(../assets/img/traffic-vehicle-urban-reflections-city.jpg);
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
</style>