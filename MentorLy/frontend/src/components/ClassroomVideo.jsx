import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import { toast } from "react-toastify";
import {
    User,
    Users,
    Video,
    VideoOff,
    Mic,
    MicOff,
    MessageCircle,
    Clock,
    CheckCircle,
    Send,
    Monitor,
    MonitorX,
} from "lucide-react";

const APP_ID = "c124727e52f64c5cbce2f776c925b475";
const TOKEN = null;
const UID = Math.floor(Math.random() * 10000);

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }); // Changed to rtc mode for multi-user

const ClassroomVideo = () => {
    const audienceChannel = new BroadcastChannel("audienceChannel");
    const navigate = useNavigate();
    const { channelName } = useParams();
    const [searchParams] = useSearchParams();
    const role = searchParams.get("role") || "audience";
     
    
    // Local media states
    const [screenTrack, setScreenTrack] = useState(null);
    const localVideoRef = useRef(null);
    const [localAudioTrack, setLocalAudioTrack] = useState(null);
    const [localVideoTrack, setLocalVideoTrack] = useState(null);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    
    // Remote users and UI states
    const [remoteUsers, setRemoteUsers] = useState([]);
    const [streamStopped, setStreamStopped] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordingStream, setRecordingStream] = useState(null);
    const [audience, setAudience] = useState([]);
    const [isJoined, setIsJoined] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                // Join the channel
                await client.join(APP_ID, channelName, TOKEN, UID);
                setIsJoined(true);

                // Create and publish local tracks for all users
                const [micTrack, camTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
                setLocalAudioTrack(micTrack);
                setLocalVideoTrack(camTrack);
                
                // Play local video
                if (localVideoRef.current) {
                    camTrack.play(localVideoRef.current);
                }
                
                // Publish tracks
                await client.publish([micTrack, camTrack]);

                // Recording for host only
                if (role === "host") {
                    const mediaStream = new MediaStream([
                        camTrack.getMediaStreamTrack(),
                        micTrack.getMediaStreamTrack(),
                    ]);
                    const recorder = new MediaRecorder(mediaStream);
                    recorder.start();
                    setRecordingStream(mediaStream);
                    setMediaRecorder(recorder);
                }

                // Notify about joining
                const user = JSON.parse(localStorage.getItem("user") || '{"firstname": "Anonymous", "lastname": "User"}');
                const userName = `${user.firstname} ${user.lastname}`;
                toast.success(`${userName} joined the room and presented`);

                // Broadcast join message
                audienceChannel.postMessage({ type: "join", name: userName });

                // Add to local audience list
                setAudience((prev) => {
                    if (!prev.includes(userName)) {
                        return [...prev, userName];
                    }
                    return prev;
                });

            } catch (error) {
                console.error("Failed to join channel:", error);
                toast.error("Failed to join the room");
            }
        };

        // Event listeners for remote users
        const handleUserPublished = async (user, mediaType) => {
            try {
                await client.subscribe(user, mediaType);
                
                if (mediaType === "video") {
                    setRemoteUsers((prev) => {
                        const existing = prev.find(u => u.uid === user.uid);
                        if (!existing) {
                            return [...prev, user];
                        }
                        return prev.map(u => u.uid === user.uid ? user : u);
                    });
                }
                
                if (mediaType === "audio" && user.audioTrack) {
                    user.audioTrack.play();
                }
            } catch (error) {
                console.error("Failed to subscribe to user:", error);
            }
        };

        const handleUserUnpublished = (user, mediaType) => {
            if (mediaType === "video") {
                setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
            }
        };

        const handleUserLeft = (user) => {
            setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
        };

        client.on("user-published", handleUserPublished);
        client.on("user-unpublished", handleUserUnpublished);
        client.on("user-left", handleUserLeft);

        init();

        return () => {
            cleanup();
        };
    }, [channelName, role]);

    // Handle audience join messages
    useEffect(() => {
        const handleAudienceJoin = (e) => {
            if (e.data.type === "join") {
                setAudience((prev) => {
                    if (!prev.includes(e.data.name)) {
                        return [...prev, e.data.name];
                    }
                    return prev;
                });
            }
        };

        audienceChannel.addEventListener("message", handleAudienceJoin);
        return () => audienceChannel.removeEventListener("message", handleAudienceJoin);
    }, []);

    // Play remote video tracks
    useEffect(() => {
        remoteUsers.forEach((user) => {
            if (user.videoTrack) {
                const videoElement = document.getElementById(`remote-video-${user.uid}`);
                if (videoElement) {
                    user.videoTrack.play(`remote-video-${user.uid}`);
                }
            }
        });
    }, [remoteUsers]);

    const cleanup = async () => {
        try {
            if (isJoined) {
                await client.leave();
                setIsJoined(false);
            }
            
            if (localAudioTrack) {
                localAudioTrack.stop();
                localAudioTrack.close();
            }
            
            if (localVideoTrack) {
                localVideoTrack.stop();
                localVideoTrack.close();
            }
            
            if (screenTrack) {
                screenTrack.stop();
                screenTrack.close();
            }
            
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
            }
            
            if (recordingStream) {
                recordingStream.getTracks().forEach((track) => track.stop());
            }
        } catch (error) {
            console.error("Cleanup error:", error);
        }
    };

    const toggleVideo = async () => {
        if (!localVideoTrack) return;
        
        try {
            if (isVideoMuted) {
                await localVideoTrack.setEnabled(true);
                setIsVideoMuted(false);
                toast.success("Camera turned on");
            } else {
                await localVideoTrack.setEnabled(false);
                setIsVideoMuted(true);
                toast.success("Camera turned off");
            }
        } catch (error) {
            console.error("Failed to toggle video:", error);
            toast.error("Failed to toggle camera");
        }
    };

    const toggleAudio = async () => {
        if (!localAudioTrack) return;
        
        try {
            if (isAudioMuted) {
                await localAudioTrack.setEnabled(true);
                setIsAudioMuted(false);
                toast.success("Microphone turned on");
            } else {
                await localAudioTrack.setEnabled(false);
                setIsAudioMuted(true);
                toast.success("Microphone muted");
            }
        } catch (error) {
            console.error("Failed to toggle audio:", error);
            toast.error("Failed to toggle microphone");
        }
    };

    const toggleScreenShare = async () => {
        if (role !== "host") {
            toast.error("Only hosts can share screen");
            return;
        }

        try {
            if (!screenTrack) {
                // Start screen sharing
                const screen = await AgoraRTC.createScreenVideoTrack();

                if (localVideoTrack) {
                    await client.unpublish(localVideoTrack);
                    localVideoTrack.stop();
                }

                await client.publish(screen);
                setScreenTrack(screen);

                // Replace preview with screen share
                if (localVideoRef.current) {
                    screen.play(localVideoRef.current);
                }
                
                toast.success("Screen sharing started");
            } else {
                // Stop screen sharing
                await client.unpublish(screenTrack);
                screenTrack.stop();
                setScreenTrack(null);

                // Restore camera
                const camTrack = await AgoraRTC.createCameraVideoTrack();
                setLocalVideoTrack(camTrack);

                if (localVideoRef.current) {
                    camTrack.play(localVideoRef.current);
                }
                await client.publish(camTrack);
                
                toast.success("Screen sharing stopped");
            }
        } catch (err) {
            console.error("Screen sharing failed:", err);
            toast.error("Failed to toggle screen sharing");
        }
    };

    const leaveRoom = async () => {
        try {
            setStreamStopped(true);
            await cleanup();
            navigate("/");
            window.location.reload();
        } catch (err) {
            console.error("Failed to leave room:", err);
            toast.error("Failed to leave room");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-700">
                    Room: <span className="text-black">{channelName}</span>{" "}
                    <span className="text-sm bg-gray-200 px-2 py-1 rounded ml-2">
                        ({role})
                    </span>
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-5 h-5" />
                    <span>{remoteUsers.length + 1} Connected</span>
                </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Local Video */}
                <div className="relative overflow-hidden rounded-3xl bg-black">
                    <div
                        ref={localVideoRef}
                        className="w-full h-[300px] bg-black rounded-xl"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                        You ({role})
                    </div>
                    <div className="absolute bottom-4 right-4 flex gap-2">
                        {isVideoMuted && (
                            <div className="bg-red-500 p-2 rounded-full">
                                <VideoOff className="w-4 h-4 text-white" />
                            </div>
                        )}
                        {isAudioMuted && (
                            <div className="bg-red-500 p-2 rounded-full">
                                <MicOff className="w-4 h-4 text-white" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Remote Videos */}
                {remoteUsers.map((user) => (
                    <div key={user.uid} className="relative overflow-hidden rounded-3xl bg-black">
                        <div
                            id={`remote-video-${user.uid}`}
                            className="w-full h-[300px] bg-black rounded-xl"
                        />
                        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                            User {user.uid}
                        </div>
                    </div>
                ))}

                {/* Q&A Panel */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-200/50 p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                            <MessageCircle className="w-5 h-5 text-purple-600" />
                            <span>Live Q&A</span>
                        </h3>
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            3 pending
                        </div>
                    </div>

                    <div className="flex-1 space-y-3 mb-4 overflow-y-auto max-h-[200px]">
                        <div className="p-4 rounded-xl border bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200/50">
                            <div className="flex items-start justify-between mb-2">
                                <p className="text-sm font-medium text-gray-800 flex-1 pr-2">
                                    What is the deadline for the assignment?
                                </p>
                                <button className="w-6 h-6 rounded-full flex items-center justify-center bg-orange-500 hover:bg-orange-600">
                                    <Clock className="w-4 h-4 text-white" />
                                </button>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-600">
                                <span className="font-medium">John Doe</span>
                                <div className="flex items-center space-x-2">
                                    <span>10:45 AM</span>
                                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-orange-200 text-orange-800">
                                        Pending
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl border bg-gradient-to-r from-green-50 to-green-100 border-green-200/50">
                            <div className="flex items-start justify-between mb-2">
                                <p className="text-sm font-medium text-gray-800 flex-1 pr-2">
                                    Will there be a revision session?
                                </p>
                                <button className="w-6 h-6 rounded-full flex items-center justify-center bg-green-500 hover:bg-green-600">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                </button>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-600">
                                <span className="font-medium">Jane Smith</span>
                                <div className="flex items-center space-x-2">
                                    <span>10:50 AM</span>
                                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-200 text-green-800">
                                        Answered
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Ask a question..."
                            className="flex-1 px-4 py-3 text-sm border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
                <button
                    onClick={toggleVideo}
                    className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                        isVideoMuted 
                            ? "bg-red-600 hover:bg-red-700 text-white" 
                            : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                >
                    {isVideoMuted ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                    {isVideoMuted ? "Turn On Camera" : "Turn Off Camera"}
                </button>

                <button
                    onClick={toggleAudio}
                    className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                        isAudioMuted 
                            ? "bg-red-600 hover:bg-red-700 text-white" 
                            : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                >
                    {isAudioMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    {isAudioMuted ? "Unmute" : "Mute"}
                </button>

                {role === "host" && (
                    <button
                        onClick={toggleScreenShare}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    >
                        {screenTrack ? <MonitorX className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                        {screenTrack ? "Stop Screen Share" : "Share Screen"}
                    </button>
                )}

                <button
                    onClick={leaveRoom}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                    Leave Room
                </button>
            </div>

            {/* Audience List */}
            {audience.length > 0 && (
                <div className="mb-10">
                    <h4 className="text-md font-semibold mb-2 text-gray-600">
                        👥 Participants:
                    </h4>
                    <div className="flex flex-wrap gap-3">
                        {audience.map((name, idx) => (
                            <div
                                key={idx}
                                className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                            >
                                {name}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {streamStopped && (
                <p className="mt-4 text-green-600 font-medium">
                    ✅ Left the room successfully.
                </p>
            )}
        </div>
    );
};

export default ClassroomVideo;