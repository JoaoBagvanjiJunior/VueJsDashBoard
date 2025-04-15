<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-content">
      <button class="close" @click="closeModal">&times;</button>
      <h2>{{ localProduct.id ? "Editar Produto" : "Apply" }}</h2>

      <form @submit.prevent="save">
        <label for="name">Nome</label>
        <input
          type="text"
          id="name"
          v-model="localProduct.name"
          placeholder="Nome do produto"
          required
        />

        <label for="price">Preço</label>
        <input
          type="number"
          id="price"
          v-model="localProduct.price"
          placeholder="Preço do produto"
          required
        />

        <button type="submit">
          {{ localProduct.id ? "Salvar" : "Adicionar" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    product: Object,
  },
  name: "ModalView",
  data() {
    // Cria uma cópia do produto para não mutar a prop diretamente
    return {
      localProduct: { ...this.product }, // Spread para criar uma cópia
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    save() {
      // Emite a cópia do produto modificada para o componente pai
      this.$emit("save", this.localProduct);
    },
  },
  watch: {
    // Quando o produto é alterado, atualiza a cópia local
    product(newProduct) {
      this.localProduct = { ...newProduct };
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  display: flex;
  flex-direction: column;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

button.close {
  background: red;
  padding: 5px 10px;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
