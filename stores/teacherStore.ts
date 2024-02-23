export const useTeacherStore = defineStore("teacher", () => {
  const teachers = ref<string[]>([])
  return {teachers}
}, {
  persist: true
})