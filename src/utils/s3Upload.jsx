import axios from "axios";
import { auth_api } from "./axios";
import { useState } from "react";
import {useNewUpload} from "../hooks/useNewUpload"

export const useUploadFiles = () => {
  const [progress, setProgress] = useState(0);
  const [filesMsg, setFilesMsg] = useState({
    uploading:0,
    total:0
  });
  
  const {setNewFileUploaded}=useNewUpload()

  const uploadFiles = async (files, folder_id) => {
    const response = await auth_api.get(
      `/put_signed_url?files_count=${files.length}`
    );
    console.log("presigned",response.data);

    const data = response.data;

    setFilesMsg(prev=>({
        ...prev,total:files.length
      })) 
    for (let i = 0; i < files.length; i++) {
      setProgress(0)
      setFilesMsg(prev=>({
        ...prev,uploading:i+1
      }))  
      const response = await axios.put(
        data.data[i].put_pre_signed_url,
        files[i],
        {
          headers: {
            "Content-Type": files[i].type,
          },
          onUploadProgress: (event) => {
            console.log("upload progress", event);
            const progress = (event.loaded / event.total) * 100;
            setProgress(progress);
          },
        }
      );

      //     const { fileName, size, fileType, folderId, key } = req.body;
      if (response.status == 200) {
        const requestBody = {
          fileName: files[i].name,
          size: files[i].size,
          fileType: files[i].type,
          key: data.data[i].key,
          folderId: folder_id,
        };

        await auth_api.post("/file/create_file", requestBody);
    
      }
    }
    setNewFileUploaded({uploadedAt:Date.now()})
  };

  return { uploadFiles,progress,filesMsg };
};
