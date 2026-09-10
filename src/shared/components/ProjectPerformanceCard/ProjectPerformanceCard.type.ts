export interface ProjectPerformanceCardProps {
  id: string | number;
  imageUrl: string;
  projectName: string;
  bookings: number;
  bookingValue: string;
  brokerageValue: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}
