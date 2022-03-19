<template>
  <div>
    <it-loading v-if="loading"></it-loading>
    <it-button type="primary" @click="openModal()">Make Comment</it-button>
    <it-divider/>
    <div v-for="comment in comments" :key="comment.id">
      <p>{{ comment.comment }}</p>
      <span class="it-textarea">{{ comment.writerName }}</span>
      <div v-if="comment.subComment!==null">
        <div v-for="subcomment in comment.subComment" :key="subcomment.id">
          <p class="fade-right-enter-active">{{ subcomment.comment }}</p>
          <span class="it-textarea">{{ subcomment.writerName }}</span>
          <it-button type="primary" @click="openModal(subcomment.id)">Reply</it-button>
          <it-divider/>
          <it-divider/>
        </div>
      </div>
      <it-button type="primary" @click="openModal(comment.id)">Reply</it-button>
      <it-divider/>
    </div>

    <it-modal v-model="commentModal">
      <template #body>
        <div class="signupmodal p-3">
          <div class="signupmodal-wrap-inputs flex flex-row">
            <div class="flex-1">
              <it-input v-model="commentForm.writerName" label-top="Name" placeholder="John"/>
            </div>
            <div class="flex-2">
              <it-textarea v-model="commentForm.comment" label-top="Your Comment"></it-textarea>
            </div>
          </div>
          <it-button
              block
              size="big"
              type="primary"
              @click="sendComment"
          >Send
          </it-button
          >
        </div>
      </template>
    </it-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Comment",
  data () {
    return {
      comments: {},
      loading: true,
      commentModal: false,
      commentForm: {}
    }
  },

  methods: {
    getAllComments () {
      axios.get('http://commentpost.test/api/comment/').then((response) => {
        this.comments = response.data.data
      }).catch((error) => {
        console.log(error)
      })
    },
    openModal (parent = null) {
      this.commentForm.parent = parent
      this.commentForm.post = 1
      this.commentModal = true
    },
    sendComment () {
      this.loading = true
      axios.post('http://commentpost.test/api/comment/save', this.commentForm).then(() => {
        this.commentForm = {}
        this.commentModal = false
        this.getAllComments()
        this.$Message.success({text: 'Success'})
      }).catch((error) => {
        alert(error.data.message)
      })
      this.loading = false
    }
  },
  beforeMount () {
    this.getAllComments()
  },
  mounted () {
    this.loading = false
  }
}
</script>

<style scoped>

</style>
