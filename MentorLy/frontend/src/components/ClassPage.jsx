"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Play,
  BookOpen,
  Trophy,
  FileText,
  BarChart,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Settings,
  Share,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Plus,
  Eye,
  User,
} from "lucide-react"

const ClassPage = ({ classData, navigateTo }) => {
  const [activeTab, setActiveTab] = useState("overview")
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false)
  const [assignmentFormData, setAssignmentFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    dueTime: "23:59",
    points: "",
    instructions: "",
  })
  
  if (!classData) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No class selected</h2>
          <button
            onClick={() => navigateTo("classroom")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Back to Classrooms
          </button>
        </div>
      </div>
    )
  }

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: <BarChart className="h-5 w-5" /> },
    { id: "assignments", label: "Assignments", icon: <BookOpen className="h-5 w-5" /> },
    { id: "live", label: "Live Class", icon: <Video className="h-5 w-5" /> },
    { id: "leaderboard", label: "Leaderboard", icon: <Trophy className="h-5 w-5" /> },
    { id: "materials", label: "Materials", icon: <FileText className="h-5 w-5" /> },
  ]

  // Use assignments from classData if available, otherwise use sample data
  const assignments =
    classData.assignments && classData.assignments.length > 0
      ? classData.assignments.map((assignment) => ({
          id: assignment.id,
          title: assignment.title,
          dueDate: `Due ${assignment.dueDate.toLocaleDateString()}`,
          status: assignment.submissions.length > 0 ? "submitted" : "pending",
          points: assignment.points,
          submissions: `${assignment.submissions.length}/${classData.students}`,
          description: assignment.description,
          instructions: assignment.instructions,
          dueTime: assignment.dueTime,
        }))
      : [
          {
            id: 1,
            title: "Sample Assignment",
            dueDate: "Due Tomorrow",
            status: "pending",
            points: 25,
            submissions: "0/23",
          },
        ]

  const leaderboard = [
    { rank: 1, name: "Arjun Sharma", points: 1250, avatar: "AS" },
    { rank: 2, name: "Priya Patel", points: 1180, avatar: "PP" },
    { rank: 3, name: "Rahul Kumar", points: 1150, avatar: "RK" },
    { rank: 4, name: "You", points: 1120, avatar: "YU", isCurrentUser: true },
    { rank: 5, name: "Sneha Singh", points: 1100, avatar: "SS" },
  ]

  const materials = [
    {
      title: `${classData.name} - Course Notes`,
      type: "PDF",
      size: "2.5 MB",
      uploadDate: "2 days ago",
    },
    {
      title: "Lecture Recording",
      type: "MP4",
      size: "45.2 MB",
      uploadDate: "1 week ago",
    },
    {
      title: "Problem Set Solutions",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: "3 days ago",
    },
  ]

  const formatDateTime = (date, time) => {
    const dateTime = new Date(`${date.toDateString()} ${time}`)
    return dateTime.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const isOverdue = (dueDate, dueTime) => {
    const dueDateTime = new Date(`${dueDate.toDateString()} ${dueTime}`)
    return new Date() > dueDateTime
  }

  const handleAssignmentChange = (e) => {
    setAssignmentFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleAssignmentSubmit = () => {
    // Validate required fields
    if (
      !assignmentFormData.title ||
      !assignmentFormData.description ||
      !assignmentFormData.dueDate ||
      !assignmentFormData.dueTime
    ) {
      alert("Please fill in all required fields (Title, Description, Due Date, and Due Time)")
      return
    }

    const newAssignment = {
      id: Date.now(),
      title: assignmentFormData.title,
      description: assignmentFormData.description,
      dueDate: new Date(assignmentFormData.dueDate),
      dueTime: assignmentFormData.dueTime,
      points: Number.parseInt(assignmentFormData.points) || 0,
      instructions: assignmentFormData.instructions,
      submissions: [],
      createdAt: new Date(),
    }

    // Add assignment to classData (in a real app, this would update the backend)
    classData.assignments = [newAssignment, ...classData.assignments]

    // Reset form and close modal
    setAssignmentFormData({ title: "", description: "", dueDate: "", dueTime: "23:59", points: "", instructions: "" })
    setIsAssignmentModalOpen(false)

    // Show success message
    alert(`Assignment "${newAssignment.title}" created successfully!`)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            {/* Today's Summary */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Class Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{classData.assignments.length}</div>
                  <div className="text-gray-600">Total Assignments</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{classData.students}</div>
                  <div className="text-gray-600">Students Enrolled</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
                  <div className="text-gray-600">Avg. Completion Rate</div>
                </div>
              </div>
            </div>

            {/* Live Stream Preview */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Live Class</h3>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${classData.status === "live" ? "bg-red-500 animate-pulse" : "bg-gray-400"}`}
                  ></div>
                  <span
                    className={`text-sm font-medium ${classData.status === "live" ? "text-red-600" : "text-gray-600"}`}
                  >
                    {classData.status === "live" ? "Live Now" : classData.nextClass}
                  </span>
                </div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${classData.color}/10`}></div>
                <div className="relative z-10 text-center">
                  <Play className="h-16 w-16 text-gray-600 mb-4 mx-auto" />
                  <p className="text-gray-900 text-lg font-medium">{classData.name}</p>
                  <p className="text-gray-600">
                    {classData.status === "live" ? "Live class in progress" : "Next class: " + classData.nextClass}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      isMuted ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      isVideoOff
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                  </button>
                  <button className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300">
                    <Share className="h-5 w-5" />
                  </button>
                </div>
                <button
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-white ${
                    classData.status === "live" ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"
                  }`}
                >
                  {classData.status === "live" ? "Join Live Class" : "Schedule Class"}
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Recent Assignments</h4>
                <div className="space-y-3">
                  {assignments.slice(0, 2).map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 font-medium">{assignment.title}</p>
                        <p className="text-gray-600 text-sm">{assignment.dueDate}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {assignment.status === "submitted" && <CheckCircle className="h-5 w-5 text-green-500" />}
                        {assignment.status === "pending" && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                        {assignment.status === "graded" && <Star className="h-5 w-5 text-blue-500" />}
                      </div>
                    </div>
                  ))}
                  {assignments.length === 0 && <p className="text-gray-500 text-center py-4">No assignments yet</p>}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Top Performers</h4>
                <div className="space-y-3">
                  {leaderboard.slice(0, 3).map((student) => (
                    <div key={student.rank} className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold">
                        {student.rank}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{student.name}</p>
                        <p className="text-gray-600 text-sm">{student.points} points</p>
                      </div>
                      {student.rank === 1 && <Trophy className="h-5 w-5 text-yellow-500" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Class Insights</span>
              </h4>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    📊 Class engagement has increased by 25% since adding interactive assignments.
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-sm">
                    🎯{" "}
                    {Math.round(
                      (assignments.filter((a) => a.status === "submitted").length / assignments.length) * 100,
                    ) || 0}
                    % of assignments have been completed on time.
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-purple-800 text-sm">
                    💡 Consider creating more assignments to keep students engaged - current average is{" "}
                    {assignments.length} assignments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case "assignments":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Assignments</h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsAssignmentModalOpen(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Assignment</span>
                </button>
                <button
                  onClick={() => navigateTo("assignments")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Manage All</span>
                </button>
              </div>
            </div>

            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{assignment.title}</h4>
                      {assignment.description && <p className="text-gray-600 mb-3">{assignment.description}</p>}
                      <div className="flex items-center space-x-4 text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{assignment.dueDate}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Trophy className="h-4 w-4" />
                          <span>{assignment.points} points</span>
                        </span>
                        {assignment.submissions && (
                          <span className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{assignment.submissions} submitted</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {assignment.status === "submitted" && (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Submitted</span>
                      )}
                      {assignment.status === "pending" && (
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Pending</span>
                      )}
                      {assignment.status === "graded" && (
                        <div className="flex items-center space-x-2">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Graded</span>
                          <span className="text-2xl font-bold text-gray-900">{assignment.grade}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300">
                      {assignment.status === "pending" ? "View Assignment" : "View Details"}
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>Submissions</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="bg-white rounded-2xl p-12 border border-gray-200 max-w-md mx-auto">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No assignments yet</h3>
                  <p className="text-gray-600 mb-6">Create your first assignment to get started.</p>
                  <button
                    onClick={() => navigateTo("assignments")}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Create Assignment
                  </button>
                </div>
              </div>
            )}
          </div>
        )

      case "live":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Live Class</h3>
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
                <div className="relative z-10 text-center text-white">
                  <Video className="h-24 w-24 mb-6 mx-auto" />
                  <h4 className="text-2xl font-bold mb-2">{classData.name}</h4>
                  <p className="text-gray-300 mb-6">
                    {classData.status === "live" ? "Live class in progress" : "No live class at the moment"}
                  </p>
                  <button
                    className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                      classData.status === "live" ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"
                    }`}
                  >
                    {classData.status === "live" ? "Join Live Class" : "Start Live Class"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-4 rounded-lg transition-all duration-300 flex flex-col items-center space-y-2 ${
                    isMuted ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                  <span className="text-sm">{isMuted ? "Unmute" : "Mute"}</span>
                </button>

                <button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`p-4 rounded-lg transition-all duration-300 flex flex-col items-center space-y-2 ${
                    isVideoOff ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
                  <span className="text-sm">{isVideoOff ? "Start Video" : "Stop Video"}</span>
                </button>

                <button className="p-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 flex flex-col items-center space-y-2">
                  <Share className="h-6 w-6" />
                  <span className="text-sm">Share</span>
                </button>

                <button className="p-4 rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition-all duration-300 flex flex-col items-center space-y-2">
                  <Settings className="h-6 w-6" />
                  <span className="text-sm">Settings</span>
                </button>
              </div>
            </div>
          </div>
        )

      case "leaderboard":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Class Leaderboard</h3>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {leaderboard.map((student, index) => (
                <div
                  key={student.rank}
                  className={`p-6 border-b border-gray-200 last:border-b-0 ${
                    student.isCurrentUser ? "bg-purple-50" : "hover:bg-gray-50"
                  } transition-all duration-300`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full ${
                        student.rank <= 3 ? "bg-yellow-500" : "bg-purple-600"
                      } text-white font-bold text-lg`}
                    >
                      {student.rank}
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-400 text-white font-bold">
                      {student.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4
                          className={`text-lg font-bold ${student.isCurrentUser ? "text-purple-600" : "text-gray-900"}`}
                        >
                          {student.name}
                        </h4>
                        {student.isCurrentUser && (
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">You</span>
                        )}
                      </div>
                      <p className="text-gray-600">{student.points} points</p>
                    </div>
                    {student.rank <= 3 && <Trophy className="h-6 w-6 text-yellow-500" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "materials":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Class Materials</h3>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Upload Material</span>
              </button>
            </div>

            {materials.map((material, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-blue-600 group-hover:scale-110 transition-transform">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {material.title}
                    </h4>
                    <div className="flex items-center space-x-4 text-gray-600 text-sm">
                      <span>{material.type}</span>
                      <span>{material.size}</span>
                      <span>Uploaded {material.uploadDate}</span>
                    </div>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 opacity-0 group-hover:opacity-100">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateTo("classroom")}
              className="p-2 rounded-lg bg-white border border-gray-200 hover:shadow-md transition-all duration-300"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{classData.name}</h1>
              <p className="text-gray-600">
                {classData.teacher} • {classData.students} students • Code: {classData.classCode}
              </p>
            </div>
          </div>
          <button className="p-2 rounded-lg bg-white border border-gray-200 hover:shadow-md transition-all duration-300">
            <Settings className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-24">
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === item.id
                        ? "bg-purple-600 text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </div>
      {/* Create Assignment Modal */}
      {isAssignmentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-white p-8 rounded-xl w-full max-w-lg shadow-lg animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Create Assignment for {classData.name}</h2>

            <div className="space-y-4">
              <input
                name="title"
                placeholder="Assignment Title (required)"
                value={assignmentFormData.title}
                onChange={handleAssignmentChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                name="description"
                placeholder="Assignment Description (required)"
                value={assignmentFormData.description}
                onChange={handleAssignmentChange}
                rows={3}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
              <textarea
                name="instructions"
                placeholder="Detailed Instructions"
                value={assignmentFormData.instructions}
                onChange={handleAssignmentChange}
                rows={4}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                  <input
                    name="dueDate"
                    type="date"
                    value={assignmentFormData.dueDate}
                    onChange={handleAssignmentChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Time *</label>
                  <input
                    name="dueTime"
                    type="time"
                    value={assignmentFormData.dueTime}
                    onChange={handleAssignmentChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>
              <input
                name="points"
                type="number"
                placeholder="Points (e.g., 100)"
                value={assignmentFormData.points}
                onChange={handleAssignmentChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => {
                  setIsAssignmentModalOpen(false)
                  setAssignmentFormData({
                    title: "",
                    description: "",
                    dueDate: "",
                    dueTime: "23:59",
                    points: "",
                    instructions: "",
                  })
                }}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignmentSubmit}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Create Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClassPage
