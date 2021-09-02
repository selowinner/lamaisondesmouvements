<template>
  <div class="tableWrapperDiv">
    <!-- SHOW DIALOG -->
    <v-dialog v-model="dialog" max-width="370">
      <v-card>
        <v-card-text>
          <v-container>
            <div class="imgAndTitle">
              <p>GESTION DES VOYAGES</p>
              <p>Bilan des voyages-détails</p>
            </div>
            <div class="statElment">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>{{ selectedItem.details.vendus }} TICKETS</h2>
                <h4>nombre de tickets vendus</h4>
              </div>
            </div>
            <div class="statElment">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>{{ selectedItem.details.aVendre }} TICKETS</h2>
                <h4>nombre de tickets à vendre</h4>
              </div>
            </div>
            <div class="statElment">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>{{ selectedItem.details.restant }} TICKETS</h2>
                <h4>nombre de tickets restant</h4>
              </div>
            </div>
            <div class="statElment">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>{{ selectedItem.details.annules }} TICKETS</h2>
                <h4>nombre de tickets annulés</h4>
              </div>
            </div>
            <div class="statElment">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>{{ selectedItem.details.gains }} TICKETS</h2>
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

    <!-- CONFIRM DELETED  TRAVEL DIALOG -->
    <v-dialog v-model="dialogDeleteConfirm" max-width="420">
      <v-card>
        <v-card-text>
          <div class="confirmTitle">AVERTISSEMENT !</div>
          <v-container>
            <div class="CancelVerification">
              Des reservations ont déjà été faites pour ce voyage, en cas
              d'annulation vous devriez rembourser les tickets déjà achetés
              <br />
              <br />
              <span style="font-weight: bold"
                >voulez-vous vraiment annuler <br />
                ce voyage ?</span
              >
            </div>
            <div class="verificationAction">
              <v-btn
                color="Titlecolor"
                rounded
                depressed
                @click="closeDelete"
                style="color: white"
                >Non</v-btn
              >
              <v-btn
                color="mainGreenColor"
                rounded
                depressed
                @click="deleteItemConfirm"
                style="color: white"
                >Oui</v-btn
              >
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- DELETE TRAVEL DIALOG -->
    <v-dialog v-model="dialogDelete" max-width="420">
      <v-card>
        <v-card-text>
          <v-container>
            <div class="imgAndTitle deleteIMG">
              <p>GESTION DES VOAGES</p>
              <p>Bilan des voyages-annulation</p>
            </div>
            <div class="CancelVerification">
              voulez-vous vraiment annuler <br />
              ce voyage ?
            </div>
            <div class="verificationAction">
              <v-btn
                color="Titlecolor"
                rounded
                depressed
                @click="closeDelete"
                style="color: white"
                >Non</v-btn
              >
              <v-btn
                color="mainGreenColor"
                rounded
                depressed
                @click="deleteItemConfirm"
                style="color: white"
                >Oui</v-btn
              >
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- EDIT TRAVEL DIALOG -->
    <v-dialog v-model="dialogEdit" max-width="420">
      <v-card>
        <v-card-text>
          <v-container>
            <div class="imgAndTitle deleteIMG editIMGO">
              <p>GESTION DES TICKETS</p>
              <p>Bilan des voyages-modification</p>
            </div>
            <form class="updateForm">
              <v-container fluid>
                <v-row>
                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      solo
                      label="Append"
                      append-icon="mdi-map-marker"
                      v-model="travelToEdit.departure_place"
                      ref="dep_place"
                      type="text"
                      value="Lieu de départ"
                      persistent-hint
                      required
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      background-color="#3e886d4a"
                      solo
                      v-model="travelToEdit.departure_date"
                      ref="dep_date"
                      type="date"
                      value=""
                      label="Date de départ"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      solo
                      append-icon="mdi-map-marker"
                      v-model="travelToEdit.destination"
                      ref="dest_place"
                      type="text"
                      label="Destination"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      background-color="#3e886d4a"
                      solo
                      v-model="travelToEdit.departure_time"
                      ref="dep_time"
                      type="time"
                      label="Heure départ"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      solo
                      append-icon="mdi-car-seat"
                      v-model="travelToEdit.total_car_place_number"
                      ref="pla_number"
                      type="number"
                      label="Nombre de place à disponible"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      background-color="#3e886d4a"
                      solo
                      append-icon="mdi-clipboard-text"
                      v-model="travelToEdit.car_informations"
                      ref="car_infos"
                      type="text"
                      label="type de car. ex: climatisé, dernière generation ..."
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      solo
                      append-icon="mdi-numeric"
                      v-model="travelToEdit.car_matriculation"
                      ref="car_matri"
                      type="text"
                      label="Matricule du car"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      background-color="#3e886d4a"
                      solo
                      append-icon="mdi-cash-multiple"
                      v-model="travelToEdit.place_price"
                      ref="pl_price"
                      type="number"
                      label="Prix du ticket"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      solo
                      append-icon="mdi-bus-stop"
                      v-model="travelToEdit.Intemediatestation"
                      ref="st_inter"
                      type="text"
                      label="atation intermediaires"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="Titlecolor"
            rounded
            depressed
            @click="closeEdit"
            style="color: white"
            >Annuler</v-btn
          >
          <v-btn
            color="mainGreenColor"
            rounded
            depressed
            @click="editTravelConfirm"
            style="color: white"
            >Enregistrer</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- THE SEACH BAR -->
    <v-row>
      <v-col cols="12" md="5" lg="5">
        <v-text-field
          v-model="search"
          dense
          outlined
          hide-details
          prepend-inner-icon="mdi-search"
          label="Rechercher"
          class="theSeachBar"
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- START DATA TABLE -->
    <div class="dataWrapper">
      <v-data-table
        dense
        :headers="headers"
        :items="Travels"
        :search="search"
        :items-per-page="-1"
        hide-default-footer
      >
        <!-- FOR SEE EDIT, DELETE AND SHOW DIALOG -->
        <template v-slot:[`item.actions`]="{ item }">
          <!-- modification avec CESINHIO  a la base on avait v-slot:[item.actions="{ item }"-->
          <v-btn icon class="mino-icon" color="mainGreenColor" @click="showItem(item)"
            ><v-icon small> mdi-eye </v-icon></v-btn
          >
          <v-btn icon class="mino-icon" color="mainGreenColor" @click="editItem(item)"
            ><v-icon small> mdi-lead-pencil </v-icon></v-btn
          >
          <v-btn icon class="mino-icon" color="mainGreenColor" @click="deleteItem(item)"
            ><v-icon small> mdi-trash-can </v-icon></v-btn
          >
        </template>
        <template v-slot:[`item.destination`]="{ item }">
          <!-- modification avec CESINHIO  a la base on avait v-slot:[item.actions="{ item }"-->
          <v-icon dense color="mainGreenColor"> mdi-map-marker </v-icon>
          <span style="color: mainGreenColor">{{ item.destination }}</span>
        </template>
        <template v-slot:[`item.departure_time`]="{ item }">
          <!-- modification avec CESINHIO  a la base on avait v-slot:[item.actions="{ item }"-->
          <v-icon small> mdi-arrow-right </v-icon> {{ item.departure_time }}
        </template>
      </v-data-table>
    </div>
    <!--  END DATA TABLE -->

    <!-- ALERT -->
    <transition name="slide">
      <v-alert
        v-if="addingSuccess"
        elevation="13"
        type="success"
        max-width="300"
        class="alert"
        color="mainGreenColor"
        >{{ this.travelDeleteResponse.message }}</v-alert
      >
    </transition>
    <transition name="slide">
      <v-alert
        v-if="addingfalse"
        elevation="13"
        type="error"
        max-width="300"
        class="alert"
        color="error"
        >{{ this.travelDeleteResponse.message }}</v-alert
      >
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";

export default {
  name: "allTravelList",
  components: {},

  data: () => ({
    // For the table
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    search: "",
    headers: [
      {
        text: "DESTINATION",
        align: "start",
        sortable: false,
        value: "destination",
      },
      { text: "DEPARTURE DATE", value: "departure_date" },
      { text: "DEPARTURE HEURE", value: "departure_time" },
      { text: "DETAILS", value: "actions", sortable: false },
    ],
    desserts: [],

    // for alerte
    addingSuccess: false,
    addingfalse: false,

    // For travel deleted
    dialogDelete: false,
    travelToDelete: "",
    travelDeleteResponse: "",

    // For travel deleted confirme
    dialogDeleteConfirm: false,

    // For travel detail
    dialog: false,

    // For travel edit
    dialogEdit: false,
    editedIndex: -1,
    defaultItem: {
      destination: "",
      departure_date: "",
      departure_time: "",
      details: {
        vendus: 0,
        aVendre: 0,
        restant: 0,
        annules: 0,
        gains: 0,
      },
    },
    selectedItem: {
      destination: "",
      departure_date: "",
      departure_time: "",
      details: {
        vendus: 0,
        aVendre: 0,
        restant: 0,
        annules: 0,
        gains: 0,
      },
    },
    travelToEdit: {
      destination: "",
      departure_date: "",
      departure_time: "",

      departure_place: "",
      total_car_place_number: "",
      car_informations: "",

      car_matriculation: "",
      place_price: "",
      Intemediatestation: "",
    },
    fieldEdited: "",
    fielsdChanged: "",
  }),

  watch: {
    // dialog (val) {
    //   val || this.close()
    // },
    // dialogDelete (val) {
    //   val || this.closeDelete()
    // },
  },

  methods: {
    // ------------------------
    // Show Travel infomation
    // ------------------------
    showItem(item) {
      this.selectedItem = Object.assign({}, item);
      this.dialog = true;
    },

    // ------------------------
    // Edit Travel infomation
    // ------------------------
    editItem(item) {
      this.editedIndex = this.Travels.indexOf(item);
      this.selectedItem = Object.assign({}, item);
      //  Open the Edit Dialogue
      this.dialogEdit = true;
    },
    changedField() {
      // field changed
      let fieldEdited = new Object();
      fieldEdited.id = this.selectedItem.id;

      if (this.travelToEdit.destination) {
        fieldEdited.destination = this.travelToEdit.destination;
      }
      if (this.travelToEdit.departure_date) {
        fieldEdited.departure_date = this.travelToEdit.departure_date;
      }
      if (this.travelToEdit.departure_time) {
        fieldEdited.departure_time = this.travelToEdit.departure_time;
      }
      if (this.travelToEdit.departure_place) {
        fieldEdited.departure_place = this.travelToEdit.departure_place;
      }
      if (this.travelToEdit.total_car_place_number) {
        fieldEdited.total_car_place_number = this.travelToEdit.total_car_place_number;
      }
      if (this.travelToEdit.car_informations) {
        fieldEdited.car_informations = this.travelToEdit.car_informations;
      }
      if (this.travelToEdit.car_matriculation) {
        fieldEdited.car_matriculation = this.travelToEdit.car_matriculation;
      }
      if (this.travelToEdit.place_price) {
        fieldEdited.place_price = this.travelToEdit.place_price;
      }
      if (this.travelToEdit.Intemediatestation) {
        fieldEdited.Intemediatestation = this.travelToEdit.Intemediatestation;
      }
      return fieldEdited;
    },

    closeEdit() {
      this.dialogEdit = false;
    },
    // --------------------
    // delete a travel
    // --------------------
    deleteItem(item) {
      this.editedIndex = this.Travels.indexOf(item);
      this.selectedItem = Object.assign({}, item);
      this.travelToDelete = { travel_id: this.selectedItem.id };
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      Vue.prototype.$http
        .put("http://127.0.0.1:3333/travel/cancellation", this.travelToDelete)
        .then((response) => {
          this.travelDeleteResponse = response.data;

          if (this.travelDeleteResponse.message == "success") {
            // Annulation effectuée
            this.travelDeleteResponse.message = "Annulation effectuée";
            this.addingSuccess = !this.addingSuccess;
            setTimeout(() => {
              this.addingSuccess = !this.addingSuccess;
              this.forceRerender();
            }, 3000);
          } else if (this.travelDeleteResponse.message == "confirmation") {
            this.dialogDeleteConfirm = true;
            this.travelToDelete.comfirmation = true;
            console.log(this.travelToDelete.comfirmation);
            console.log(
              "des reservations ont déjà été faites pour ce voyage, en cas dannulation vous devriez rembourser les tickets déjà achetés"
            );
          } else {
            this.travelDeleteResponse.message =
              "Impossible d'effectuer l'annulation";
            this.addingfalse = !this.addingfalse;
            setTimeout(() => {
              this.addingfalse = !this.addingfalse;
            }, 3000);
            console.log("pouaaaaa");
          }
        })
        .catch((error) => {
          this.travelDeleteResponse = error.message;
          console.error("There was an error!", error);
        });

      this.closeDelete();
    },

    editTravelConfirm() {
      this.fielsdChanged = this.changedField();
      Vue.prototype.$http
        .put("http://127.0.0.1:3333/travel/update", this.fielsdChanged)
        .then((response) => {
          this.travelDeleteResponse = response.data;
          if (this.travelDeleteResponse.message == "success") {
            // Modification effectuée
            this.travelDeleteResponse.message = "modification effectuée";
            this.addingSuccess = !this.addingSuccess;
            setTimeout(() => {
              this.addingSuccess = !this.addingSuccess;
              this.forceRerender();
            }, 3000);
          } else if (this.travelDeleteResponse.message != "success") {
            console.log(
              "des reservations ont déjà été faites pour ce voyage, en cas dannulation vous devriez rembourser les tickets déjà achetés"
            );
            // Modification effectuée
            this.addingfalse = !this.addingfalse;
            setTimeout(() => {
              this.addingfalse = !this.addingfalse;
            }, 3000);
          } else {
            console.log("pouaaaaa");
          }
        })
        .catch((error) => {
          this.travelDeleteResponse = error.message;
          console.error("There was an error!", error);
        });

      this.closeEdit();
    },

    closeDelete() {
      this.dialogDeleteConfirm = false;
      this.dialogDelete = false;
      this.selectedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },

    // For table re-render after delete or update an item
    forceRerender() {
      this.$store.state.travelcomponentKey += 1;
    },
  },

  computed: {
    ...mapGetters(["Travels"]),
  },

  created() {
    this.$store.dispatch("init_travelListe");
  },
};
</script>

<style scoped>
.tableWrapperDiv {
  height: 465px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  padding: 25px;
  padding-bottom: 50px;
}
.dataWrapper {
  height: 100%;
  overflow-y: scroll;
  background: #ffffff;
  padding: 0;
}
.dataWrapper::-webkit-scrollbar {
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

/* .tableWrapperDiv::-webkit-scrollbar{
  width: 20px;
}
.tableWrapperDiv::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
}

.tableWrapperDiv::-webkit-scrollbar-thumb {
  background-color: var(--main-green-color);
  border-radius: 30px;
  border: 7px solid rgb(255, 255, 255);
} */

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

.theSeachBar {
  /* margin-left: 50px; */
  margin-bottom: 10px;
}

/* Show details */
.imgAndTitle {
  margin: 15px 0px;
  height: 220px;
  width: 300px;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  background: linear-gradient(
      180deg,
      rgb(0 0 0 / 0%),
      rgb(0 0 0 / 19%),
      rgb(0 0 0)
    ),
    url(../../assets/img/traffic-vehicle-urban-reflections-city.jpg);
  background-position: center;
  background-size: cover;
}
.imgAndTitle > p:first-child {
  font-size: 21px;
  font-weight: bold;
  margin: 0px;
  margin-left: 20px;
  color: white;
}
.imgAndTitle > p:last-child {
  font-size: 15px;
  font-weight: bold;
  margin: 0px 0px 10px 20px;
  color: white;
}

.statElment {
  margin-bottom: 15px;
  display: flex;
}
.statElment > div {
  margin-left: 10px;
}
.statElment h2 {
  font-size: 21px;
  color: var(--main-green-color);
}

/* Delete travel */
.deleteIMG {
  width: 350px;
}
.CancelVerification {
  text-align: center;
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 30px;
}
.verificationAction {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.verificationAction > button {
  width: 150px;
}

/* Confirme Delete travel */
.confirmTitle {
  background: #b71c1c;
  color: white;
  height: 30px;
  font-size: 18px;
  padding: auto;
  font-weight: bold;
  line-height: 30px;
  border-radius: 0px 0px 10px 10px;
  /* margin-bottom: -30px; */
  /* width: 420px; */
  text-align: center;
}

/* Edit travel */
.editIMGO {
  margin-bottom: 35px;
}
.updateForm {
  height: 250px;
  width: 110%;
  overflow-y: scroll;
}
.updateForm::-webkit-scrollbar {
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

.updateForm .col-lg-12,
.col-md-12 {
  padding-bottom: 0px;
  padding-top: 0px;
}





/*++++++++++++++++
===> MEDIUM Large tablet to laptop	960px > < 1264px*<===
+++++++++++++++++*/
@media screen and (min-width: 960px) and (max-width: 1100px){
    /* .mino-icon{
        height: 18px;
        width: 18px;
    } */
    /* Quand je voudrai changer la taille des icones */
    
}
</style>
