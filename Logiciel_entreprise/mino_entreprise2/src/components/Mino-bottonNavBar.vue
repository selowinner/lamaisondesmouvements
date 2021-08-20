<template>

 
    <div class="BigWrapper">
        <div class="bottonNavBar">
            <router-link :to="{name: 'stationRegistring'}">
                <div class="navBox" style="border-radius: 10px 0 0 0;"  v-on:click= "UnactiveMenu">
                    <img src="@/assets/icone/dashboardB.png" alt="" srcset="">
                    <p>Gestion des compagnies</p>
                </div>
            </router-link>
            <!-- v-on:click= "isActive = !isActive" :class="{naVBox2Active: isActive}" -->
            <router-link :to="{name: 'TravelManagement'}">
                <div class="navBox" v-on:click= "UnactiveMenu">
                    <img src="@/assets/icone/ticketsB.png" alt="" srcset="">
                    <p>Bilans des voyages</p>
                </div>
            </router-link>
            <router-link :to="{name: 'ExpeditionManagement'}">
                <div class="navBox" v-on:click= "UnactiveMenu">
                    <img src="@/assets/icone/targetB.png" alt="" srcset="">
                    <p>Bilans des Expeditions</p>
                </div>
            </router-link>
            <router-link :to="{name: 'LostObjetManagement'}">
            <div class="navBox navEnd" v-on:click= "UnactiveMenu">
                <img src="@/assets/icone/colisB.png" alt="" srcset="">
                <p>Bilans des objets<br> égarés</p>
            </div>
            </router-link>
            <router-link :to="{name: 'Analytics'}">
            <div class="navBox navEnd" v-on:click= "UnactiveMenu">
                <img src="@/assets/icone/colisB.png" alt="" srcset="">
                <p>Bilan financier</p>
            </div>
            </router-link>
            
        </div>
    </div>
       
  
  
</template>











<script>
export default {
  name: "MinoBottonNavBar",

  components: {
    
  },

  data: () => ({
    
    // travel menu group
    isActive: false,
    travelMenuClick: true,

    // Expedition menu group
    isActive2: false,
    expeditionMenuClick: true,
    
  }),

  methods: {
    activeMenu: function () {
      this.isActive = true;
      this.isActive2 = false;
      this.travelMenuClick = true
    },
    activeMenu2: function () {
      this.isActive2 = true;
      this.isActive = false;
      this.expeditionMenuClick = true
    },

    UnactiveMenu: function () {
      this.isActive = false;
      this.isActive2 = false;
    }
  },






  created(){
    this.$store.dispatch('init_analitic')
    this.$store.dispatch('init_stations')
  }

};


</script>











<style scoped>

.BigWrapper{
    width: 75vw;
    position: fixed;
    top: 84.9vh;
    margin-left: 300px;
    /* left: 25.5vw; */
    display: flex;
    justify-content: center;
}
.bottonNavBar{
    background: var(--main-very-important-color);
    height: 15vh;
    /* width: 60vw; */
    /* position: fixed;
    top: 84.9vh;
    left: 25.5vw; */
    display: flex;
    align-items: center;
    border-radius: 10px 10px 0px 0px;
    box-shadow: -1px -10px 23px -1px rgb(206 204 204 / 50%);
}

.navBox{
    border-right: solid 1px var(--font-color);
    height: 60%;
    width: 205px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.navBox > img{
    height: 30px;
    width: 30px;
    margin-bottom: 3px;
}
.navBox > p{
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    color: white;
    text-align: center;
}

.navBox:hover{
    background: var(--main-white-color);
    border-right: dashed 0px;
    height: 15vh;
    box-shadow: 2px 6px 20px -1px rgb(206 204 204 / 90%);
}
.navBox:hover > p{
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    color: var(--Important-font-color);
}
.navBox:hover::before{
    content: "";
    height: 20px;
    width: 20px;
    background: var(--main-white-color);
    position: absolute;
    z-index: 1;
    top: -10px;
    transform: rotate(45deg);
    /* box-shadow: 2px 6px 20px -1px rgb(206 204 204 / 90%); */
}
.navEnd{
    border-right: none;

}



.router-link-exact-active > .navBox{
    /* border-radius: 10px 0 0 0; */
    background: white;
    border-right: dashed 0px;
    height: 15vh;
    box-shadow: 2px 6px 20px -1px rgb(206 204 204 / 90%);

}

.router-link-exact-active > .navBox > p{
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    color: var(--Important-font-color);
}

.router-link-exact-active > .navBox::before{
    content: "";
    height: 20px;
    width: 20px;
    background: white;
    position: absolute;
    z-index: 1;
    top: -10px;
    transform: rotate(45deg);
    /* box-shadow: 2px 6px 20px -1px rgb(206 204 204 / 90%); */

}





.naVBox2Active, .naVBox2Active1{
    background: white;
    border-right: dashed 0px;
    height: 15vh;
    box-shadow: 2px 6px 20px -1px rgb(206 204 204 / 90%);
}
.naVBox2Active > p, .naVBox2Active1>p{
     margin: 0;
    font-size: 14px;
    font-weight: bold;
    color: var(--Important-font-color);
}
.naVBox2Active::before, .naVBox2Active1::before{
    content: "";
    height: 20px;
    width: 20px;
    background: white;
    position: absolute;
    z-index: 1;
    top: -10px;
    transform: rotate(45deg);
    /* box-shadow: 2px 6px 20px -1px rgb(206 204 204 / 90%); */
}


.menuBox{
    display: none;
}

.naVBox2Active .menuBox, .naVBox2Active1 .menuBox{
    position: absolute;
    top: -190px;
    /* height: 160px; */
    width: 370px;
    border-radius: 10px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 2px 6px 20px -1px rgb(206 204 204 / 90%);

}
.naVBox2Active .menuTitle, .naVBox2Active1 .menuTitle{
    height: 60px;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 100px;
    font-size: 20px;
    font-weight: bold;
    border-bottom: solid 1px var(--font-color);
}
.naVBox2Active .menuTitle > img, .naVBox2Active1 .menuTitle > img{
    height: 15px;
    width: 15px;
    position: relative;
    left: 27px;
    top: -18px;
}


.naVBox2Active .menuBox div:last-child, .naVBox2Active1 .menuBox div:last-child{
    margin-top: 7px;
    margin-bottom: 7px;
    width: 80%;
}
.tab1{
    display: flex;
    align-items: center;
    height: 20px;
    font-size: 13px;
    margin: 0px;
}
.tab1 > img{
    height: 10px;
    margin-right: 10px;
}


.router-link-exact-active > .tab1 #travelMenuClick{
    background: red;
}






/* For expedition menu */




@media (min-width: 960px) and (max-width: 1264px){
 .navBox{
    width: 150px;
 }
}


</style>