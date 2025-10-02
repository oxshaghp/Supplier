export default function Page() {
  return (
    <main className="w-full px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are here 24/7 to help you. Choose the option that suits you best.
          </p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Open a Ticket
            </h3>
            <p className="text-gray-600 mb-4">
              Describe your issue and we’ll get back to you shortly.
            </p>
            <a
              href="/login"
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Sign in to create a ticket →
            </a>
          </div>
          <div className="border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Knowledge Base
            </h3>
            <p className="text-gray-600 mb-4">
              Browse articles and guides written by our team.
            </p>
            <a
              href="/help-center"
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Browse help articles →
            </a>
          </div>
          <div className="border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Contact Us
            </h3>
            <p className="text-gray-600 mb-4">
              Prefer direct contact? Reach out to our support team.
            </p>
            <a
              href="mailto:support@supplier.sa"
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Email support →
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
