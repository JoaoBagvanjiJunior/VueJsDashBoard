<template>
  <div :class="{ dark: darkMode }" class="product-table">
    <table>
      <thead>
        <tr>
          <th>Tracking ID</th>
          <th @click="sortTable('product')">
            Product
            <PhCaretUp v-if="sortBy === 'product' && sortAsc" size="16" />
            <PhCaretDown v-if="sortBy === 'product' && !sortAsc" size="16" />
          </th>
          <th @click="sortTable('customer')">
            Customer
            <PhCaretUp v-if="sortBy === 'customer' && sortAsc" size="16" />
            <PhCaretDown v-if="sortBy === 'customer' && !sortAsc" size="16" />
          </th>
          <th @click="sortTable('date')">
            Date
            <PhCaretUp v-if="sortBy === 'date' && sortAsc" size="16" />
            <PhCaretDown v-if="sortBy === 'date' && !sortAsc" size="16" />
          </th>
          <th>Amount</th>
          <th>Payment Mode</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in sortedProducts" :key="product.id">
          <td>#{{ product.id }}</td>
          <td class="produtos">
            <img
              :src="product.image"
              alt="Imagem do produto"
              style="
                width: 40px;
                height: 40px;
                border-radius: 20px;
                margin-right: 8px;
              "
            />{{ product.name }}
          </td>
          <td>{{ product.owner }}</td>
          <td>{{ product.createdAt }}</td>
          <td>R$ {{ product.price.toFixed(2) }}</td>
          <td>{{ product.paymentMethod }}</td>
          <td>
            <span :class="statusClass(product.status)">
              {{ product.status }}
            </span>
          </td>
          <td class="actions">
            <button
              class="edit-btn"
              @click="editProduct(product)"
              aria-label="Editar pedido"
            >
              <PhNotePencil size="20" />
            </button>
            <button class="trash-btn" @click="deleteProduct(product.id)">
              <PhTrash size="20" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- MODAL DE CONFIRMAÇÃO -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-icon">
            <PhInfo size="32" />
          </div>
          <div class="modal-texts">
            <h3>Delete Order</h3>
            <p>Are you sure you want to delete this order?</p>
            <small>This action cannot be undone</small>
          </div>
        </div>
        <div class="modal-actions">
          <button class="cancel-btn" @click="showDeleteModal = false">
            Cancel
          </button>
          <button class="delete-btn" @click="confirmDelete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  PhNotePencil,
  PhTrash,
  PhCaretUp,
  PhCaretDown,
  PhInfo,
} from "phosphor-vue";

export default {
  components: {
    PhNotePencil,
    PhTrash,
    PhCaretUp,
    PhCaretDown,
    PhInfo,
  },
  data() {
    return {
      sortBy: "",
      sortAsc: true,
      showDeleteModal: false,
      productToDelete: null,
      darkMode: false,
    };
  },
  computed: {
    sortedProducts() {
      return [...this.products].sort((a, b) => {
        const fieldA = a[this.sortBy];
        const fieldB = b[this.sortBy];

        if (typeof fieldA === "string") {
          return this.sortAsc
            ? fieldA.localeCompare(fieldB)
            : fieldB.localeCompare(fieldA);
        } else {
          return this.sortAsc ? fieldA - fieldB : fieldB - fieldA;
        }
      });
    },
  },
  props: {
    products: Array,
  },
  methods: {
    editProduct(product) {
      this.$emit("edit", product);
    },
    deleteProduct(id) {
      this.productToDelete = id;
      this.showDeleteModal = true;
    },
    confirmDelete() {
      this.$emit("delete", this.productToDelete);
      this.productToDelete = null;
      this.showDeleteModal = false;
    },
    statusClass(status) {
      switch (status) {
        case "Em processo":
          return "status status-process";
        case "Entregue":
          return "status status-success";
        case "Cancelado":
          return "status status-cancel";
        default:
          return "status";
      }
    },
    sortTable(field) {
      if (this.sortBy === field) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortBy = field;
        this.sortAsc = true;
      }
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
};
</script>

<style scoped>
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal {
  animation: fadeInScale 0.3s ease-out;
}

.product-table {
  width: 100%;
  margin-top: 20px;
  overflow-x: auto;
}
.produtos {
  display: flex;
  align-items: center;
  gap: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

th {
  text-align: left;
  padding: 12px 16px;
  background-color: #ffffff;
  font-weight: 600;
  color: #333;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
}

td {
  padding: 12px 16px;
  font-size: 14px;
  color: #444;
  border-top: 1px solid #eee;
  text-align: left;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  border: transparent;
}

tbody tr:nth-child(odd) {
  background-color: #f7f6fe;
}

tbody tr:nth-child(even) {
  background-color: #ffffff;
}

tbody tr:hover {
  background-color: #e0e0ff;
}
.dark table {
  background-color: #2a2a2a; /* Cor escura suave */
  color: white;
}

.dark th {
  background-color: #3a3a3a;
  color: #ccc;
}

.dark td {
  background-color: #333;
  color: #ccc;
}

.dark tbody tr:nth-child(odd) {
  background-color: #444;
}

.dark tbody tr:nth-child(even) {
  background-color: #333;
}

.dark tbody tr:hover {
  background-color: #6c4ff9;
}

.dark .edit-btn {
  color: #6c4ff9;
}

.dark .delete-btn {
  color: #ff5c8d;
}
.dark .trash-btn {
  color: #ff5c8d;
}
.dark .status-process {
  background-color: #fff8e1;
  color: #f9a825;
}

.dark .status-success {
  background-color: #e8f5e9;
  color: #43a047;
}

.dark .status-cancel {
  background-color: #ffebee;
  color: #e53935;
}

.dark .modal-content {
  background-color: #2f2f2f;
  color: white;
}

.dark .cancel-btn {
  background-color: #4c4c4c;
  color: white;
}

.dark .delete-btn {
  color: #e11d48;
}

.dark .trash-btn {
  color: #e11d48;
}

.actions {
  gap: 8px;
}

button {
  background-color: transparent;
  display: inline-flex;
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.edit-btn {
  color: #6c4ff9;
}

.delete-btn {
  color: #e11d48;
  margin-left: 0.5rem;
}

.trash-btn {
  color: #e11d48;
  margin-left: 0.5rem;
}

.status {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-block;
  text-transform: capitalize;
}

.status-process {
  background-color: #fff8e1;
  color: #f9a825;
  border: 1px solid #f9a825;
}

.status-success {
  background-color: #e8f5e9;
  color: #43a047;
  border: 1px solid #43a047;
}

.status-cancel {
  background-color: #ffebee;
  color: #e53935;
  border: 1px solid #e53935;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 12px;
}
.modal-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 12px;
  margin-bottom: 16px;
}
.modal-icon {
  background-color: #fee2e2;
  color: #dc2626;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.modal-content h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.modal-content p {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.modal-content small {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  color: #888;
}
.modal-texts {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.modal-texts h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.modal-texts p {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.modal-texts small {
  font-size: 12px;
  color: #888;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
}

.cancel-btn {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: transparent;
  border-radius: 8px;
  font-weight: 400;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
}

.delete-btn {
  flex: 1;
  padding: 10px;
  color: #ffffff;
  background-color: #e11d48;
  border: none;
  border-radius: 8px;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
}
.trash-btn {
  flex: 1;
  padding: 10px;
  color: #e11d48;
  border: none;
  border-radius: 8px;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
}
</style>
