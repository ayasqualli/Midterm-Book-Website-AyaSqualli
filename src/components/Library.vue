<template>
  <div class="page-container">
    <div class="header">
      <h1>Library</h1>
      <p>Explore our collection of books</p>
    </div>

    <div class="content-wrapper">
      <aside class="filter-section">
        <filter-nav :books="books" @filtered-books="updateFilteredBooks" />
      </aside>

      <main class="book-list-section">
        <div v-if="filteredBooks.length" class="book-list">
          <div v-for="book in filteredBooks" :key="book.id" class="book-card">
            <img :src="book.image" :alt="book.titre" class="book-cover" />
            <div class="book-info">
              <h3>{{ book.titre }}</h3>
              <p class="author-info">By {{ book.auteur }}</p>
              <p class="book-description">{{ book.resume ? book.resume.substring(0, 100) + '...' : 'No description available' }}</p>
              <div class="meta-info">
                <span class="year"> Year: {{ book.annee }}</span>
                <span class="status" :class="book.disponible ? 'available' : 'borrowed'">
                  {{ book.disponible ? 'Available' : 'Borrowed' }}
                </span>
                <router-link :to="`/details/${book.id}`" class="view-btn">View Details</router-link>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
          <p>No books found matching your criteria</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import FilterNav from "@/components/FilterNav.vue";

export default {
  name: "Library",
  components: { FilterNav },
  props: {
    initialBooks: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      books: [],
      filteredBooks: []
    };
  },
  watch: {
    initialBooks: {
      immediate: true,
      handler(newBooks) {
        this.books = newBooks;
        this.filteredBooks = [...newBooks];
      }
    }
  },
  methods: {
    updateFilteredBooks(filteredBooks) {
      this.filteredBooks = filteredBooks || [];
    }
  }
};
</script>

<style scoped>
.page-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  text-align: center;
  padding: 1.5rem;
  background: #2a9dfc;
  color: white;
  margin-bottom: 1.5rem;
  border-radius: 8px;
}

.header h1 {
  font-size: 1.8rem;
  margin-bottom: 0.4rem;
}

.header p {
  margin-bottom: 0.8rem;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 1.5rem;
  margin-top: 0.8rem;
}

.filter-section {
  width: 100%;
  background: #E3F2FD;
  padding: 0.8rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 1rem;
}

.book-list-section {
  background: white;
  padding: 0.8rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.book-card {
  background: white;
  padding: 1rem;
  margin-bottom: 0.8rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  gap: 1rem;
}

.book-card:hover {
  transform: translateY(-2px);
}

.book-cover {
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

.book-info {
  flex: 1;
}

.author-info {
  color: #666;
  font-style: italic;
  margin: 0.4rem 0;
  font-size: 0.9rem;
}

.book-description {
  color: #666;
  font-size: 0.8em;
  margin-bottom: 0.8rem;
}

.meta-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.8rem;
}

.year {
  font-weight: bold;
  color: #2a9dfc;
  font-size: 0.9rem;
}

.status {
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.8em;
}

.status.available {
  background: #e8f5e9;
  color: #2e7d32;
}

.status.borrowed {
  background: #ffebee;
  color: #c62828;
}

.view-btn {
  display: block;
  padding: 0.4rem 0.8rem;
  background: #2a9dfc;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.view-btn:hover {
  background: #2385d4;
  transform: translateY(-1px);
}
</style>