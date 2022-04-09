<template>
  <div
    class="message"
    :style="[
      !isSender(message.sender._id) ? { justifyContent: 'flex-end' } : {},
    ]"
  >
    <img
      v-if="isSender(message.sender._id)"
      :src="message.sender.avatar"
      alt=""
      class="avatar"
      width="40"
      height="40"
    />
    <span
      class="msg"
      :style="[
        isSender(message.sender._id)
          ? { borderLeft: '7px solid rgb(61, 97, 128)', background: '#001425' }
          : { borderRight: '7px solid white', background: '#1fa8da' },
      ]"
    >
      {{ message.content }}
    </span>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  methods: {
    isSender(senderId) {
      return senderId !== this.$store.getters.user._id;
    },
  },
};
</script>
<style scoped>
.message {
  display: flex;
  align-items: center;
  height: fit-content;
  margin: 10px;
}
.avatar {
  border-radius: 50%;
}
.msg {
  padding: 10px;
  margin: 7px 15px;
  border-radius: 10px;
  /* background: rgb(61, 97, 128); */
}
</style>
