import Sidebar from "../../components/Sidebar";
import UploadForm from "../../components/uploadForm/UploadForm";
import "./UploadPage.css";

const UploadPage = () => {
    return (
        <div className="upload-page">
            <div className="sidebar-section">
                <Sidebar />
            </div>
            <div className="content-section">
                <UploadForm />  
            </div>  
        </div>
    )
}
export default UploadPage;