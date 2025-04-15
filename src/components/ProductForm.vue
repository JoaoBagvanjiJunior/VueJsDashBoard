<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <label for="status">Status:</label>
    <select id="status" v-model="form.status" required>
      <option value="">Selecione</option>
      <option value="Entregue">Entregue</option>
      <option value="Em processo">Em processo</option>
      <option value="Cancelado">Cancelado</option>
    </select>

    <label for="name">Product:</label>
    <input type="text" id="name" v-model="form.name" required />

    <label for="owner">Customer</label>
    <input type="text" id="owner" v-model="form.owner" required />

    <div class="inputs-row">
      <div class="input-group">
        <label for="createdAt">Date:</label>
        <input
          type="text"
          id="createdAt"
          v-model="form.createdAt"
          placeholder="13 / 05 / 2025"
          required
        />
      </div>
      <div class="input-group">
        <label for="price">Amount:</label>
        <input type="number" id="price" v-model="form.price" required />
      </div>
    </div>

    <!-- Upload da imagem um adicional-->
    <!-- <label for="image">Imagem do Produto</label>
    <input
      type="file"
      id="image"
      @change="handleImageUpload"
      accept="image/*"
    />
    <div v-if="form.image" class="image-preview">
      <img :src="form.image" alt="Prévia da imagem" />
    </div> -->

    <label for="paymentMethod">Payment Mode</label>
    <select id="paymentMethod" v-model="form.paymentMethod" required>
      <option value="">Selecione</option>
      <option value="Cartão">Cartão</option>
      <option value="Dinheiro">Dinheiro</option>
      <option value="Pix">Pix</option>
    </select>

    <div class="actions">
      <button type="button" class="cancel-btn" @click="cancelarFormulario">
        Cancel
      </button>

      <button type="submit">
        {{ form.id ? "Atualizar Produto" : "Apply" }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  data() {
    return {
      form: {
        id: this.product?.id || null,
        name: this.product?.name || "",
        price: this.product?.price || 0,
        image: this.product?.image || "", // Aqui será a base64
        owner: this.product?.owner || "",
        paymentMethod: this.product?.paymentMethod || "",
        status: this.product?.status || "",
        createdAt: this.product?.createdAt || "",
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("save", { ...this.form });
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.form.image = e.target.result; // Base64
        };
        reader.readAsDataURL(file);
      }
    },
    cancelarFormulario() {
      this.form = {
        id: null,
        name: "",
        price: 0,
        createdAt: "",
        owner: "",
        paymentMethod: "",
        status: "",
        image: "",
      };
    },
  },
};
</script>

<style scoped>
.form-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  max-width: 400px;
  margin: auto;
  text-align: left;
  font-family: "Montserrat", sans-serif;
  margin-top: 2rem;
  margin-bottom: 4rem;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding-bottom: 2rem;
}

.inputs-row {
  display: flex;
  gap: 20px;
  margin-top: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.input-group label {
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  font-family: "Montserrat", sans-serif;
}

.input-group input {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 8px;
  border: transparent;
  font-family: "Montserrat", sans-serif;
  width: 85%;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
}

.actions button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  width: 50%;
  height: 120%;
  font-family: "Montserrat", sans-serif;
}

.cancel-btn {
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #000;
}
.cancel-btn:hover {
  color: #fff;
}

input,
select {
  padding: 10px;
  border: transparent;
  background-color: #eef1ff;
  color: #959bb7;
  border-radius: 6px;
  font-family: "Montserrat", sans-serif;
}

button {
  background-color: #6c4ff9;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
}

.image-preview img {
  width: 100px;
  height: auto;
  margin-top: 10px;
  border-radius: 6px;
}

button:hover {
  background-color: #5c3ee6;
}
</style>
