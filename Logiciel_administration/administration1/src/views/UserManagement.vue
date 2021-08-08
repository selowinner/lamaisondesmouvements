<template>

    <div class="bodyBox">
        <div class="TheBoxBody ForcompanyDeclaration">
            <p class="MaintTitle">GESTION DES TICKETS</p>
            <div>
              <div class="formRadio">
                <v-radio-group v-model="row" row dense mandatory>
                  <v-radio label="ENREGISTRER UNE COMPAGNIE" value="radio-1" v-on:click= "DayType = true"></v-radio>
                  <v-radio label="LISTE DES COMPAGNIES" value="radio-2" v-on:click= "DayType = false"></v-radio>
                </v-radio-group>
              </div>
            </div>
           
            <v-form ref="companiesaddingform" v-if="DayType" class="mainContentWraper">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit reprehenderit atque voluptatem animi architecto nihil, iste, rerum maiores.</p>
              <v-container fluid>
                <v-row>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field outlined v-model="newCompany.denomination" ref="deno" height="50" color="red" type="text" :rules="[() => !!newCompany.denomination]"  value="Lieu de départ" label="Denomination" persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="newCompany.anagramme" ref="anag" height="50" type="text" :rules="[() => !!newCompany.anagramme]"  label="anagramme" persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="newCompany.description" ref="desc" height="50" type="text" :rules="[() => !!newCompany.description]"  label="description" persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="newCompany.matriculation" ref="rccm" height="50" type="text" :rules="[() => !!newCompany.matriculation ]"  label="Numéro RCCM" persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="newCompany.country" ref="pays" height="50" type="text" :rules="[() => !!newCompany.country ]"  label="Pays"  persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="newCompany.siege" ref="siege" height="50" type="text" :rules="[() => !!newCompany.siege]"  label="Ville de siège" persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="newCompany.contact" ref="cont" height="50" type="number" :rules="[() => !!newCompany.contact ]"  label="Contact" persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                    <v-text-field  outlined v-model="newCompany.email" ref="mail" height="50" type="email" :rules="[() => !!newCompany.email ]"  label="email"  persistent-hint required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4">
                     <v-btn large height="50" depressed color="mainGreenColor" v-on:click.prevent="submit" outlined>Enregistrer</v-btn>
                  </v-col>
                </v-row>

              </v-container>
            </v-form>
            <div v-if="!DayType" class="mainContentWraper">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit reprehenderit atque voluptatem animi architecto nihil, iste, rerum maiores.</p>
             <allCompaniesList :key="forceRerender"></allCompaniesList>
            </div>

        </div>


      <!-- ALERT -->
      <transition name="slide">
      <v-alert v-if="addingSuccess" elevation="13" type="success" max-width="300" class="alert" color="mainGreenColor">{{this.companyaddingResponse.message}}</v-alert>
      </transition>
      <transition name="slide"> 
      <v-alert v-if="addingfalse" elevation="13" type="error" max-width="300" class="alert" color="error">{{this.companyaddingResponse.message}}</v-alert>
      </transition>
    </div>
  
  
</template>











<script>
import Vue from 'vue'
import allCompaniesList from "../components/UserCompanyManagement/allCompaniesList.vue";




export default {
  name: "UserManagement",
  components: {
    allCompaniesList
  },

  data: () => ({
    
    row: "check",
    DayType: true,

    // for alerte
    addingSuccess: false,
    addingfalse : false,

  // for companies adding 
    newCompany:{
      denomination : '',
      matriculation : '',
      description : '',
      country : '',
      contact : '',
      email : '',
      anagramme : '',
      siege : '',
    },

    companyaddingResponse: "",

    
  }),



  methods: {
     submit(){
      Vue.prototype.$http.post('http://127.0.0.1:3333/compangny/add', this.newCompany)
                .then(response =>{
                  this.companyaddingResponse = response.data
                  console.log(response.data);
                  if (this.companyaddingResponse.message == "success" ) {
                    this.companyaddingResponse.message = "Compagny enregistrée avec succès"
                    this.addingSuccess = !this.addingSuccess
                    this.$refs.companiesaddingform.reset()
                    setTimeout(() => {
                        this.addingSuccess = !this.addingSuccess
                    }, 3000);
                  } else {
                    this.addingfalse = !this.addingfalse
                    setTimeout(() => {
                        this.addingfalse = !this.addingfalse
                    }, 3000);
                  }
                })
                .catch(error => {
                  this.companyaddingResponse = error.message;
                  console.error("There was an error!", error);
               });

    // this.$refs.companiesaddingform.reset()
    },
  },



  computed:{
    forceRerender() {
        return this.$store.state.companiescomponentKey;
      }
  },

};







 

</script>











<style scoped>

.TheBoxBody{
    height: 60vh;
    overflow-y: hidden;
    margin-top: 10%;
}

.ForcompanyDeclaration{
  background: var(--backgroundTree);
  text-align: center;
  border-radius: 10px;
}

.MaintTitle{
  background:  var(--font-color);
  line-height: 40px;
  text-align: center;
  font-weight: bold;
  color: white;
  font-size: 17px;
  margin-top: 0;
}

.ForcompanyDeclaration > div:nth-child(2){
  /* border-top: solid 0.5px var(--font-color); */
  margin: 0 25px;
}
.mainContentWraper > p:nth-child(1){
  border-bottom: solid 0.5px var(--font-color);
}

.v-form{
  padding: 0 35px;
}

.col-lg-4, .col-md-4{
  padding-bottom: 80px;
  padding-top: 50px;
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


.mainContentWraper{
  height: 100%;
  overflow-y: auto;
}



@media (min-width: 960px){
  .col-md-4 {
    height:50px;
    padding-bottom: 50px;
    padding-top: 35px;
}
}







</style>