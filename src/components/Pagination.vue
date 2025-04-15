<template>
  <div class="pagination">
    <button
      class="nav"
      @click="changePage(currentPage - 1)"
      :disabled="currentPage <= 1"
    >
      Previous
    </button>

    <button
      v-for="page in [1, 2, 3]"
      :key="page"
      @click="changePage(page)"
      :class="['page-btn', { active: currentPage === page }]"
    >
      {{ page }}
    </button>

    <button
      class="nav"
      @click="changePage(currentPage + 1)"
      :disabled="currentPage >= 3"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    current: Number,
  },
  name: "PaginationView",
  computed: {
    currentPage() {
      return this.current;
    },
  },
  methods: {
    changePage(page) {
      if (page > 1 && page <= 3) {
        this.$emit("page-changed", page);
      }
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 8px;
}

.page-btn,
.nav {
  padding: 8px 14px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;
}

.page-btn {
  background-color: #e5e5e5;
  color: #333;
}

.page-btn.active {
  background-color: #6c4ce0;
  color: white;
  font-weight: 400;
  font-family: "Montserrat", sans-serif;
}

.nav {
  background-color: transparent;
  color: #e0e0e0;
  font-weight: 400;
  font-family: "Montserrat", sans-serif;
}

.nav:disabled {
  color: #ccc;
  cursor: not-allowed;
}
</style>
