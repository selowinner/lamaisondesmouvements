<template>


    <div class="tableWrapperDiv">


         <!-- EDIT TRAVEL DIALOG -->
        <v-dialog v-model="dialogEdit" max-width="370">
        <v-card>
            <v-card-text>
            <v-container>
                <div class="imgAndTitle deleteIMG editIMGO">
                <p>MODIFICATION DES INFORMATION DE LA GARE</p>
                <!-- <p>Livreur</p> -->
                </div>
                <form class="updateForm">
                    <v-container fluid>
                         <v-row>
                          <v-col cols="12" md="12" lg="12">
                              <v-text-field height="45" solo label="Pays" append-icon="mdi-home-city" v-model="editedItem.country"  ref="matri"  type="text"   value=""  persistent-hint required ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="12" lg="12">
                              <v-text-field height="45" background-color="#3e886d4a" solo label="Ville" v-model="editedItem.city" append-icon="mdi-map-marker"  ref="total_name"  type="text"   value=""  persistent-hint required ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="12" lg="12">
                              <v-text-field height="45" solo  append-icon="mdi-transit-connection-variant"   ref="location"   type="text" v-model="editedItem.neighborhood"  value="" label="Quartier" persistent-hint required></v-text-field>
                          </v-col>
                          <v-col cols="12" md="12" lg="12">
                              <v-text-field  height="45" background-color="#3e886d4a" solo  append-icon="mdi-robot-happy"  v-model="editedItem.other_denomination"  ref="transport" type="text"   label="Denomination de la gare" persistent-hint required></v-text-field>
                          </v-col>
                          <v-col cols="12" md="12" lg="12">
                              <v-text-field height="45"  solo  append-icon="mdi-comment-text"  ref="pla_number" type="text" v-model="editedItem.description"  label="Description"  persistent-hint required></v-text-field>
                          </v-col>
                          <v-col cols="12" md="12" lg="12">
                              <v-text-field height="45"  background-color="#3e886d4a" solo label="Contact" append-icon="mdi-phone"  ref="matri"  type="number" v-model="editedItem.contact"  value=""  persistent-hint required ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="12" lg="12">
                              <v-text-field height="45" solo  append-icon="mdi-matrix"   ref="location"   type="text" v-model="editedItem.matriculation"  value="" label="Code D'identification de la gare" persistent-hint required></v-text-field>
                          </v-col>
                          <v-col cols="12" md="12" lg="12">
                              <v-text-field height="45" solo background-color="#3e886d4a" append-icon="mdi-matrix"   ref="location"   type="text" v-model="editedItem.mino_code"  value="" label="Code Mino" persistent-hint required></v-text-field>
                          </v-col>
                          <v-col cols="12" md="12" lg="12">
                              <v-switch v-model="editedItem.package_service_use" label="Service expédition de colis"></v-switch>
                              <!-- <v-text-field height="60" background-color="#3e886d4a" solo label="Service livraison" v-model="editedItem.complet_name" append-icon="mdi-account-details-outline"  ref="total_name"  type="text"   value=""  persistent-hint required ></v-text-field> -->
                          </v-col>
                        </v-row>
                    </v-container>
                </form>
            </v-container>
            </v-card-text>

            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="Titlecolor" rounded depressed @click="closeEdit" style="color:white">Annuler</v-btn>
            <v-btn color="mainGreenColor" rounded depressed @click="editItemConfirm" style="color:white">Enregistrer</v-btn>
        
            </v-card-actions>
        </v-card>
        </v-dialog>


        <!-- SHOW DIALOG -->
        <v-dialog v-model="dialog" max-width="370">
        <v-card>
            <v-card-text>
            <v-container>
                <div class="imgAndTitle">
                <p>{{editedItem.other_denomination}}</p>
                <p>Information - Bilan Des Livraisons</p>
                </div>
                <div class="statElment">
                <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
                <div>
                    <h2>CONTACT</h2>
                    <h4>{{editedItem.contact}}</h4>
                </div>
                </div>
                <div class="statElment">
                <v-icon  color="mainGreenColor"> mdi-arrow-right </v-icon>
                <div>
                    <h2>DESCRIPTION</h2>
                    <h4>{{editedItem.description}}</h4>
                </div>
                </div>
                
            </v-container>
            </v-card-text>
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
        <v-data-table dense :headers="headers" :items="Stations_with_details" :search="search"  :items-per-page="-1" hide-default-footer>
        <!-- FOR SEE EDIT, DELETE AND SHOW DIALOG -->
        <template v-slot:[`item.actions`]="{ item }"> 
        <v-btn  icon color="mainGreenColor"  @click="showItem(item)"><v-icon small > mdi-eye </v-icon></v-btn>
        <v-btn  icon color="mainGreenColor"  @click="editItem(item)"><v-icon small> mdi-lead-pencil </v-icon></v-btn>
        </template>
        <template v-slot:[`item.city`]="{ item }"> 
        <v-icon dense color="#476866"> mdi-map-marker-radius </v-icon> <span style="color: mainGreenColor;">{{item.city}}</span>
        </template>
        <template v-slot:[`item.package_service_use`]="{ item }">
            <v-chip dark v-if="item.package_service_use == 1" color="#476866"> <v-icon color="mainGreenColor" small>mdi-star-shooting</v-icon>Oui</v-chip>
            <v-chip dark v-if="item.package_service_use == 0" color="#c7dcd4"> <v-icon color="mainGreenColor" small>mdi-window-close</v-icon>Non</v-chip>
        </template>
        </v-data-table>
        </div>


    

        <transition name="slide"> 
        <v-alert v-if="addingSuccess" elevation="13" type="success" max-width="300" class="alert" color="mainGreenColor">{{staionaAddingResponse.message}}</v-alert>
        </transition>
        <transition name="slide"> 
        <v-alert v-if="addingfalse" elevation="13" type="error" max-width="300" class="alert" color="error"> {{staionaAddingResponse.message}}</v-alert>
        </transition>
    </div>
    
</template>










<script>
import Vue from 'vue'
import { mapGetters } from "vuex";


export default {
  name: "allstaionsList",
  components: {
    
  },

  data: () => ({
    // For the table
    search: '',
    headers: [
        {
          text: 'VILLE',
          align: 'start',
          sortable: false,
          value: 'city',
        },
        { text: 'QUATIER', value: 'neighborhood' },
        { text: 'OPTION EXPEDITION',  align: 'center', value: 'package_service_use' },
        { text: 'DETAILS', value: 'actions', sortable: false },
      ],
    desserts: [
    //  {
    //     name: 'Frozen Yogurt',
    //     date: '21-01-2021',
    //     heure: '09:00',
    //     details:{
    //       vendus: 30,
    //       aVendre: 45,
    //       restant: 15,
    //       annules: 5,
    //       gains: 150000
    //     }
    //   },
    //   {
    //     name: 'Ice cream sandwich',
    //     date: '01-01-2021',
    //     heure: '09:00',
    //     details:{
    //       vendus: 45,
    //       aVendre: 45,
    //       restant: 0,
    //       annules: 5,
    //       gains: 160000
    //     }
    //   },
    //   {
    //     name: 'Eclair',
    //     date: '25-03-2021',
    //     heure: '09:00',
    //     details:{
    //       vendus: 30,
    //       aVendre: 20,
    //       restant: 10,
    //       annules: 0,
    //       gains: 350000
    //     }
    //   },
    //   {
    //     name: 'Cupcake',
    //     date: '25-03-2021',
    //     heure: '09:00',
    //     details:{
    //       vendus: 30,
    //       aVendre: 45,
    //       restant: 15,
    //       annules: 5,
    //       gains: 150000
    //     }
    //   },
    //   {
    //     name: 'Gingerbread',
    //     date: '25-04-2021',
    //     heure: '09:00',
    //     details:{
    //       vendus: 30,
    //       aVendre: 45,
    //       restant: 15,
    //       annules: 5,
    //       gains: 150000
    //     }
    //   },
    //   {
    //     name: 'Jelly bean',
    //     date: '25-03-2021',
    //     heure: '09:00',
    //     details:{
    //       vendus: 30,
    //       aVendre: 45,
    //       restant: 15,
    //       annules: 5,
    //       gains: 150000
    //     }
    //   },
    //   {
    //     name: 'Lollipop',
    //     date: '25-03-2021',
    //     heure: '09:00',
    //     details:{
    //       vendus: 30,
    //       aVendre: 45,
    //       restant: 15,
    //       annules: 5,
    //       gains: 150000
    //     }
    //   },
    //   {
    //     name: 'Honeycomb',
    //     date: '15-02-2021',
    //     heure: '09:00',
    //     details:{
    //       vendus: 30,
    //       aVendre: 45,
    //       restant: 15,
    //       annules: 5,
    //       gains: 150000
    //     }
    //   },
    //   {
    //     name: 'Donut',
    //     date: '25-03-2021',
    //     heure: '09:00',
    //     details:{
    //       vendus: 30,
    //       aVendre: 45,
    //       restant: 15,
    //       annules: 5,
    //       gains: 150000
    //     }
    //   },
    //   {
    //     name: 'KitKat',
    //     date:'25-03-2021',
    //     heure: '09:00',
    //     details:{
    //       vendus: 30,
    //       aVendre: 45,
    //       restant: 15,
    //       annules: 5,
    //       gains: 150000
    //     }
    //   },
    ],

    // for alerte 
    addingSuccess: false,
    addingfalse : false,

    // For staion detail
    dialog: false,
    editedItem: {
      matriculation: '',
      description: '',
      country: '', 
      contact: '',
      city: '',
      neighborhood: '',
      other_denomination: '',
      mino_code: '',
      package_service_use: false,
      user_id: '1',
    },

    // For staion edit
    staionaAddingResponse: "",
    dialogEdit: false,
    editedIndex: -1,

    
    // For staion deleted
    dialogDelete: false,
    itemToDelete: '',



  }),




  methods: {

  // ------------------------
    // Show Profil infomation
  // ------------------------
    showItem (item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },


  // ------------------------
    // For Profil Edited
  // ------------------------
  editItem (item) {
      this.editedIndex = this.Stations_with_details.indexOf(item)
      this.editedItem = Object.assign({}, item)
      //  Open the Edit Dialogue
      this.dialogEdit = true
  },

  editItemConfirm () {
    Vue.prototype.$http.put('http://127.0.0.1:3333/station/update', this.editedItem)
      .then(response =>{
        this.staionaAddingResponse = response.data
        if (this.staionaAddingResponse.message == "success" ) {
          // Modification effectuée
          this.staionaAddingResponse.message = "modification effectuée"
          this.addingSuccess = !this.addingSuccess
          setTimeout(() => {
              this.addingSuccess = !this.addingSuccess
              this.forceRerender2()
          }, 3000);
        } else if (this.staionaAddingResponse.message != "success") {
            console.log('des reservations ont déjà été faites pour ce voyage, en cas dannulation vous devriez rembourser les tickets déjà achetés');
          // Modification effectuée
          this.addingfalse = !this.addingfalse
          setTimeout(() => {
              this.addingfalse = !this.addingfalse
          }, 3000);
        }
      })
      .catch(error => {
        this.staionaAddingResponse = error.message;
        console.error("There was an error!", error);
      });

      this.closeEdit()

    },

    closeEdit () {
        this.dialogEdit = false  
    },









     // For table re-render after delete or update an item
    forceRerender2() {
      this.$store.state.stationcomponentKey += 1
    }

  },






  computed:{
    ...mapGetters([
      'Stations_with_details',
    ])
  },

  created(){
    this.$store.dispatch('init_station_with_details')
  }

};


</script>













<style scoped>


.tableWrapperDiv{
  height: 514px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  padding: 25px;
  padding-bottom: 50px;
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
  width: 297.5px;
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
  font-size: 16px;
  color: var(--main-green-color)
}

.statusChange{
    display: flex;
    justify-content: center;
}


/* Edit travel */
.editIMGO{
  margin-bottom: 35px;
  width: 297.5px;
}
.updateForm{
    height: 250px;
    width: 110%;
    overflow-y: scroll;
}
.updateForm::-webkit-scrollbar{
  width: 20px;
}
.updateForm::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
}

.updateForm::-webkit-scrollbar-thumb {
  background-color: var(--main-green-color);
  border-radius: 30px;
  border: 7px solid rgb(255, 255, 255);
}


.updateForm .col-lg-12, .col-md-12{
  padding-bottom: 0px ;
  padding-top: 0px ;
}


/* Delete travel */
/* .deleteIMG{
  width: 350px;
}
.CancelVerification{
  text-align: center;
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 30px;
}
.verificationAction{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.verificationAction > button{
  width: 150px;
} */






</style>