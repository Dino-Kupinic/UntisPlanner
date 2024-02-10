import type {Teacher} from "~/model/teacher"

export const useTableExportStore = defineStore("tableExport", () => {
  const teachers = ref<Teacher[]>([])

  function loadSelections(selection: Teacher[]){
    teachers.value = selection
  }


  return {teachers, loadSelections}
})