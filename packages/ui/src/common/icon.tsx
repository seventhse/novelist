import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { LucideProps } from "lucide-react";
import type { ReactNode } from "react";

export interface IconProps extends LucideProps {
  name: IconName;
  color?: string;
  size?: number;
  fallback?: () => ReactNode;
}

export {
  IconName
}

export function Icon(props: IconProps) {
  return <DynamicIcon {...props} />;
}
