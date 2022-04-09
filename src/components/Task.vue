<template lang="">
  <div
    @click="onOpen(task.id)"
    :class="[!task.opened ? 'chatPending' : '', 'chat']"
  >
    <h3>{{ task.chat }}</h3>
    <div class="sub">
      <p>{{ task.msg }}</p>
      <i>{{ task.time }}</i>
    </div>
  </div>
</template>
<script>
export default {
  name: "Task",
  props: {
    task: Object,
  },
  methods: {
    onOpen(id) {
      this.$emit("open-chat", id);
    },
  },
};
</script>
<style scoped>
.chat {
  display: flex;
  width: 40vw;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.11);
  margin: 2px 0;
  padding: 10px;
  border-radius: 10px;
}

.chatPending {
  border-left: 10px solid rgb(0, 206, 103);
}

.chat h3 {
  align-self: flex-start;
}
.sub {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
}
</style>
