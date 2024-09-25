export interface Props {
  onChangeTab?: (e: number) => void;
  onSearch?: () => void;
  arrowLeft?: () => void;
  arrowRight?: () => void;
  title: string;
  currentIndex: number;
}
