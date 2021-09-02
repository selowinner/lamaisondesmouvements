<template>
  <div class="bodyBox">
    <div class="TheBoxBody ForTravelDeclaration">
      <p class="sectionTitle">Gestion des voyages</p>
      <v-row>
        <v-col cols="12" md="3" lg="3" class="leftNumber">
          <div class="stat1">
            <div class="N-icon">
              <v-icon color="mainGreenColor">mdi-bus-multiple</v-icon>
            </div>
            <h1>{{ Analytics.declaredTravelNumber }}</h1>
            <h5>voyages Déclarés</h5>
          </div>
          <div class="stat1">
            <div class="N-icon">
              <v-icon color="mainGreenColor">mdi-bus-alert</v-icon>
            </div>
            <h1>{{ Analytics.cancellingTravelNumber }}</h1>
            <h5>voyages mannulés</h5>
          </div>
        </v-col>
        <v-col cols="12" md="9" lg="9">
          <allTravelList :key="forceRerender"></allTravelList>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import allTravelList from "../components/travelListe/allTravelList.vue";

export default {
  name: "TravelBalanceSheet",
  components: {
    allTravelList,
  },

  data() {
    return {
      // componentKey: 0,
    };
  },

  methods: {
    // ------------------------
    // RE-RENDER CHILD  COMPONENT
    // ------------------------
    // forceRerender() {
    //     this.componentKey = this.$store.state.travelcomponentKey;
    //     // console.log(this.componentKey);
    //   }
  },

  computed: {
    ...mapGetters(["Analytics"]),
    forceRerender() {
      return this.$store.state.travelcomponentKey;
      // console.log(this.componentKey);
    },
  },
};
</script>

<style scoped>
/* .TheBoxBody{
    height: 60vh;
    margin-top: 0px;
} */
.ForTravelDeclaration {
  /* background: white;
  text-align: center; */
  /* background: red; */
}
.sectionTitle {
  margin: 0;
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: bold;
  /* text-align: start; */
}
.lolplp {
  background: white;
  border-radius: 10px;
  padding: 20px;
}

.stat1 {
  background: white;
  height: 225px;
  border-radius: 10px;
  margin-bottom: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.N-icon {
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3e886d4a;
  border-radius: 100px;
}
.stat1 h1 {
  margin-bottom: -15px;
  font-size: 45px;
}
.stat1 h5 {
  color: var(--font-color);
}
</style>
