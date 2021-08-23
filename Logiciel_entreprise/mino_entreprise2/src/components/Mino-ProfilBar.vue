<template>

    <div class="profilInformationBox">
        <div class="profilBox">
            <div class="profilImg">
                <img src="@/assets/img/team2.jpg" alt="" srcset="">
            </div>
            <p>{{uUser}}</p>
            <p>Administrateur mino de la Compagnie</p>
            <p v-on:click.prevent="logOut">Deconnexion</p>
            <div class="settingdiv">
                <v-icon>mdi-cog</v-icon>
            </div>
        </div>
        <!-- <router-link :to="{name: ''}"> -->
        <div class="timeBox">
            <div>35</div>
            <v-icon color="mainGreenColor" x-large class="messgaeicon">mdi-email-outline</v-icon>
            <p>messagerie</p>
        </div>
        <!-- </router-link> -->
        <div class="footerBox">
            <div class="locationBox">
                <div><img src="@/assets/icone/localisationA.png" alt="" srcset=""></div>
                <div>
                    <P>LOCALISATION</P>
                    <P>Abidjan, Adjamé</P>
                </div>
            </div>
            <div class="locationBox">
                <div><img src="@/assets/icone/questionA.png" alt="" srcset=""></div>
                <div>
                    <P>MANUEL D'UTILISATION</P>
                    <P>cliquez ici pour plus de détails</P>
                </div>
            </div>
        </div>
    </div>
  
  
</template>











<script>
// import { mapGetters } from "vuex";
export default {
  name: "MinoProfilBar",
  components: {
    
  },

  data: () => ({
    
    uUser : ''

    
  }),


   methods: {

    logOut(){
        this.$store.dispatch('auth_logout').then(() => {
            this.$router.push('/login')
        })
    },


  },



  computed:{
    // ...mapGetters([
    //   'TheUser',
    // ])
    // userInfo(){
    //     let UserInfo = localStorage.getItem('user-info')
    //     return UserInfo
    // },
     
  },



  created(){
    this.uUser = localStorage.getItem('user-info')
  }


};


</script>











<style scoped>



.profilInformationBox{
    height: 100vh;
    width: 230px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    background-color: var(--main-important-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 10px 0px 23px -1px rgb(206 204 204 / 50%);

}

.profilBox{
    height: 32vh;
    width: 100%;
    display: flex;
    background: var(--main-very-important-color);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: solid 2px var(--main-white-color);
}
.profilImg{
    height: 105px;
    width: 105px;
    border-radius: 100px;
    border: solid 3px var(--main-green-color) ;
    display: flex;
    justify-content: center;
    align-items: center;
}
.profilImg > img{
    height: 97%;
    width: 97%;
    border-radius: 100px;
}
.profilBox p:nth-child(2){
    text-transform: uppercase;
    font-size: 20px;
    font-weight: bold;
    color: white;
}
.profilBox p:nth-child(3){
    font-size: 13px;
    margin-top: -15px;
    color: white;
}
.profilBox p:nth-child(4){
    /* font-size: 13px; */
    margin-top: -5px;
    padding: 8px;
    border-radius: 5px;
    color: white;
    background: var(--main-green-color);
    cursor: pointer;
}
.settingdiv{
    position: absolute;
    top: 95px;
    left: 130px;
    height: 30px;
    width: 30px;
    border: solid 3px var(--main-green-color);
    border-radius: 100px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
}





.timeBox{
    height: 260px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* cursor: pointer; */
}
.timeBox div:nth-child(1){
    position: relative;
    top: 25px;
    left: 25px;
    z-index: 10;
    height: 20px;
    width: 20px;
    border-radius: 100px;
    background:#b71c1c;
    font-size: 10px;
    font-weight: bold;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}
.timeBox p:nth-child(3){
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: white;
}
.messgaeicon{
    font-size: 70px !important;
    margin-bottom: -20px;
}





.footerBox{
    width: 100%;
    margin-bottom: 30px;
}
.locationBox{
    display: flex;
    align-items: center;
}
.locationBox div:nth-child(1){
    height: 30px;
    width: 30px;
    margin-left: 7px;
    border-radius: 100px;
    border: solid 1px white;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.locationBox div:nth-child(1) img{
    height: 20px;
    width: 20px;
}
.locationBox div:nth-child(2){
    font-size: 12px;
    line-height: 5px;
    color: var(--main-green-color);
}
.locationBox div:nth-child(2) p:nth-child(1){
    color: white;
}



</style>