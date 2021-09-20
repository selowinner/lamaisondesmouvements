<template>
  <div class="tableWrapperDiv">
    <!-- SHOW DIALOG -->
    <v-dialog v-model="dialog" max-width="700" @click:outside="close">
      <v-card>
        <v-card-text>
          <v-container>
            <div class="imgAndTitle">
              <p v-if="!editedItem.station_creator_id">Message - lecture</p>
              <p v-if="(editedItem.station_creator_id) && (editedItem.central_dest_id == 0)">Envoyé <br> à <br> MINO</p>
              <p v-if="(editedItem.station_creator_id) && (editedItem.central_dest_id > 0)">Envoyé <br> à <br> CENTRALE</p>
            </div>
            <div class="TheMessage">
              <p> {{editedItem.content}} </p>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="Titlecolor"
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
            @click="showItem(item)"
            ><v-icon small> mdi-email-send </v-icon></v-btn
          >
        </template>
        <template v-slot:[`item.central_dest_id`]="{ item }"> 
          <div v-if="item.station_creator_id">
            <v-icon color="secondary" small> mdi-send-outline </v-icon> <span style="color: mainGreenColor;">VOUS</span>
          </div>
          <div v-if="(!item.station_creator_id) && (item.central_creator_id == 0)">
            <v-icon small color="primary" style="transform: rotateY(192deg)" v-if="item.view"> mdi-send-outline </v-icon> 
            <v-icon small color="red" style="transform: rotateY(192deg)" v-if="!item.view"> mdi-send-outline </v-icon> <span style="color: mainGreenColor;">MINO</span>
          </div>
          <div v-if="(!item.station_creator_id) && (item.central_creator_id > 0)">
            <v-icon small color="primary" style="transform: rotateY(192deg)" v-if="item.view"> mdi-send-outline </v-icon>
            <v-icon small color="#b71c1c" style="transform: rotateY(192deg)" v-if="!item.view"> mdi-send-outline </v-icon> <span style="color: mainGreenColor;">CENTRALE</span>
          </div>
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
        value: "central_dest_id",
      },
      { text: "OBJET", value: "topic" },
      { text: "DATE", value: "created_at" },
      { text: "DETAILS", value: "actions", sortable: false },
    ],
    desserts: [
      // {
      //   sernder: "MINO",
      //   objet: "scipit voluptatibus co orum laudantium ...",
      //   date: "09:00",
        
      // },
      // {
      //   sernder: "CENTRALE",
      //   objet: "25-03-2021 scipit voluptatibus co orum lalaborum...",
      //   date: "09:00",
       
      // },
      // {
      //   sernder: "VOUS",
      //   objet: " voluptatibus co orum laudantiljeijopj nzpijpum as...",
      //   date: "09:00",
        
      // },
      // {
      //   sernder: "MINO",
      //   objet: "scipit voluptatibus co orum laudqjk^fq pqp dantium as...",
      //   date: "09:00",
        
      // },
      // {
      //   sernder: "VOUS",
      //   objet: "RE:: scipit voluptatibus corrups<opti dum as...",
      //   date: "09:00",
        
      // },
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
      if ((!item.station_creator_id) && (!this.editedItem.view)) {
        console.log(this.editedItem.id);
        this.$store.dispatch("message_view", this.editedItem.id)
        this.viewHasBeenUpdate = true
      }

      this.dialog = true;
    },

    close() {
      if (this.viewHasBeenUpdate) {
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
  height: 100px;
  width: 620px;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
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
  text-align: center;
  color: white;
}
.imgAndTitle > p:last-child {
  font-size: 15px;
  font-weight: bold;
  margin: 0px 0px 10px 20px;
  color: white;
}

.TheMessage {
  margin-bottom: 15px;
  padding: 0px 40px;
  display: flex;
}

.statusChange {
  display: flex;
  justify-content: center;
}

</style>
