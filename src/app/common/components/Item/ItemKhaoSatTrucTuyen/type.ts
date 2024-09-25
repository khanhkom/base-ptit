/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Props {
  item: any;
  handleNavigate?: () => void;
  index: number;
  type: string;
  refreshData: () => void;
  // listKSDone: string[];
}
