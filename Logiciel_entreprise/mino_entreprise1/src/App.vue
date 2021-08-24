<template>
  <v-app>
    <div v-if="$route.meta.plainLayout">
      <router-view></router-view>
    </div>
    <div v-if="!$route.meta.plainLayout">
      <MinoProfilBar></MinoProfilBar>
      <MinoTopBar></MinoTopBar>
      <v-main>
        <router-view></router-view>
      </v-main>
      <MinoBottonNavBar></MinoBottonNavBar>
    </div>
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
