<template>
  <div>
    <div class="header2">
      <router-link :to="{ name: 'Dashboard' }">
        <div class="Header2logoBox">
          <img src="@/assets/icone/2-MinoA.png" alt="" srcset="" />
        </div>
      </router-link>
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
.header2 {
  width: 100%;
  width: 85vw;
  z-index: 1;
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
  background: var(--profilNaV-black);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-radius: 100%;
  box-shadow: -1px 10px 23px -1px rgb(16 16 16);
}
.Header2logoBox img {
  height: 80px;
  margin-bottom: 30px;
}
</style>
