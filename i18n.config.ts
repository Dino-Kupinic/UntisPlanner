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
      addCustomHolidayDateLabel: "Date",
      holidayPlaceholder: "Name of Holiday",
      SubmitHoliday: "Submit",
      holidayTableEndColumn: "End",
      // Nav
      NavSettingsButton: "Settings",
      NavInfoButton: "Info",
      NavInfoBugReport: "Report a bug",
      NavCouldntFetchVersion: "Couldn't fetch version",
      // Footer
      FooterMadeWithLove: "Made with",
      FooterLicense: "Released under the",
      // Generator Settings
      GeneratorFederalStateLabel: "Federal State",
      GeneratorPeriodLabel: "Period",
      GeneratorLessonDaysLabel: "Lesson Days",
      GeneratorTeacherLabel: "Teacher",
    },
    German: {
      // Settings
      welcome: "Willkommen bei UntisPlanner",
      theme: "Farbschema",
      language: "Sprache",
      addCustomHolidayTitle: "Eigene Feiertage hinzufügen",
      addCustomHolidayErrorTitle: "Ups... etwas ist schief gegangen!",
      addCustomHolidayErrorBody: "Du kannst nur bis zu 5 eigene Feiertage hinzufügen.",
      addCustomHolidayDateLabel: "Datum",
      holidayPlaceholder: "Name des Feiertags",
      SubmitHoliday: "Hinzufügen",
      holidayTableEndColumn: "Ende",
      // Nav
      NavSettingsButton: "Einstellungen",
      NavInfoButton: "Informationen",
      NavInfoBugReport: "Einen Fehler melden",
      NavCouldntFetchVersion: "Konnte Version nicht laden",
      // Footer
      FooterMadeWithLove: "Gemacht mit",
      FooterLicense: "Veröffentlicht unter der",
      // Generator Settings
      GeneratorFederalStateLabel: "Bundesland",
      GeneratorPeriodLabel: "Periode",
      GeneratorLessonDaysLabel: "Unterrichtstage",
      GeneratorTeacherLabel: "Lehrer",
    },
  },
}))