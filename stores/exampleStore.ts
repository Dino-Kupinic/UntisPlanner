export const useExampleStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Dino Kupinic')
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return { count, name, doubleCount, increment }
})