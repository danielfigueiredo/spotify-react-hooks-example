export type Day = {
  key: string;
  day: number;
  utc: number;
  date: Date;
  isSelected: boolean;
  isEnabled: boolean;
};

export type PotentialDay = Day | undefined;

export type DayMap = { [key: string]: Day };
