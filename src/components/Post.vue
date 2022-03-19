<template>
  <div class="blog">
    <div v-for="article in articles" :key="article.title">
      <h1>{{ article.title }}</h1>
      <span v-html="article.content"></span>
      <span class="it-textarea">{{ article.authorName }}</span>
    </div>
    <it-divider></it-divider>
    <h2>Comments</h2>
    <Comment></Comment>
  </div>
</template>

<script>
import axios from 'axios'
import Comment from "@/components/Comment";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Post",
  components: {Comment},
  data () {
    return {
      articles: {},
    }
  },
  methods: {
    getPosts () {
      axios.get('http://commentpost.test/api/post').then((response) => {
        this.articles = response.data.data
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
