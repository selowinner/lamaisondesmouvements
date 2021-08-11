<template>

    <div class="bodyBox">
        <div class="TheBoxBody">
            <!-- <p class="sectionTitle">Chiffres Importants</p> -->
            <v-container fluid class="pouletBr">
                <v-row>
                    <v-col cols="12" md="6" lg="6">
                        <div class="Jumbultron">
                            <div>
                                <h2>Binvenue sur <span style="color:#c99c33">Mino</span></h2>
                                <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br>
                                Sunt, repellat odit? Corrupti earum natus ullam iusto doloribus esse?
                                </p>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" md="2" lg="2">
                        <div class="numberWrapper">
                            <div>
                                <h1>11</h1>
                                <h5>Gares mino</h5>
                            </div>
                            <div>
                                
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" md="2" lg="2">
                        <div class="numberWrapper">
                            <div>
                                <h1>120</h1>
                                <h5>Tickets vendus</h5>
                            </div>
                            <div>
                                
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" md="2" lg="2">
                        <div class="numberWrapper">
                            <div>
                                <h1>75</h1>
                                <h5>Expeditions</h5>
                            </div>
                            <div>
                                
                            </div>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="9" lg="9">
                        <div class="statWrapper">
                             <p class="sectionTitle">Statistique</p>

                        </div>
                    </v-col>
                    <v-col cols="12" md="3" lg="3">
                        <div class="statWrapper1">
                            <h4>Notes clients</h4>
                            <div class="noteWrapper">
                               
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
  
  
</template>











<script>

export default {
  name: "Dashboard",
  components: {
    // HelloWorld
  },

data: () => ({
   
  }),
  



mounted() {
   
},



 methods: {

  // ------------------------
    // DATA  
  // ------------------------
   
    

  },






 computed:{
    
  },



};




</script>











<style scoped>

.sectionTitle{
    font-size: 18px;
    margin-left: 15px;
    font-weight: bold;
}
.numberWrapper{
    height: 200px;
    border-radius: 10px;
    background: white;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
}
.numberWrapper div:nth-child(1){
   height: 80px;
   /* background: tomato; */
   margin-left: 20px;
}
.numberWrapper div:nth-child(1)>h1{
   font-size: 50px;
   margin-bottom: -15px;
}
.numberWrapper div:nth-child(2){
    height: 120px;
}

.Jumbultron{
    height: 200px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    display: flex;
    align-items: flex-start;
    padding-left: 30px;
    background: var(--main-important-color);
    color: white;
}
.Jumbultron p{
    font-size: 13px;
}




.statWrapper{
    height: 300px;
    padding: 5px;
    border-radius: 10px;
    background: white;
}
.statWrapper1{
    height: 300px;
    border-radius: 10px;
    padding-top: 10px;
    background: white;
}
.statWrapper1 h4{
    margin-left: 10px;
}
.noteWrapper{
    margin-top: 5%;
    height: 80%;
}


























</style>