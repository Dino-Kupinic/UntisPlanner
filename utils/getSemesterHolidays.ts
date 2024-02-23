import type {AttributeConfig} from "v-calendar/dist/types/src/utils/attribute.d.ts"
import {MINIMUM_YEAR, VCALENDAR_MONDAY} from "~/model/constants"
import type {DayOfWeek} from "v-calendar/dist/types/src/utils/date/helpers.d.ts"

/**
 * Utility function to get the semester holidays
 * @param year - the year
 * @param federalState - The federal state to get the holidays for
 * @returns AttributeConfig
 */
export default function (federalState: string = "Upper Austria", year: number = MINIMUM_YEAR): AttributeConfig {
  let holidayStart: Date = new Date(year)

  let mondayOfMonth: DayOfWeek = 1
  switch (federalState) {
    case "Vienna":
    case "Lower Austria":
      mondayOfMonth = 1
      holidayStart = findMondayInFebruary(mondayOfMonth, year)
      break
    case "Burgenland":
    case "Carinthia":
    case "Salzburg":
    case "Tyrol":
    case "Vorarlberg":
      mondayOfMonth = 2
      holidayStart = findMondayInFebruary(mondayOfMonth, year)
      break
    case "Styria":
    case "Upper Austria":
      mondayOfMonth = 3
      holidayStart = findMondayInFebruary(mondayOfMonth, year)
      break
  }

  const holidayEnd: Date = new Date(holidayStart)
  holidayEnd.setDate(holidayStart.getDate() + 6)

  return {
    key: "Semester holidays",
    highlight: "blue",
    dates: [{
      start: holidayStart,
      end: holidayEnd,
    }],
    popover: {
      label: "Semester holidays",
      visibility: "hover",
    },
  }
}

/**
 * Find the Monday in February
 * @param weekNumber - The week number
 * @param year - The year
 */
function findMondayInFebruary(weekNumber: number, year: number): Date {
  const februaryStart: Date = new Date(year, 1, 1)
  const daysUntilMonday: number = (1 - februaryStart.getDay() + 7) % 7
  const monday: number = 1 + daysUntilMonday + (weekNumber - 1) * 7

  return new Date(year, 1, monday)
}
