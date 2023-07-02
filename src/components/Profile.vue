<template>
  <div
    @click="
      () => {
        $store.commit('TOGGLE_PROFILE');
      }
    "
    class="profile"
  >
    <div
      @click="
        (e) => {
          e.stopPropagation();
        }
      "
      class="card"
    >
      <CloseOutlined
        @click="
          () => {
            $store.commit('TOGGLE_PROFILE');
          }
        "
        :style="{ position: 'absolute', top: '15px', right: '15px' }"
      />
      <div
        v-if="
          !$store.getters.selectedChat?.isGroupChat && $store.getters.isProfile
        "
      >
        <img
          class="avatar"
          :src="$store.getters.profileStates.avatar"
          alt=""
          srcset=""
          width="250"
          height="250"
        />
        <div class="edit-icons">
          <SaveOutlined v-if="editMode && !savingDetails" @click="updateDetails" />
          <EditOutlined  v-else-if="!editMode && !savingDetails"
          @click="
            () => {
              editMode = true;
            }
          "
          :style="{ cursor : 'pointer' }" />
          <SyncOutlined spin="true" :style="{overflow : 'hidden'}" v-else />
        </div>
        <div class="user-info">
          <h2 class="name">{{ $store.getters.profileStates.name }}</h2>
          <h4 class="email">{{ $store.getters.profileStates.email }}</h4>
        </div>
      </div>
      <GroupActions v-else :groupChat="$store.getters.selectedChat" />
    </div>
  </div>
</template>
<script>
import { CloseOutlined, EditOutlined, SyncOutlined, SaveOutlined } from "@ant-design/icons-vue";
import GroupActions from "../components/GroupActions.vue";
export default {
  components: { CloseOutlined, EditOutlined, SyncOutlined, SaveOutlined, GroupActions },
  data() {
    return {
      editMode : false,
      savingDetails : false,
      newAvatar : ''
    }
  },
  methods: {
    // updateDetails(){
    //   this.savingDetails = true;
    //   setTimeout(() => {
    //     this.savingDetails = false;
    //     this.editMode = false;
    //   }, 4000);
    // },
    async updateDetails() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${this.$store.getters.user.token}`,
          },
        };

        const { data } = await this.$axios.put(`/api/user/profile/photo`, config);
        this.$store.commit("SET_CHATS", data);

        this.chats = data;
        this.allChats = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.profile {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.342);
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-icons{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 10%;
  bottom: 10%;
  width: 35px;
  height: 35px;
  overflow: hidden;
  font-size: 15px;
  color: #ffffff;
  background: #001425;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
}
.edit-icons:hover{
  box-shadow: 0 0 2px #7facff, 0 0 4px #7facff, 0 0 6px #7facff, 0 0 8px #7facff;
}

.avatar {
  border-radius: 50%;
  object-fit: cover;
}
.card {
  min-width: 400px;
  width: fit-content;
  /* min-height: 400px; */
  height: fit-content;
  background: #092b46;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  box-shadow: 0 0 2px #7facff, 0 0 4px #7facff, 0 0 6px #7facff,
    0 0 15px #7facff;
  position: relative;
}
.card img {
  margin: 20px 0;
}
@media only screen and (max-width: 600px) {
  .card {
    min-width: 85%;
  }
}
</style>
