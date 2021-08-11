<template>

    <div class="bodyBox">
        <div class="TheBoxBody">
            <!-- <p class="sectionTitle">Gestion Expédition</p> -->
            <v-container fluid class="pouletBr">
                <v-row>
                    <v-col cols="12" md="3" lg="3">
                        <div class="numberWrapper rightBox">
                            <p class="sectionTitle">Enregistrement</p>
                             <v-form ref="form1">
                                <v-container fluid class="addSender">
                                    <v-row>
                                    <v-col cols="12" md="12" lg="12">
                                        <v-text-field height="60" solo label="Matricule" append-icon="mdi-matrix"  ref="matri"  type="text"   value=""  persistent-hint required disabled></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12" lg="12">
                                        <v-text-field height="60" background-color="#3e886d4a" solo label="Nom complet" v-model="new_Sender.complet_name" append-icon="mdi-account-details-outline"  ref="total_name"  type="text"   value=""  persistent-hint required ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12" lg="12">
                                        <v-text-field height="60" solo  append-icon="mdi-map-marker"   ref="location"   type="text" v-model="new_Sender.city"  value="" label="Lieu d'habitation" persistent-hint required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12" lg="12">
                                        <v-text-field  height="60" background-color="#3e886d4a" solo  append-icon="mdi-motorbike"  v-model="new_Sender.conveyance"  ref="transport" type="text"   label="Moyen de transport" persistent-hint required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12" lg="12">
                                        <v-text-field height="60"  solo  append-icon="mdi-phone"  ref="pla_number" type="number" v-model="new_Sender.contact"  label="Numero de téléphone"  persistent-hint required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12" lg="12">
                                        <v-btn large depressed color="mainGreenColor" style="color:white" v-on:click.prevent="submit1">Enregistrer</v-btn>
                                    </v-col>
                                    </v-row>

                                </v-container>
                            </v-form>
                        </div>
                    </v-col>
                    <v-col cols="12" md="7" lg="7">
                        <div class="numberWrapper middleBox">
                            <allStaions :key="forceRerenderReturn"></allStaions>
                        </div>
                    </v-col>
                     <v-col cols="12" md="2" lg="2" class="leftNumber">
                        <div class="stat1">
                            <div class="element1">
                                <div class="N-icon">
                                    <v-icon color="mainGreenColor">mdi-account-group</v-icon>
                                </div>
                                <h5>NOUVEAU code-mino</h5>
                            </div>
                            <div class="element2">
                                <div class="code">
                                    <v-icon color="mainGreenColor">mdi-matrix</v-icon>
                                    <p> MINO-001LIJ-51451JK</p>
                                </div>
                                <div class="code">
                                    <v-icon color="mainGreenColor">mdi-matrix</v-icon>
                                    <p> MINO-001LIJ-51451JK</p>
                                </div>
                                <div class="code">
                                    <v-icon color="mainGreenColor">mdi-matrix</v-icon>
                                    <p> MINO-001LIJ-LANDRY</p>
                                </div>
                                <div class="code">
                                    <v-icon color="mainGreenColor">mdi-matrix</v-icon>
                                    <p> MINO-001LIJ-51451JK</p>
                                </div>
                                <div class="code">
                                    <v-icon color="mainGreenColor">mdi-matrix</v-icon>
                                    <p> MINO-001LIJ-51451JK</p>
                                </div>
                                
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div>


        <transition name="slide"> 
        <v-alert v-if="addingSuccess" elevation="13" type="success" max-width="300" class="alert" color="mainGreenColor"> Livreur Enregistré avec succes</v-alert>
        </transition>
        <transition name="slide"> 
        <v-alert v-if="addingfalse" elevation="13" type="error" max-width="300" class="alert" color="error"> {{senderaAddingResponse.message}}</v-alert>
        </transition>
    </div>
  
  
</template>











<script>
// import Vue from 'vue'
import allStaions from "../components/station/allStaions.vue";

export default {
  name: "stationRegistring",
  components: {
    allStaions
  },


  data: () => ({


    // FOR FORM SENDING
    new_Sender:{
      complet_name: '',
      contact:'',
      city:'',
      conveyance: '',
      matriculation:'',
      company_id : '1',
    },

    senderaAddingResponse: "",
    addingSuccess: false,
    addingfalse : false,

    sendercomponentKey1 : 0,

    // FOR ANALYTICS
    // theNumberSender = 0,
    
  }), 




//   methods: {
//     submit1(){
//       this.matriculeGeneration()
//       Vue.prototype.$http.post('http://127.0.0.1:3333/expedition/addsender', this.new_Sender)
//                 .then(response =>{
//                   this.senderaAddingResponse = response.data
//                   console.log(response.data);
//                   if (this.senderaAddingResponse.message == "success" ) {
//                     this.addingSuccess = !this.addingSuccess
//                     setTimeout(() => {
//                         this.addingSuccess = !this.addingSuccess
//                         this.forceRerender1()
//                     }, 3000);
//                   } else {
//                     this.addingfalse = !this.addingfalse
//                     setTimeout(() => {
//                         this.addingfalse = !this.addingfalse
//                     }, 3000);
//                   }
                  
//                 })
//                 .catch(error => {
//                   this.senderaAddingResponse = error.message;
//                   console.error("There was an error!", error);
//                });
    
    
//     this.$refs.form1.reset()
//     },


//     matriculeGeneration(){
//       let CurrentDate =  new Date()
//       let time = CurrentDate.getTime()
//       let matricule = "SENDER" + time

//       this.new_Sender.matriculation = matricule
//     },



//     // For table re-render after delete or update an item
//     forceRerender1() {
//        this.$store.state.sendercomponentKey += 1
//     },

//   },






// computed:{
    
//     forceRerenderReturn() {
//         return this.$store.state.sendercomponentKey;
//         // console.log(this.componentKey);
//     },

//     SenderNumber() {
//         // let sernders = this.$store.getters.Senders
//         // for (let index = 0; index < sernders.length; index++) {
//         //     if (sernders[index].activation_state == 1) {
                 
//         //     }
            
//         // }

//         return this.$store.getters.Senders.length;
//         // console.log(this.componentKey);
//     }

// },

};


</script>











<style scoped>

.sectionTitle{
    margin: 0;
    margin-bottom: 5px;
    margin-left: 15px;
    font-size: 18px;
    font-weight: bold;
}
.numberWrapper{
    border-radius: 10px;
    background: white;
}
.rightBox, .middleBox{
    height: 62vh;
}
.addSender{
  height: 150px;
}
.element1{
 display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
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
    background: var(--main-important-color);
    border-radius: 100px;
}

.element2{
    height: 40vh;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: auto;
}
.element2::-webkit-scrollbar{
  width: 15px;
}
.element2::-webkit-scrollbar-track {
  background: #ffffff;
}

.element2::-webkit-scrollbar-thumb {
  background-color: var(--main-green-color);
  border-radius: 30px;
  border: 5px solid #ffffff;
}
.code{
    border-radius: 5px;
    height: 50px;
    width: 100%;
    background: #3e886d4a;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 5px;
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