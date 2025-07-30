

export default function Home() {
  return (
    <main>
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-red-600 mb-4">BloodCare+</h1>
        <p className="text-xl mb-8">Comprehensive Blood Management System</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Donor Management</h2>
            <p>Register and manage blood donors with eligibility tracking</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Blood Requests</h2>
            <p>Submit and manage blood requests with real-time status</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Event Management</h2>
            <p>Organize and participate in blood donation events</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Admin Dashboard</h2>
            <p>Comprehensive dashboard for system management</p>
          </div>
        </div>
        
        <div className="mt-10">
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 mr-4">
            Register as Donor
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
            Request Blood
          </button>
        </div>
      </div>
    </main>
  );
}
