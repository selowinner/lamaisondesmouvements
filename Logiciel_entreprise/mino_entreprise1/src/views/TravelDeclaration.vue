<template>

    <div class="bodyBox">
        <div class="TheBoxBody ForTravelDeclaration">
            <p class="MaintTitle">GESTION DES TICKETS</p>
            <div>
              <h1>Déclaration de voyage</h1>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit reprehenderit atque voluptatem animi architecto nihil, iste, rerum maiores.</p>
            </div>
            <div class="formRadio">
              <v-radio-group v-model="row" row dense mandatory>
                <v-radio label="JOUR D'APRES" value="radio-1" v-on:click= "DayType = true"></v-radio>
                <v-radio label="AUTRE JOUR" value="radio-2" v-on:click= "DayType = false"></v-radio>
              </v-radio-group>
            </div>
            <v-form v-if="DayType">
              <v-container fluid>
                <v-row>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="prix" ref="prix"  color="red" type="text" :rules="[() => !!prix]"  value="Lieu de départ" label="Lieu de départ" persistent-hint required disabled></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="prix" ref="prix" type="text" :rules="[() => !!prix]"  label="Destination" persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="prix" ref="heure" type="time" :rules="[() => !!prix]"  label="Heure départ" persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="quantity" ref="quantity" type="number" :rules="[() => !!quantity ]"  label="Nombre de place à vendre" persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="prix" ref="prix" type="number" :rules="[() => !!prix ]"  label="Nombre de place à disponible"  persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="prix" ref="prix" type="text" :rules="[() => !!prix]"  label="type de car" persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="quantity" ref="prix" type="number" :rules="[() => !!prix]"  label="Prix du ticket"  persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                     <v-btn large depressed color="mainGreenColor">Enregistrer</v-btn>
                  </v-col>
                </v-row>

              </v-container>
            </v-form>
            <v-form v-if="!DayType">
              <v-container fluid>
                <v-row>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="prix" ref="prix"  color="red" type="text" :rules="[() => !!prix ]"  value="Lieu de départ" label="Lieu de départ" persistent-hint required disabled></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="prix" ref="prix" type="text" :rules="[() => !!prix ]"  label="Destination" persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="prix" ref="heure" type="time" :rules="[() => !!prix]"  label="Heure départ" persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="quantity" ref="quantity" type="number" :rules="[() => !!quantity ]"  label="Nombre de place à vendre" persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="prix" ref="prix" type="number" :rules="[() => !!prix ]"  label="Nombre de place à disponible"  persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="prix" ref="prix" type="text" :rules="[() => !!prix ]"  label="type de car" persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="quantity" ref="prix" type="number" :rules="[() => !!prix ]"  label="Prix du ticket"  persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="prix" ref="date" type="date" :rules="[() => !!prix]"  label="date départ" persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                     <v-btn large depressed color="mainGreenColor">Enregistrer</v-btn>
                  </v-col>
                </v-row>

              </v-container>
            </v-form>

        </div>
    </div>
  
  
</template>











<script>
export default {
  name: "TravelDeclaration",
  components: {
    
  },

  data: () => ({
    
    row: "check",
    DayType: true
    
  }),

  methods: {
    
  }

};


</script>











<style scoped>

.TheBoxBody{
    height: 58vh;
    margin-top: -20px;
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
}

.ForTravelDeclaration > div:nth-child(2){
  border-bottom: solid 0.5px var(--font-color);
  margin: 0 45px;
}

.v-form{
  padding: 0 35px;
}

.col-lg-4, .col-md-4{
  padding-bottom: 0px
}

.formRadio{
  display: flex;
  justify-content: center;
}

.v-input--selection-controls {
    margin-top: 20px;
    padding-top: 0px;
}
.v-btn:not(.v-btn--round).v-size--large {
    height: 58px;
    min-width: 100%;
    padding: 0 19.5555555556px;
    color: white;
}
/* .theme--light.v-btn {
    
} */

@media (min-width: 960px){
  .col-md-4 {
    height:75px;
}
}







</style>