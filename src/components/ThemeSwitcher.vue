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
    </select>

    <label for="bg-image">Background Image URL: </label>
    <input id="bg-image" type="text" v-model="bgImageUrl" />
    <button @click="changeBackgroundImage">Set Background</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTheme: "existing",
      bgImageUrl: "",
    };
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
        document.documentElement.style.setProperty("--input-bg-color", ""); // Reset input background color
      };

      // Call the reset function before setting the new variables
      resetVariables();

      if (this.selectedTheme === "light") {
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
        document.documentElement.style.setProperty(
          "--input-bg-color",
          "#ffffff"
        ); // Light background color for inputs and select
      } else if (this.selectedTheme === "solarizedDark") {
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
        document.documentElement.style.setProperty(
          "--input-bg-color",
          "#073642"
        ); // Dark background color for inputs and select
      } else if (this.selectedTheme === "oceanBlue") {
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
        document.documentElement.style.setProperty(
          "--input-bg-color",
          "#1b262c"
        ); // Ocean Blue background color for inputs and select
      } else {
        document.documentElement.style.setProperty("--bg-color", "#3f4455");
        document.documentElement.style.setProperty("--text-color", "#ffffff");
        document.documentElement.style.setProperty(
          "--component-bg-color",
          "#292c37"
        );
        document.documentElement.style.setProperty("--border-color", "#282b36");
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
          "--input-bg-color",
          "#292c37"
        ); // Default background color for inputs and select
      }

      localStorage.setItem("selectedTheme", this.selectedTheme);
    },

    changeBackgroundImage() {
      document.documentElement.style.setProperty(
        "--bg-image",
        `url(${this.bgImageUrl})`
      );
      localStorage.setItem("bgImageUrl", this.bgImageUrl);
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
</style>
