import React, { useState } from 'react';
import { Play, Rocket, Users, BookOpen, Award, BarChart, Brain, Zap, Clock, TrendingUp, Star, CheckCircle } from 'lucide-react';
import SignInModal from './SignInModal';
const Homepage = ({ navigateTo }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Live Virtual Classrooms",
      description: "Host interactive live classes with up to 500 students simultaneously"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Insights",
      description: "Get intelligent analytics on student performance and engagement"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Smart Assignments",
      description: "Auto-graded assignments with instant feedback and detailed reports"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Gamification",
      description: "Motivate students with badges, leaderboards, and achievement systems"
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Performance Tracking",
      description: "Comprehensive dashboards for teachers, students, and parents"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-time Collaboration",
      description: "Interactive whiteboards, breakout rooms, and group projects"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Students" },
    { number: "2K+", label: "Teachers" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Empowering Smarter
              <span className="block text-purple-600">
                Classrooms with Mentorly
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Live classes, auto-graded assignments, AI copilots, performance dashboards — all in one place.
              Transform your teaching experience with cutting-edge technology.
            </p>
            
             <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="group bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <Rocket className="h-6 w-6 group-hover:animate-pulse" />
                <span>Get Started</span>
              </button>
              <button className="group bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <Play className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Bento Grid Dashboard Preview */}
          <div className="relative max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Live Class Card */}
                <div className="lg:col-span-2 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-700 text-sm font-medium">Live Now</span>
                    </div>
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-2">Physics Class 12A</h3>
                  <p className="text-gray-600 text-sm mb-4">Wave Optics & Interference</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 text-sm">45 students</span>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors">
                      Join
                    </button>
                  </div>
                </div>

                {/* Assignment Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                    <span className="text-orange-500 text-sm font-medium">Due Today</span>
                  </div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-2">Math Assignment #5</h3>
                  <p className="text-gray-600 text-sm mb-4">Calculus Integration</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-purple-600 h-2 rounded-full w-3/4"></div>
                  </div>
                  <span className="text-gray-700 text-sm">28/35 submitted</span>
                </div>

                {/* Performance Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <BarChart className="h-6 w-6 text-purple-600" />
                    <Award className="h-5 w-5 text-yellow-500" />
                  </div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-2">Class Performance</h3>
                  <p className="text-gray-600 text-sm mb-4">Average Score: 87%</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 space-y-1">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div className="bg-green-500 h-1 rounded-full w-5/6"></div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div className="bg-blue-500 h-1 rounded-full w-3/4"></div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div className="bg-purple-500 h-1 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Insights Card */}
                <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-2 mb-4">
                    <Brain className="h-6 w-6 text-purple-600" />
                    <h3 className="text-gray-900 font-semibold text-lg">AI Insights</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700 text-sm">Performance improved by 15% this week</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span className="text-gray-700 text-sm">2 assignments pending review</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-gray-700 text-sm">Top performer in Mathematics</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Card */}
                <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-gray-900 font-semibold text-lg mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-3 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                      <Play className="h-4 w-4" />
                      <span>Start Class</span>
                    </button>
                    <button className="bg-green-50 hover:bg-green-100 text-green-700 p-3 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                      <BookOpen className="h-4 w-4" />
                      <span>New Assignment</span>
                    </button>
                    <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-3 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                      <BarChart className="h-4 w-4" />
                      <span>View Reports</span>
                    </button>
                    <button className="bg-orange-50 hover:bg-orange-100 text-orange-700 p-3 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>Manage Students</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
<SignInModal isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
      {/* Stats Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                  <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for
              <span className="block text-purple-600">
                Modern Education
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed to enhance learning experiences and boost student engagement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 h-full">
                  <div className="text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-12 border border-gray-200 shadow-lg">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Classroom?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of educators who are already using Mentorly to create engaging, effective learning experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigateTo('classroom')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Free Trial
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;