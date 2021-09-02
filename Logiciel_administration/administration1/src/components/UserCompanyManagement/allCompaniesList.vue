<template>
  <div class="tableWrapperDiv">
    <!-- SHOW DIALOG -->
    <v-dialog
      v-model="dialog"
      max-width="410"
      overlay-color="black"
      overlay-opacity="0.8"
    >
      <v-card>
        <v-card-text>
          <p class="mainGreenColor dialogTitle">DETAILS COMPAGNIE</p>
          <div class="mainGreenColor dialogWrapper">
            <div class="imgAndTitle"></div>
            <p class="subtitle">FC EXPERTISE REGARDE LES AUTRES GRANDIR</p>
            <div class="backBoad">
              <div class="basicInfo">
                <p>
                  <v-icon color="mainGreenColor" small>
                    mdi-arrow-right
                  </v-icon>
                  {{ editedItem.denomination }}
                </p>
                <p>
                  <v-icon color="mainGreenColor" small>
                    mdi-arrow-right
                  </v-icon>
                  <span style="font-weight: bold">matricule:</span>
                  {{ editedItem.matriculation }}
                </p>
                <p>
                  <v-icon color="mainGreenColor" small>
                    mdi-arrow-right
                  </v-icon>
                  <span style="font-weight: bold">contact:</span>
                  {{ editedItem.contact }}
                </p>
                <p>
                  <v-icon color="mainGreenColor" small>
                    mdi-arrow-right
                  </v-icon>
                  <span style="font-weight: bold">Siège:</span>
                  {{ editedItem.siege }}
                </p>
                <p>
                  <v-icon color="mainGreenColor" small> mdi-arrow-right </v-icon
                  >{{ editedItem.description }}
                </p>
              </div>
              <div class="nombreDeGares">
                {{ editedItem.companyStationNumber }}
                <span style="font-size: 15px; color: white">Gares</span>
              </div>
              <div class="travelResume">
                <div class="part">
                  <p>
                    <span>{{ editedItem.created_at }}</span
                    ><br />date enregistrement
                  </p>
                  <p>
                    <span>{{ editedItem.expired_date }}</span
                    ><br />date fin d'abonnement
                  </p>
                </div>
                <!-- <div class="part">
                    <p> <span>13/2/2021</span><br>date abonnement actuel</p>
                    <p> <span>12/15/2021</span><br>tickets restants</p>
                    </div> -->
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- ACTIVATION DIALOG -->
    <v-dialog
      v-model="Activationdialog"
      max-width="420"
      overlay-color="black"
      overlay-opacity="0.8"
    >
      <v-card>
        <v-card-text>
          <p class="mainGreenColor dialogTitle">Confirmation</p>
          <div class="mainGreenColor dialogWrapper">
            <div class="backBoad">
              <div class="basicInfo">
                <div class="CancelVerification">
                  <span style="color: #7d7e80"
                    >Cette action activera le code mino de <b>hjghii kuhu</b> et
                    de toutes ces gares.</span
                  ><br />
                  <br />
                  <span style="font-weight: bold"
                    >voulez-vous vraiment activer <br />
                    ce compte ?</span
                  >
                </div>
                <div class="verificationAction">
                  <v-btn
                    color="Titlecolor"
                    rounded
                    depressed
                    @click="closeactivate"
                    style="color: white"
                    >Non</v-btn
                  >
                  <v-btn
                    color="mainGreenColor"
                    rounded
                    depressed
                    @click="activateItemConfirm"
                    style="color: white"
                    >Oui</v-btn
                  >
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-data-table
      dense
      :headers="headers"
      :items-per-page="-1"
      :items="Companies"
      :search="search"
      hide-default-footer
      class="backgroundTree"
    >
      <!-- FOR SEE DETAILS AND STATISTIC DIALOG -->
      <template v-slot:[`item.actions`]="{ item }">
        <!-- modification avec CESINHIO  a la base on avait v-slot:[item.actions="{ item }"-->
        <v-btn icon color="mainGreenColor" @click="showItem(item)"
          ><v-icon small> mdi-eye </v-icon></v-btn
        >
        <v-btn
          color="#3a7863"
          style="color: white"
          @click="activatedComany(item)"
          rounded
          small
          v-if="item.activation_state == 0"
          >Activer</v-btn
        >
      </template>
      <template v-slot:[`item.activation_state`]="{ item }">
        <v-chip dark v-if="item.activation_state == 1" color="#3e886db0">
          <v-icon color="mainGreenColor" small>mdi-check-bold</v-icon
          >Activé</v-chip
        >
        <v-chip dark v-if="item.activation_state == 0" color="#3e3e3e">
          <v-icon color="mainGreenColor" small>mdi-check-bold</v-icon
          >Désactivé</v-chip
        >
      </template>
    </v-data-table>

    <!-- ALERT -->
    <transition name="slide">
      <v-alert
        v-if="addingSuccess"
        elevation="13"
        type="success"
        max-width="300"
        class="alert"
        color="mainGreenColor"
        >{{ this.companyActivationResponse.message }}</v-alert
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
        >{{ this.companyActivationResponse.message }}</v-alert
      >
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";

export default {
  name: "allCompaniesList",
  components: {},

  data: () => ({
    // for alerte
    addingSuccess: false,
    addingfalse: false,

    //for the list
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    search: "",
    headers: [
      {
        text: "MINO-CODE",
        align: "start",
        sortable: false,
        value: "mino_code",
      },
      { text: "ANAGRAMME", value: "anagramme" },
      { text: "PAYS", value: "country" },
      { text: "EMAIL", value: "email" },
      { text: "ETAT", value: "activation_state" },
      { text: "DETAILS", value: "actions", sortable: false },
    ],

    // For Company detail
    dialog: false,
    editedItem: {
      anagramme: "",
      country: "",
      email: "",
    },

    // For Company activation
    Activationdialog: false,
    itemToactivate: "",

    // For lostObjet Status change
    companyActivationResponse: "",
  }),

  methods: {
    // ------------------------
    // Show Company infomation
    // ------------------------
    showItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    activatedComany(item) {
      this.editedItem = Object.assign({}, item);
      this.itemToactivate = { id: this.editedItem.id };
      this.Activationdialog = true;
    },

    activateItemConfirm() {
      Vue.prototype.$http
        .put("http://127.0.0.1:3333/compangny/abonnement", this.itemToactivate)
        .then((response) => {
          this.companyActivationResponse = response.data;

          if (this.companyActivationResponse.message == "success") {
            // Annulation effectuée
            this.companyActivationResponse.message = "Activation effectuée";
            this.addingSuccess = !this.addingSuccess;
            setTimeout(() => {
              this.addingSuccess = !this.addingSuccess;
              this.forceRerender();
            }, 3000);
          } else if (this.companyActivationResponse.message != "success") {
            this.addingfalse = !this.addingfalse;
            setTimeout(() => {
              this.addingfalse = !this.addingfalse;
            }, 3000);
          }
        })
        .catch((error) => {
          this.companyActivationResponse = error.message;
          console.error("There was an error!", error);
        });

      this.closeactivate();
    },

    closeactivate() {
      this.Activationdialog = false;
    },

    // For table re-render after delete or update an item
    forceRerender() {
      this.$store.state.companiescomponentKey += 1;
    },
  },

  computed: {
    ...mapGetters(["Companies"]),
  },

  created() {
    this.$store.dispatch("init_companies");
  },
};
</script>

<style scoped>
.tableWrapperDiv {
  height: 63%;
  overflow-y: auto;
  padding-bottom: 20px;
}
.tableWrapperDiv::-webkit-scrollbar {
  width: 20px;
}
.tableWrapperDiv::-webkit-scrollbar-track {
  background: var(--backgroundTree);
}

.tableWrapperDiv::-webkit-scrollbar-thumb {
  background-color: var(--main-green-color);
  border-radius: 30px;
  border: 7px solid var(--backgroundTree);
}

.v-data-table {
  line-height: 1.5;
  max-width: 100%;
  margin: 0px 35px;
}
.v-btn {
  font-weight: bold;
  letter-spacing: normal;
  text-transform: none;
}

.theme--light.v-card {
  background-color: transparent;
  color: rgba(0, 0, 0, 0.87);
}

.dialogTitle {
  margin: 0;
  display: inline-block;
  padding: 2px 10px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: -0.5px;
  font-size: 13px;
  color: white;
}
.dialogWrapper {
  width: 100%;
  margin: 0px;
  padding: 5px;
  border-radius: 0px 0px 5px 5px;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%),
    0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
}

.imgAndTitle {
  margin: 0px 0px;
  height: 220px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  background: linear-gradient(
      180deg,
      rgb(0 0 0 / 58%),
      rgb(0 0 0 / 19%),
      rgb(0 0 0 / 60%)
    ),
    url(../../assets/img/abstract-1278060_1920.jpg);
  background-position: center;
  background-size: cover;
}

.subtitle {
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: -0.5px;
  font-size: 13px;
  text-align: center;
  margin: 5px 0px;
  color: white;
}

.backBoad {
  background: var(--backgroundTree);
  color: var(--Important-font-color);
}
.basicInfo {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-bottom: solid 1px var(--Important-font-color);
  padding-bottom: 10px;
  margin-bottom: 15px;
}
.basicInfo p {
  /* width: 100px; */
  margin-top: 15px;
  margin-bottom: 5px;
  font-weight: 200;
}

.nombreDeGares {
  height: 100px;
  border-bottom: solid 1px var(--Important-font-color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 50px;
  color: var(--font-color);
}

.travelResume {
  width: 100%;
  display: flex;
}
.part {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.part p {
  margin: 5px 0px;
  margin-left: 15px;
  text-align: center;
}
.part span {
  font-weight: bold;
}

/* Delete travel */

.CancelVerification {
  text-align: center;
  /* font-size: 18px; */
  margin-top: 5px;
  margin-bottom: 30px;
  background: var(--backgroundTree);
  color: white;
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
