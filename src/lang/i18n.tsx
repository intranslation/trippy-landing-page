import { type PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";
import { useIntlStore } from "../store/intl-store";

const messages = {
  "en-US": {
    logo: "logo",
    demo: "This demo app was internationalized by react-intl",
    now: "Current date and time are {currentDateTime, date, ::EEE, MMM d, yyyy h:mm a}",
  },
  "ar-EG": {
    logo: "رمز التطبيق",
    demo: "تم تدويل هذا التطبيق التجريبي بواسطة رياكت إنتل",
    now: "التاريخ والوقت الحاليان هما {currentDateTime, date, ::EEE, MMM d, yyyy h:mm a}",
  },
};

function I18n({ children }: PropsWithChildren) {
  const { locale } = useIntlStore();

  return (
    <IntlProvider
      messages={messages[locale as keyof typeof messages]}
      locale={locale}
      key={locale}
    >
      {children}
    </IntlProvider>
  );
}

export default I18n;
