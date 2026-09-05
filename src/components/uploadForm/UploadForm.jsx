import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./UploadForm.css";
import FileUploader from "../../utils/FileUploader";
import { useNavigate } from "react-router-dom";
const UploadForm = () => {
    const [uploadId,setUploadId] = useState(null); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [totalchunks,setTotalChunks] = useState(null);
    const [progress,setProgress] = useState(0);
    const [uploadComplete,setUploadComplete] = useState(false);


    const navigate = useNavigate();
    // console.log("to file upload complete",uploadComplete);

    const handleSubmit = async(e) => {
        e.preventDefault();

        setIsSubmitting(true);

        const file = e.target["file-upload"].files[0];
        const title = e.target["video-title"].value;
        const description = e.target["video-description"].value;

        console.log(title,description);
        const videoDetail = {
                                "title": title,
                                "description": description
                            }
        // console.log("Submitting upload form", {
        //     file,
        //     title,
        //     description,
        // });

        const uploadIdAPIResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/media/get/uploadId`,{
            "method": 'GET',
            "headers":{
                "authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });

        const uploadIdAPIResult  = await uploadIdAPIResponse.json();
        console.log("upload id api response",uploadIdAPIResult)
        // console.log(result);
        if(uploadIdAPIResult && uploadIdAPIResult.success){
            setUploadId(uploadIdAPIResult.data)
            console.log("upload Id set",uploadId)
             
            
            await FileUploader(
                file,
                uploadIdAPIResult?.data,
                (progress) => {
                    // console.log(`Upload progress: ${progress}%`);
                },
                async(status,total_chunks) => {
                    if (status) {


                        const verifyApiResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/media/verify`, {
                            "method": "POST",
                            "headers": {

                                "upload_id": uploadIdAPIResult.data,
                                "total_chunks": total_chunks,
                                "Content-Type": "application/json",
                                "authorization" : `Bearer ${localStorage.getItem("token")}`
                            },
                            "body": JSON.stringify(videoDetail),
                        })
                        const verifyApiResult = await verifyApiResponse.json();
                        if (verifyApiResult.success) {
                            alert("Upload Uploaded Successfully");
                            navigate('/')

                        } else {
                            alert("Issue with verification")
                        }
            
                    }
                    setIsSubmitting(false);
                }
            );

            
            
        }else{
            alert("Unexpected Error");
            
        }
        };
        // console.log("here ddddddddddddd",totalchunks)
        
    return (
        <form className="upload-form" onSubmit={handleSubmit}>
            <div className="upload-card">
                <div className="upload-header">
                    <h1>Upload Your Video</h1>
                    <p>Choose a video file to add your content to the platform. Supported formats: MP4, MOV, WEBM.</p>
                </div>
                <div className="file-upload-zone">
                    <label htmlFor="file-upload" className="custom-file-upload">
                        <FaCloudUploadAlt className="upload-icon" />
                        <div className="upload-text">
                            <span>Click here to select a file</span>
                            <small>or drag and drop your video</small>
                        </div>
                    </label>
                    <input id="file-upload" name="file-upload" type="file" accept="video/*" required />
                </div>
                <div className="field-group">
                    <label htmlFor="video-title" className="field-label">Video Title</label>
                    <input id="video-title" name="video-title" type="text" placeholder="Enter video title" required />
                </div>
                <div className="field-group">
                    <label htmlFor="video-description" className="field-label">Video Description</label>
                    <textarea id="video-description" name="video-description" placeholder="Enter video description" required></textarea>
                </div>
                <div className="upload-details">
                    <span>Maximum file size: <strong>2GB</strong></span>
                    <span>Recommended resolution: <strong>1080p or lower</strong></span>
                </div>
                <button type="submit" className="upload-button" disabled={isSubmitting}>
                    {isSubmitting ? "Uploading..." : "Upload"}
                </button>
            </div>
        </form>
    );
};

export default UploadForm