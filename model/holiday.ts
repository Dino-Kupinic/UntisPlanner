export interface InputHoliday {
  name: string,
  date: {start: Date, end: Date}
}

export interface ExportHoliday{
  name: string
  start: Date
  end: Date
}

export interface ViewHoliday{
  name: string
  start: string
  end: string
}
