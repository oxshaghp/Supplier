export default function Page() {
  return (
    <main className="w-full px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions and learn how to get the most out
            of Supplier.sa.
          </p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-xl p-6 hover:shadow-sm transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Getting Started
            </h3>
            <p className="text-gray-600 mb-4">
              Create an account, complete your profile, and list your business.
            </p>
            <a
              href="/register"
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Create your account →
            </a>
          </div>
          <div className="border rounded-xl p-6 hover:shadow-sm transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Managing Your Business
            </h3>
            <p className="text-gray-600 mb-4">
              Update business details, branches, and team members from your
              dashboard.
            </p>
            <a
              href="/dashboard"
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Open dashboard →
            </a>
          </div>
          <div className="border rounded-xl p-6 hover:shadow-sm transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Plans & Billing
            </h3>
            <p className="text-gray-600 mb-4">
              Compare plans and learn about premium features and invoices.
            </p>
            <a
              href="/subscription"
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              View plans →
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
