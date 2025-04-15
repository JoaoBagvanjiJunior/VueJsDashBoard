<template>
  <div class="layout-container">
    <Topbar />
    <div class="main-wrapper">
      <Navbar />
      <div class="page-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Topbar from "@/components/Topbar.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  components: { Topbar, Navbar },
};
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
}

.main-wrapper {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.page-content {
  flex: 1;
  background-color: var(--bg-color);
  color: var(--text-color);
  overflow-y: auto;
}
</style>
