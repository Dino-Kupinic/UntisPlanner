import type {AttributeConfig} from "v-calendar/dist/types/src/utils/attribute.d.ts"
import type {DayOfWeek} from "v-calendar/dist/types/src/utils/date/helpers.d.ts"
import {MINIMUM_YEAR} from "~/model/constants"

/**
 * Utility function to get the summer holidays
 * @param federalState - The federal state to get the holidays for
 * @param year - The year to get the holidays for
 * @returns AttributeConfig
 */
export default function (federalState: string = "Upper Austria", year: number = MINIMUM_YEAR): AttributeConfig {
  let startDate: Date = new Date(year)

  let mondayOfMonth: number = 1
  switch (federalState) {
    case "Vienna":
    case "Burgenland":
    case "Lower Austria":
      mondayOfMonth = 1
      startDate = findSummerHolidayStart(mondayOfMonth, year)
      break
    case "Carinthia":
    case "Upper Austria":
    case "Salzburg":
    case "Tyrol":
    case "Vorarlberg":
    case "Styria":
      mondayOfMonth = 2
      startDate = findSummerHolidayStart(mondayOfMonth, year)
      break
  }

  const endDate: Date = findMondayInSeptember(mondayOfMonth, year);
  const sundayDate: Date = new Date(endDate);
  sundayDate.setDate(endDate.getDate() - 1);

  return {
    key: "Summer holidays",
    highlight: "yellow",
    dates: [{
      start: startDate,
      end: sundayDate,
    }],
    popover: {
      label: "Summer holidays",
      visibility: "hover",
    },
  }
}

/**
 * Find the start of the summer holidays
 * @param monday - The monday of the month
 * @param year - The year
 */
function findSummerHolidayStart(monday: number, year: number) {
  let startDate: Date
  let endDate: Date
  if (monday == 1) {
    startDate = new Date(year, 5, 28)
    endDate = new Date(year, 6, 4)
  } else {
    startDate = new Date(year, 6, 5)
    endDate = new Date(year, 6, 11)
  }

  while (startDate <= endDate) {
    if (startDate.getDay() === 6) {
      return startDate
    }

    startDate.setDate(startDate.getDate() + 1)
  }
  return endDate
}

/**
 * Find the monday in september
 * @param weekNumber - The week number
 * @param year - The year
 */
function findMondayInSeptember(weekNumber: number, year: number): Date {
  const septemberStart: Date = new Date(year, 8, 1);
  const daysUntilMonday: number = (1 - septemberStart.getDay() + 7) % 7;
  const monday: number = 1 + daysUntilMonday + (weekNumber - 1) * 7;

  return new Date(year, 8, monday);
}


