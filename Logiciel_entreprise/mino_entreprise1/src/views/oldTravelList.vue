<template>
  <div class="tableWrapperDiv">
    <!-- SHOW DIALOG -->
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
                <h2>{{ editedItem.details.vendus }} TICKETS</h2>
                <h4>nombre de tickets vendus</h4>
              </div>
            </div>
            <div class="statElment">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>{{ editedItem.details.aVendre }} TICKETS</h2>
                <h4>nombre de tickets à vendre</h4>
              </div>
            </div>
            <div class="statElment">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>{{ editedItem.details.restant }} TICKETS</h2>
                <h4>nombre de tickets restant</h4>
              </div>
            </div>
            <div class="statElment">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>{{ editedItem.details.annules }} TICKETS</h2>
                <h4>nombre de tickets annulés</h4>
              </div>
            </div>
            <div class="statElment">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
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

    <!-- DELETE TRAVEL DIALOG -->
    <v-dialog v-model="dialogDelete" max-width="420">
      <v-card>
        <v-card-text>
          <v-container>
            <div class="imgAndTitle deleteIMG">
              <p>GESTION DES TICKETS</p>
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
                      outlined
                      ref="dest_place"
                      type="text"
                      label="Destination"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      outlined
                      ref="dep_time"
                      type="time"
                      label="Heure départ"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      outlined
                      ref="pla_number"
                      type="number"
                      label="Nombre de place à disponible"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      outlined
                      ref="car_infos"
                      type="text"
                      label="type de car. ex: climatisé, dernière generation ..."
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      outlined
                      ref="car_matri"
                      type="text"
                      label="Matricule du car"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      outlined
                      ref="pl_price"
                      type="number"
                      label="Prix du ticket"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      outlined
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
            @click="save"
            style="color: white"
            >Enregistrer</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

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
        <v-btn icon color="mainGreenColor" @click="showItem(item)"
          ><v-icon small> mdi-eye </v-icon></v-btn
        >
        <v-btn icon color="mainGreenColor" @click="editItem(item)"
          ><v-icon small> mdi-lead-pencil </v-icon></v-btn
        >
        <v-btn icon color="mainGreenColor" @click="deleteItem(item)"
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

    // for table re-rendering
    // componentKey: 0,

    // For travel deleted
    dialogDelete: false,
    travelToDelete: "",
    travelDeleteResponse: "",

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
    editedItem: {
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
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    // ------------------------
    // Edit Travel infomation
    // ------------------------
    editItem(item) {
      this.editedIndex = this.Travels.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogEdit = true;
    },
    closeEdit() {
      this.dialogEdit = false;
    },
    save() {
      this.closeEdit();
    },
    // --------------------
    // delete a travel
    // --------------------
    deleteItem(item) {
      this.editedIndex = this.Travels.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.travelToDelete = { travel_id: this.editedItem.id };
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      // this.Travels.splice(this.editedIndex, 1)
      Vue.prototype.$http
        .put("http://127.0.0.1:3333/travel/cancellation", this.travelToDelete)
        .then((response) => {
          this.travelDeleteResponse = response.data;
          console.log(response.data);

          if (this.travelDeleteResponse.message == "success") {
            this.$store.dispatch("init_travelListe");

            console.log("patiiii coooll");
            // this.addingSuccess = !this.addingSuccess
            // setTimeout(() => {
            //     this.addingSuccess = !this.addingSuccess
            // }, 3000);
          } else {
            // this.addingfalse = !this.addingfalse
            // setTimeout(() => {
            //     this.addingfalse = !this.addingfalse
            // }, 3000);
            console.log("pouaaaaa");
          }
        })
        .catch((error) => {
          this.travelDeleteResponse = error.message;
          console.error("There was an error!", error);
        });

      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
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
  height: 63%;
  overflow-y: scroll;
}
.tableWrapperDiv::-webkit-scrollbar {
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
  margin-top: 35px;
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

/* Edit travel */
.editIMGO {
  margin-bottom: 35px;
}
.updateForm {
  height: 300px;
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
</style>
