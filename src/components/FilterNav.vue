<template>
  <div class="filter-nav">
    <h1>Search for your books</h1>
    <div class="filters-container">
      <input
        type="text"
        v-model="SearchQuery"
        @input="updateSearch"
        placeholder="Search for books by title or by author..."
        class="search-input"
      />
      <div class="status-check">
        <p>Filter By Status</p>
        <input type="radio" id="all" value="all" v-model="status" @change="updateSearch"/>All
        <input type="radio" id="available" value="available" v-model="status" @change="updateSearch"/>Available
        <input type="radio" id="borrowed" value="borrowed" v-model="status" @change="updateSearch" />Borrowed
      </div>
      <button class="reset-btn" @click="ResetFilters">Reset Filters</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterNav',
  data() {
    return {
      books: [],
      SearchQuery: "",
      status: "all",
    };
  },

  async created() {
    try {
      const response = await fetch('http://localhost:3000/books');
      this.books = await response.json();
      this.applyFilters();
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  },

  methods: {
    updateSearch() {
      this.applyFilters();
    },
    applyFilters() {
      const filtered = this.books.filter((book) => {
        const matchSearch = book.titre.toLowerCase().includes(this.SearchQuery.toLowerCase()) ||
                          book.auteur.toLowerCase().includes(this.SearchQuery.toLowerCase());
        
        const isAvailable = this.status === "available" && book.disponible === true;
        const isBorrowed = this.status === "borrowed" && book.disponible === false;
        const isAll = this.status === "all";

        return matchSearch && (isAvailable || isBorrowed || isAll);
      });

      this.$emit("filtered-books", filtered);
    },
    ResetFilters() {
      this.SearchQuery = "";
      this.status = "all";
      this.applyFilters();
      // Reload page
      this.$router.go();
    }
  },
};
</script>

<style scoped>
.filter-nav {
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-left: 0;
}

.filters-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.search-input {
  width: 200px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.status-check {
  text-align: left;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  width: 200px;
}

.form-group {
  margin: 8px 0;
}

.form-group label {
  margin-left: 8px;
}

.reset-btn {
  padding: 10px 20px;
  background: #2a9dfc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reset-btn:hover {
  background: #2385d4;
}
</style>
