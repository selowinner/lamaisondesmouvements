<template>
  <div class="tableWrapperDiv">
    <!-- SHOW DIALOG -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-text>
          <v-container>
            <div class="imgAndTitle">
              <p>GESTION DES OBJETS EGARES</p>
              <!-- <p>Bilan des voyages-détails</p> -->
            </div>
            <div class="statElment">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>INFORMATIONS</h2>
                <h4>{{ editedItem.description }}</h4>
              </div>
            </div>
            <div class="statElment" v-if="editedItem.departure_place">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>LIEU DE DEPART</h2>
                <h4>{{ editedItem.departure_place }}</h4>
              </div>
            </div>
            <div class="statElment" v-if="editedItem.car_Information">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>INFORMATION DU CAR</h2>
                <h4>
                  <b>Matricule :</b>
                  {{ editedItem.car_Information.car_matriculation }}
                </h4>
                <h4>
                  <b>Heure de départ :</b>
                  {{ editedItem.car_Information.departure_time }}
                </h4>
              </div>
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- CHANGE STATE DIALOG -->
    <v-dialog v-model="dialogChangeState" max-width="420">
      <v-card>
        <v-card-text>
          <div class="confirmTitle">OBJET TROUVE</div>
          <v-container>
            <div class="CancelVerification">
              Nous rappelons que l'objet <b> {{ editedItem.nature }}</b
              >, égaré par le porteur du numero
              <b>{{ editedItem.contact }}</b> ce décrit comme <br />
              <b>{{ editedItem.description }}</b> <br />
              <br />
              <span style="font-weight: bold; color: #b71c1c"
                >Avez-vous vraiment Retrouvé <br />
                l'objet ?</span
              >
            </div>
            <div class="verificationAction">
              <v-btn
                color="Titlecolor"
                rounded
                depressed
                @click="dialogChangeState = !dialogChangeState"
                style="color: white"
                >Non</v-btn
              >
              <v-btn
                color="mainGreenColor"
                rounded
                depressed
                @click="UpdateConfirm"
                style="color: white"
                >Oui</v-btn
              >
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
        :items="LostObjets"
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
          <v-btn
            icon
            color="mainGreenColor"
            @click="selectedItem(item)"
            v-if="item.declaration_state == 0"
            ><v-icon small> mdi-list-status </v-icon></v-btn
          >
        </template>
        <template v-slot:[`item.created_at`]="{ item }">
          <!-- modification avec CESINHIO  a la base on avait v-slot:[item.actions="{ item }"-->
          <v-icon dense color="mainGreenColor"> mdi-calendar-clock </v-icon>
          <span style="color: mainGreenColor">{{ item.created_at }}</span>
        </template>
        <template v-slot:[`item.contact`]="{ item }">
          <!-- modification avec CESINHIO  a la base on avait v-slot:[item.actions="{ item }"-->
          <v-icon dense color="mainGreenColor"> mdi-cellphone-message </v-icon>
          {{ item.contact }}
        </template>
        <template v-slot:[`item.declaration_state`]="{ item }">
          <!-- modification avec CESINHIO -->
          <!-- <v-chip :color="getColor(item.declaration_state)" dark>{{ item.declaration_state }}</v-chip> -->
          <v-chip dark v-if="item.declaration_state == 0" color="#c16f6f"
            >Pas retrouvé</v-chip
          >
          <v-chip dark v-if="item.declaration_state == 1" color="#3e886db0">
            <v-icon color="mainGreenColor" small>mdi-check-bold</v-icon
            >Retrouvé</v-chip
          >
        </template>
      </v-data-table>
    </div>

    <!-- ALERT -->
    <transition name="slide">
      <v-alert
        v-if="addingSuccess"
        elevation="13"
        type="success"
        max-width="300"
        class="alert"
        color="mainGreenColor"
        >{{ this.objetUpdateResponse.message }}</v-alert
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
        >{{ this.objetUpdateResponse.message }}</v-alert
      >
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";

export default {
  name: "allLostObjectList",
  components: {},

  data: () => ({
    // For the table
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    search: "",
    headers: [
      {
        text: "DATE",
        align: "start",
        sortable: false,
        value: "created_at",
      },
      { text: "NATURE", value: "nature" },
      { text: "CONTACT", value: "contact" },
      { text: "ETAT", value: "declaration_state" },
      { text: "DETAILS", value: "actions", sortable: false },
    ],
    desserts: [],

    // for alerte
    addingSuccess: false,
    addingfalse: false,

    // For travel detail
    dialog: false,
    dialogChangeState: false,
    editedItem: {
      nature: "",
      contact: "",
      declaration_state: "",
    },

    // For lostObjet Status change
    objetUpdateResponse: "",
  }),

  methods: {
    // ------------------------
    // Show Travel infomation
    // ------------------------
    showItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    // ------------------------
    // Update Travel State
    // ------------------------
    selectedItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogChangeState = true;
    },

    UpdateConfirm() {
      Vue.prototype.$http
        .put("http://127.0.0.1:3333/lostObjet/statUpdate", this.editedItem)
        .then((response) => {
          this.objetUpdateResponse = response.data;
          if (this.objetUpdateResponse.message == "success") {
            // Modification effectuée
            this.objetUpdateResponse.message = "Etat modifié";
            this.addingSuccess = !this.addingSuccess;
            setTimeout(() => {
              this.addingSuccess = !this.addingSuccess;
              this.forceRerender();
            }, 3000);
          } else if (this.objetUpdateResponse.message != "success") {
            // Modification effectuée
            this.addingfalse = !this.addingfalse;
            setTimeout(() => {
              this.addingfalse = !this.addingfalse;
            }, 3000);
          }
        })
        .catch((error) => {
          this.objetUpdateResponse = error.message;
          console.error("There was an error!", error);
        });

      this.dialogChangeState = !this.dialogChangeState;
    },

    // For table re-render after delete or update an item
    forceRerender() {
      this.$store.state.lostObjetcomponentKey += 1;
    },
  },

  computed: {
    ...mapGetters(["LostObjets"]),
  },

  created() {
    this.$store.dispatch("init_lostObjet");
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
    url(../../assets/img/pexels-skitterphoto-63901.jpg);
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

/* Confirme Delete travel */
.confirmTitle {
  background: var(--main-green-color);
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




/*++++++++++++++++
===> MEDIUM Large tablet to laptop	960px > < 1264px*<===
+++++++++++++++++*/
@media screen and (min-width: 960px) and (max-width: 1100px){
  .v-chip.v-size--default {
    border-radius: 16px;
    font-size: 8px;
    height: 32px;
    width: 70px;
  }
    
}

</style>
