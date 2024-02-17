import type {AttributeConfig} from "v-calendar/dist/types/src/utils/attribute.d.ts"
import {MINIMUM_YEAR} from "~/model/constants"

export default function (year: number = MINIMUM_YEAR): AttributeConfig {
  const holidayStart: Date = new Date(year, 11, 24)
  const holidayEnd: Date = new Date(holidayStart)
  holidayEnd.setDate(holidayStart.getDate() + 14)

  return {
    key: "Christmas holidays",
    highlight: "indigo",
    dates: [{
      start: holidayStart,
      end: holidayEnd,
    }],
    popover: {
      label: "Christmas holidays",
      visibility: "hover",
    },
  }
}