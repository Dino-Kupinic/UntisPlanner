import type {AttributeConfig} from "v-calendar/dist/types/src/utils/attribute.d.ts"
import type {ExportHoliday} from "~/model/holiday"

/**
 * Utility function to create an Attribute objects for the custom holidays
 * @param holidays - The holidays to create the attributes for
 */
export default function (holidays: ExportHoliday[]): AttributeConfig[] {
  const returnArray: AttributeConfig[] = [{}]
  // TODO: add the color to the type?
  const COLOR: string = "red"

  holidays.forEach((item: ExportHoliday) => {
    const temp: AttributeConfig = {
      key: item.name,
      highlight: COLOR,
      dates: [{
        start: new Date(item.start),
        end: new Date(item.end),
      }],
      popover: getPopOver(item.name),
    }
    returnArray.push(temp)
  })
  return returnArray
}