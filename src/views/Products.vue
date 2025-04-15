<template>
  <div class="products">
    <!-- <input
      type="text"
      placeholder="Buscar..."
      v-model="search"
      @input="filterProducts"
    /> -->

    <div class="toolbar">
      <div class="entries">
        <span>Show</span>
        <select>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <span>entries</span>
      </div>

      <button class="add-button" @click="openModal()">
        <PhPlus size="16" class="plus-icon" /> Add Customer
      </button>
    </div>

    <ProductTable
      :products="filteredProducts"
      @edit="openModal"
      @delete="deleteProduct"
    />

    <Pagination
      :total="filteredProducts.length"
      :current="currentPage"
      :per-page="perPage"
      @page-changed="handlePageChange"
    />

    <ProductForm
      v-if="isModalOpen"
      :product="selectedProduct"
      @close="closeModal"
      @save="saveProduct"
    />
  </div>
</template>

<script>
import ProductTable from "../components/ProductTable.vue";
import ProductForm from "../components/ProductForm.vue";
import Pagination from "../components/Pagination.vue";
import api from "../services/api";

export default {
  components: {
    ProductTable,
    ProductForm,
    Pagination,
  },
  name: "ProductsView",
  data() {
    return {
      products: [],
      filteredProducts: [],
      currentPage: 1,
      perPage: 5,
      search: "",
      isModalOpen: false,
      selectedProduct: null,
    };
  },
  async created() {
    await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      const res = await api.get("/products");
      this.products = res.data;
      this.filteredProducts = res.data;
    },
    filterProducts() {
      this.filteredProducts = this.products.filter((p) =>
        p.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    openModal(product = null) {
      this.selectedProduct = product;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedProduct = null;
    },
    async saveProduct(product) {
      if (product.id) {
        await api.put(`/products/${product.id}`, product);
      } else {
        await api.post("/products", product);
      }
      this.closeModal();
      this.fetchProducts();
    },
    async deleteProduct(id) {
      await api.delete(`/products/${id}`);
      this.fetchProducts();
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
  },
};
</script>
<script setup>
import { PhPlus } from "phosphor-vue";
</script>
<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-family: "Montserrat", sans-serif;
}

.entries {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
}
.dark span {
  color: #ddd;
}

select {
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  background-color: #eee;
  font-family: "Montserrat", sans-serif;
  font-size: 0.9rem;
}
.add-button {
  background-color: #6c4ff9; /* roxo */
  color: white;
  border: none;
  padding: 10px 18px;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-family: "Inter", sans-serif;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;
}

.add-button:hover {
  background-color: #5c3ee6;
}

.plus-icon {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
}
.button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem; /* opcional */
}
</style>
