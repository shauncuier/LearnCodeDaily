import { Helmet } from 'react-helmet-async';
import { 
  FiTarget, 
  FiUsers, 
  FiTrendingUp,
  FiAward,
  FiHeart,
  FiShield,
  FiZap,
  FiGlobe
} from 'react-icons/fi';

const About = () => {
  const stats = [
    { number: '50,000+', label: 'Active Job Seekers', icon: FiUsers },
    { number: '10,000+', label: 'Companies Trust Us', icon: FiShield },
    { number: '100,000+', label: 'Jobs Posted', icon: FiTrendingUp },
    { number: '85%', label: 'Success Rate', icon: FiAward }
  ];

  const values = [
    {
      icon: FiTarget,
      title: 'Mission-Driven',
      description: 'We believe everyone deserves meaningful work that aligns with their goals and values.'
    },
    {
      icon: FiHeart,
      title: 'People First',
      description: 'Our platform puts people at the center, creating genuine connections between talent and opportunity.'
    },
    {
      icon: FiZap,
      title: 'Innovation',
      description: 'We leverage cutting-edge technology to make job searching and hiring more efficient and effective.'
    },
    {
      icon: FiGlobe,
      title: 'Global Impact',
      description: 'We\'re building a worldwide community where talent knows no boundaries.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      bio: 'Former VP of Engineering at tech unicorn with 15+ years in talent acquisition.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      bio: 'Ex-Google engineer passionate about building scalable platforms that connect people.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'Product strategist with deep expertise in user experience and marketplace dynamics.'
    },
    {
      name: 'David Kim',
      role: 'Head of Growth',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'Growth expert who has helped scale multiple B2B platforms from startup to IPO.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Career Code</title>
        <meta name="description" content="Learn about Career Code's mission to connect talented professionals with their dream jobs and help companies find the perfect candidates." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative container-custom py-24">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Building the Future of
                <span className="block text-secondary-300">Career Connections</span>
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
                We're on a mission to transform how people find meaningful work and how companies discover exceptional talent.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-3">
                      <stat.icon size={32} className="text-secondary-300" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="text-primary-200 text-sm md:text-base">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
              </div>
              
              <div className="prose prose-lg prose-gray max-w-none">
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Career Code was born from a simple yet powerful observation: the traditional job search process was broken. Too many talented individuals were struggling to find opportunities that matched their skills and aspirations, while companies were having difficulty identifying the right candidates.
                </p>
                
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Founded in 2020 by a team of former tech executives and HR professionals, we set out to create a platform that would revolutionize how people connect with career opportunities. We believed that by leveraging modern technology, data-driven insights, and a human-centered approach, we could create a better experience for everyone involved.
                </p>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Today, Career Code has grown to become one of the leading job platforms, helping thousands of professionals find their dream jobs and enabling companies of all sizes to build exceptional teams. But we're just getting started – our vision is to create a world where everyone has access to meaningful work that fulfills their potential.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These core principles guide everything we do and shape the culture we're building at Career Code.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                    <value.icon size={32} className="text-primary-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're a diverse group of passionate individuals united by our mission to transform the world of work.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Career Code?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're not just another job board. We're your partner in career success.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <FiTarget size={24} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Matching</h3>
                      <p className="text-gray-600">Our advanced algorithms match you with opportunities that align with your skills, experience, and career goals.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <FiShield size={24} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Trusted by Top Companies</h3>
                      <p className="text-gray-600">From startups to Fortune 500 companies, the best organizations use Career Code to find exceptional talent.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <FiZap size={24} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast Process</h3>
                      <p className="text-gray-600">Our streamlined application process gets you connected with opportunities faster than traditional methods.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <FiHeart size={24} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Career Support</h3>
                      <p className="text-gray-600">Get access to career resources, interview tips, and personalized guidance from our expert team.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                  alt="Team collaboration"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-primary-600 opacity-10 rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have found their dream jobs through Career Code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register" className="btn-secondary">
                Get Started Today
              </a>
              <a href="/jobs" className="btn-outline">
                Browse Jobs
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
