import type { ComponentType } from "react";
import type { Option } from "@/shared/constants";

export type AuthStep = "mobile" | "otp" | "mpin";

export type FieldType = "text" | "email" | "number" | "textarea" | "dropdown";

export interface RegistrationFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  options?: Option[];
  component?: ComponentType<any>;
  props?: Record<string, unknown>;
}
