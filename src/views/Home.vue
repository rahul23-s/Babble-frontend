<template lang="">
  <div>
    <!-- <Form @send="send" /> -->
    <!-- <h1>Chats</h1>
    <Tasks @open-chat="openChat" :tasks="tasks" /> -->
    <div class="container">
      <div class="buttonWrapper">
        <button
          @click="
            () => {
              loginTab = true;
            }
          "
          :class="['tabIcon', { active: loginTab }]"
        >
          Login <LoginOutlined />
        </button>
        <button
          @click="
            () => {
              loginTab = false;
            }
          "
          :class="['tabIcon', { active: !loginTab }]"
        >
          SignUp <UserAddOutlined />
        </button>
      </div>
      <div class="card">
        <h2>
          <img
            src="../assets/logo.png"
            alt="Babble Logo"
            width="40"
            height="40"
          />Welcome to Babble!
        </h2>
        <Login v-if="loginTab" />
        <SignUp v-else />
      </div>
    </div>
  </div>
</template>
<script>
import Tasks from "../components/Tasks.vue";
import Form from "../components/Form.vue";
import Login from "../components/Login.vue";
import SignUp from "../components/SignUp.vue";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons-vue";
export default {
  name: "Home",
  components: {
    Login,
    SignUp,
    Tasks,
    Form,
    LoginOutlined,
    UserAddOutlined,
  },
  data() {
    return {
      tasks: [],
      loginTab: true,
    };
  },
  methods: {
    openChat(id) {
      // let i;
      // for (i = 0; i < this.tasks.length; i++) {
      //   if (this.tasks[i].id === id) {
      //     break;
      //   }
      // }
      // this.tasks[i].opened = true;

      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, opened: !task.opened } : task
      );
    },
    send(chatInfo) {
      this.tasks = [chatInfo, ...this.tasks];
    },
    async fetchChats() {
      // const res = await fetch("http://localhost:5000/chats")
      const res = await fetch("api/chats");
      const data = await res.json();
    },
    async addChat(chat) {
      const res = await fetch("api/chats", {
        methods: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(chat),
      });
      const data = await res.json();

      this.tasks = [data, ...this.tasks];
    },
    async deleteChat(id) {
      const res = await fetch(`api/chats/${id}`, {
        methods: "DELETE",
      });
      // const data = await res.json();

      // this.tasks = [data, ...this.tasks];
    },
  },
  created() {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      this.$store.commit("SET_NAME", data.name);
      this.$store.commit("SET_EMAIL", data.email);
      this.$store.commit("SET_AVATAR", data.avatar);
      this.$store.commit("SET_TOKEN", data.token);
      this.$store.commit("SET_ID", data._id);
      this.$store.commit("SET_LOGINSTATUS");
    }

    if (this.$store.getters.loginStatus) {
      this.$router.push("/chat");
    }
  },
};
</script>
<style scoped>
.container {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 80vh;
  height: fit-content;
  padding-top: 40px;
}

.buttonWrapper {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* align-self: flex-end; */
  overflow-x: visible;
}

.tabIcon {
  width: fit-content;
  padding: 10px 15px;
  background: #092b46;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 10px;
  margin-left: 15px;
  transition: all 300ms;
  font-size: 16px;
}

.tabIcon:hover,
.active {
  background: #001425;
  box-shadow: 0 0 2px #7facff, 0 0 4px #7facff, 0 0 6px #7facff,
    0 0 15px #7facff;
  transition: all 300ms;
}

.card {
  width: 800px;
  min-height: 400px;
  height: fit-content;
  background: #092b46;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
}

.card h2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.card h2 img {
  width: 40px;
  margin: 0 10px;
}

@media only screen and (max-width: 600px) {
  .card {
    width: 90vw;
    padding: 40px 20px;
  }
  .card h2 img {
    /* width: 70px; */
    margin: 0 10px;
  }
}

.headingWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.heading {
  font-size: 22px;
  font-weight: bold;
  margin-left: 10px;
}
</style>
