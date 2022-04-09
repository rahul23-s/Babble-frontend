<template>
  <div>
    <div class="chats" v-for="task in tasks" :key="task.id">
      <Task @open-chat="$emit('open-chat', task.id)" :task="task" />
    </div>
  </div>
</template>
<script>
import Task from "./Task.vue";

export default {
  name: "Tasks",
  components: { Task },
  props: {
    tasks: Array,
  },
  emits: ["open-chat"],
};
</script>
<style scoped>
.chats {
  display: flex;
  width: 100vw;
  justify-content: center;
}
</style>
