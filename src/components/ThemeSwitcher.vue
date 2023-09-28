<template>
  <div class="theme-switcher">
    <label for="theme-select">Select Theme: </label>
    <select
      id="theme-select"
      v-model="selectedTheme"
      @change="changeTheme"
      class="theme-select"
    >
      <option value="existing">Default</option>
      <option value="light">Light Mode</option>
      <option value="solarizedDark">Solarized Dark</option>
      <option value="oceanBlue">Ocean Blue</option>
      <option value="warm">Warm</option>
      <option value="cyberpunk">Cyberpunk</option>
      <!-- <option value="darkRed"></option> -->
    </select>

    <label for="bg-image">Background Image URL: </label>
    {{
      useGradientBackground
        ? "Disable gradient background to use image url"
        : ""
    }}
    <input
      :disabled="useGradientBackground ? true : false"
      id="bg-image"
      type="text"
      v-model="bgImageUrl"
    />
    <button @click="changeBackgroundImage">Set Background</button>

    <label>
      <input
        type="checkbox"
        v-model="useGradientBackground"
        @change="applyBackground"
      />
      Use Gradient Background
    </label>
    <label>
      <input
        :disabled="useGradientBackground ? false : true"
        type="checkbox"
        v-model="useAnimatedBackground"
        @change="applyBackground"
      />
      Animated
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTheme: localStorage.getItem("selectedTheme") || "existing",
      bgImageUrl: localStorage.getItem("bgImageUrl") || "",
      useGradientBackground:
        JSON.parse(localStorage.getItem("useGradientBackground")) || false,
      useAnimatedBackground:
        JSON.parse(localStorage.getItem("useGradientAnimation")) || false,
      gradients: {
        light: "linear-gradient(45deg, #f5f5f5 25%, #e0e0e0 50%, #f5f5f5 75%)",
        cyberpunk:
          "linear-gradient(45deg, #ff206e 25%, #8833ff 50%, #ff206e 75%)",
        solarizedDark:
          "linear-gradient(45deg, #002b36 25%, #073642 50%, #002b36 75%)",
        oceanBlue:
          "linear-gradient(45deg, #0077be 25%, #33a8ff 50%, #0077be 75%)",
        warm: "linear-gradient(45deg, #ff5733 25%, #ff914d 50%, #ff5733 75%)",
        default:
          "linear-gradient(45deg, #8f8f8f 25%, #bfbfbf 50%, #8f8f8f 75%)",
      },
    };
  },
  mounted() {
    this.changeTheme();
    if (this.bgImageUrl) {
      this.changeBackgroundImage();
    }
  },
  methods: {
    changeTheme() {
      // Define a function to reset all variables to their default values
      const resetVariables = () => {
        document.documentElement.style.setProperty("--bg-color", "");
        document.documentElement.style.setProperty("--text-color", "");
        document.documentElement.style.setProperty("--component-bg-color", "");
        document.documentElement.style.setProperty("--border-color", "");
        document.documentElement.style.setProperty("--box-shadow", "");
        document.documentElement.style.setProperty("--title-bg-color", "");
        document.documentElement.style.setProperty("--button-bg-color", "");
        document.documentElement.style.setProperty("--content-bg-color", "");
        document.documentElement.style.setProperty(
          "--focused-border-color",
          ""
        );
        document.documentElement.style.setProperty(
          "--menu-item-hover-bg-color",
          ""
        );
        document.documentElement.style.setProperty("--submenu-bg-color", "");
        document.documentElement.style.setProperty(
          "--taskbar-logo-hover-bg-color",
          ""
        );
      };

      // Define a function to set input field styles
      const setInputFieldStyles = (borderColor, backgroundColor, textColor) => {
        document.documentElement.style.setProperty(
          "--input-border-color",
          borderColor
        );
        document.documentElement.style.setProperty(
          "--input-bg-color",
          backgroundColor
        );
        document.documentElement.style.setProperty(
          "--input-text-color",
          textColor
        );
      };

      // Call the reset function before setting the new variables
      resetVariables();

      if (this.selectedTheme === "light") {
        document.documentElement.style.setProperty(
          "--button-hover-bg-color",
          "#d3d3d3"
        ); // Light gray for light theme
        document.documentElement.style.setProperty("--bg-color", "#f0f0f0");
        document.documentElement.style.setProperty("--text-color", "#000");
        document.documentElement.style.setProperty(
          "--component-bg-color",
          "#ffffff"
        );
        document.documentElement.style.setProperty("--border-color", "#ccc");
        document.documentElement.style.setProperty(
          "--box-shadow",
          "0 0 5px rgba(0, 0, 0, 0.1)"
        );
        document.documentElement.style.setProperty(
          "--title-bg-color",
          "#e0e0e0"
        );
        document.documentElement.style.setProperty(
          "--button-bg-color",
          "#f0f0f0"
        );
        document.documentElement.style.setProperty(
          "--content-bg-color",
          "#ffffff"
        );
        document.documentElement.style.setProperty(
          "--focused-border-color",
          "#b0b0b0"
        );
        document.documentElement.style.setProperty(
          "--menu-item-hover-bg-color",
          "#d0d0d0"
        );
        document.documentElement.style.setProperty(
          "--submenu-bg-color",
          "#e0e0e0"
        );
        document.documentElement.style.setProperty(
          "--taskbar-logo-hover-bg-color",
          "#e0e0e0"
        );
        setInputFieldStyles("#ccc", "#ffffff", "#000");
      } else if (this.selectedTheme === "darkRed") {
        // Theme: Dark Red
        document.documentElement.style.setProperty(
          "--button-hover-bg-color",
          "#8b0000"
        );
        document.documentElement.style.setProperty("--bg-color", "#330000");
        document.documentElement.style.setProperty("--text-color", "#ff4040");
        document.documentElement.style.setProperty(
          "--component-bg-color",
          "#550000"
        );
        document.documentElement.style.setProperty("--border-color", "#660000");
        document.documentElement.style.setProperty(
          "--box-shadow",
          "0 0 5px rgba(102, 0, 0, 0.5)"
        );
        document.documentElement.style.setProperty(
          "--title-bg-color",
          "#8b0000"
        );
        document.documentElement.style.setProperty(
          "--button-bg-color",
          "#aa0000"
        );
        document.documentElement.style.setProperty(
          "--content-bg-color",
          "#440000"
        );
        document.documentElement.style.setProperty(
          "--focused-border-color",
          "#ff4040"
        );
        document.documentElement.style.setProperty(
          "--menu-item-hover-bg-color",
          "#ff0000"
        );
        document.documentElement.style.setProperty(
          "--submenu-bg-color",
          "#440000"
        );
        document.documentElement.style.setProperty(
          "--taskbar-logo-hover-bg-color",
          "#ff4040"
        );
        setInputFieldStyles("#660000", "#440000", "#ff4040");
      } else if (this.selectedTheme === "cyberpunk") {
        document.documentElement.style.setProperty(
          "--button-hover-bg-color",
          "#ff206e"
        ); // Hot Pink for hover effect on buttons
        document.documentElement.style.setProperty("--bg-color", "#0b0033"); // Very dark purple for background
        document.documentElement.style.setProperty("--text-color", "#00ff41"); // Bright green for text
        document.documentElement.style.setProperty(
          "--component-bg-color",
          "#190061"
        ); // Dark purple for component background
        document.documentElement.style.setProperty("--border-color", "#800080"); // Purple for borders
        document.documentElement.style.setProperty(
          "--box-shadow",
          "0 0 5px rgba(128, 0, 128, 0.5)"
        ); // Box shadow with a purple hue
        document.documentElement.style.setProperty(
          "--title-bg-color",
          "#330086"
        ); // Darker purple for title background
        document.documentElement.style.setProperty(
          "--button-bg-color",
          "#bb00bb"
        ); // Purple for buttons
        document.documentElement.style.setProperty(
          "--content-bg-color",
          "#120033"
        ); // Slightly lighter purple for content background
        document.documentElement.style.setProperty(
          "--focused-border-color",
          "#ff00ff"
        ); // Bright pink for focused border color
        document.documentElement.style.setProperty(
          "--menu-item-hover-bg-color",
          "#ff206e"
        ); // Hot Pink for menu item hover background color
        document.documentElement.style.setProperty(
          "--submenu-bg-color",
          "#240066"
        ); // Dark purple for submenu background color
        document.documentElement.style.setProperty(
          "--taskbar-logo-hover-bg-color",
          "#ff00ff"
        ); // Bright pink for taskbar logo hover background color

        // Set input field styles with a coherent color scheme
        setInputFieldStyles("#800080", "#240066", "#00ff41");
      } else if (this.selectedTheme === "solarizedDark") {
        document.documentElement.style.setProperty(
          "--button-hover-bg-color",
          "#586e75"
        ); // A shade darker for solarized dark
        document.documentElement.style.setProperty("--bg-color", "#002b36");
        document.documentElement.style.setProperty("--text-color", "#f2ffb3");
        document.documentElement.style.setProperty(
          "--component-bg-color",
          "#073642"
        );
        document.documentElement.style.setProperty("--border-color", "#586e75");
        document.documentElement.style.setProperty(
          "--box-shadow",
          "0 0 5px rgba(0, 43, 54, 0.5)"
        );
        document.documentElement.style.setProperty(
          "--title-bg-color",
          "#586e75"
        );
        document.documentElement.style.setProperty(
          "--button-bg-color",
          "#052229"
        );
        document.documentElement.style.setProperty(
          "--content-bg-color",
          "#002b36"
        );
        document.documentElement.style.setProperty(
          "--focused-border-color",
          "#268bd2"
        );
        document.documentElement.style.setProperty(
          "--taskbar-bg-color",
          "#073642"
        );
        document.documentElement.style.setProperty(
          "--menu-item-hover-bg-color",
          "#586e75"
        );
        document.documentElement.style.setProperty(
          "--submenu-bg-color",
          "#002b36"
        );
        document.documentElement.style.setProperty(
          "--start-button-hover-bg-color",
          "#586e75"
        );
        document.documentElement.style.setProperty(
          "--taskbar-logo-hover-bg-color",
          "#586e75"
        );
        setInputFieldStyles("#586e75", "#073642", "#f2ffb3");
      } else if (this.selectedTheme === "oceanBlue") {
        document.documentElement.style.setProperty(
          "--button-hover-bg-color",
          "#005f73"
        ); // A shade darker for ocean blue
        document.documentElement.style.setProperty("--bg-color", "#1b262c");
        document.documentElement.style.setProperty("--text-color", "#bbe1fa");
        document.documentElement.style.setProperty(
          "--component-bg-color",
          "#1b262c"
        );
        document.documentElement.style.setProperty("--border-color", "#0f4c75");
        document.documentElement.style.setProperty(
          "--box-shadow",
          "0 0 5px rgba(0, 78, 117, 0.5)"
        );
        document.documentElement.style.setProperty(
          "--title-bg-color",
          "#0f4c75"
        );
        document.documentElement.style.setProperty(
          "--button-bg-color",
          "#3282b8"
        );
        document.documentElement.style.setProperty(
          "--content-bg-color",
          "#1b262c"
        );
        document.documentElement.style.setProperty(
          "--focused-border-color",
          "#bbe1fa"
        );
        document.documentElement.style.setProperty(
          "--menu-item-hover-bg-color",
          "#0f4c75"
        );
        document.documentElement.style.setProperty(
          "--submenu-bg-color",
          "#1b262c"
        );
        document.documentElement.style.setProperty(
          "--taskbar-logo-hover-bg-color",
          "#0f4c75"
        );
        setInputFieldStyles("#0f4c75", "#1b262c", "#bbe1fa");
      } else if (this.selectedTheme === "warm") {
        document.documentElement.style.setProperty(
          "--button-hover-bg-color",
          "#fca45d"
        ); // A shade darker for warm theme
        document.documentElement.style.setProperty("--bg-color", "#ffeadb");
        document.documentElement.style.setProperty("--text-color", "#5a4238");
        document.documentElement.style.setProperty(
          "--component-bg-color",
          "#fddbb1"
        );
        document.documentElement.style.setProperty("--border-color", "#fcb07e");
        document.documentElement.style.setProperty(
          "--box-shadow",
          "0 0 5px rgba(250, 148, 90, 0.5)"
        );
        document.documentElement.style.setProperty(
          "--title-bg-color",
          "#fcb07e"
        );
        document.documentElement.style.setProperty(
          "--button-bg-color",
          "#fcb07e"
        );
        document.documentElement.style.setProperty(
          "--content-bg-color",
          "#ffeadb"
        );
        document.documentElement.style.setProperty(
          "--focused-border-color",
          "#fca45d"
        );
        document.documentElement.style.setProperty(
          "--menu-item-hover-bg-color",
          "#fca45d"
        );
        document.documentElement.style.setProperty(
          "--submenu-bg-color",
          "#fddbb1"
        );
        document.documentElement.style.setProperty(
          "--taskbar-logo-hover-bg-color",
          "#fca45d"
        );
        document.documentElement.style.setProperty(
          "--input-bg-color",
          "#fddbb1"
        );
        document.documentElement.style.setProperty(
          "--input-text-color",
          "#5a4238"
        );
        document.documentElement.style.setProperty(
          "--input-border-color",
          "#fca45d"
        );
      } else {
        document.documentElement.style.setProperty("--bg-color", "#3f4455");
        document.documentElement.style.setProperty("--text-color", "#ffffff");
        document.documentElement.style.setProperty(
          "--component-bg-color",
          "#292c37"
        );
        document.documentElement.style.setProperty("--border-color", "#4f5565"); // Adjusted color
        document.documentElement.style.setProperty(
          "--box-shadow",
          "0 0 5px rgba(167, 167, 167, 0.2)"
        );
        document.documentElement.style.setProperty(
          "--title-bg-color",
          "#282b36"
        );
        document.documentElement.style.setProperty(
          "--button-bg-color",
          "#3f4455"
        );
        document.documentElement.style.setProperty(
          "--content-bg-color",
          "#3f4455"
        );
        document.documentElement.style.setProperty(
          "--focused-border-color",
          "rgb(146, 146, 146)"
        );
        document.documentElement.style.setProperty(
          "--menu-item-hover-bg-color",
          "#3f4455"
        );
        document.documentElement.style.setProperty(
          "--submenu-bg-color",
          "#292c37"
        );
        document.documentElement.style.setProperty(
          "--taskbar-logo-hover-bg-color",
          "#4f5565"
        );
        document.documentElement.style.setProperty(
          "--button-hover-bg-color",
          "#4f5565"
        ); // A shade darker for warm theme
        setInputFieldStyles("#4f5565", "#292c37", "#ffffff"); // Adjusted color
      }
      localStorage.setItem("selectedTheme", this.selectedTheme);

      localStorage.setItem("selectedTheme", this.selectedTheme);

      this.applyBackground();
    },

    changeBackgroundImage() {
      if (this.bgImageUrl == "") {
        this.bgImageUrl = "https://i.imgur.com/U0EJEUa.jpeg";
      }
      document.documentElement.style.setProperty(
        "--bg-image",
        `url(${this.bgImageUrl})`
      );
      localStorage.setItem("bgImageUrl", this.bgImageUrl);

      this.applyBackground(); // update this part to call applyBackground
    },
    injectKeyframes() {
      let styleSheet = document.styleSheets[0];
      let keyframes = `
   @keyframes gradientAnimation {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
     }`;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    },

    applyBackground() {
      const appElement = document.querySelector("#appContainer");

      if (this.useGradientBackground) {
        let gradientBackground = "";
        if (this.selectedTheme === "light") {
          gradientBackground = this.gradients.light;
        } else if (this.selectedTheme === "cyberpunk") {
          gradientBackground = this.gradients.cyberpunk;
        } else if (this.selectedTheme === "solarizedDark") {
          gradientBackground = this.gradients.solarizedDark;
        } else if (this.selectedTheme === "oceanBlue") {
          gradientBackground = this.gradients.oceanBlue;
        } else if (this.selectedTheme === "warm") {
          gradientBackground = this.gradients.warm;
        } else {
          gradientBackground = this.gradients.default;
        }

        appElement.style.backgroundImage = gradientBackground;

        if (this.useAnimatedBackground) {
          this.injectKeyframes();
          appElement.style.backgroundSize = "200% 200%";
          appElement.style.animation = "gradientAnimation 50s ease infinite";
        } else {
          appElement.style.animation = "";
        }
      } else {
        appElement.style.backgroundImage =
          'var(--bg-image, url("https://i.imgur.com/U0EJEUa.jpeg"))';
        appElement.style.backgroundSize = "";
        let bgImageUrl = this.bgImageUrl;
        if (bgImageUrl != "") {
          document.documentElement.style.setProperty(
            "--bg-image",
            `url(${bgImageUrl})`
          );
        } else {
          console.log("No background image");

          // document.documentElement.style.removeProperty("--bg-image");
        }

        appElement.style.animation = "";
      }
      localStorage.setItem(
        "useGradientBackground",
        JSON.stringify(this.useGradientBackground)
      );
      localStorage.setItem(
        "useGradientAnimation",
        JSON.stringify(this.useAnimatedBackground)
      );
    },
  },
};
</script>

<style>
.theme-switcher {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.theme-select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid var(--border-color, #292c37);
  background-color: var(--component-bg-color, #292c37);
}

.bg-image-input {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid var(--border-color, #292c37);
  background-color: var(--component-bg-color, #292c37);
  color: var(--text-color, #000);
}

.theme-switcher button {
  padding: 5px 10px;
  border: 1px solid var(--border-color, #586e75);
  border-radius: 5px;
  background-color: var(--button-bg-color, #292c37);
  color: var(--text-color, #ffffff);
  cursor: pointer;
  outline: none;
}

.theme-switcher button:hover {
  background-color: var(--button-hover-bg-color, #3f4455);
}

.theme-switcher input[type="text"] {
  padding: 5px;
  border: 1px solid var(--border-color, #292c37);
  border-radius: 5px;
  background-color: var(--component-bg-color, #292c37);
  color: var(--text-color, #ffffff);
  outline: none;
}

.theme-switcher input[type="text"]:focus {
  border-color: var(--focused-border-color, #586e75);
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
