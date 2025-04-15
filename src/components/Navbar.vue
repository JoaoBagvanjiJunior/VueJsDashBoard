<template>
  <nav class="sidebar">
    <section class="section">
      <ul>
        <li>
          <a href="#"><PhHouseLine size="20" /> Dashboard</a>
        </li>
      </ul>
    </section>

    <section class="section">
      <p class="section-title">ANALYTICS</p>
      <ul>
        <li>
          <a href="#"><PhChartBar size="20" /> Performance</a>
        </li>
        <li>
          <a href="#">
            <PhCursor size="20" /> Hotjar <span class="new">NEW</span></a
          >
        </li>
      </ul>
    </section>

    <section class="section">
      <p class="section-title">SUPPORT</p>
      <ul>
        <li>
          <a href="#">
            <PhTicket size="20" /> Tickets <span class="badge">15</span></a
          >
        </li>
        <li>
          <a href="#"><PhUser size="20" /> Agents</a>
        </li>
        <li>
          <a href="#"><PhUsers size="20" /> Customers</a>
        </li>
      </ul>
    </section>

    <section class="section">
      <p class="section-title">SHOP</p>
      <ul>
        <li>
          <router-link to="/dashboard/products"
            ><PhPackage size="20" /> Products</router-link
          >
        </li>
        <li>
          <a href="#"><PhBell size="20" /> Orders</a>
        </li>
        <li>
          <a href="#"><PhPresentationChart size="20" /> Reports</a>
        </li>
      </ul>
    </section>

    <div class="footer">
      <a href="#"><PhGear size="20" /> Settings</a>
      <a @click="logout"><PhSignOut size="20" /> Logout</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarView",
  methods: {
    logout() {
      // Simula encerramento de sessão
      localStorage.removeItem("loggedIn");
      this.$router.push("/login");
    },
  },
};
</script>

<script setup>
import {
  PhChartBar,
  PhCursor,
  PhTicket,
  PhUser,
  PhUsers,
  PhPackage,
  PhBell,
  PhPresentationChart,
  PhGear,
  PhSignOut,
  PhHouseLine,
} from "phosphor-vue";
</script>

<style scoped>
.sidebar {
  width: 240px;
  height: calc(100vh - 60px);
  background-color: #f7f6fe;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  font-family: "Montserrat", sans-serif;
  overflow-y: auto;
  border: transparent;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 2rem;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 400;
  color: #aaa;
  margin-left: 0;
  margin-bottom: 0.5rem;
  font-family: "Montserrat", sans-serif;
  text-align: left;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

a {
  text-decoration: none;
  color: #333;
  font-size: 0.95rem;
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 400;
  font-family: "Montserrat", sans-serif;
}

a:hover {
  color: #6c63ff;
}

.new {
  background-color: #6c63ff;
  color: white;
  font-size: 0.65rem;
  padding: 2px 6px;
  border-radius: 6px;
  margin-left: 6rem;
}

.badge {
  background-color: #f00;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 50px;
  margin-left: 6rem;
}

.footer {
  margin-top: 20rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
