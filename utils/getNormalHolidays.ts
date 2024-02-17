import type {AttributeConfig} from "v-calendar/dist/types/src/utils/attribute.d.ts"
import Holidays from "date-holidays"

/**
 * The holidays class which manages the holidays
 */
const hd: Holidays = new Holidays("AT")
/**
 * The holidays to exclude
 */
// TODO: Go from string check to date object check
const excludedHolidays: string[] = ["10-26"]
/**
 * Utility function to get the normal holidays of a year
 * @param year - The year to get the holidays for
 * @param language - The language to get the holidays for
 * @param color - The color for the holidays
 * @returns AttributeConfig[]
 */
export default function (year: number, language: string = "en", color: string = "red"): AttributeConfig[] {
  const holidayList = hd.getHolidays(year, language)

  const returnArray: AttributeConfig[] = []
  for (const holiday of holidayList) {
    if (excludedHolidays.includes(holiday.date)) {
      continue
    }
    const temp: AttributeConfig = {
      key: holiday.name,
      highlight: color,
      dates: [{
        start: new Date(holiday.start),
        end: new Date(holiday.start),
      }],
      popover: {
        label: holiday.name,
        visibility: "hover",
      },
    }
    returnArray.push(temp)
  }
  return returnArray
}