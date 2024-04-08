import { ref } from 'vue'
const makeMsg = (text, sender) => {
  if (text.trim() !== '') {
    return {
      text,
      sender,
    }
  }
}
export default function useMessages (initialMessages) {
  const messages = ref(initialMessages)
  // 前置消息
  const prependMsgs = ({ text, sender }) => {
    messages.value.unshift(makeMsg(text, sender))
  }
  // 后置消息
  const appendMsgs = ({ text, sender }) => {
    messages.value.push(makeMsg(text, sender))
  }

  return {
    messages,
    appendMsgs,
    prependMsgs
  }
}