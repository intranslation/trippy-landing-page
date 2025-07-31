import { create } from "zustand";

type LocaleTypes = "en-US" | "pt-BR";

export const useIntlStore = create<{
  locale: LocaleTypes;
  setLocale: (locale: LocaleTypes) => void;
}>((set) => ({
  locale: "en-US",
  setLocale: (locale) => set(() => ({ locale })),
}));
