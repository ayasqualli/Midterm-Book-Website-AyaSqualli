<template>
  <div class="home-view">
    <Library :initialBooks="books" />
  </div>
</template>

<script>
import Library from "@/components/Library.vue";

export default {
  name: "HomeView",
  components: { Library },
  data() {
    return {
      books: []
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:3000/livres');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.books = await response.json();
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }
};
</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
