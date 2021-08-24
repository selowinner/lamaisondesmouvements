import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "md",
  },

  theme: {
    themes: {
      light: {
        primary: "#3e886d",
        secondary: "#b0bec5",
        accent: "#f9f9f9",
        error: "#b71c1c",
        essaie: "#4c5d70",

        /* Background-color */
        PricipalBackgroundLight: "#f1f3fb",
        otherFont: "#b6bbc2",

        /* Important-color */
        Importantcolor: "#613dea",

        /* Font color */
        Titlecolor: "#374b6b",
        DefaultFontColor: "#939eaf",

        /* Other Color */
        mainGreenColor: "#3e886d",
        mainWhiteColor: "#f9f9f9",
        MinoWhite: "#fffff",
      },
    },
  },
});
