import { useTheme as useThemeFromContext } from "@/context/theme-context";

export function useTheme() {
  return useThemeFromContext();
}
