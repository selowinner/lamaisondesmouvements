<template>
  <v-app>
    <MinoProfilBar></MinoProfilBar>
    <MinoTopBar></MinoTopBar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <MinoBottonNavBar></MinoBottonNavBar>
  </v-app>
</template>




<script>

import MinoProfilBar from "@/components/Mino-ProfilBar.vue";
import MinoBottonNavBar from "@/components/Mino-bottonNavBar.vue";
import MinoTopBar from "@/components/Mino-TopBar.vue";



export default {
  name: "App",
  components: {
    MinoProfilBar,
    MinoBottonNavBar,
    MinoTopBar,
  },

  data: () => ({
    //
  }),
};
</script>
