<template>

    <div class="bodyBox">
        <div class="TheBoxBody">

            <p class="sectionTitle">Statistiques</p>

            <v-container fluid>
                <v-row>
                    <v-col cols="12" md="3" lg="3" class="box">
                        <div class="boxWrapper">
                            <p>NOMBRE TOTAL <br> DE TICKETS ACHETES DANS <br> LE MOIS</p>
                            <div class="palabre"></div>
                            <p>27 623</p>
                            <p>TICKETS</p>
                        </div>
                    </v-col>
                    <v-col cols="12" md="3" lg="3" class="box">
                        <div class="boxWrapper">
                            <p>NOMBRE TOTAL <br> DE DECLARATION DE  <br>PERTES FATES DANS LE MOIS</p>
                            <div class="palabre"></div>
                            <p>532</p>
                            <p>DECLARATIONS</p>
                        </div>
                    </v-col>
                     <v-col cols="12" md="3" lg="3" class="box">
                        <div class="boxWrapper">
                            <p>LA COMPAGNIE AYANT<br> EFFECTUE LE PLUS GRAND NOMBRE DE VENTE DE TICKET</p>
                            <div class="palabre"></div>
                            <p>UTB</p>
                            <p>10 000 TICKETS</p>
                        </div>
                    </v-col>
                     <v-col cols="12" md="3" lg="3" class="box">
                        <div class="boxWrapper">
                            <p>LA COMPAGNIE <br> LA MIEUX <br> NOTEE </p>
                            <div class="palabre"></div>
                            <p>UTB</p>
                            <p>MOYENNE = 3,8 </p>
                        </div>
                    </v-col>
                </v-row>
            </v-container>

        </div>
    </div>
  
  
</template>











<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "Dashboard",
  components: {
    // HelloWorld
  },

};


</script>











<style scoped>

.bodyBox{
    height: inherit;
}



.boxWrapper{
    background: var(--backgroundTree);
    text-align: center;
    padding: 15px 25px;
    border-radius: 10px;
}
.boxWrapper p:nth-child(1){
    font-size: 13px;
    margin-bottom:20px;
    color: var(--font-gray);
}
.boxWrapper p:nth-child(3){
    font-size: 45px;
    font-weight: bold;
    margin: 0px;
}
.boxWrapper p:nth-child(4){
    font-size: 20px;
    font-weight: bold;
    margin: 0px;
    margin-top: -20px;
}
.palabre{
    height: 165px;
    /* width: 165px; */
    min-width: 100px;
    margin: 0 auto;
    background: #35373a;
    margin-bottom:18px;
}


</style>