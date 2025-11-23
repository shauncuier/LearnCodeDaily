import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground mt-12 py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-primary">BloodCare+</h3>
                        <p className="text-sm">Connecting blood donors with those in need. Save a life today.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/search" className="hover:text-primary">Find Donors</Link></li>
                            <li><Link href="/request" className="hover:text-primary">Request Blood</Link></li>
                            <li><Link href="/register" className="hover:text-primary">Register as Donor</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact</h3>
                        <p className="text-sm">Email: support@bloodcareplus.com</p>
                        <p className="text-sm">Phone: +1 (555) 123-4567</p>
                    </div>
                </div>
                <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} BloodCare+. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
