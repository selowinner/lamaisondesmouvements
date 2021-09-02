<template>
  <div class="bodyBox">
    <div class="TheBoxBody">
      <p class="sectionTitle">Messagerie</p>
      <v-container fluid class="pouletBr">
        <v-row>
          <v-col cols="12" md="3" lg="3">
            <div class="numberWrapper rightBox">
              <v-form ref="form1">
                <v-container fluid class="addSender">
                  <v-row>
                    <v-col cols="12" md="12" lg="12" style="display:flex; justify-content:center">
                      <v-select
                        v-model="value"
                        :items="items"
                        chips
                        label="Chips"
                        multiple
                        solo
                      >
                        <template v-slot:selection="{ item, index }">
                          <v-chip v-if="index === 0">
                            <span>{{ item }}</span>
                          </v-chip>
                          <v-chip v-if="index === 1">
                            <span>{{ item }}</span>
                          </v-chip>
                          <span
                            v-if="index === 2"
                            class="grey--text text-caption"
                          >
                            (+{{ value.length - 1 }} autres)
                          </span>
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="12" md="12" lg="12" style="margin-top:-25px">
                      <v-text-field height="60" 
                        background-color="#3e886d4a" 
                        solo
                        label="Objet"
                        append-icon="mdi-matrix"
                        ref="matri"
                        type="text"
                        value=""
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <div style="width:100%; padding: 0px 10px">
                      <v-textarea
                        solo
                        clearable
                        clear-icon="mdi-close-circle"
                        rows="8"
                        name="input-7-4"
                        label="Solo textarea"
                      ></v-textarea>
                    </div>
                    <v-col cols="12" md="12" lg="12" style="display:flex; justify-content:center; margin-top:-25px">
                      <v-btn
                        large
                        depressed
                        color="mainGreenColor"
                        >Enregistrer</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </div>
          </v-col>
          <v-col cols="12" md="9" lg="9">
            <div class="numberWrapper middleBox">
              <allMessageList ></allMessageList>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <transition name="slide">
      <v-alert
        v-if="addingSuccess"
        elevation="13"
        type="success"
        max-width="300"
        class="alert"
        color="mainGreenColor"
      >
        Livreur Enregistré avec succes</v-alert
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
import allMessageList from "../components/messageList/alleMessagesList.vue";

export default {
  name: "Messagerie",
  components: {
    allMessageList,
  },

  data: () => ({
    // FOR DEST CHOSING
    items: ['foo', 'bar', 'fizz', 'buzz'],
    value: ['foo', 'bar', 'fizz', 'buzz'],


    // FOR FORM SENDING
    new_Sender: {
      complet_name: "",
      contact: "",
      city: "",
      conveyance: "",
      matriculation: "",
      company_id: "1",
    },

    senderaAddingResponse: "",
    addingSuccess: false,
    addingfalse: false,

    sendercomponentKey1: 0,

    // FOR ANALYTICS
    // theNumberSender = 0,
  }),

  methods: {
  },

  computed: {
    dest() {
      return this.switch1? 'MINO':'Central'
    }
  },
};
</script>

<style scoped>
.sectionTitle {
  margin: 0;
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: bold;
}
.numberWrapper {
  border-radius: 10px;
  background: white;
}
.rightBox,
.middleBox {
  height: 57vh;
}
.addSender {
  height: 150px;
}

.stat1 {
  background: white;
  height: 60vh;
  border-radius: 10px;
  margin-bottom: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.N-icon {
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3e886d4a;
  border-radius: 100px;
}

@media (min-width: 960px) {
  .col-md-12 {
    height: 90px;
  }
}
</style>
