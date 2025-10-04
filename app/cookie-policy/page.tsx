import { useLanguage } from "../../lib/LanguageContext";

export default function Page() {
  const { t } = useLanguage("cookie");
  return (
    <main className="w-full px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("cookie.title")}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("cookie.intro")}</p>
        </section>
        <section className="space-y-6 max-w-3xl mx-auto">
          <div className="border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t("cookie.whatAreTitle")}
            </h2>
            <p className="text-gray-600">{t("cookie.whatAreDesc")}</p>
          </div>
          <div className="border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t("cookie.howWeUseTitle")}
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>{t("cookie.howWeUseList.essential")}</li>
              <li>{t("cookie.howWeUseList.preference")}</li>
              <li>{t("cookie.howWeUseList.analytics")}</li>
            </ul>
          </div>
          <div className="border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t("cookie.manageTitle")}
            </h2>
            <p className="text-gray-600">{t("cookie.manageDesc")}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
