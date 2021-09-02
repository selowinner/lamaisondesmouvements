<template>
  <div class="bodyBox">
    <div class="TheBoxBody ForTravelDeclaration">
      <p class="sectionTitle">Bilan des expéditions</p>
      <v-row>
        <v-col cols="12" md="3" lg="3" class="leftNumber">
          <div class="stat1">
            <div class="N-icon">
              <v-icon color="mainGreenColor">mdi-truck-delivery</v-icon>
            </div>
            <h1>{{ Analytics.expeditionDo }}</h1>
            <h5>Colis Expédiés</h5>
          </div>
          <div class="stat1">
            <div class="N-icon">
              <v-icon color="mainGreenColor">mdi-archive-arrow-down</v-icon>
            </div>
            <h1>{{ Analytics.expeditionNumber }}</h1>
            <h5>Nombre d'expédition</h5>
          </div>
        </v-col>
        <v-col cols="12" md="9" lg="9">
          <allExpeditionList :key="forceRerenderReturn"></allExpeditionList>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import allExpeditionList from "../components/expeditionList/allExpeditionList.vue";

export default {
  name: "ExpeditionSheet",
  components: {
    allExpeditionList,
  },

  data() {
    return {};
  },

  methods: {
    // ------------------------
    // Show Travel infomation
    // ------------------------
  },

  computed: {
    ...mapGetters(["Analytics"]),

    forceRerenderReturn() {
      return this.$store.state.expeditioncomponentKey;
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
