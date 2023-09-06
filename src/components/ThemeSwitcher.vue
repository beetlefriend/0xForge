<template>
  <div class="theme-switcher">
    <label for="theme-select">Select Theme: </label>
    <select id="theme-select" v-model="selectedTheme" @change="changeTheme">
      <option value="existing">Existing</option>
      <option value="light">Light Mode</option>
      <option value="monokai">Monokai</option>
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
      } else if (this.selectedTheme === "monokai") {
        document.documentElement.style.setProperty("--bg-color", "#272822");
        document.documentElement.style.setProperty("--text-color", "#f8f8f2");
        document.documentElement.style.setProperty(
          "--component-bg-color",
          "#383830"
        );
        document.documentElement.style.setProperty("--border-color", "#49483e");
        document.documentElement.style.setProperty(
          "--box-shadow",
          "0 0 5px rgba(0, 0, 0, 0.5)"
        );
      } else {
        document.documentElement.style.setProperty("--bg-color", "#1e1e1e"); // Existing background color
        document.documentElement.style.setProperty("--text-color", "#ffffff"); // Existing text color
        document.documentElement.style.setProperty(
          "--component-bg-color",
          "#2e2e2e"
        ); // Existing component background color
        document.documentElement.style.setProperty("--border-color", "#3e3e3e"); // Existing border color
        document.documentElement.style.setProperty(
          "--box-shadow",
          "0 0 5px rgba(0, 0, 0, 0.5)"
        ); // Existing box shadow values
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

/* Define default CSS variables for existing theme (you will need to define the existing theme colors here) */
:root {
  --bg-color: #f0f0f0; /* Example value, replace with actual values */
  --text-color: #000; /* Example value, replace with actual values */
  --component-bg-color: #ffffff; /* Example value, replace with actual values */
  --border-color: #ccc; /* Example value, replace with actual values */
  --box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); /* Example value, replace with actual values */
}
</style>
