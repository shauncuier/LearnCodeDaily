# 🩸 BloodCare+ - Blood Management System

A comprehensive blood donation and request management platform built with **Next.js 15**, **React 19**, and **SQLite**. BloodCare+ connects donors with patients in need, enables volunteer coordination, and provides powerful analytics for blood banks.

![BloodCare+ Homepage](/C:/Users/jashe/.gemini/antigravity/brain/12fe32a7-d98e-45f8-8cd5-7609f6066a00/home_page_modern_1763934830973.png)

## ✨ Features

### Core Functionality
- 🔍 **Advanced Donor Search** - Search by blood group, district, and upazila (sub-district)
- 📝 **Donor Registration** - Register with granular location data (district, upazila, village)
- 🆘 **Blood Request Management** - Create, track, and manage blood requests with urgency levels
- 👥 **Volunteer Network** - Register as a volunteer and join the community
- 📊 **Analytics Dashboard** - Visualize donation statistics and trends

### Advanced Features
- 🔐 **Role-Based Authentication** - Secure login with user roles (User, Donor, Volunteer, Admin, Super Admin)
- 🎨 **Modern UI/UX** - Glassmorphism effects, responsive design, and mobile-friendly
- 🌍 **Rural Area Support** - Granular location tracking for remote areas
- 🏥 **Hospital Integration** - Track blood requests by hospital and location
- 📈 **Real-time Updates** - Live status tracking for blood requests

### Upcoming Features
- 👤 User Profiles with donation history
- 🏅 Gamification and badges system
- 📅 Appointment scheduling
- 📧 Email notifications
- 📦 Blood inventory management

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [SQLite](https://www.sqlite.org/) with [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- **Language**: JavaScript (ES6+)
- **Authentication**: Context API with localStorage

## 📦 Installation

### Prerequisites
- **Node.js** 18+ and npm/yarn
- **Git** (for cloning)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bloodcare-plus.git
   cd bloodcare-plus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:3000
   ```

The SQLite database will be created automatically on first run.

## 🗂️ Project Structure

```
bloodcare-plus/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── analytics/    # Analytics endpoints
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   ├── donors/       # Donor management
│   │   │   ├── requests/     # Blood request management
│   │   │   └── volunteers/   # Volunteer management
│   │   ├── dashboard/         # Analytics dashboard
│   │   ├── login/            # Login page
│   │   ├── register/         # Registration pages
│   │   ├── requests/         # Blood requests pages
│   │   ├── search/           # Donor search
│   │   └── volunteer/        # Volunteer pages
│   ├── components/            # Reusable components
│   │   ├── Navigation.js     # Main navigation bar
│   │   └── Footer.js         # Footer component
│   ├── context/               # React Context providers
│   │   └── AuthContext.js    # Authentication context
│   ├── lib/                   # Utilities and helpers
│   │   └── db.js             # Database initialization
│   └── globals.css            # Global styles
├── bloodbank_v2.db            # SQLite database (auto-generated)
└── package.json               # Dependencies
```

## 📊 Database Schema

### Tables
- **users** - User accounts with roles and profile information
- **donors** - Donor details with blood group and location
- **volunteers** - Volunteer registrations
- **blood_requests** - Blood requests with urgency and status
- **donation_history** - Track donation records
- **badges** - Achievement badges
- **user_badges** - User-badge relationships

## 🎯 Usage

### As a Donor
1. Navigate to "Register as Donor"
2. Fill in your details (name, blood group, location, contact)
3. Submit the form
4. Your profile is now searchable by those in need

### As a Patient/Requester
1. Go to "Blood Requests"
2. Click "+ Create Request"
3. Enter patient details, blood group, urgency level
4. Submit - donors will see your request
5. Donors can contact you directly via phone/email

### As a Volunteer
1. Click "Volunteer" in the navigation
2. Register with your details
3. Join the volunteer network

### As an Admin
1. Login with admin credentials
2. Access the Dashboard
3. View analytics and system statistics

## 🔒 Authentication

The app uses Context API for state management with localStorage persistence. Future improvements will include:
- JWT tokens for secure sessions
- Password hashing (bcrypt)
- NextAuth.js integration
- Session expiry and refresh tokens

## 🛠️ Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Environment Variables (Future)
Create a `.env.local` file for configuration:
```env
DATABASE_URL=./bloodbank.db
JWT_SECRET=your_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shaun Cuier**  
GitHub: [@shauncuier](https://github.com/shauncuier)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- better-sqlite3 for the reliable database solution
- All contributors and donors who make this platform possible

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: support@bloodcareplus.com

---

**Made with ❤️ for saving lives**
