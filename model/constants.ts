import type {DayOfWeek} from "v-calendar/dist/types/src/utils/date/helpers.d.ts"

export const MINIMUM_YEAR: number = new Date().getFullYear()
// TODO: Perhaps add user definable maximum year?
export const MAXIMUM_YEAR: number = 2050

export const VCALENDAR_MONDAY: DayOfWeek = 2
export const VCALENDAR_TUESDAY: DayOfWeek = 3
export const VCALENDAR_WEDNESDAY: DayOfWeek = 4
export const VCALENDAR_THURSDAY: DayOfWeek = 5
export const VCALENDAR_FRIDAY: DayOfWeek = 6
export const VCALENDAR_SATURDAY: DayOfWeek = 7
export const VCALENDAR_SUNDAY: DayOfWeek = 1
