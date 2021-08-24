// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    // iconfont:'md',
  },

  theme: {
    themes: {
      light: {
        primary: "#3e886d",
        secondary: "#b0bec5",
        accent: "#8c9eff",
        error: "#b71c1c",
        essaie: "#374b6b",

        /* Background-color */
        backgroundTree: "#292e32",

        PricipalBackgroundLight: "#f1f3fb",
        otherFont: "#FFFDE7",

        /* Important-color */
        Importantcolor: "#1b1c21",

        /* Font color */
        Titlecolor: "#374b6b",
        DefaultFontColor: "#939eaf",

        /* Other Color */
        mainGreenColor: "#3e886d",
        mainWhiteColor: "#f9f9f9",
        MinoWhite: "#ffffff",
      },
    },
  },
});
