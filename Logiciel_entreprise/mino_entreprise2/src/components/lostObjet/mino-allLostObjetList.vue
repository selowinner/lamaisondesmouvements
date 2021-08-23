<template>
    <div class="TheBoxBodyforpopUp ForTravelDeclaration">
        <p class="MaintTitle">GESTION DES TICKETS</p>
        <div>
            <div class="formRadio">
            <v-radio-group v-model="row" row dense mandatory>
                <v-radio label="HISTORIQUE DES OBJETS EGARE" value="radio-1" ></v-radio>
            </v-radio-group>
            </div>
             <!-- THE SEACH BAR -->
            <v-row>
              <v-col cols="12" md="4" lg="4"></v-col>
              <v-col  cols="12" md="4" lg="4">
                <v-text-field v-model="search"  @keydown="changeseach"  dense outlined hide-details prepend-inner-icon="mdi-search" label="Rechercher" class="theSeachBar"></v-text-field>
              </v-col>
              <v-col cols="12" md="4" lg="4"></v-col>
            </v-row>
        </div>
        
        <div class="liste">
            <lostlist :key="ForceRe"></lostlist> 
        </div>

    </div>
</template>











<script>
import lostlist from "./mino-lostlist.vue";
export default  {
  name: "MinoOneLostobjetCompany",

  components: {
    lostlist
  },

  data: () => ({
    
    row: "check",
    DayType: 0,

    //for the list
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    search: '',
    headers: [
        {
          text: 'IDENTIFIANT',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'DATE', value: 'date' },
        { text: 'HEURE', value: 'heure' },
        { text: 'DETAILS', value: 'actions', sortable: false },
      ],
    desserts: [
      {
        name: 'Frozen Yogurt',
        date: '21-01-2021',
        heure: '09:00',
        details:{
          vendus: 30,
          aVendre: 45,
          restant: 15,
          annules: 5,
          gains: 150000
        }
      },
      {
        name: 'Ice cream sandwich',
        date: '01-01-2021',
        heure: '09:00',
        details:{
          vendus: 45,
          aVendre: 45,
          restant: 0,
          annules: 5,
          gains: 160000
        }
      },
      {
        name: 'Eclair',
        date: '25-03-2021',
        heure: '09:00',
        details:{
          vendus: 30,
          aVendre: 20,
          restant: 10,
          annules: 0,
          gains: 350000
        }
      },
      {
        name: 'Cupcake',
        date: '25-03-2021',
        heure: '09:00',
        details:{
          vendus: 30,
          aVendre: 45,
          restant: 15,
          annules: 5,
          gains: 150000
        }
      },
      {
        name: 'Gingerbread',
        date: '25-04-2021',
        heure: '09:00',
        details:{
          vendus: 30,
          aVendre: 45,
          restant: 15,
          annules: 5,
          gains: 150000
        }
      },
      {
        name: 'Jelly bean',
        date: '25-03-2021',
        heure: '09:00',
        details:{
          vendus: 30,
          aVendre: 45,
          restant: 15,
          annules: 5,
          gains: 150000
        }
      },
      {
        name: 'Lollipop',
        date: '25-03-2021',
        heure: '09:00',
        details:{
          vendus: 30,
          aVendre: 45,
          restant: 15,
          annules: 5,
          gains: 150000
        }
      },
      {
        name: 'Honeycomb',
        date: '15-02-2021',
        heure: '09:00',
        details:{
          vendus: 30,
          aVendre: 45,
          restant: 15,
          annules: 5,
          gains: 150000
        }
      },
      {
        name: 'Donut',
        date: '25-03-2021',
        heure: '09:00',
        details:{
          vendus: 30,
          aVendre: 45,
          restant: 15,
          annules: 5,
          gains: 150000
        }
      },
      {
        name: 'KitKat',
        date:'25-03-2021',
        heure: '09:00',
        details:{
          vendus: 30,
          aVendre: 45,
          restant: 15,
          annules: 5,
          gains: 150000
        }
      },
    ],


      editedItem: {
        name: '',
        date:'',
        heure: '',
        details:{
          vendus: 0,
          aVendre: 0,
          restant: 0,
          annules: 0,
          gains: 0
        }
      },



    dialog: false
    
  }),

  methods: {
    editItem: function (item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      console.log(item.name);
    },
    // for search bar
    changeseach: function () {
    this.$store.state.seachAllLost = this.search
    },
  },


  computed: {

    ForceRe () {
      return this.$store.state.forceRdeLost
    },
    
  },

};


</script>












<style scoped>

.TheBoxBody{
    height: 60vh;
    overflow-y: hidden;
}

.ForTravelDeclaration{
  background: white;
  text-align: center;
  border-radius: 10px;
}

.MaintTitle{
  background:  var(--main-important-color);
  line-height: 40px;
  text-align: center;
  font-weight: bold;
  color: white;
  font-size: 17px;
  margin-top: 0;
}

.ForTravelDeclaration > div:nth-child(2){
  /* border-bottom: solid 0.5px var(--font-color); */
  margin: 0 45px;
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


.liste{
  height: 100%;
  overflow-y: auto;
}









@media (min-width: 960px){
  .col-md-4 {
    padding-bottom: 30px !important; 
    padding-top: 10px !important;
}
}


</style>