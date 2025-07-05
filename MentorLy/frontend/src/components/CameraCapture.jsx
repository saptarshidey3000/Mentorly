import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";


const CameraCapture = ({ onSuccess }) => {
    const webcamRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [profilePic, setProfilePic] = useState("");

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"));
        const profilePic = user?.profilePic
        setProfilePic(encodeURIComponent(profilePic))
    }, [])

    const captureAndSend = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) return setError("Failed to capture image");

        setLoading(true);
        setError("");

        try {
            // Convert base64 to Blob
            const blob = await (await fetch(imageSrc)).blob();
            const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" });

            const formData = new FormData();
            formData.append("image2", file);

            const url = `http://10.230.245.255:7000/pdf/checker?image1=${profilePic}`;
            console.log("Sending to:", url);

            const res = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.verified === true) {
                onSuccess();
            } else {
                setError("Verification failed.");
                toast.error("Identity doesn't match.");
                
            }
        } catch (err) {
            setError("API Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="rounded-lg shadow-md"
            />
            <button
                onClick={captureAndSend}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                {loading ? "Verifying..." : "Capture & Verify"}
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default CameraCapture;
