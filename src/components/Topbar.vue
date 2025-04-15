<template>
  <header class="topbar">
    <div class="left">
      <img src="@/assets/logo.svg" alt="Logo" class="logo" />
      <h1>ClarityUI</h1>
    </div>

    <div class="input-icon">
      <PhMagnifyingGlass size="20" />
      <input type="text" placeholder="Type to Search" />
    </div>

    <div class="right">
      <button><PhEnvelope size="20" /></button>
      <button><PhBell size="20" /></button>
      <img src="@/assets/user.png" alt="User" class="avatar" />
    </div>
    <!-- Botão de troca de tema com ícones -->
    <button @click="toggleTheme">
      <PhSun v-if="isDark" :size="20" />
      <PhMoon v-else :size="20" />
    </button>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isDark: false,
    };
  },
  name: "TopbarView",
  mounted() {
    // Detecta se tema salvo
    this.isDark = localStorage.getItem("theme") === "dark";
    document.body.classList.toggle("dark", this.isDark);
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      document.body.classList.toggle("dark", this.isDark);
      localStorage.setItem("theme", this.isDark ? "dark" : "light");
    },
  },
};
</script>
<script setup>
import {
  PhEnvelope,
  PhBell,
  PhMagnifyingGlass,
  PhSun,
  PhMoon,
} from "phosphor-vue";
</script>

<style scoped>
.topbar {
  height: 60px;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.left {
  display: flex;
  align-items: center;
  gap: 10px;
}
h1 {
  font-size: 1.2rem;
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}
.logo {
  height: 32px;
}

.input-icon {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  max-width: 1200px;
  color: #aaa;
  background-color: #fff;
}
.input-icon svg {
  margin-right: 8px;
  color: #666;
}

.input-icon input {
  border: none;
  outline: none;
  font-size: 0.95rem;
  font-family: "Montserrat", sans-serif;
  flex: 1;
}
.avatar {
  margin-top: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  border: none;
  cursor: pointer;
}

.right {
  display: flex;
}

button {
  background: none;
  border: none;
  font-size: 1.2rem;
  margin: 1rem;
  cursor: pointer;
}

.right button:hover {
  color: #6c63ff;
}
</style>
