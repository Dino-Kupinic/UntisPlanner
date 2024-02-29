export const useTeacherGroupStore = defineStore("teacherGroup", () => {
  const teacherGroups = ref<string[]>([])
  return {teacherGroups}
}, {
  persist: true
})