import type {AttributeConfig} from "v-calendar/dist/types/src/utils/attribute.d.ts"

export default function (year: number): AttributeConfig {
  return {
    key: "Autumn holidays",
    highlight: "teal",
    dates: [{
      start: new Date(year, 9, 27),
      end: new Date(year, 9, 31),
    }],
    popover: {
      label: "Autumn holidays",
      visibility: "hover",
    },
  }
}