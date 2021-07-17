<template>

    <div class="bodyBox">
        <div class="TheBoxBody">
            <p class="sectionTitle">Gestion Expédition</p>
            <v-container fluid class="pouletBr">
                <v-row>
                    <v-col cols="12" md="3" lg="3">
                        <div class="numberWrapper rightBox">
                             <v-form>
                                <v-container fluid class="addSender">
                                    <v-row>
                                    <v-col cols="12" md="12" lg="12">
                                        <v-text-field height="60" solo label="Append" append-icon="mdi-map-marker"  ref="dep_place"  color="red" type="text"   value="Lieu de départ"  persistent-hint required disabled></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12" lg="12">
                                        <v-text-field height="60" background-color="#3e886d4a" solo  append-icon="mdi-map-marker"   ref="dep_place"  color="red" type="text"   value="" label="Lieu de départ" persistent-hint required disabled></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12" lg="12">
                                        <v-text-field  height="60" solo  append-icon="mdi-map-marker"    ref="dest_place" type="text"   label="Destination" persistent-hint required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12" lg="12">
                                        <v-text-field height="60" background-color="#3e886d4a" solo  append-icon="mdi-map-marker"    ref="dep_time" type="time"   label="Heure départ" persistent-hint required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12" lg="12">
                                        <v-text-field height="60"  solo  append-icon="mdi-map-marker"  ref="pla_number" type="number"   label="Nombre de place à disponible"  persistent-hint required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12" lg="12">
                                        <v-btn large depressed color="mainGreenColor" style="color:white" >Enregistrer</v-btn>
                                    </v-col>
                                    </v-row>

                                </v-container>
                            </v-form>
                        </div>
                    </v-col>
                    <v-col cols="12" md="8" lg="8">
                        <div class="numberWrapper middleBox">
                            <alleExpeditionList></alleExpeditionList>
                        </div>
                    </v-col>
                     <v-col cols="12" md="1" lg="1" class="leftNumber">
                        <div class="stat1">
                            <div class="N-icon">
                                <v-icon color="mainGreenColor">mdi-account-group</v-icon>
                            </div>
                            <h1>45</h1>
                            <h5 style="text-align:center">livreurs</h5>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
  
  
</template>











<script>
// @ is an alias to /src
import alleExpeditionList from "../components/expeditionList/alleSendersList.vue";
export default {
  name: "Expedition",
  components: {
    alleExpeditionList
  },

};


</script>











<style scoped>

.sectionTitle{
    margin: 0;
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: bold;
}
.numberWrapper{
    border-radius: 10px;
    background: white;
}
.rightBox, .middleBox{
    height: 60vh;
}
.addSender{
  height: 150px;
}

.stat1{
  background: white;
  height: 60vh;
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



/* 
.statWrapper{
    height: 270px;
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
} */

























@media (min-width: 960px){
.col-md-12 {
    height: 90px;
}
}


</style>