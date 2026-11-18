import {
  Briefcase,
  CalendarDays,
  Camera,
  Flower2,
  GraduationCap,
  House,
  LayoutGrid,
  Wrench,
  type LucideProps,
} from "lucide-react";
import type { IconKey } from "@/lib/data";

const map = {
  wrench: Wrench,
  home: House,
  calendar: CalendarDays,
  briefcase: Briefcase,
  graduation: GraduationCap,
  flower: Flower2,
  camera: Camera,
  grid: LayoutGrid,
};

export default function CategoryIcon({ name, ...props }: { name: IconKey } & LucideProps) {
  const Icon = map[name];
  return <Icon {...props} />;
}
