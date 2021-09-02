<template>
  <div class="tableWrapperDiv">
    <!-- SHOW DIALOG -->
    <v-dialog v-model="dialog" max-width="370">
      <v-card>
        <v-card-text>
          <v-container>
            <div class="imgAndTitle"></div>
            <div class="statElment">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>LKLLPKSJFDNIK KNKDNKL</h2>
              </div>
            </div>
            <div class="statElment">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>INFORMATION</h2>
                <h4>
                  poids: {{ editedItem.package_weight }} kg / taille:
                  {{ editedItem.package_size }} m
                </h4>
              </div>
            </div>
            <div class="statElment">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>EXPEDITEUR</h2>
                <h4>
                  {{ editedItem.sender_complet_name }} /
                  {{ editedItem.sender_city }},
                  {{ editedItem.sender_neighborhood }} /
                  {{ editedItem.sender_contact }}
                </h4>
              </div>
            </div>
            <div class="statElment">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>EXPEDITEUR</h2>
                <h4>
                  {{ editedItem.recipient_complet_name }} /
                  {{ editedItem.recipient_city }},
                  {{ editedItem.recipient_neighborhood }} /
                  {{ editedItem.recipient_contact }}
                </h4>
              </div>
            </div>
            <div class="statElment" v-if="editedItem.deliveryMan">
              <v-icon color="mainGreenColor"> mdi-arrow-right </v-icon>
              <div>
                <h2>LIVREUR</h2>
                <h4>{{ editedItem.deliveryMan }}</h4>
              </div>
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- CHOOSE SENDER DIALOG -->
    <v-dialog v-model="choiceDialog" scrollable max-width="300">
      <v-card>
        <v-card-title>Livreurs disponibles</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="max-height: 500px">
          <v-container
            ><!-- v-model="senderChoose" -->
            <v-radio-group v-model="choiceSender" column>
              <v-radio
                :value="item.id"
                v-for="item in AvailableSenders"
                :key="item.index"
              >
                <template v-slot:label>
                  <div class="radioItem">
                    <p>
                      <strong>{{ item.complet_name }}</strong>
                    </p>
                    <p>
                      <v-icon color="mainGreenColor" small
                        >mdi-car-multiple</v-icon
                      >
                      {{ item.conveyance }}
                    </p>
                    <p>
                      <v-icon color="mainGreenColor" small
                        >mdi-map-marker</v-icon
                      >yopougon niagon
                    </p>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="Titlecolor"
            rounded
            depressed
            @click="closeChooseSender"
            style="color: white"
            >Annuler</v-btn
          >
          <v-btn
            color="mainGreenColor"
            rounded
            depressed
            @click="UpdateExpedition"
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
        :items="Expeditions"
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
            color="#848383"
            style="color: white"
            @click="ChooseSender(item)"
            rounded
            small
            v-if="item.expedition_state_id == 2"
            >Choisir livreur</v-btn
          >
          <v-btn
            color="#848383"
            style="color: white"
            @click="ChooseSender(item)"
            rounded
            small
            v-if="item.expedition_state_id == 7"
            >changer de livreur</v-btn
          >
          <v-btn
            color="#848383"
            style="color: white"
            @click="SimpleUpdateBigining(item)"
            rounded
            small
            v-if="item.expedition_state_id == 3"
            >Acheminé</v-btn
          >
          <v-btn
            color="#848383"
            style="color: white"
            @click="SimpleUpdateBigining(item)"
            rounded
            small
            v-if="item.expedition_state_id == 4"
          >
            livré à la gare</v-btn
          >
          <v-btn
            color="mainGreenColor"
            style="color: white"
            @click="SimpleUpdateBigining(item)"
            rounded
            small
            v-if="item.expedition_state_id == 5"
            >Récupéré</v-btn
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
        <template v-slot:[`item.expedition_state_id`]="{ item }">
          <v-chip dark v-if="item.expedition_state_id == 2" color="#aeaeae">
            <v-icon color="mainGreenColor" small
              >mdi-cursor-default-click</v-icon
            >
            Choix du livreur</v-chip
          >
          <v-chip dark v-if="item.expedition_state_id == 7" color="#aeaeae">
            <v-icon color="mainGreenColor" small>mdi-account-clock</v-icon>
            Attente recuperration par livreur</v-chip
          >
          <v-chip dark v-if="item.expedition_state_id == 3" color="#aeaeae">
            <v-icon color="mainGreenColor" small>mdi-bike-fast</v-icon>
            Acheminement</v-chip
          >
          <v-chip dark v-if="item.expedition_state_id == 4" color="#aeaeae">
            <v-icon color="mainGreenColor" small>mdi-truck-delivery</v-icon> En
            cours de livraison</v-chip
          >
          <v-chip dark v-if="item.expedition_state_id == 5" color="#aeaeae">
            <v-icon color="mainGreenColor" small>mdi-archive</v-icon> En cours
            de recupération
          </v-chip>
          <v-chip dark v-if="item.expedition_state_id == 6" color="#3e886db0">
            <v-icon color="mainGreenColor" small>mdi-check-bold</v-icon
            >Livré</v-chip
          >
        </template>
      </v-data-table>
    </div>
    <!--  END DATA TABLE -->

    <transition name="slide">
      <v-alert
        v-if="addingSuccess"
        elevation="13"
        type="success"
        max-width="300"
        class="alert"
        color="mainGreenColor"
        >Modification éffetuée</v-alert
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
        {{ ExpeitionUpdateResponse.message }}</v-alert
      >
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";

export default {
  name: "allExpeditionList",
  components: {},

  data: () => ({
    // For the table
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    search: "",
    headers: [
      {
        text: "DATE DE DEMANDE",
        align: "start",
        sortable: false,
        value: "created_at",
      },
      { text: "QUARTIER", value: "sender_neighborhood" },
      { text: "ETAPE", value: "expedition_state_id" },
      { text: "DETAILS", value: "actions", sortable: false },
    ],
    desserts: [],

    // for alerte
    addingSuccess: false,
    addingfalse: false,

    // for table re-rendering
    // componentKey: 0,

    // For Expedition sender choice
    choiceDialog: false,
    choiceSender: "",

    // For Expedition detail
    dialog: false,

    // For Expedition edit
    UpdateData: "",
    ExpeitionUpdateResponse: "",
    editedIndex: -1,
    editedItem: {
      sender_complet_name: "",
      recipient_complet_name: "",
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
    // --------------------
    // delete a travel
    // --------------------
    ChooseSender(item) {
      this.$store.dispatch("init_availableSender");

      this.editedIndex = this.Expeditions.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.UpdateData = { id: this.editedItem.id };
      this.UpdateData.expedition_state_id = this.editedItem.expedition_state_id;

      this.choiceDialog = true;
    },

    SimpleUpdateBigining(item) {
      this.editedIndex = this.Expeditions.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.UpdateData = { id: this.editedItem.id };
      this.UpdateData.expedition_state_id = this.editedItem.expedition_state_id;

      this.UpdateExpedition();
    },

    UpdateExpedition() {
      if (this.choiceSender) {
        this.UpdateData.deliveryManID = this.choiceSender;
      }
      // console.log(this.UpdateData);

      Vue.prototype.$http
        .put(
          "http://127.0.0.1:3333/expedition/ExpeditionStatUpdate",
          this.UpdateData
        )
        .then((response) => {
          this.ExpeitionUpdateResponse = response.data;
          console.log(response.data);

          if (this.ExpeitionUpdateResponse.message == "success") {
            this.addingSuccess = !this.addingSuccess;
            setTimeout(() => {
              this.addingSuccess = !this.addingSuccess;
              this.forceRerender1();
            }, 3000);
          } else {
            this.addingfalse = !this.addingfalse;
            setTimeout(() => {
              this.addingfalse = !this.addingfalse;
            }, 3000);
          }
        })
        .catch((error) => {
          this.ExpeitionUpdateResponse = error.message;
          console.error("There was an error!", error);
        });

      this.closeChooseSender();
    },

    closeChooseSender() {
      this.choiceDialog = false;
      // this.editedItem = Object.assign({}, this.defaultItem)
      // this.editedIndex = -1
    },

    forceRerender1() {
      this.$store.state.expeditioncomponentKey += 1;
    },
  },

  computed: {
    ...mapGetters(["Expeditions", "AvailableSenders"]),
  },

  created() {
    this.$store.dispatch("init_expedition");
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
    url(../../assets/img/pexels-ketut-subiyanto-4246120.jpg);
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

/* Sender choice */
.radioItem p {
  height: 5px;
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
</style>
