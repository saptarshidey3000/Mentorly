"use client"

import { useEffect, useState } from "react"

const Dashboard = () => {
  const [name,setName] = useState("")
  const [pic,setPic] = useState("")
  useEffect(()=>{
    const userProfile = JSON.parse(localStorage.getItem("user"))
    setName(userProfile.firstname)
    setPic(userProfile.profilePic)
    
  },[])
  // Mock student data
  const studentData = {
    name: name,
    profileImage: pic,
    currentProgress: 78,
    attendance: 85,
    averageTestScore: 82,
    totalClassesAttended: 45,
    attendanceData: [75, 80, 85, 90, 85, 88], // Monday to Saturday (6 days)
    todaysClasses: [
      { id: 1, subject: "Mathematics", time: "09:00 AM", type: "class" },
      { id: 2, subject: "Physics Lab Report", time: "02:00 PM", type: "assignment" },
      { id: 3, subject: "English Literature", time: "04:00 PM", type: "class" },
    ],
    recentScores: [
      { subject: "Mathematics", score: 88, date: "Aug 15" },
      { subject: "Physics", score: 92, date: "Aug 12" },
      { subject: "Chemistry", score: 76, date: "Aug 10" },
    ],
  }

  const [activeMenu, setActiveMenu] = useState("Dashboard")

  const menuItems = [
    { name: "Dashboard", icon: "📊", active: activeMenu === "Dashboard" },
    { name: "My Classes", icon: "📚", active: activeMenu === "My Classes" },
    { name: "Assignments", icon: "📝", active: activeMenu === "Assignments" },
    { name: "Test Scores", icon: "📈", active: activeMenu === "Test Scores" },
    { name: "Settings", icon: "⚙️", active: activeMenu === "Settings" },
  ]

  // Add mock data for classes and assignments
  const classesData = [
    {
      id: 1,
      name: "Advanced Mathematics",
      instructor: "Dr. Smith",
      time: "Mon, Wed, Fri 9:00 AM",
      progress: 85,
      nextClass: "Tomorrow 9:00 AM",
    },
    {
      id: 2,
      name: "Physics Laboratory",
      instructor: "Prof. Johnson",
      time: "Tue, Thu 2:00 PM",
      progress: 78,
      nextClass: "Today 2:00 PM",
    },
    {
      id: 3,
      name: "English Literature",
      instructor: "Ms. Davis",
      time: "Mon, Wed 4:00 PM",
      progress: 92,
      nextClass: "Today 4:00 PM",
    },
    {
      id: 4,
      name: "Chemistry",
      instructor: "Dr. Wilson",
      time: "Tue, Thu 10:00 AM",
      progress: 73,
      nextClass: "Thursday 10:00 AM",
    },
  ]

  const assignmentsData = [
    {
      id: 1,
      title: "Calculus Problem Set 5",
      subject: "Mathematics",
      dueDate: "2024-01-20",
      status: "pending",
      priority: "high",
    },
    {
      id: 2,
      title: "Physics Lab Report",
      subject: "Physics",
      dueDate: "2024-01-18",
      status: "in-progress",
      priority: "medium",
    },
    {
      id: 3,
      title: "Shakespeare Essay",
      subject: "English",
      dueDate: "2024-01-25",
      status: "completed",
      priority: "low",
    },
    {
      id: 4,
      title: "Chemical Reactions Quiz",
      subject: "Chemistry",
      dueDate: "2024-01-22",
      status: "pending",
      priority: "high",
    },
  ]

  const testScoresData = [
    { id: 1, subject: "Mathematics", test: "Midterm Exam", score: 88, maxScore: 100, date: "2024-01-15", grade: "B+" },
    { id: 2, subject: "Physics", test: "Lab Practical", score: 92, maxScore: 100, date: "2024-01-12", grade: "A-" },
    {
      id: 3,
      subject: "English",
      test: "Literature Analysis",
      score: 85,
      maxScore: 100,
      date: "2024-01-10",
      grade: "B+",
    },
    {
      id: 4,
      subject: "Chemistry",
      test: "Organic Chemistry Quiz",
      score: 76,
      maxScore: 100,
      date: "2024-01-08",
      grade: "B",
    },
    { id: 5, subject: "Mathematics", test: "Algebra Test", score: 94, maxScore: 100, date: "2024-01-05", grade: "A" },
  ]

  const CircularProgress = ({ percentage, size = 80, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute text-sm font-semibold text-gray-700">{percentage}%</span>
      </div>
    )
  }

  const LineChart = ({ data }) => {
    const maxValue = Math.max(...data)
    const minValue = Math.min(...data)
    const range = maxValue - minValue || 1

    const points = data.map((value, index) => ({
      x: (index / (data.length - 1)) * 240,
      y: 80 - ((value - minValue) / range) * 60,
    }))

    // Create smooth curve path using quadratic bezier curves
    const createSmoothPath = (points) => {
      if (points.length < 2) return ""

      let path = `M ${points[0].x} ${points[0].y}`

      for (let i = 1; i < points.length; i++) {
        const prevPoint = points[i - 1]
        const currentPoint = points[i]

        if (i === 1) {
          // First curve
          const controlX = prevPoint.x + (currentPoint.x - prevPoint.x) * 0.5
          const controlY = prevPoint.y
          path += ` Q ${controlX} ${controlY} ${currentPoint.x} ${currentPoint.y}`
        } else {
          // Subsequent curves - create smooth transitions
          const prevPrevPoint = points[i - 2]
          const nextPoint = points[i + 1] || currentPoint

          // Calculate control points for smooth curve
          const controlX1 = prevPoint.x + (currentPoint.x - prevPrevPoint.x) * 0.2
          const controlY1 = prevPoint.y
          const controlX2 = currentPoint.x - (nextPoint.x - prevPoint.x) * 0.2
          const controlY2 = currentPoint.y

          path += ` C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${currentPoint.x} ${currentPoint.y}`
        }
      }

      return path
    }

    const smoothPath = createSmoothPath(points)

    return (
      <div className="w-full h-24">
        <svg width="240" height="80" className="w-full h-full">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="0.5" />
            </pattern>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Grid background */}
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Area under curve */}
          <path d={`${smoothPath} L 240 80 L 0 80 Z`} fill="url(#areaGradient)" />

          {/* Main curve line */}
          <path
            d={smoothPath}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((point, index) => (
            <g key={index}>
              <circle cx={point.x} cy={point.y} r="6" fill="white" stroke="url(#lineGradient)" strokeWidth="2" />
              <circle cx={point.x} cy={point.y} r="3" fill="url(#lineGradient)" />
            </g>
          ))}
        </svg>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-gray-800">Mentorly</span>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setActiveMenu(item.name)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                    item.active
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          {/* Header */}
          <div className="bg-white shadow-sm border-b px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600">Welcome back, {studentData.name}!</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{studentData.name}</p>
                  <p className="text-xs text-gray-500">Student</p>
                </div>
                <img
                  src={studentData.profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-2 border-purple-200"
                />
              </div>
            </div>
          </div>

          <div className="p-8">
            {activeMenu === "Dashboard" && (
              <>
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 mb-8 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">Hello, {studentData.name}!</h2>
                      <p className="text-purple-100 mb-4">
                        You're making great progress! Keep up the excellent work in your studies.
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="bg-white/20 rounded-lg px-3 py-1">
                          <span className="text-sm font-medium">Progress: {studentData.currentProgress}%</span>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Stats and Activity */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-purple-600 text-xl">📊</span>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">{studentData.currentProgress}%</h3>
                        <p className="text-gray-600 text-sm">Progress Index</p>
                      </div>

                      <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 text-xl">📅</span>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">{studentData.attendance}%</h3>
                        <p className="text-gray-600 text-sm">Attendance</p>
                      </div>

                      <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <span className="text-green-600 text-xl">📈</span>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">{studentData.averageTestScore}%</h3>
                        <p className="text-gray-600 text-sm">Avg Test Score</p>
                      </div>

                      <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <span className="text-orange-600 text-xl">🎓</span>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">{studentData.totalClassesAttended}</h3>
                        <p className="text-gray-600 text-sm">Classes Attended</p>
                      </div>
                    </div>

                    {/* Activity Chart */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">Attendance Activity</h3>
                        <span className="text-sm text-gray-500">Last 7 days</span>
                      </div>
                      <LineChart data={studentData.attendanceData} />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                          <span key={index}>{day}</span>
                        ))}
                      </div>
                    </div>

                    {/* Progress Insights */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Progress Insights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <CircularProgress percentage={studentData.attendance} />
                          <p className="text-sm font-medium text-gray-700 mt-2">Attendance</p>
                          <p className="text-xs text-gray-500">Good consistency</p>
                        </div>
                        <div className="text-center">
                          <CircularProgress percentage={studentData.averageTestScore} />
                          <p className="text-sm font-medium text-gray-700 mt-2">Test Average</p>
                          <p className="text-xs text-gray-500">Above average</p>
                        </div>
                        <div className="text-center">
                          <CircularProgress percentage={studentData.currentProgress} />
                          <p className="text-sm font-medium text-gray-700 mt-2">Overall Progress</p>
                          <p className="text-xs text-gray-500">Excellent work!</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Today's Schedule and Recent Scores */}
                  <div className="space-y-6">
                    {/* Today's Classes */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Today's Schedule</h3>
                        <span className="text-sm text-purple-600 cursor-pointer hover:underline">View All</span>
                      </div>
                      <div className="space-y-3">
                        {studentData.todaysClasses.map((item) => (
                          <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div
                              className={`w-3 h-3 rounded-full ${item.type === "class" ? "bg-purple-500" : "bg-blue-500"}`}
                            ></div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 text-sm">{item.subject}</p>
                              <p className="text-xs text-gray-500">{item.time}</p>
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                item.type === "class" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {item.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Test Scores */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Recent Scores</h3>
                        <span className="text-sm text-purple-600 cursor-pointer hover:underline">View All</span>
                      </div>
                      <div className="space-y-3">
                        {studentData.recentScores.map((score, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-800 text-sm">{score.subject}</p>
                              <p className="text-xs text-gray-500">{score.date}</p>
                            </div>
                            <div
                              className={`text-lg font-bold ${
                                score.score >= 90
                                  ? "text-green-600"
                                  : score.score >= 80
                                    ? "text-blue-600"
                                    : score.score >= 70
                                      ? "text-orange-600"
                                      : "text-red-600"
                              }`}
                            >
                              {score.score}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeMenu === "My Classes" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">My Classes</h2>
                  <div className="text-sm text-gray-500">4 Active Classes</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {classesData.map((classItem) => (
                    <div
                      key={classItem.id}
                      className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{classItem.name}</h3>
                          <p className="text-gray-600 text-sm">{classItem.instructor}</p>
                          <p className="text-gray-500 text-sm">{classItem.time}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-600">{classItem.progress}%</div>
                          <div className="text-xs text-gray-500">Progress</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Course Progress</span>
                          <span>{classItem.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${classItem.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Next Class:</span> {classItem.nextClass}
                        </div>
                        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                          View Details →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeMenu === "Assignments" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Assignments</h2>
                  <div className="flex space-x-4">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option>All Subjects</option>
                      <option>Mathematics</option>
                      <option>Physics</option>
                      <option>English</option>
                      <option>Chemistry</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option>All Status</option>
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {assignmentsData.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">{assignment.title}</h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                assignment.priority === "high"
                                  ? "bg-red-100 text-red-600"
                                  : assignment.priority === "medium"
                                    ? "bg-yellow-100 text-yellow-600"
                                    : "bg-green-100 text-green-600"
                              }`}
                            >
                              {assignment.priority} priority
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-1">{assignment.subject}</p>
                          <p className="text-gray-500 text-sm">
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex items-center space-x-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              assignment.status === "completed"
                                ? "bg-green-100 text-green-600"
                                : assignment.status === "in-progress"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {assignment.status.replace("-", " ")}
                          </span>
                          <button className="text-purple-600 hover:text-purple-700 font-medium">
                            {assignment.status === "completed" ? "View" : "Continue"} →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeMenu === "Test Scores" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Test Scores</h2>
                  <div className="flex space-x-4">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option>All Subjects</option>
                      <option>Mathematics</option>
                      <option>Physics</option>
                      <option>English</option>
                      <option>Chemistry</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option>Last 30 days</option>
                      <option>Last 60 days</option>
                      <option>This Semester</option>
                      <option>All Time</option>
                    </select>
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-4 shadow-sm border">
                    <div className="text-2xl font-bold text-gray-800">82%</div>
                    <div className="text-sm text-gray-600">Overall Average</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border">
                    <div className="text-2xl font-bold text-green-600">94%</div>
                    <div className="text-sm text-gray-600">Highest Score</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border">
                    <div className="text-2xl font-bold text-blue-600">5</div>
                    <div className="text-sm text-gray-600">Tests Taken</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border">
                    <div className="text-2xl font-bold text-purple-600">↗ 8%</div>
                    <div className="text-sm text-gray-600">Improvement</div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Test Results</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {testScoresData.map((test) => (
                      <div key={test.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-1">
                              <h4 className="font-semibold text-gray-800">{test.test}</h4>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-600">{test.subject}</span>
                            </div>
                            <p className="text-sm text-gray-500">{new Date(test.date).toLocaleDateString()}</p>
                          </div>

                          <div className="flex items-center space-x-6">
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-800">
                                {test.score}/{test.maxScore}
                              </div>
                              <div className="text-sm text-gray-500">Score</div>
                            </div>

                            <div className="text-right">
                              <div
                                className={`text-lg font-bold ${
                                  test.score >= 90
                                    ? "text-green-600"
                                    : test.score >= 80
                                      ? "text-blue-600"
                                      : test.score >= 70
                                        ? "text-orange-600"
                                        : "text-red-600"
                                }`}
                              >
                                {test.grade}
                              </div>
                              <div className="text-sm text-gray-500">Grade</div>
                            </div>

                            <div
                              className={`w-16 h-2 rounded-full ${
                                test.score >= 90
                                  ? "bg-green-200"
                                  : test.score >= 80
                                    ? "bg-blue-200"
                                    : test.score >= 70
                                      ? "bg-orange-200"
                                      : "bg-red-200"
                              }`}
                            >
                              <div
                                className={`h-2 rounded-full ${
                                  test.score >= 90
                                    ? "bg-green-500"
                                    : test.score >= 80
                                      ? "bg-blue-500"
                                      : test.score >= 70
                                        ? "bg-orange-500"
                                        : "bg-red-500"
                                }`}
                                style={{ width: `${test.score}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeMenu === "Settings" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <p className="text-gray-600">Settings panel coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard