
<script setup>
import AvartarImg from '@/assets/logo.svg'
import { ref, nextTick } from 'vue'

const props = defineProps({
  // 消息列表
  messages: {
    type: Array,
    default: () => ([])
  },
  // 是否显示头像
  showAvartar: {
    type: Boolean,
    default: false
  },
})
const emits = defineEmits([ 'sendMessage', 'handleHistory' ])

// 内容滑动
const messageContainer = ref(null)
const newMessage = ref('')
const historyText = ref('点击查看更多...')
// 是否有历史内容可查看
const olderMessagesAvailable = ref(true)

// 消息发送
const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
    emits('sendMessage', {
      text: newMessage.value,
      sender: 'user'
    }, scrollToBottom)
    newMessage.value = ''
  }
}

// 滚动事件
const handleHistory = (event) => {
  if (olderMessagesAvailable.value) {
    olderMessagesAvailable.value = false
    emits('handleHistory', scrollToTop)
  }
}

// 滑动到最底部
const scrollToBottom = () => {
  nextTick(() => {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
  })
}

// 滑动到最顶部
const scrollToTop = () => {
  messageContainer.value.scrollTop = 0
}

</script>
<template>
  <div class="chat-container" >
    <div class="history" @click="handleHistory" v-if="olderMessagesAvailable">{{ historyText }}</div>
    <div class="chat-messages" ref="messageContainer">
      <div v-for="(message, index) in messages" :key="index" class="message" :class="{ 'sent': message.sender === 'user', 'received': message.sender === 'bot' }">
        <!-- 头像 -->
        <img v-if="showAvartar" class="avartar" :src="AvartarImg"/>
        <!-- 内容 -->
        <div class="message-content">
          <div v-if="message.text">{{ message.text }}</div>
          <div class="message-img" v-if="message.imageUrl">
            <img :src="AvartarImg"/>
          </div>
      </div>
      </div>
    </div>
    <div class="chat-input">
      <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.chat-container {
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}
.history{
  text-align: center;
  opacity: 0.5;
}
.chat-messages {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .message {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .sent {
    align-self: flex-end;
    flex-direction: row-reverse;
    .message-content{
      background-color: #dcf8c6;
    }
  }
  .received {
    align-self: flex-start;
    .message-content{
      background-color: #f0f0f0;
    }
  }
  .message-content{
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
    max-width: 70%;
    .message-img{
      width: 100px;
      height: 100px;
    }
  }
}

.avartar{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.chat-input {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.chat-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.chat-input button {
  padding: 8px 20px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #0056b3;
}
</style>
