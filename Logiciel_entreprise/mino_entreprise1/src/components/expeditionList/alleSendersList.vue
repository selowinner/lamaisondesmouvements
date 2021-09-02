<template>
  <div class="tableWrapperDiv">
    <!-- DELETE TRAVEL DIALOG -->
    <v-dialog v-model="dialogDelete" max-width="420">
      <v-card>
        <v-card-text>
          <v-container>
            <div class="imgAndTitle deleteIMG">
              <p>GESTION DES LIVREUR</p>
              <p>Désactivation</p>
            </div>
            <div class="CancelVerification">
              voulez-vous déactiver <br />
              ce livreur ?
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
              <p>MODIFICATION DE PROFIL</p>
              <p>Livreur</p>
            </div>
            <form class="updateForm">
              <v-container fluid>
                <v-row>
                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      height="60"
                      solo
                      label="Matricule"
                      append-icon="mdi-matrix"
                      ref="matri"
                      type="text"
                      value=""
                      persistent-hint
                      required
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      height="60"
                      background-color="#3e886d4a"
                      solo
                      label="Nom complet"
                      v-model="editedItem.complet_name"
                      append-icon="mdi-account-details-outline"
                      ref="total_name"
                      type="text"
                      value=""
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      height="60"
                      solo
                      append-icon="mdi-map-marker"
                      ref="location"
                      type="text"
                      v-model="editedItem.city"
                      value=""
                      label="Lieu d'habitation"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      height="60"
                      background-color="#3e886d4a"
                      solo
                      append-icon="mdi-motorbike"
                      v-model="editedItem.conveyance"
                      ref="transport"
                      type="text"
                      label="Moyen de transport"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="12">
                    <v-text-field
                      height="60"
                      solo
                      append-icon="mdi-phone"
                      ref="pla_number"
                      type="number"
                      v-model="editedItem.contact"
                      label="Numero de téléphone"
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
            @click="editItemConfirm"
            style="color: white"
            >Enregistrer</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- SHOW DIALOG -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-text>
          <v-container>
            <div class="imgAndTitle">
              <p v-if="editedItem.activation_state == 1">
                GESTION DES LIVREURS
              </p>
              <p style="color: #b71c1c" v-if="editedItem.activation_state == 0">
                COMPTE DESACTIVE
              </p>
              <p>Information - Bilan Des Livraisons</p>
            </div>
            <div class="statElment">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>{{ editedItem.DeliveryNumber }}</h2>
                <h4>NOMBRE DE LIVRAISON</h4>
              </div>
            </div>
            <div class="statElment">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>{{ editedItem.complet_name }}</h2>
                <h4>NOM COMPLET</h4>
              </div>
            </div>
            <div class="statElment">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>{{ editedItem.city }}</h2>
                <h4>LIEU D'HABITATION</h4>
              </div>
            </div>
            <div class="statElment">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>{{ editedItem.matriculation }}</h2>
                <h4>MATRICULE</h4>
              </div>
            </div>
            <div class="statElment">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>{{ editedItem.created_at }}</h2>
                <h4>DATE D'ENREGISTREMENT</h4>
              </div>
            </div>
            <div class="statElment" v-if="editedItem.activation_state == 0">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>{{ editedItem.updated_at }}</h2>
                <h4>DATE DE DESACTIVATION</h4>
              </div>
            </div>
          </v-container>
        </v-card-text>
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
        :items="Senders"
        :search="search"
        :items-per-page="-1"
        hide-default-footer
      >
        <!-- FOR SEE EDIT, DELETE AND SHOW DIALOG -->
        <template v-slot:[`item.actions`]="{ item }">
          <!-- modification avec CESINHIO  a la base on avait v-slot:[item.actions="{ item }"-->
          <v-btn icon color="mainGreenColor" @click="showItem(item)"
            ><v-icon small v-if="item.activation_state == 1"> mdi-eye </v-icon>
            <v-icon small v-if="item.activation_state == 0" color="error">
              mdi-account-alert
            </v-icon>
          </v-btn>
          <v-btn
            icon
            color="mainGreenColor"
            @click="editItem(item)"
            v-if="item.activation_state == 1"
            ><v-icon small> mdi-lead-pencil </v-icon></v-btn
          >
          <v-btn
            icon
            color="mainGreenColor"
            @click="deleteItem(item)"
            v-if="item.activation_state == 1"
            ><v-icon small> mdi-trash-can </v-icon></v-btn
          >
        </template>
        <!-- <template v-slot:[`item.contact`]="{ item }"> 
        <v-icon dense color="mainGreenColor"> mdi-phone </v-icon> <span style="color: mainGreenColor;">{{item.contact}}</span>
        </template> -->
        <template v-slot:[`item.complet_name`]="{ item }">
          <!-- modification avec CESINHIO  a la base on avait v-slot:[item.actions="{ item }"-->
          <v-icon color="mainGreenColor" small> mdi-account </v-icon>
          {{ item.complet_name }}
        </template>
      </v-data-table>
    </div>

    <transition name="slide">
      <v-alert
        v-if="addingSuccess"
        elevation="13"
        type="success"
        max-width="300"
        class="alert"
        color="mainGreenColor"
        >{{ senderaAddingResponse.message }}</v-alert
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
      >
        {{ senderaAddingResponse.message }}</v-alert
      >
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";

export default {
  name: "allSendersList",
  components: {},

  data: () => ({
    // For the table
    search: "",
    headers: [
      {
        text: "NOM COMPLET",
        align: "start",
        sortable: false,
        value: "complet_name",
      },
      { text: "CONTACT", value: "contact" },
      { text: "TRANSPORT", value: "conveyance" },
      { text: "DETAILS", value: "actions", sortable: false },
    ],
    desserts: [],

    // for alerte
    addingSuccess: false,
    addingfalse: false,

    // For Sender detail
    dialog: false,
    editedItem: {
      complet_name: "",
      contact: "",
      conveyance: "",
      city: "",
      DeliveryNumber: "",
      created_at: "",
      matriculation: "",
    },

    // For Sender edit
    senderaAddingResponse: "",
    dialogEdit: false,
    editedIndex: -1,

    // For Sender deleted
    dialogDelete: false,
    itemToDelete: "",
  }),

  methods: {
    // ------------------------
    // Show Profil infomation
    // ------------------------
    showItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    // ------------------------
    // For Profil Edited
    // ------------------------
    editItem(item) {
      this.editedIndex = this.Senders.indexOf(item);
      this.editedItem = Object.assign({}, item);
      //  Open the Edit Dialogue
      this.dialogEdit = true;
    },

    editItemConfirm() {
      Vue.prototype.$http
        .put("http://127.0.0.1:3333/expedition/senderUpdate", this.editedItem)
        .then((response) => {
          this.senderaAddingResponse = response.data;
          if (this.senderaAddingResponse.message == "success") {
            // Modification effectuée
            this.senderaAddingResponse.message = "modification effectuée";
            this.addingSuccess = !this.addingSuccess;
            setTimeout(() => {
              this.addingSuccess = !this.addingSuccess;
              this.forceRerender2();
            }, 3000);
          } else if (this.senderaAddingResponse.message != "success") {
            console.log(
              "des reservations ont déjà été faites pour ce voyage, en cas dannulation vous devriez rembourser les tickets déjà achetés"
            );
            // Modification effectuée
            this.addingfalse = !this.addingfalse;
            setTimeout(() => {
              this.addingfalse = !this.addingfalse;
            }, 3000);
          }
        })
        .catch((error) => {
          this.senderaAddingResponse = error.message;
          console.error("There was an error!", error);
        });

      this.closeEdit();
    },

    closeEdit() {
      this.dialogEdit = false;
    },

    // --------------------
    // delete a travel
    // --------------------
    deleteItem(item) {
      this.editedIndex = this.Senders.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.itemToDelete = { id: this.editedItem.id };
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      Vue.prototype.$http
        .put("http://127.0.0.1:3333/expedition/senderCancel", this.itemToDelete)
        .then((response) => {
          this.senderaAddingResponse = response.data;

          if (this.senderaAddingResponse.message == "success") {
            // Annulation effectuée
            this.senderaAddingResponse.message = "Desactivation effectuée";
            this.addingSuccess = !this.addingSuccess;
            setTimeout(() => {
              this.addingSuccess = !this.addingSuccess;
              this.forceRerender2();
            }, 3000);
          } else if (this.senderaAddingResponse.message != "success") {
            this.addingfalse = !this.addingfalse;
            setTimeout(() => {
              this.addingfalse = !this.addingfalse;
            }, 3000);
          }
        })
        .catch((error) => {
          this.senderaAddingResponse = error.message;
          console.error("There was an error!", error);
        });

      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    // For table re-render after delete or update an item
    forceRerender2() {
      this.$store.state.sendercomponentKey += 1;
    },
  },

  computed: {
    ...mapGetters(["Senders"]),
  },

  created() {
    this.$store.dispatch("init_sender");
  },
};
</script>

<style scoped>
.tableWrapperDiv {
  height: 450px;
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
  width: 330px;
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
    url(../../assets/img/pexels-rodnae-productions-7363196.jpg);
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

.statusChange {
  display: flex;
  justify-content: center;
}

/* Edit travel */
.editIMGO {
  margin-bottom: 35px;
  width: 100%;
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

</style>
