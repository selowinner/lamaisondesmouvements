<template>
  <div class="wrapper">
    <div class="bodyBox"></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "MinoUnchangable",
  components: {
    // HelloWorld
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}

.bodyBox {
  height: 100vh;
  width: 85vw;
  margin-left: 230px;
  background: var(--main-white-color);
}

.header1 {
  height: 8vh;
  margin-bottom: 17vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  box-shadow: -1px 10px 23px -1px rgb(206 204 204 / 50%);
}
.header1 > img {
  height: 25px;
  width: 25px;
  margin-left: 20px;
}
.profilImg1 {
  height: 35px;
  width: 35px;
  border-radius: 100px;
  border: solid 3px var(--main-green-color);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
.profilImg1 > img {
  height: 97%;
  width: 97%;
  border-radius: 100px;
}

.header2 {
  width: 100%;
  width: 85vw;
  margin-left: 230px;
  position: fixed;
  top: -250px;
  left: 0;
  /* background: red; */
  display: flex;
  justify-content: center;
}

.Header2logoBox {
  height: 400px;
  /* margin-top: -30vh; */
  width: 400px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-radius: 100%;
  box-shadow: -1px 10px 23px -1px rgb(206 204 204 / 50%);
}
.Header2logoBox img {
  height: 80px;
  margin-bottom: 30px;
}

.TheBoxBody {
  padding: 0px 7vw;
  width: 71vw;
  height: 60vh;
}

.sectionTitle {
  margin: 0;
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: bold;
}
.title2 {
  margin-top: 60px;
}

.sectionAccesRapide {
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 50px; */
}
.RBox {
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

.SBox {
  height: 200px;
  width: 310px;
  border-radius: 7px;
  display: flex;
  align-items: flex-end;
}
.SBox > p {
  font-size: 21px;
  font-weight: bold;
  margin-left: 10px;
  color: white;
}
.SBox1 {
  background: linear-gradient(
      180deg,
      rgb(0 0 0 / 0%),
      rgb(0 0 0 / 0%),
      rgb(0 0 0)
    ),
    url(../assets/img/traffic-vehicle-urban-reflections-city.jpg);
  background-position: center;
  background-size: cover;
}
.SBox2 {
  background: linear-gradient(
      180deg,
      rgb(0 0 0 / 0%),
      rgb(0 0 0 / 0%),
      rgb(0 0 0)
    ),
    url(../assets/img/pexels-veerasak-piyawatanakul-1170187.jpg);
  background-position: center;
  background-size: cover;
}
.SBox3 {
  background: linear-gradient(
      180deg,
      rgb(0 0 0 / 0%),
      rgb(0 0 0 / 0%),
      rgb(0 0 0)
    ),
    url(../assets/img/an-army-of-robots-efficiently-sorting-hundreds-of-parcels-per-hour-automated-guided-vehicle-agv.jpg);
  background-position: center;
  background-size: cover;
}

.bottonNavBar {
  background: var(--main-white-color);
  width: 100%;
  height: 15vh;
  margin: 0px 7vw;
  width: 71vw;
  position: fixed;
  top: 84.6vh;
  display: flex;
  align-items: center;
  border-radius: 10px 10px 0px 0px;
  box-shadow: -1px -10px 23px -1px rgb(206 204 204 / 50%);
}

.navBox {
  border-right: solid 1px var(--Important-font-color);
  height: 60%;
  width: 180.5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.navBox > img {
  height: 30px;
  width: 30px;
  margin-bottom: 3px;
}
.navBox > p {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
  color: var(--main-green-color);
  text-align: center;
}

.activenavBox {
  /* border-radius: 10px 0 0 0; */
  background: white;
  border-right: dashed 0px;
  height: 100%;
  box-shadow: 2px 6px 20px -1px rgb(206 204 204 / 90%);
}

.activenavBox > p {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
  color: var(--Important-font-color);
}

.activenavBox::before {
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

.menuBox {
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
.menuTitle {
  height: 60px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  border-bottom: solid 1px var(--font-color);
}
.menuBox div:last-child {
  margin-top: 10px;
  margin-bottom: 20px;
  width: 80%;
}
.tab1 {
  display: flex;
  align-items: center;
  height: 20px;
  font-size: 13px;
  margin: 0px;
}
.tab1 > img {
  height: 10px;
  margin-right: 10px;
}
</style>
