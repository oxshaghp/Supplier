export default function Page() {
  return (
    <main className="w-full px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how local businesses grew faster with Supplier.sa.
          </p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-xl p-6 hover:shadow-sm transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Al-Nour Catering
            </h3>
            <p className="text-gray-600">
              Increased B2B leads by 60% after optimizing their profile and
              upgrading to Premium.
            </p>
          </div>
          <div className="border rounded-xl p-6 hover:shadow-sm transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              GreenTech Supplies
            </h3>
            <p className="text-gray-600">
              Expanded into two new regions using branch management and
              analytics.
            </p>
          </div>
          <div className="border rounded-xl p-6 hover:shadow-sm transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Desert Logistics
            </h3>
            <p className="text-gray-600">
              Streamlined client communication with the built-in messaging
              tools.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
