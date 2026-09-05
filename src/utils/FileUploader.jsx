import Resumable from "resumablejs";

const FileUploader = async(file, uploadId, onProgress, onComplete) => {


    const r = new Resumable({
        target: `${import.meta.env.VITE_API_BASE_URL}/api/media/upload`,

        headers: {
            upload_id: uploadId
        },

        chunkSize: 5 * 1024 * 1024,
//  fileParameterName: "file",
        simultaneousUploads: 1,
        testChunks: false
    });

    // Register events BEFORE addFile()
    r.on("fileAdded", async(file) => {
       
         

        // Start upload here
         await r.upload();
    });

    r.on("uploadStart", () => {
        console.log("UPLOAD START");
    });

    r.on("chunkSuccess", (chunk, message) => {
    });

    r.on("chunkError", (chunk, message) => {
        console.error(
            "CHUNK ERROR:",
            chunk.chunkNumber,
            message
        );
    });

    r.on("fileSuccess", (file, message) => {
        const resumableFile = r.files[0];
        
        onComplete(true,resumableFile.chunks.length);
    });

    r.on("fileError", (file, message) => {
        console.error(
            "FILE ERROR:",
            file.fileName,
            message
        );
        onComplete?.();
    });

    r.on("progress", () => {
        
        onProgress?.(Math.round(r.progress() * 100));
    });

    // Add file LAST
    await r.addFile(file);
    
};

export default FileUploader;