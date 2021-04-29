<template>

    <div class="profilInformationBox">
        <div class="profilBox">
            <div class="profilImg">
                <img src="@/assets/img/team2.jpg" alt="" srcset="">
            </div>
            <p>John Connor</p>
            <p>Loremipsum@gmail.com</p>
        </div>
        <div class="timeBox">
            <p>en ligne il y a</p>
            <p>30 min</p>
        </div>
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
export default {
  name: "MinoProfilBar",
  components: {
    
  },

};


</script>











<style scoped>



.profilInformationBox{
    height: 100vh;
    width: 230px;
    position: fixed;
    top: 0;
    left: 0;
    /* z-index: 50; */
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 10px 0px 23px -1px rgb(206 204 204 / 50%);

}

.profilBox{
    height: 32vh;
    width: 100%;
    display: flex;
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
    color: var(--Important-font-color);
}
.profilBox p:nth-child(3){
    font-size: 13px;
    margin-top: -15px;
    color: var(--font-color);
}




.timeBox{
    height: 260px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.timeBox p:nth-child(1){
    font-size: 13px;
    margin-bottom: -8px;
    color: var(--font-color);
}
.timeBox p:nth-child(2){
    font-size: 30px;
    margin-top: 7px;
    color: var(--Important-font-color);
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
    border: solid 1px var(--font-color);
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
}
.locationBox div:nth-child(2) p:nth-child(1){
    color: var(--font-color);
}



</style>