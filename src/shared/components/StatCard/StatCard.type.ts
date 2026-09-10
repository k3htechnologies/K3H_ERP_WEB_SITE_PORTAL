export interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendColor?: "success" | "danger";
}