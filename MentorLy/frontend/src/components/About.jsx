"use client"

import { Video, BookOpen, BarChart3, Users, Library, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

export default function AboutUsPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: Video,
      title: "Live Classes",
      description: "Host interactive live sessions with real-time engagement",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: BookOpen,
      title: "Smart Assignments",
      description: "Create and distribute assignments with automated grading",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: BarChart3,
      title: "Performance Tracker",
      description: "Monitor student progress with detailed analytics",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: Users,
      title: "Student Engagement",
      description: "Foster collaboration through interactive tools",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Library,
      title: "Resource Library",
      description: "Organize and share educational materials seamlessly",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Gain insights with comprehensive reporting tools",
      gradient: "from-pink-500 to-purple-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-indigo-600/10" />
        <div className="container mx-auto px-4 relative">
          <div className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="inline-block px-4 py-2 mb-6 text-white text-sm font-medium bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full">
              About Mentorly
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Empowering Learning,<br />Anywhere, Anytime
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Mentorly transforms the way educators teach and students learn through innovative technology, making quality education accessible to everyone, everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Our Mission & Vision</h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              At Mentorly, we believe that every educator deserves powerful tools to create engaging, effective learning experiences. Our mission is to bridge the gap between traditional teaching methods and modern technology, making education more accessible, efficient, and engaging for educators and students worldwide. We envision a future where geographical boundaries don't limit learning opportunities, and every teacher can reach their full potential.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Powerful Features for Modern Education</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to create, manage, and enhance your teaching experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl shadow-md bg-white/80 backdrop-blur-sm transition-all duration-500 ${
                  index === 0 ? "md:col-span-2" : ""
                } ${index === 3 ? "lg:col-span-2" : ""} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative">
          <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Join Mentorly Today and<br />Revolutionize Your Teaching!
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Start your journey with thousands of educators who trust Mentorly to deliver exceptional learning experiences. Get started for free and see the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg rounded-lg flex items-center gap-2 transition">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="flex items-center text-white/90 mt-2 sm:mt-0">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
