<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

/* Tema claro */
:root {
  --bg-color: #ffffff;
  --text-color: #111827;
  --primary-color: #2563eb;
}

/* Tema escuro */
body.dark {
  --bg-color: #111827;
  --text-color: #111827;
  --primary-color: #3b82f6;
}
</style>
