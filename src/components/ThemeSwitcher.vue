<template>
  <div class="theme-switcher">
    <label for="theme-select">Select Theme: </label>
    <select id="theme-select" v-model="selectedTheme" @change="changeTheme">
      <option value="existing">Default</option>
      <option value="light">Light Mode</option>
      <option value="solarizedDark">solarizedDark</option>
    </select>

    <label for="bg-image">Background Image URL: </label>
    <input
      id="bg-image"
      type="text"
      v-model="bgImageUrl"
      @input="changeBackgroundImage"
    />
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
      if (this.selectedTheme === "light") {
        document.documentElement.style.setProperty("--bg-color", "#f0f0f0");
        document.documentElement.style.setProperty("--text-color", "#000"); // Setting text color to black
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
          "--button-hover-bg-color",
          "#e0e0e0"
        );
        document.documentElement.style.setProperty(
          "--menu-item-hover-bg-color",
          "#e0e0e0"
        ); // Light theme hover color// Light theme hover color
        document.documentElement.style.setProperty(
          "--submenu-bg-color",
          "#ffffff"
        ); // Light theme background color
        document.documentElement.style.setProperty(
          "--menu-item-hover-bg-color",
          "#e0e0e0"
        );
      } else if (this.selectedTheme === "solarizedDark") {
        document.documentElement.style.setProperty("--bg-color", "#002b36");
        document.documentElement.style.setProperty("--text-color", "#ffffff"); // Changed to a lighter color for better readability
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
        ); // New property for taskbar background color
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
      }
    },
    changeBackgroundImage() {
      document.body.style.backgroundImage = `url(${this.bgImageUrl})`;
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

.theme-switcher label {
  font-weight: bold;
}

.theme-switcher select,
.theme-switcher input {
  padding: 5px;
  border: 1px solid var(--border-color, #282b36); /* Default border color */
  background-color: var(
    --component-bg-color,
    #292c37
  ); /* Default background color */
  color: var(--text-color, #ffffff); /* Default text color */
}

.theme-switcher select:hover,
.theme-switcher input:hover {
  border-color: var(
    --focused-border-color,
    #146,
    146,
    146
  ); /* Default focused border color */
}

/* Define default CSS variables for existing theme (you will need to define the existing theme colors here) */
</style>
