<template>


  <div class="bodyBox">
      <div class="TheBoxBody ForTravelDeclaration">
          <p class="MaintTitle">GESTION DES TICKETS </p>

          <div>
            <h1>Bilan des voyages </h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit reprehenderit atque voluptatem animi architecto nihil, iste, rerum maiores.</p>
          </div>

           <allTravelList></allTravelList>

      </div>
  </div>
  
  
</template>


















<script>
import allTravelList from '../components/travelListe/allTravelList.vue'


export default {

  name: "TravelBalanceSheet",
  components: {
    allTravelList
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

.TheBoxBody{
    height: 60vh;
    margin-top: 0px;
}
.ForTravelDeclaration{
  background: white;
  text-align: center;
}
.MaintTitle{
  background:  var(--main-green-color);
  line-height: 40px;
  text-align: center;
  font-weight: bold;
  color: var(--main-white-color);
  font-size: 17px;
  margin-top: 0px;
}


</style>