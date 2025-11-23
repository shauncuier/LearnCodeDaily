import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-10">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-red-800 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Donate Blood, <br />
            <span className="text-red-200">Save a Life.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-red-100 font-light">
            Join our community of heroes. Find donors near you or register to become one today. Every drop counts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-red-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Find Donors
            </Link>
            <Link
              href="/register"
              className="bg-red-900/30 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-900/50 transition-all transform hover:scale-105"
            >
              Register as Donor
            </Link>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="glass p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 text-3xl">🩸</div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Why Donate?</h2>
          <p className="text-gray-600 leading-relaxed">
            Blood is essential for surgeries, cancer treatment, chronic illnesses, and traumatic injuries. One donation can save up to three lives.
          </p>
        </div>
        <div className="glass p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 text-3xl">🔍</div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Find Donors</h2>
          <p className="text-gray-600 leading-relaxed">
            Our advanced search allows you to find donors by blood group and specific location (District, Upazila) quickly in case of emergency.
          </p>
        </div>
        <div className="glass p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 text-3xl">🚑</div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Emergency Request</h2>
          <p className="text-gray-600 leading-relaxed">
            Post a blood request to notify nearby donors immediately. We connect patients with willing volunteers instantly.
          </p>
        </div>
      </section>
    </div>
  );
}
