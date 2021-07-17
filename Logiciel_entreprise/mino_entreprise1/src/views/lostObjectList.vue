<template>


 <div class="bodyBox">
      <div class="TheBoxBody ForTravelDeclaration">
          <p class="sectionTitle">Obejts égarés</p>
          <v-row>
            <v-col cols="12" md="9" lg="9">
            <allLostObjectList></allLostObjectList>
            </v-col>
            <v-col cols="12" md="3" lg="3" class="leftNumber">
              <div class="stat1">
                <div class="N-icon">
                    <v-icon color="mainGreenColor">mdi-archive-alert</v-icon>
                </div>
                <h1>152</h1>
                <h5>Objets declarés</h5>
              </div>
              <div class="stat1">
                <div class="N-icon">
                    <v-icon color="mainGreenColor">mdi-archive-arrow-up</v-icon>
                </div>
                <h1>73</h1>
                <h5>Objets retrouvés</h5>
              </div>
            </v-col>
          </v-row>   
      </div>
  </div>

    
</template>











<script>
import allLostObjectList from '../components/lostObjetList/allLostObjetList.vue'


export default {

  name: "lostObjectList",
  components: {
    allLostObjectList
  },


  data() {
    return {
      

    };
  },


  methods: {

  // ------------------------
    // Show Travel infomation
  // ------------------------
  
  },


   computed:{
    
  },



 
}

</script>















<style scoped>
.sectionTitle{
    margin: 0;
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: bold;
    /* text-align: start; */
}
.lolplp{
  background: white;
  border-radius: 10px;
  padding: 20px;
}



.stat1{
  background: white;
  height: 250px;
  border-radius: 10px;
  margin-bottom: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.N-icon{
    height: 60px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #3e886d4a;
    border-radius: 100px;
}
.stat1 h1{
    margin-bottom: -15px;
    font-size: 50px;
}
.stat1 h5{
    color:  var(--font-color);
}

</style>