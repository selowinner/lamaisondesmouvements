<template>
    <div class="bodyBox">
        <div class="TheBoxBody">
             <div class="tableWrapperDiv">

                <!-- EDIT STATION ADMIN DIALOG -->
                <v-dialog v-model="dialogEdit" max-width="370">
                <v-card>
                    <v-card-text>
                    <v-container>
                        <div class="imgAndTitle deleteIMG editIMGO">
                        <p style="text-align:center; font-weight:bold">MODIFICATION DES ACCES DE L'ADMINISTRATEUR</p>
                        </div>
                        <form class="updateForm updatestationAdminForm">
                        <v-container fluid>
                            <v-row>
                            <v-col cols="12" md="12" lg="12">
                                <v-text-field
                                height="45"
                                solo
                                label="pseudo"
                                append-icon="mdi-account"
                                v-model="editedItem.pseudo"
                                ref="matri"
                                type="text"
                                value=""
                                persistent-hint
                                required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12" lg="12">
                                <v-text-field
                                height="45"
                                background-color="#3e886d4a"
                                solo
                                label="password"
                                v-model="editedItem.password"
                                append-icon="mdi-lead-pencil"
                                ref="total_name"
                                type="text"
                                value=""
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


                <!-- FOR THE ELEMENT -->
                 <v-row justify="center">
                  <v-col cols="12" md="3" lg="3" v-for="item in Adminitrators" :key="item.index" @click="editItem(item)">
                    <div class="numberWrapper">
                      <div class="N-icon">
                        <v-icon  v-if="item.role_id == 1" color="#b98d4c">mdi-bus-multiple</v-icon>
                        <v-icon  v-if="item.role_id == 2" color="mainGreenColor">mdi-archive</v-icon>
                        <v-icon  v-if="item.role_id == 3" color="#bf6f69">mdi-truck-delivery</v-icon>
                      </div>
                      <h1 v-if="item.role_id == 1">VOYAGES</h1>
                      <h1 v-if="item.role_id == 2">COLIS</h1>
                      <h1 v-if="item.role_id == 3">EXPEDITIONS</h1>
                      <h5>{{ item.pseudo }} </h5>
                    </div>
                  </v-col>
                </v-row>

                <transition name="slide">
                <v-alert
                    v-if="addingSuccess"
                    elevation="13"
                    type="success"
                    max-width="300"
                    class="alert"
                    color="mainGreenColor"
                    >{{ staionaAddingResponse.message }}</v-alert
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
                    {{ staionaAddingResponse.message }}</v-alert
                >
                </transition>
             </div>
        </div>
    </div>
 
</template>












<script>
// import Vue from "vue";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "param",
  components: {},

  data: () => ({
    // For the table
    search: "",
    headers: [
      {
        text: "VILLE",
        align: "start",
        sortable: false,
        value: "city",
      },
      { text: "QUATIER", value: "neighborhood" },
      {
        text: "OPTION EXPEDITION",
        align: "center",
        value: "package_service_use",
      },
      { text: "DETAILS", value: "actions", sortable: false },
    ],
    Managers: [
      {
        role: 1,
        value: "Gestionnaire des voyages",
      },
      { 
        role: 2,
        value: "Gestionnaire des colis" 
      },
      {
        role: 3,
        value: "Gestionnaire des expéditions",
      },
    ],

    // for alerte
    addingSuccess: false,
    addingfalse: false,

    // For staion detail
    dialog: false,
    editedItem: {
      matriculation: "",
      description: "",
      country: "",
      contact: "",
      city: "",
      neighborhood: "",
      other_denomination: "",
      mino_code: "",
      package_service_use: false,
      user_id: "1",
    },

    // For staion edit
    staionaAddingResponse: "",
    dialogEdit: false,
    editedIndex: -1,

    // For staion deleted
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
    // For STATION Edited
    // ------------------------
    editItem(item) {
      this.editedIndex = this.Adminitrators.indexOf(item);
      this.editedItem = Object.assign({}, item);
      //  Open the Edit Dialogue
      this.dialogEdit = true;
    },

    editItemConfirm() {
      axios({ url: "user/profilUpdate", data: this.editedItem, method: "PUT" })
        .then((response) => {
          this.staionaAddingResponse = response.data;
          if (this.staionaAddingResponse.message == "success") {
            // Modification effectuée
            this.staionaAddingResponse.message = "modification effectuée";
            this.addingSuccess = !this.addingSuccess;
            setTimeout(() => {
              this.addingSuccess = !this.addingSuccess;
              this.forceRerender2();
            }, 3000);
          } else if (this.staionaAddingResponse.message != "success") {
            // Modification effectuée
            this.addingfalse = !this.addingfalse;
            setTimeout(() => {
              this.addingfalse = !this.addingfalse;
            }, 3000);
          }
        })
        .catch((error) => {
          this.staionaAddingResponse = error.message;
          console.error("There was an error!", error);
        });

      this.closeEdit();
    },

    closeEdit() {
      this.dialogEdit = false;
    },


    // For table re-render after delete or update an item
    forceRerender2() {
      this.$store.state.stationcomponentKey += 1;
    },
  },





  computed: {
    ...mapGetters(["Adminitrators"]),
  },




  created() {
    this.$store.dispatch("init_adminitrator");
  },
};
</script>











<style scoped>
.tableWrapperDiv {
  height: 514px;
  /* background: white; */
  border-radius: 10px;
  overflow: hidden;
  padding: 25px;
  padding-bottom: 50px;
  display: flex;
  align-items: center;
}


.numberWrapper {
  height: 190px;
  border-radius: 10px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.N-icon {
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3e886d4a;
  border-radius: 100px;
}
.numberWrapper h1 {
  /* margin-bottom: -15px; */
  font-size: 20px;
}
.numberWrapper h5 {
  color: var(--font-color);
}

</style>
