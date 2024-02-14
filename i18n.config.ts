export default defineI18nConfig(() => ({
  legacy: false,
  locale: "English",
  messages: {
    English: {
      // Settings
      welcome: "Welcome to UntisPlanner",
      theme: "Theme",
      language: "Language",
      addCustomHolidayTitle: "Add custom holidays",
      addCustomHolidayErrorTitle: "Oops... something went wrong!",
      addCustomHolidayErrorBody: "You can only add up to 5 custom holidays.",
    },
    German: {
      // Settings
      welcome: "Willkommen bei UntisPlanner",
      theme: "Farbschema",
      language: "Sprache",
      addCustomHolidayTitle: "Eigene Feiertage hinzufügen",
      addCustomHolidayErrorTitle: "Ups... etwas ist schief gegangen!",
      addCustomHolidayErrorBody: "Du kannst nur bis zu 5 eigene Feiertage hinzufügen.",
    },
  },
}))