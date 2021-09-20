<template>
  <div class="tableWrapperDiv">
  
    <!-- SHOW DIALOG -->
    <v-dialog v-model="dialog" max-width="700"  @click:outside="close">
      <v-card>
        <v-card-text>
          <v-container>
            <div class="imgAndTitle">
            </div>
            <div class="PopTiTle">
              <p v-if="!editedItem.central_creator_id">Message - lecture</p>
              <p v-if="(editedItem.central_creator_id) && (editedItem.station_dest_id == 0)"> <span style="font-weight:normal">Envoyé  à</span>  MINO</p>
              <p v-if="(editedItem.central_creator_id) && (editedItem.station_dest_id != 0)"> <span style="font-weight:normal">Envoyé  à</span>  {{ editedItem.station_neighborhood }} </p>
            </div>
            <div class="TheMessage">
              <p> {{editedItem.content}} </p>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="Otherimportantcolor"
            rounded
            depressed
            @click="mailResponse"
            style="color: white"
            >Répondre</v-btn>
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
        :items="Messages"
        :search="search"
        :items-per-page="-1"
        hide-default-footer
      >
        <!-- FOR SEE EDIT, DELETE AND SHOW DIALOG -->
        <template v-slot:[`item.actions`]="{ item }">
          <!-- modification avec CESINHIO  a la base on avait v-slot:[item.actions="{ item }"-->
          <v-btn icon color="mainGreenColor" @click="showItem(item)">
              <v-icon small> mdi-eye </v-icon>
          </v-btn>
          <v-btn
            icon
            color="mainGreenColor"
            @click="editItem(item)"
            ><v-icon small> mdi-email-send </v-icon></v-btn
          >
        </template>
        <template v-slot:[`item.station_neighborhood`]="{ item }"> 
          <div v-if="!item.station_creator_id">
            <v-icon color="secondary" small> mdi-send-outline </v-icon> <span style="color: mainGreenColor;">VOUS</span>
          </div>
          <div v-if="item.station_creator_id == 0">
            <v-icon v-if="item.view" color="secondary" small> mdi-send </v-icon> 
             <v-icon v-if="!item.view" color="#b71c1c" small> mdi-send </v-icon> <span style="color: mainGreenColor;">MINO</span>
          </div>
          <div v-if="item.station_creator_id > 0">
            <v-icon v-if="item.view" color="Otherimportantcolor"  style="transform: rotateY(192deg)"  small> mdi-send </v-icon> 
            <v-icon v-if="!item.view" color="#b71c1c"  style="transform: rotateY(192deg)"  small> mdi-send </v-icon> <span style="color: mainGreenColor;">{{ item.station_neighborhood }}</span>
          </div>
        </template>
      </v-data-table>
    </div>

    
  </div>
</template>






























<script>
import { mapGetters } from "vuex";

export default {
  name: "allMessageList",
  components: {},

  data: () => ({
    // For the table
    search: "",
    headers: [
      {
        text: "DE",
        align: "start",
        sortable: false,
        value: "station_neighborhood",
      },
      { text: "OBJET", value: "topic" },
      { text: "DATE", value: "created_at" },
      { text: "DETAILS", value: "actions", sortable: false },
    ],

    // for alerte
    addingSuccess: false,
    addingfalse: false,

    // For Sender detail
    dialog: false,
    editedItem: {
      content: "",
    },

    // For Sender edit
    senderaAddingResponse: "",
    dialogEdit: false,
    editedIndex: -1,

    // For Sender deleted
    dialogDelete: false,
    itemToDelete: "",


    // For message viewing
    viewHasBeenUpdate:false,
  }),

 
  methods: {
    // ------------------------
    // Show Profil infomation
    // ------------------------
    showItem(item) {
      this.editedItem = Object.assign({}, item);
      this.viewHasBeenUpdate = false
      if ((item.station_creator_id) && (!this.editedItem.view)) {
        this.$store.dispatch("message_view", this.editedItem.id)
        this.viewHasBeenUpdate = true
      }

      this.dialog = true;
    },

    close() {
      if (this.viewHasBeenUpdate) {
        console.log('lkzeok');
        this.$store.state.MessageListRerender += 1
      }
      this.dialog = false;
    },


    // For table re-render after delete or update an item
    mailResponse() {
      this.close()
      this.$store.state.ResponseTopic = "RE::" + this.editedItem.topic;
      this.$store.state.response_of_id = this.editedItem.id;
    },
  },


  computed: {
    ...mapGetters(["Messages"]),
  },

  created() {
    this.$store.dispatch("init_message");
  },
};
</script>

























<style scoped>
.tableWrapperDiv {
  height: 57vh;
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
  margin: 0px 42%;
  margin-top: 0px;
  height: 100px;
  width: 100px;
  border-radius: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  border: solid 5px;
  border-color: var(--main-important-color)var(--main-green-color);
  background: linear-gradient(
      180deg,
      rgb(0 0 0 / 0%),
      rgb(0 0 0 / 19%),
      rgb(0 0 0)
    ),
    url(../../assets/img/pexels-veerasak-piyawatanakul-1170187.jpg);
  background-position:bottom;
  background-size: cover;
}

.PopTiTle{
  text-align: center;
  font-size: 15px;
  font-weight: bold;
}


.statElment {
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
}
.statElment > div {
  margin-left: 10px;
}
.statElment h2 {
  font-size: 16px;
  color: var(--main-green-color);
}

.TheMessage {
  margin-bottom: 15px;
  padding: 0px 40px;
  display: flex;
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
