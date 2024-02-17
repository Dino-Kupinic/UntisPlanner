// import type {AttributeConfig} from "v-calendar/dist/types/src/utils/attribute.d.ts"
// import {MAXIMUM_YEAR, MINIMUM_YEAR} from "~/model/constants"
//
// /**
//  * The color for the holiday
//  */
// const DEFAULT_HOLIDAY_COLOR: string = "purple"
//
// /**
//  * Checks if the color isn't empty
//  * @param holidayColor
//  */
// function isValidColor(holidayColor: string): boolean {
//   return holidayColor.trim() !== ""
// }
//
// /**
//  * Utility function to get the federal state holiday
//  * @param holidayColor - The color for the holiday
//  * @returns AttributeConfig
//  */
// // TODO: if needed, add option for providing highlight object
// export default function (holidayColor: string = DEFAULT_HOLIDAY_COLOR): AttributeConfig {
//   const MONTH_OCTOBER: number = 10
//   const NATIONAL_HOLIDAY_DAY: number = 26
//
//   if (!isValidColor(holidayColor)) {
//     throw new Error("Invalid color")
//   }
//
//   return {
//     key: "nationalHoliday",
//     highlight: holidayColor,
//     dates: [{
//       repeat: {
//         every: [12, "months"],
//         from: new Date(MINIMUM_YEAR, MONTH_OCTOBER - 1, NATIONAL_HOLIDAY_DAY),
//         until: new Date(MAXIMUM_YEAR, MONTH_OCTOBER - 1, NATIONAL_HOLIDAY_DAY),
//         on: dayParts => dayParts.day == NATIONAL_HOLIDAY_DAY && dayParts.month == MONTH_OCTOBER,
//       },
//     }],
//     popover: getPopOver("National holiday"),
//   }
// }
