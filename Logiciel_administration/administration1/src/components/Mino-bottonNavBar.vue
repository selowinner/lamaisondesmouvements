<template>
  <div class="bottonNavBar">
    <p class="sectionTitle" style="background: #1e2126">Menu</p>
    <v-container fluid>
      <v-row>
        <v-col cols="3" md="3" lg="3" class="box">
          <router-link :to="{ name: 'UserManagement' }">
            <div class="boxWrapper">
              <span
                >GESTION <br />
                DES COMPAGNIES</span
              >
            </div>
          </router-link>
        </v-col>
        <v-col cols="3" md="3" lg="3" class="box">
          <router-link :to="{ name: 'TravelManagement' }">
            <div class="boxWrapper">
              <span
                >HISTORIQUE <br />
                DES VOYAGES</span
              >
            </div>
          </router-link>
        </v-col>
        <v-col cols="3" md="3" lg="3" class="box">
          <router-link :to="{ name: 'LostObjectManagement' }">
            <div class="boxWrapper">
              <span
                >HISTORIQUE <br />
                DES OBJETS EGARES</span
              >
            </div>
          </router-link>
        </v-col>
        <v-col cols="3" md="3" lg="3" class="box">
          <router-link :to="{ name: 'ExpeditionManagement' }">
            <div class="boxWrapper">
              <span
                >HISTORIQUE <br />
                DES COLIS ENVOYES</span
              >
            </div>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "MinoBottonNavBar",

  components: {},

  data: () => ({
    isActive: false,
    poulet: true,
  }),

  methods: {},

  created() {
    this.$store.dispatch("init_stations");
    this.$store.dispatch("init_analytycs");
  },
};
</script>



<style scoped>
.bottonNavBar {
  /* background: rgb(201, 102, 102); */
  background: var(--main-black-color);
  /* background: rgb(255, 0, 119); */
  /* width: 100vw; */
  width: 74vw;
  margin-left: 21%;
  padding: 0;
  position: fixed;
  top: 81vh;
  /* left: 22vw; */
}

.boxWrapper {
  background: var(--backgroundTree);
  height: 80px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  border-radius: 10px;
}

.router-link-exact-active > .boxWrapper {
  /* border-radius: 10px 0 0 0; */
  color: white;
  background: var(--font-color);
}





/*++++++++++++++++
===> MEDIUM Large tablet to laptop	960px > < 1264px*<===
+++++++++++++++++*/
@media screen and (min-width: 1100px) and (max-width: 1264px){
  .bottonNavBar {
    margin-left: 23%;
  }
  .boxWrapper {
  background: var(--backgroundTree);
  height: 73px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 15px;
  border-radius: 10px;
}

}


@media screen and (min-width: 960px) and (max-width: 1100px){
  .bottonNavBar {
    margin-left: 24.5%;
  }
  .boxWrapper {
  background: var(--backgroundTree);
  height: 70px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 12px;
  border-radius: 10px;
}
}
</style>
