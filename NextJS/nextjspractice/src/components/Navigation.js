import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">BloodCare+</Link>
        <div className="space-x-4">
          <Link href="/donors" className="hover:text-gray-300">Donors</Link>
          <Link href="/requests" className="hover:text-gray-300">Requests</Link>
          <Link href="/events" className="hover:text-gray-300">Events</Link>
          <Link href="/admin" className="hover:text-gray-300">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
