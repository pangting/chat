<script setup>
import Chat from './Chat.vue'
import useMessages from '../composables/useMessages'
const inintialMessage = [
  {
    text: '主人好，我是智能助理，你的贴心小助手~',
    sender: 'bot'
  },
  {
    imageUrl: 'sjkdfksdlfsd',
    sender: 'bot'
  }
]
const { messages, appendMsgs, prependMsgs } = useMessages(inintialMessage)
// 发送消息
const sendMessage = (obj, callback) => {
  appendMsgs(obj)
  setTimeout(() => {
    appendMsgs({ sender: 'bot', text: 'This is a bot response.' })
    callback()
  }, 500)
}
// 加载历史消息
const handleHistory = (callback) => {
  for (let i = 0; i < 5; i++) {
    prependMsgs({ sender: 'bot', text: 'This is an older bot message.' })
    callback()
  }
}
</script>
<template>
  <main>
    <Chat
      :messages="messages"
      :showAvartar="true"
      @sendMessage="sendMessage"
      @handleHistory="handleHistory"
    />
  </main>
</template>
