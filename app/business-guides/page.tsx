export default function Page() {
  return (
    <main className="w-full px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Business Guides
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Practical, step-by-step guides to help your business grow and reach
            more customers.
          </p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="border rounded-xl p-6 hover:shadow-sm transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Optimize Your Profile
            </h3>
            <p className="text-gray-600">
              Tips for photos, descriptions, and categories to improve
              visibility.
            </p>
          </article>
          <article className="border rounded-xl p-6 hover:shadow-sm transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Collect and Showcase Reviews
            </h3>
            <p className="text-gray-600">
              Build trust with verified reviews and testimonials.
            </p>
          </article>
          <article className="border rounded-xl p-6 hover:shadow-sm transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Branch and Team Management
            </h3>
            <p className="text-gray-600">
              Add branches, manage roles, and keep information up to date.
            </p>
          </article>
          <article className="border rounded-xl p-6 hover:shadow-sm transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Upgrading to Premium
            </h3>
            <p className="text-gray-600">
              Unlock advanced search placement, analytics, and messaging.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
