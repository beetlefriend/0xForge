import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

import 'vuetify/dist/vuetify.css';
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        // background: "#FFFFFF",
        // primary: "#1976D2",
        // secondary: "#424242",
        // accent: "#82B1FF",
        // error: "#FF5252",
        // info: "#2196F3",
        // success: "#4CAF50",
        // warning: "#FFC107"
      },
      light: {
        background: "#d0f0c0"
      }
    }
  },
  icons: {
    iconfont: "mdi",
    values: {
      product: "mdi-dropbox",
      support: "mdi-lifebuoy",
      steam: "mdi-steam-box",
      pc: "mdi-desktop-classic",
      xbox: "mdi-xbox",
      playstation: "mdi-playstation",
      switch: "mdi-nintendo-switch"
    }
  }
});

