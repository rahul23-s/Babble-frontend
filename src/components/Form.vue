<template>
  <div class="form">
    <div class="inputs">
      <input type="text" placeholder="Name" v-model="chat" />
      <input type="text" placeholder="Type your Msg" v-model="msg" />
    </div>
    <button @click="send()">Send</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: 0,
      chat: "",
      msg: "",
    };
  },
  created() {
    this.id = 10;
  },
  methods: {
    send() {
      if (!this.chat || !this.msg) return;

      this.$emit("send", {
        id: this.id,
        chat: this.chat,
        msg: this.msg,
        time: "12:00am",
        opened: false,
      });
      this.id++;
      this.chat = "";
      this.msg = "";
    },
  },
};
</script>
<style scoped>
.form {
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
input {
  width: 20vw;
  padding: 10px;
  margin: 10px;
}
.inputs {
  display: flex;
  flex-direction: column;
}
button {
  padding: 10px 20px;
  border: none;
  outline: none;
}
</style>
