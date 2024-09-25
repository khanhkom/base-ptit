/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ItemProps {
  isLast: boolean;
  item: { label: string; value: string };
}

export interface DayProps {
  date: any;
  type: number;
  listKeys?: Array<string>;
  onDayChoose?: string;
  onDayPress?: (e: string) => void;
}
