import type {AttributeConfig} from "v-calendar/dist/types/src/utils/attribute.d.ts"
import {MINIMUM_YEAR, VCALENDAR_MONDAY} from "~/model/constants"
import type {DayOfWeek} from "v-calendar/dist/types/src/utils/date/helpers.d.ts"

/**
 * Utility function to get the semester holidays
 * @param federalState - The federal state to get the holidays for
 * @returns AttributeConfig
 */
export default function (federalState: string = "Upper Austria"): AttributeConfig {
  const holidayStart: Date = new Date(MINIMUM_YEAR)
  const holidayEnd: Date = new Date(holidayStart)
  holidayEnd.setDate(holidayStart.getDate() + 7)

  let mondayOfMonth: DayOfWeek = 1
  switch (federalState) {
    case "Vienna":
    case "Lower Austria":
      mondayOfMonth = 1
      break
    case "Burgenland":
    case "Carinthia":
    case "Salzburg":
    case "Tyrol":
    case "Vorarlberg":
      mondayOfMonth = 2
      break
    case "Styria":
    case "Upper Austria":
      mondayOfMonth = 3
      break
  }

  return {
    key: "Semester holidays",
    highlight: "blue",
    dates: [{
      start: holidayStart,
      end: holidayEnd,
      repeat: {
        months: 2,
        from: holidayStart,
        ordinalWeekdays: [
          [mondayOfMonth, VCALENDAR_MONDAY],
        ],
      },
    }],
    popover: {
      label: "Semester holidays",
      visibility: "hover",
    },
  }
}