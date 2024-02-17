import type {AttributeConfig} from "v-calendar/dist/types/src/utils/attribute.d.ts"
// @ts-ignore
import {easter} from "date-easter"
import Holidays from "date-holidays"

/**
 * The holidays class which manages the holidays
 */
const hd: Holidays = new Holidays("AT")

/**
 * Utility function to get the Easter holidays
 * @param year - The year to get the holidays for
 * @param language - The language to get the holidays for
 */
export default function (year: number, language: string = "de-at"): AttributeConfig {
  const holidays = hd.getHolidays(year, language)

  const easterDay = easter(year);
  const palmSaturday = new Date(easterDay);
  palmSaturday.setDate(palmSaturday.getDate() - 8)

  const easterMonday = holidays.filter((holiday) => holiday.name === "Ostermontag")[0].date;

  return {
    key: "Easter holidays",
    highlight: "pink",
    dates: [{
      start: palmSaturday,
      end: easterMonday,
    }],
    popover: {
      label: "Easter holidays",
      visibility: "hover",
    },
  }
}
