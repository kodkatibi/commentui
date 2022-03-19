<template>
  <div class="blog">
    <h1>{{ apiUrl }}</h1>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Post",
  data () {
    return {
      articles: {},
    }
  },
  methods: {
    getPosts () {
      axios.get('http://commentpost.test/api/post').then((response) => {
        this.articles = response.data
      }).catch((error) => {
        alert(error.message)
      })
    }
  },
  mounted () {
    this.getPosts()
  }


}
</script>

<style scoped>

</style>
