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

export type Color = {
  name: string;
  value: string;
};

export type LegendHoliday = {
  name: string;
  color: Color
};
