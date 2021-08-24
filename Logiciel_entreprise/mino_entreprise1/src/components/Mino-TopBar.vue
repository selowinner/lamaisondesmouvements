<template>
  <div>
    <!-- <div class="header1">
            <img src="@/assets/icone/searchB.png" alt="" srcset="">
        </div> -->

    <div class="header2">
      <div class="Header2logoBox">
        <img src="@/assets/icone/2-MinoA.png" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MinoTopBar",
  components: {},
};
</script>

<style scoped>
.header1 {
  height: 8vh;
  margin-bottom: 12vh;
  width: 87%;
  margin-left: 230px;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
  background: white;
  box-shadow: -1px 10px 23px -1px rgb(206 204 204 / 50%);
}
.header1 > img {
  height: 25px;
  width: 25px;
  margin-right: 50px;
}

.header2 {
  width: 100%;
  width: 85vw;
  margin-left: 230px;
  position: fixed;
  top: -270px;
  left: 0;
  /* background: red; */
  display: flex;
  justify-content: center;
  z-index: 99;
}

.Header2logoBox {
  height: 400px;
  /* margin-top: -30vh; */
  width: 450px;
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
</style>
