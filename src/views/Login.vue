<template>
  <div class="login-container">
    <img src="@/assets/logo.svg" alt="Logo" class="logo" />

    <form @submit.prevent="login" class="login-form">
      <label class="labels">Seja Bem-Vindo</label>
      <div class="input-group">
        <label class="usuario" for="username">Usuário:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Digite seu usuário"
          required
        />
      </div>

      <div class="input-group">
        <label class="usuario" for="password">Senha:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Digite sua senha"
          required
        />
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>

      <button type="submit" class="login-button">Entrar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    login() {
      if (this.username === "admin" && this.password === "admin") {
        localStorage.setItem("loggedIn", true);
        this.$router.push("/dashboard/products");
      } else {
        this.error = "Usuário ou senha inválidos";
      }
    },
  },
};
</script>

<style scoped>
.logo {
  height: 32px;
  margin-bottom: 1rem;
}
.labels {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-family: "Montserrat", sans-serif;
}
.usuario {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-family: "Montserrat", sans-serif;
  text-align: left;
}
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.input-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.3rem;
  font-weight: 600;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
}

.login-button {
  width: 100%;
  padding: 0.7rem;
  background-color: #624de3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
}

.login-button:hover {
  background-color: #5c3ee6;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-bottom: 1rem;
  text-align: center;
}
</style>
