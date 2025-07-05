"use client"
import { useRef, useState } from "react"
import ClassPage from "./ClassPage"
import {
  Plus,
  Search,
  Clock,
  Users,
  Play,
  BookOpen,
  Beaker,
  Calculator,
  Globe,
  Music,
  Palette,
  Trophy,
  Copy,
  CheckCircle,
  XCircle,
  FileText,
  Eye,
  Calendar,
  User,
} from "lucide-react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Roadmap from "./Flowchart";
import CameraCapture from "./CameraCapture";

const ClassroomPage = () => {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [markdownTopic, setMarkDownTopic] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pdfModalOpen, setIsPDFModalOpen] = useState(false)
  const [pdfMarkdownOpen, setPdfMarkdownOpen] = useState(false)
  const [pdfRoadmapOpen, setPdfRoadmapOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false)
  const [isSubmissionsModalOpen, setIsSubmissionsModalOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [selectedClass, setSelectedClass] = useState(null)
  const [createdClass, setCreatedClass] = useState(null)
  const [activeTab, setActiveTab] = useState("classes")
  const [fileUrl, setFileUrl] = useState(null);
  const [currentView, setCurrentView] = useState("overview") // 'overview' or 'class-detail'
  const [flowTopic, setflowTopic] = useState();
  const [flowJson, setFlowJson] = useState({});
  const [file, setFile] = useState(null);
  const inputRef = useRef();
  const [startVerify, setStartVerify] = useState(false)

  const handleMarkdownSubmit = async () => {
    if (!markdownTopic) return toast.error("No topic given");
    try {
      const res = await axios.post(`http://10.230.245.255:7000/pdf/generate_markdown?topic=${markdownTopic}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      toast.success("Uploaded successfully!");
      console.log("Server Response:", res.data.download);
      setFileUrl(res.data.download)
    } catch (err) {
      toast.error("Upload failed");
      console.error(err);
    }
  }

  const handleFlowchartSubmit = async () => {
    if (!flowTopic) { return toast.error("No topic given") };
    try {
      const res = await axios.post(`http://10.230.245.255:7000/pdf/generate_roadmap?subject=${flowTopic}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      toast.success("Uploaded successfully!");
      console.log("Server Response:", res.data);
      setFlowJson(res.data)
    } catch (err) {
      toast.error("Upload failed");
      console.error(err);
    }

  }

  const handleUpload = async () => {
    if (!file) return toast.error("No file selected");

    const formData = new FormData();
    formData.append('pdf_file', file); // field name `file` expected by backend
    console.log(formData)
    try {
      const res = await axios.post('http://10.230.245.255:7000/pdf/generate_summary?topic=fadaw', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success("Uploaded successfully!");
      console.log("Server Response:", res.data);
      setFileUrl(res.data)
    } catch (err) {
      toast.error("Upload failed");
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeFile = () => {
    setFile(null);
    inputRef.current.value = null;
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.subject) return;

    try {
      // Optionally, send this to your backend to save the class
      // await axios.post("/api/classes", formData);

      // You can use class name as Agora channel name
      const channelName = formData.name.trim().replace(/\s+/g, "_");

      // Close modal
      setIsModalOpen(false);

      // Redirect to Classroom
      navigate(`/classroom/${channelName}?role=host`);
    } catch (error) {
      console.error("Failed to create class:", error);
    }
  };



  const [formData, setFormData] = useState({
    name: "",
    section: "",
    subject: "",
    room: "",
  })

  const [assignmentFormData, setAssignmentFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    dueTime: "23:59",
    points: "",
    instructions: "",
  })

  const [joinCode, setJoinCode] = useState("")
  const [joinMessage, setJoinMessage] = useState("")
  const [joinMessageType, setJoinMessageType] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [copiedCode, setCopiedCode] = useState("")

  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "DBMS",
      teacher: "Ms. Asha",
      subject: "Science",
      icon: <Beaker className="h-6 w-6" />,
      nextClass: "Tomorrow, 10:30 AM",
      students: 23,
      status: "upcoming",
      color: "from-green-500 to-emerald-600",
      classCode: "DBM123",
      assignments: [
        {
          id: 1,
          title: "Database Design Project",
          description: "Create a comprehensive database design for an e-commerce platform",
          dueDate: new Date("2024-12-30"),
          dueTime: "23:59",
          points: 100,
          instructions: "Design normalized tables, create ER diagrams, and implement sample queries",
          submissions: [
            { id: 1, studentName: "John Doe", submittedAt: new Date("2024-12-28T14:30:00"), status: "submitted" },
            { id: 2, studentName: "Jane Smith", submittedAt: new Date("2024-12-29T09:15:00"), status: "submitted" },
          ],
          createdAt: new Date("2024-12-15T10:00:00"),
        },
        {
          id: 2,
          title: "SQL Query Assignment",
          description: "Write complex SQL queries for the given database schema",
          dueDate: new Date("2025-01-10"),
          dueTime: "18:00",
          points: 50,
          instructions: "Complete all 10 SQL problems in the provided worksheet",
          submissions: [],
          createdAt: new Date("2024-12-20T15:30:00"),
        },
      ],
    },
    {
      id: 2,
      name: "Advanced Mathematics",
      teacher: "Mr. Raj",
      subject: "Mathematics",
      icon: <Calculator className="h-6 w-6" />,
      nextClass: "Today, 2:00 PM",
      students: 18,
      status: "today",
      color: "from-blue-500 to-cyan-600",
      classCode: "MAT456",
      assignments: [
        {
          id: 3,
          title: "Calculus Problem Set",
          description: "Solve integration and differentiation problems",
          dueDate: new Date("2025-01-05"),
          dueTime: "23:59",
          points: 75,
          instructions: "Complete problems 1-20 from Chapter 5",
          submissions: [
            { id: 3, studentName: "Alice Johnson", submittedAt: new Date("2024-12-29T16:45:00"), status: "submitted" },
          ],
          createdAt: new Date("2024-12-18T11:00:00"),
        },
      ],
    },
    {
      id: 3,
      name: "Computer Networks",
      teacher: "Mrs. Singh",
      subject: "CS",
      icon: <BookOpen className="h-6 w-6" />,
      nextClass: "Monday, 11:00 AM",
      students: 31,
      status: "upcoming",
      color: "from-purple-500 to-violet-600",
      classCode: "NET789",
      assignments: [],
    },
    {
      id: 4,
      name: "DSA",
      teacher: "Dr. Kumar",
      subject: "CSE",
      icon: <Globe className="h-6 w-6" />,
      nextClass: "Live Now",
      students: 27,
      status: "live",
      color: "from-orange-500 to-red-600",
      classCode: "DSA321",
      assignments: [
        {
          id: 4,
          title: "Binary Tree Implementation",
          description: "Implement various binary tree operations in your preferred language",
          dueDate: new Date("2025-01-08"),
          dueTime: "23:59",
          points: 80,
          instructions: "Implement insert, delete, search, and traversal operations",
          submissions: [],
          createdAt: new Date("2024-12-22T09:30:00"),
        },
      ],
    },
    {
      id: 5,
      name: "DWDM",
      teacher: "Ms. Priya",
      subject: "CS",
      icon: <Music className="h-6 w-6" />,
      nextClass: "Wednesday, 3:30 PM",
      students: 15,
      status: "upcoming",
      color: "from-pink-500 to-rose-600",
      classCode: "DWD654",
      assignments: [],
    },
    {
      id: 6,
      name: "Machine Learning",
      teacher: "Mr. Dev",
      subject: "CSE",
      icon: <Palette className="h-6 w-6" />,
      nextClass: "Friday, 1:00 PM",
      students: 20,
      status: "upcoming",
      color: "from-teal-500 to-cyan-600",
      classCode: "ML987",
      assignments: [],
    },
  ])

  // Generate unique 6-character class code
  const generateClassCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = ""
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    const existingCodes = classes.map((cls) => cls.classCode)
    if (existingCodes.includes(code)) {
      return generateClassCode()
    }
    return code
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleAssignmentChange = (e) => {
    setAssignmentFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }



  const handleAssignmentSubmit = () => {
    if (
      !assignmentFormData.title ||
      !assignmentFormData.description ||
      !assignmentFormData.dueDate ||
      !assignmentFormData.dueTime
    ) {
      alert("Please fill in all required fields")
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

    // Add to global assignments (you might want to associate with a specific class)
    setAssignmentFormData({ title: "", description: "", dueDate: "", dueTime: "23:59", points: "", instructions: "" })
    setIsAssignmentModalOpen(false)
    alert(`Assignment "${newAssignment.title}" created successfully!`)
  }

  const handleDeleteAssignment = (assignmentId) => {
    // This would need to be updated to work with class-specific assignments
    console.log("Delete assignment:", assignmentId)
  }

  const handleViewSubmissions = (assignment) => {
    setSelectedAssignment(assignment)
    setIsSubmissionsModalOpen(true)
  }

  const handleJoinClass = (classData) => {
    setSelectedClass(classData)
    setCurrentView("class-detail")
  }

  const handleNavigateTo = (route) => {
    if (route === "classroom") {
      setCurrentView("overview")
      setSelectedClass(null)
    } else if (route === "assignments") {
      setActiveTab("assignments")
      setCurrentView("overview")
    }
  }

  const handleJoinWithCode = () => {
    if (!joinCode.trim()) {
      setJoinMessage("Please enter a class code")
      setJoinMessageType("error")
      return
    }

    try {
      // Optionally, send this to your backend to save the class
      // await axios.post("/api/classes", formData);

      // You can use class name as Agora channel name
      const channelName = joinCode;

      // Close modal
      setIsModalOpen(false);

      // Redirect to Classroom
      navigate(`/classroom/${channelName}?role=audience`);
    } catch (error) {
      console.error("Failed to create class:", error);
    }

  }

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(""), 2000)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "live":
        return (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-600 text-xs font-medium">Live Now</span>
          </div>
        )
      case "today":
        return <span className="text-orange-600 text-xs font-medium">Today</span>
      default:
        return <span className="text-gray-500 text-xs font-medium">Upcoming</span>
    }
  }

  const formatDate = (date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const isOverdue = (dueDate) => {
    return new Date() > dueDate
  }

  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getAllAssignments = () => {
    return classes.flatMap((cls) =>
      cls.assignments.map((assignment) => ({
        ...assignment,
        className: cls.name,
        classColor: cls.color,
      })),
    )
  }

  const filteredAssignments = getAllAssignments().filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.className.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // If we're in class detail view, show the ClassPage component
  if (currentView === "class-detail" && selectedClass) {
    return <ClassPage classData={selectedClass} navigateTo={handleNavigateTo} />
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your <span className="text-purple-600">Classroom</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage classes, create assignments, and track student progress all in one place
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 border border-gray-200 shadow-sm">
            <button
              onClick={() => setActiveTab("classes")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === "classes" ? "bg-purple-600 text-white shadow-lg" : "text-gray-600 hover:text-purple-600"
                }`}
            >
              Classes
            </button>
            <button
              onClick={() => setActiveTab("assignments")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === "assignments"
                ? "bg-purple-600 text-white shadow-lg"
                : "text-gray-600 hover:text-purple-600"
                }`}
            >
              All Assignments
            </button>
          </div>
        </div>

        {activeTab === "classes" && (
          <>
            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Create Class Card */}
              <div
                className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-6 group-hover:scale-110 transition-transform">
                    <Plus className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Create a Class</h3>
                  <p className="text-gray-600 mb-6">
                    Start teaching and engage with students in your virtual classroom
                  </p>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    + Create Class
                  </button>
                </div>
              </div>

              {/* Join Class Card */}
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:shadow-xl transition-all duration-300 group">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-6 group-hover:scale-110 transition-transform">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Join with Code</h3>
                  <p className="text-gray-600 mb-6">Enter a class code provided by your teacher to join instantly</p>
                  <div className="flex space-x-3 mb-4">
                    <input
                      type="text"
                      placeholder="Enter class code"
                      value={joinCode}
                      onChange={(e) => {
                        setJoinCode(e.target.value)
                        setJoinMessage("")
                      }}
                      className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      maxLength={6}
                    />
                    {!startVerify && !verified && (
                      <button
                        onClick={() => setStartVerify(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        Verify
                      </button>
                    )}

                    {startVerify && !verified && (
                      <div className="mt-4">
                        <CameraCapture
                          onSuccess={() => {
                            setVerified(true);
                            setStartVerify(false);
                          }}
                        />
                      </div>
                    )}


                    {verified && (
                      <button
                        onClick={handleJoinWithCode}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        Join
                      </button>
                    )}
                  </div>

                  {joinMessage && (
                    <div
                      className={`flex items-center justify-center space-x-2 text-sm ${joinMessageType === "success" ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {joinMessageType === "success" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      <span>{joinMessage}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search classes, teachers, or subjects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-12 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span className="text-yellow-600 font-medium">Top Performer</span>
                </div>
              </div>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredClasses.map((classData) => (
                <div
                  key={classData.id}
                  className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group cursor-pointer"
                  onClick={() => handleJoinClass(classData)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${classData.color} group-hover:scale-110 transition-transform`}
                    >
                      <div className="text-white">{classData.icon}</div>
                    </div>
                    {getStatusBadge(classData.status)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {classData.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{classData.teacher}</p>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xs text-gray-500">Code:</span>
                    <span className="text-sm font-mono font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">
                      {classData.classCode}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 text-sm">{classData.nextClass}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 text-sm">{classData.students} students</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 text-sm">{classData.assignments.length} assignments</span>
                    </div>
                  </div>
                  <button
                    className={`w-full ${classData.status === "live"
                      ? "bg-red-600 hover:bg-red-700"
                      : classData.status === "today"
                        ? "bg-orange-600 hover:bg-orange-700"
                        : "bg-purple-600 hover:bg-purple-700"
                      } text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center space-x-2`}
                  >
                    <Play className="h-5 w-5" />
                    <span>{classData.status === "live" ? "Join Live" : "Enter Class"}</span>
                  </button>
                </div>
              ))}
            </div>

            {filteredClasses.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-12 border border-white/20 max-w-md mx-auto">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No classes found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search terms or create a new class to get started.
                  </p>
                  <button
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Create Your First Class
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "assignments" && (
          <>
            {/* Create Assignment Button */}
            <div className="flex justify-center mb-8 gap-2">
              <button
                onClick={() => setIsAssignmentModalOpen(true)}
                className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 group cursor-pointer flex items-center space-x-4"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full group-hover:scale-110 transition-transform">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Create Assignment</h3>
                  <p className="text-gray-600">Add a new assignment for your students</p>
                </div>
              </button>

              <button
                onClick={() => setIsPDFModalOpen(true)}
                className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 group cursor-pointer flex items-center space-x-4"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full group-hover:scale-110 transition-transform">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">PDF summarizer</h3>
                  <p className="text-gray-600">Summary of your pdf </p>
                </div>
              </button>

              <button
                onClick={() => setPdfMarkdownOpen(true)}
                className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 group cursor-pointer flex items-center space-x-4"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full group-hover:scale-110 transition-transform">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Get Notes </h3>
                  <p className="text-gray-600">Notes of your topic </p>
                </div>
              </button>

              <button
                onClick={() => setPdfRoadmapOpen(true)}
                className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 group cursor-pointer flex items-center space-x-4"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full group-hover:scale-110 transition-transform">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Get Flowchart </h3>
                  <p className="text-gray-600">Get Flowchart of your topic </p>
                </div>
              </button>
            </div>

            {/* Search Bar */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search assignments across all classes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-12 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* All Assignments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAssignments.map((assignment) => (
                <div
                  key={`${assignment.className}-${assignment.id}`}
                  className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${assignment.classColor} group-hover:scale-110 transition-transform`}
                    >
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${isOverdue(assignment.dueDate) ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                        }`}
                    >
                      {isOverdue(assignment.dueDate) ? "Overdue" : "Active"}
                    </div>
                  </div>

                  <div className="mb-2">
                    <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded font-medium">
                      {assignment.className}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {assignment.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{assignment.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 text-sm">Due: {formatDate(assignment.dueDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 text-sm">{assignment.points} points</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 text-sm">
                        {assignment.submissions.length} submission{assignment.submissions.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewSubmissions(assignment)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-1 text-sm"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredAssignments.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-12 border border-white/20 max-w-md mx-auto">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No assignments found</h3>
                  <p className="text-gray-600 mb-6">Create assignments within your classes to see them here.</p>
                  <button
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    onClick={() => setActiveTab("classes")}
                  >
                    Go to Classes
                  </button>
                </div>
              </div>
            )}
          </>
        )}


        {/* Create Class Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in duration-300">
            <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-lg animate-in slide-in-from-bottom duration-300">
              <h2 className="text-2xl font-bold mb-6">Create a New Class</h2>
              <div className="space-y-4">
                <input
                  name="name"
                  placeholder="Class Name (required)"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  name="section"
                  placeholder="Section"
                  value={formData.section}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  name="subject"
                  placeholder="Subject (required)"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  name="room"
                  placeholder="Room"
                  value={formData.room}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.subject}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Assignment Modal */}
        {isAssignmentModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in duration-300">
            <div className="bg-white p-8 rounded-xl w-full max-w-lg shadow-lg animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Create New Assignment</h2>
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
                  onClick={() => setIsAssignmentModalOpen(false)}
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

        {/* pdf summarizer */}
        {pdfModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in duration-300">
            <div className="bg-white p-8 rounded-xl w-full max-w-lg shadow-lg animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Create New Summary</h2>
              <div className="space-y-4">
                <label
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="flex flex-col items-center justify-center w-full h-64 p-6 border-2 border-dashed border-purple-400 rounded-2xl cursor-pointer bg-white hover:bg-purple-50 transition-all duration-300"
                >
                  <input
                    type="file"
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    className="hidden"
                    ref={inputRef}
                    onChange={handleFileChange}
                  />

                  {!file ? (
                    <>
                      <svg
                        className="w-12 h-12 text-purple-400 mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m5 8v-6m0 0l-4 4m4-4l4 4"
                        />
                      </svg>
                      <p className="text-gray-600">Click or drag a file here to upload</p>
                    </>
                  ) : (
                    <div className="text-center">
                      <p className="font-semibold text-purple-600">{file.name}</p>
                      <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                      <button
                        onClick={removeFile}
                        className="mt-3 px-4 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </label>


              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={() => { setIsPDFModalOpen(false), setFileUrl(null) }}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create Summary
                </button>

                {
                  fileUrl ? <div><button
                    onClick={() => window.open(fileUrl, "_blank")}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Open summarize pdf</button></div> : <></>
                }
              </div>
            </div>
          </div>
        )}

        {/*pdf markdown*/}
        {pdfMarkdownOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in duration-300">
            <div className="bg-white p-8 rounded-xl w-full max-w-lg shadow-lg animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Write your topic</h2>
              <div className="space-y-4">
                <input
                  name="title"
                  placeholder="Assignment Title (required)"
                  value={markdownTopic}
                  onChange={(e) => setMarkDownTopic(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={() => { setPdfMarkdownOpen(false), setFileUrl(null), setMarkDownTopic("") }}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleMarkdownSubmit}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create Notes
                </button>
                {
                  fileUrl ? <div><button
                    onClick={() => window.open(fileUrl, "_blank")}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Open Notes</button></div> : <></>
                }
              </div>
            </div>
          </div>
        )}

        {/*pdf flowchart */}
        {pdfRoadmapOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in duration-300">
            <div className="bg-white p-8 rounded-xl w-full max-w-5xl shadow-lg animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Write your topic</h2>
              <div className="space-y-4">
                <input
                  name="title"
                  placeholder="Assignment Title (required)"
                  value={flowTopic}
                  onChange={(e) => setflowTopic(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={() => { setPdfRoadmapOpen(false), setflowTopic(""), setFlowJson({}) }}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFlowchartSubmit}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create Roadmap
                </button>

              </div>
              {flowJson && Object.keys(flowJson).length > 0 ? (
                <div className="mt-8">
                  <Roadmap roadmapData={flowJson} />
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* View Submissions Modal */}
        {isSubmissionsModalOpen && selectedAssignment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in duration-300">
            <div className="bg-white p-8 rounded-xl w-full max-w-2xl shadow-lg animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedAssignment.title}</h2>
                  <p className="text-gray-600 mt-1">Submissions Overview</p>
                </div>
                <button
                  onClick={() => setIsSubmissionsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Due Date:</span>
                    <p className="font-medium">{formatDate(selectedAssignment.dueDate)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Points:</span>
                    <p className="font-medium">{selectedAssignment.points}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Submissions:</span>
                    <p className="font-medium">{selectedAssignment.submissions.length}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <p
                      className={`font-medium ${isOverdue(selectedAssignment.dueDate) ? "text-red-600" : "text-green-600"}`}
                    >
                      {isOverdue(selectedAssignment.dueDate) ? "Overdue" : "Active"}
                    </p>
                  </div>
                </div>
              </div>

              {selectedAssignment.submissions.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Student Submissions</h3>
                  {selectedAssignment.submissions.map((submission) => (
                    <div key={submission.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-medium">{submission.studentName}</p>
                        <p className="text-sm text-gray-600">Submitted: {formatDate(submission.submittedAt)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                          {submission.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Review</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
                  <p className="text-gray-600">Students haven't submitted their work for this assignment.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Success Modal */}
        {isSuccessModalOpen && createdClass && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in duration-300">
            <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-lg text-center animate-in slide-in-from-bottom duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Class Created Successfully!</h2>
              <p className="text-gray-600 mb-6">Your class "{createdClass.name}" has been created.</p>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-sm text-gray-600 mb-2">Share this class code with your students:</p>
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-3xl font-mono font-bold text-purple-600 tracking-wider">
                    {createdClass.classCode}
                  </span>
                  <button
                    onClick={() => copyToClipboard(createdClass.classCode)}
                    className="p-2 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    {copiedCode === createdClass.classCode ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Copy className="h-5 w-5 text-purple-600" />
                    )}
                  </button>
                </div>
                {copiedCode === createdClass.classCode && (
                  <p className="text-green-600 text-sm mt-2">Copied to clipboard!</p>
                )}
              </div>

              <button
                onClick={() => {
                  setIsSuccessModalOpen(false)
                  setCreatedClass(null)
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClassroomPage
