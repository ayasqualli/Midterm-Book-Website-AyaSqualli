<template>
  <div class="page-container">
    <div class="header">
      <h1>Book Details</h1>
      <p>See more info about the book</p>
    </div>
    <div class="book-container" v-if="book">
      <div class="book-content">
        <img :src="book.image" :alt="book.titre" class="book-cover" />
        <div class="book-info">
          <h3 class="book-title">{{ book.titre }}</h3>
          <p class="author-info">By {{ book.auteur }}</p>
          <p class="book-description">{{ book.resume ? book.resume : 'No description available' }}</p>
          <div class="meta-info">
            <span class="year">Year: {{ book.annee }}</span>
            <span class="status" :class="book.disponible ? 'available' : 'borrowed'">
              {{ book.disponible ? 'Available' : 'Borrowed' }}
            </span>
            <router-link :to="`/`" class="view-btn">Back to Home</router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading">Loading book...</div>
  </div>
</template>

<script>
export default {
  name: "BookDetail",
  data() {
    return {
      book: null,
    }
  },
  async created() {
    const bookId = this.$route.params.id;
    try {
      const response = await fetch(`http://localhost:3000/livres/${bookId}`);
      if (!response.ok) {
        throw new Error('Book not found');
      }
      this.book = await response.json();
    } catch (error) {
      console.error('Error fetching book details: ', error);
    }
  }
}
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  text-align: center;
  padding: 2rem;
  background: #2a9dfc;
  color: white;
  margin-bottom: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header h1 {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

.header p {
  font-size: 1.1rem;
  color: #e3f2fd;
}

.book-container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.book-content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.book-cover {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.book-info {
  flex: 1;
}

.book-title {
  font-size: 1.8rem;
  color: #2a2a2a;
  margin-bottom: 1rem;
}

.author-info {
  color: #666;
  font-style: italic;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.book-description {
  color: #444;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.meta-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

.year {
  font-weight: bold;
  color: #2a9dfc;
  font-size: 1rem;
}

.status {
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
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
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background: #2a9dfc;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.view-btn:hover {
  background: #2385d4;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  padding: 2rem;
}
</style>
