import type {AttributeConfig} from "v-calendar/dist/types/src/utils/attribute.d.ts"
import Holidays from "date-holidays"
const hd: Holidays = new Holidays("AT")

const excludedHolidays: string[] = ["10-26"]
export default function (year: number, language: string = "en"): AttributeConfig[] {
  const h = hd.getHolidays(year, language)

  const returnArray: AttributeConfig[] = []
  for (const holiday of h) {
    if (excludedHolidays.includes(holiday.date)) {
      continue
    }
    const temp: AttributeConfig = {
      key: holiday.name,
      highlight: "red",
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