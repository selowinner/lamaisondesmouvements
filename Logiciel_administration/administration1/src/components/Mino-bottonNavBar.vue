<template>

 

    <div class="bottonNavBar">
      <p class="sectionTitle">Menu</p>
      <v-container fluid>
          <v-row>
              <v-col cols="12" md="3" lg="3" class="box">
                  <router-link :to="{name: 'UserManagement'}">
                    <div class="boxWrapper">
                        <span>GESTION <br> DES UTILISATEURS</span>
                    </div>
                  </router-link>
              </v-col>
              <v-col cols="12" md="3" lg="3" class="box">
                  <router-link :to="{name: 'TravelManagement'}">                    
                    <div class="boxWrapper">
                        <span>GESTION <br> DES VOYAGES</span>
                    </div>
                  </router-link>
              </v-col>
                <v-col cols="12" md="3" lg="3" class="box">
                  <div class="boxWrapper">
                      <span>HISTORIQUE <br> DES OBJETS EGARES</span>
                  </div>
              </v-col>
                <v-col cols="12" md="3" lg="3" class="box">
                  <div class="boxWrapper">
                      <span>HISTORIQUE <br> DES COLIS ENVOYES</span>
                  </div>
              </v-col>
          </v-row>
      </v-container>
    </div>
       
  
  
</template>











<script>
export default {
  name: "MinoBottonNavBar",

  components: {
    
  },

  data: () => ({
    
    isActive: false,
    poulet: true,
    
  }),

  methods: {
    
  }

};


</script>











<style scoped>


.bottonNavBar{
    /* background: rgb(201, 102, 102); */
    width: 100vw;
    width: 74vw;
    margin-left: 21%;

    position: fixed;
    top: 80vh;
    /* left: 22vw; */

}


.boxWrapper{
  background:  var(--backgroundTree);
  height: 80px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  border-radius: 10px;
}


.router-link-exact-active > .boxWrapper{
    /* border-radius: 10px 0 0 0; */
   color: white;
   background: var(--font-color);
}

</style>