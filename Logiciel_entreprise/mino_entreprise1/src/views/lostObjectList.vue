<template>
  <div class="bodyBox">
    <div class="TheBoxBody ForTravelDeclaration">
      <p class="sectionTitle">Obejts égarés</p>
      <v-row>
        <v-col cols="12" md="9" lg="9">
          <allLostObjectList :key="forceRerender"></allLostObjectList>
        </v-col>
        <v-col cols="12" md="3" lg="3" class="leftNumber">
          <div class="stat1">
            <div class="N-icon">
              <v-icon color="mainGreenColor">mdi-archive-alert</v-icon>
            </div>
            <h1>{{ Analytics.lostThingNumber }}</h1>
            <h5>Objets declarés</h5>
          </div>
          <div class="stat1">
            <div class="N-icon">
              <v-icon color="mainGreenColor">mdi-archive</v-icon>
            </div>
            <h1>{{ Analytics.findThingNumber }}</h1>
            <h5>Objets retrouvés</h5>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import allLostObjectList from "../components/lostObjetList/allLostObjetList.vue";

export default {
  name: "lostObjectList",
  components: {
    allLostObjectList,
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
    forceRerender() {
      return this.$store.state.lostObjetcomponentKey;
    },
  },
};
</script>

<style scoped>
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
