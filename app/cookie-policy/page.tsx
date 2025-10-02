export default function Page() {
  return (
    <main className="w-full px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn how Supplier.sa uses cookies to improve your experience.
          </p>
        </section>
        <section className="space-y-6 max-w-3xl mx-auto">
          <div className="border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              What are cookies?
            </h2>
            <p className="text-gray-600">
              Cookies are small text files stored on your device to help
              websites function and analyze usage.
            </p>
          </div>
          <div className="border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              How we use cookies
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Essential cookies for authentication and security</li>
              <li>Preference cookies to remember language and settings</li>
              <li>Analytics cookies to understand performance</li>
            </ul>
          </div>
          <div className="border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Managing cookies
            </h2>
            <p className="text-gray-600">
              You can control cookies through your browser settings. Disabling
              some cookies may affect site functionality.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
