import type {Teacher} from "~/model/teacher"
import type {ExportHoliday} from "~/model/holiday"

export interface Configuration {
  teacher: String[]
  teacherGroup: String[]
  customHolidays: ExportHoliday[]
}