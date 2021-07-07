<template>

 

    <div class="bottonNavBar">
        <router-link :to="{name: 'Dashboard'}">
            <div class="navBox" style="border-radius: 10px 0 0 0;"  v-on:click= "isActive = false">
                <img src="@/assets/icone/dashboardB.png" alt="" srcset="">
                <p>Dashboard</p>
            </div>
        </router-link>
        <!-- v-on:click= "isActive = !isActive" :class="{naVBox2Active: isActive}" -->
        <div class="navBox" v-on:click= "activeMenu" :class="{naVBox2Active: isActive}">
            <img src="@/assets/icone/ticketsB.png" alt="" srcset="">
            <p>Gestion des tickets</p>
            <div class="menuBox" v-if="poulet">
                <div class="menuTitle">
                    GESTIONNAIRE DES TICKETS
                    <img src="@/assets/icone/close.png" alt="" srcset=""  v-on:click.stop= "poulet = false">
                </div>
                <div v-on:click.stop= "poulet = false">
                    <router-link :to="{name: 'TravelDeclaration'}">
                    <div class="tab1">
                        <img src="@/assets/icone/right-arrowB.png" alt="" srcset="">
                        <p>DECLARATION DE VOYAGE</p>
                    </div>
                    </router-link>
                    <router-link :to="{name: 'TravelBalanceSheet'}">
                    <div class="tab1">
                        <img src="@/assets/icone/right-arrowB.png" alt="" srcset="">
                        <p>BILAN DES VOYAGES</p>
                    </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="navBox" v-on:click= "isActive = false">
            <img src="@/assets/icone/targetB.png" alt="" srcset="">
            <p>Gestion des objets <br> égarés</p>
        </div>
        <div class="navBox">
            <img src="@/assets/icone/colisB.png" alt="" srcset="">
            <p>Gestion des colis</p>
        </div>
        <div class="navBox">
            <img src="@/assets/icone/settingsB.png" alt="" srcset="">
            <p>Paramètre</p>
        </div>
        <div class="navBox" style="border: none;">
            <img src="@/assets/icone/logoutA.png" alt="" srcset="">
            <p style="color: #b40808;">Deconnexion</p>
        </div>
    </div>
       
  
  
</template>











<script>
export default {
  name: "MinoBottonNavBar",

  components: {
    
  },

  data: () => ({
    
    isActive: false,
    poulet: true,
    
  }),

  methods: {
    activeMenu: function () {
      this.isActive = true;
      this.poulet = true

    }
  }

};


</script>











<style scoped>


.bottonNavBar{
    background: var(--main-white-color);
    width: 100vw;
    height: 15vh;
    width: 71vw;
    position: fixed;
    top: 84.9vh;
    left: 20.5vw;
    display: flex;
    align-items: center;
    border-radius: 10px 10px 0px 0px;
    box-shadow: -1px -10px 23px -1px rgb(206 204 204 / 50%);

}

.navBox{
    border-right: solid 1px var(--Important-font-color);
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
    color: var(--main-green-color);
    text-align: center;
}

.navBox:hover{
    background: white;
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
    background: white;
    position: absolute;
    z-index: 1;
    top: -10px;
    transform: rotate(45deg);
    /* box-shadow: 2px 6px 20px -1px rgb(206 204 204 / 90%); */

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





.naVBox2Active{
    background: white;
    border-right: dashed 0px;
    height: 15vh;
    box-shadow: 2px 6px 20px -1px rgb(206 204 204 / 90%);
}
.naVBox2Active > p{
     margin: 0;
    font-size: 14px;
    font-weight: bold;
    color: var(--Important-font-color);
}
.naVBox2Active::before{
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

.naVBox2Active .menuBox{
    position: absolute;
    top: -190px;
    height: 160px;
    width: 370px;
    border-radius: 10px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 2px 6px 20px -1px rgb(206 204 204 / 90%);

}
.naVBox2Active .menuTitle{
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
.naVBox2Active .menuTitle > img{
    height: 15px;
    width: 15px;
    position: relative;
    left: 27px;
    top: -18px;
}


.naVBox2Active .menuBox div:last-child{
    margin-top: 10px;
    margin-bottom: 20px;
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




.router-link-exact-active > .tab1 #poulet{
    background: red;
}



</style>