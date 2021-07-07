<template>

    <div class="bodyBox">
        <div class="TheBoxBody">
            <p class="sectionTitle">Accès rapides</p>
            <div class="sectionAccesRapide">
                <div class="RBox">DECLARATION DE VOYAGES</div>
                <div class="RBox">BILAN DU DERNIER VOYAGE</div>
                <div class="RBox">LISTE DES REMBOURSEMENTS</div>
            </div>

            <p class="sectionTitle title2">Les services</p>
            <div class="sectionAccesRapide">
                <div class="SBox SBox1">
                    <p>GESTION DES TICKETS</p>
                </div>
                <div class="SBox SBox2">
                    <p>GESTION DES OBJETS EGARES</p>
                </div>
                <div class="SBox SBox3">
                    <p>GESTION DES COLIS</p>
                </div>
            </div>
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

.sectionTitle{
    margin: 0;
    margin-bottom: 5px;
    margin-top: 50px;
    font-size: 20px;
    font-weight: bold;
}
.title2{
    margin-top: 60px;
}

.sectionAccesRapide{
    width: 100%;
    display: flex;
    justify-content: space-between;
    /* margin-bottom: 50px; */
}
.RBox{
    margin-top: 5px;
    height: 80px;
    width: 290px;
    font-size: 17px;
    border-radius: 7px;
    border-left: solid 10px var(--main-green-color);
    background: white;
    text-align: center;
    line-height: 85px;
    font-weight: bold;
    box-shadow: 2px 6px 20px -1px rgb(206 204 204 / 50%);

}

.SBox{
    height: 200px;
    width: 310px;
    border-radius: 7px;
    display: flex;
    align-items: flex-end;
}
.SBox > p{
    font-size: 21px;
    font-weight: bold;
    margin-left: 10px;
    color: white;
}
.SBox1{
    background: linear-gradient(180deg, rgb(0 0 0 / 0%),rgb(0 0 0 / 0%), rgb(0 0 0)), url(../assets/img/traffic-vehicle-urban-reflections-city.jpg);
    background-position: center;
    background-size: cover;
}
.SBox2{
    background: linear-gradient(180deg, rgb(0 0 0 / 0%),rgb(0 0 0 / 0%), rgb(0 0 0)), url(../assets/img/pexels-veerasak-piyawatanakul-1170187.jpg);
    background-position: center;
    background-size: cover;
}
.SBox3{
    background: linear-gradient(180deg, rgb(0 0 0 / 0%),rgb(0 0 0 / 0%), rgb(0 0 0)), url(../assets/img/an-army-of-robots-efficiently-sorting-hundreds-of-parcels-per-hour-automated-guided-vehicle-agv.jpg);
    background-position: center;
    background-size: cover;
}


</style>