<template>


 <div class="bodyBox">
      <div class="TheBoxBody ForTravelDeclaration">
          <p class="MaintTitle">GESTION DES OBJETS </p>

          <div>
            <h1>Bilan des objets egarés </h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit reprehenderit atque voluptatem animi architecto nihil, iste, rerum maiores.</p>
          </div>
          <allLostObjectList></allLostObjectList>   
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