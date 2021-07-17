<template>


    <div class="tableWrapperDiv">
        <!-- SHOW DIALOG -->
        <v-dialog v-model="dialog" max-width="400">
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
                    <h2>INFORMATIONS</h2>
                    <h4>{{ editedItem.details.vendus }} </h4>
                </div>
                </div>
                <div class="statElment">
                <v-icon  color="mainGreenColor"> mdi-arrow-right </v-icon>
                <div>
                    <h2>PROPRIETAIRE</h2>
                    <h4>nombre de tickets à vendre</h4>
                </div>
                </div>
                <div class="statElment">
                <v-icon  color="mainGreenColor"> mdi-arrow-right </v-icon>
                <div>
                    <h2>DESCRIPTION DE L'OBJET</h2>
                    <h4>nombre de tickets restant</h4>
                </div>
                </div>
                <div class="statElment statusChange">
                 <v-radio-group class="statusChange" row  v-model="ex7"> <v-radio label="red" color="error" value="red"></v-radio> <v-radio label="success" color="mainGreenColor" value="success"></v-radio> </v-radio-group>
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


        <!-- THE SEACH BAR -->
        <v-row>
          <v-col  cols="12" md="5" lg="5">
            <v-text-field v-model="search" dense outlined hide-details prepend-inner-icon="mdi-search" label="Rechercher" class="theSeachBar"></v-text-field>
          </v-col>
        </v-row>            
        <!-- START DATA TABLE -->
        <div class="dataWrapper">
        <v-data-table dense :headers="headers" :items="LostObjets" :search="search"  :items-per-page="-1" hide-default-footer>
        <!-- FOR SEE EDIT, DELETE AND SHOW DIALOG -->
        <template v-slot:[`item.actions`]="{ item }"> <!-- modification avec CESINHIO  a la base on avait v-slot:[item.actions="{ item }"-->
        <v-btn  icon color="mainGreenColor"  @click="showItem(item)"><v-icon small> mdi-eye </v-icon></v-btn>
        <v-btn  icon color="mainGreenColor"  @click="showItem(item)"><v-icon small> mdi-lead-pencil </v-icon></v-btn>
        <v-btn  icon color="mainGreenColor"  @click="showItem(item)"><v-icon small> mdi-trash-can </v-icon></v-btn>
        </template>
        <template v-slot:[`item.destination`]="{ item }"> <!-- modification avec CESINHIO  a la base on avait v-slot:[item.actions="{ item }"-->
        <v-icon dense color="mainGreenColor"> mdi-map-marker </v-icon> <span style="color: mainGreenColor;">{{item.contact}}</span>
        </template>
        <template v-slot:[`item.departure_time`]="{ item }"> <!-- modification avec CESINHIO  a la base on avait v-slot:[item.actions="{ item }"-->
        <v-icon small> mdi-arrow-right </v-icon> {{item.departure_place}}
        </template>
        </v-data-table>
        </div>

    </div>
    
</template>










<script>
import { mapGetters } from "vuex";


export default {
  name: "alleExpeditionList",
  components: {
    
  },

  data: () => ({
    // For the table
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

    // For travel detail
    dialog: false,
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


    // For lostObjet Status change
    ex7: 'red',

  }),




  methods: {

  // ------------------------
    // Show Travel infomation
  // ------------------------
    showItem (item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

 
  },






  computed:{
    ...mapGetters([
      'LostObjets',
    ])
  },

  created(){
    this.$store.dispatch('init_lostObjet')
  }

};


</script>













<style scoped>


.tableWrapperDiv{
  height: 62%;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  padding: 25px;
}
.dataWrapper{
  height: 100%;
  overflow-y: scroll;
  background: #ffffff;
  padding: 0;
}
.dataWrapper::-webkit-scrollbar{
  width: 20px;
}
.dataWrapper::-webkit-scrollbar-track {
  background: #ffffff;
}

.dataWrapper::-webkit-scrollbar-thumb {
  background-color: var(--main-green-color);
  border-radius: 30px;
  border: 7px solid #ffffff;
}

.v-data-table {
  line-height: 1.5;
  max-width: 100%;
  /* margin: 0px 45px; */
}
.v-btn {
    font-weight: bold;
    letter-spacing: normal;
    text-transform: none;
}

.theSeachBar{
  /* margin-left: 50px; */
  margin-bottom: 10px;
}




/* Show details */
.imgAndTitle{
  margin: 15px 0px;
  height: 220px;
  width: 330px;
  border-radius: 7px;
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

.statusChange{
    display: flex;
    justify-content: center;
}







</style>