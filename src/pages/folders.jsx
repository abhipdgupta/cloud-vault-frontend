import { useNavigate, useParams } from "react-router-dom";
import { auth_api } from "../utils/axios";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useNewUpload } from "../hooks/useNewUpload";
import { Trash } from "lucide-react";

export const Folder = () => {
  const navigate = useNavigate();
  const [folderData, setFolderData] = useState({});

  const {newFileUploaded, setNewFileUploaded}= useNewUpload();
  const { folder_id, username } = useParams();

  const fetchFolderInfo = useCallback(async () => {
    const response = await auth_api.get(
      `/file/folder_info?folderId=${folder_id}`
    );
    const folderD = response.data.data[0];
    console.log(folderD);
    setFolderData(folderD);
  }, [folder_id]);

  const handleFetchLinkAndOpenTab = async (key) => {
    console.log("key", key);

    const response = await auth_api.get(`/view_signed_url?key=${key}`);

    const data = response.data;
    console.log(data);
    if (data.status_code == 200) {
      window.open(data.link, "_blank");
    }
  };

  const handleOpenFolder = async (id) => {
    navigate(`/u/${username}/${id}`);
  };
  const handleFileDelete = async (key) => {
    const response = await auth_api.delete(`/file/delete_file?key=${key}`);
    const data=response.data

    if(data.status_code==200){
        setNewFileUploaded({uploadedAt:Date.now()})
    }
  };
  const handleFolderDelete = async (id) => {
    const response = await auth_api.delete(`/file/folder_delete?id=${id}`);
    const data=response.data

    if(data.status_code==200){
        setNewFileUploaded({uploadedAt:Date.now()})
    }
  };
  useEffect(() => {
    fetchFolderInfo();
  }, [fetchFolderInfo, newFileUploaded]);

  return (
    <>
      <div className="flex gap-4 flex-wrap">
        {folderData.subFolder &&
          folderData.subFolder.map((item) => (
            <Fragment key={item._id}>
              <div
                title={""}
                className="relateive flex flex-col gap-3 my-4 border cursor-pointer items-center justify-center p-7 rounded-lg drop-shadow-lg bg-white"
                onDoubleClick={() => {
                  handleOpenFolder(item._id);
                }}
              >
                <div className="w-32 h-32 hover:scale-105 transition-transform">
                  <img src="/file_type/folder.png" alt="" />
                </div>
                <h1>{item.folderName}</h1>
                <div className="absolute top-1 right-2 text-red-600 hover:scale-110 transition-transform"
                onClick={() => handleFolderDelete(item._id)}
                >
                  <Trash size={20} />
                </div>
              </div>
            </Fragment>
          ))}
        {folderData.files &&
          folderData.files.map((item) => (
            <Fragment key={item._id}>
              <div>
                {item.fileType.startsWith("image/") && (
                  <div
                    title={item.fileName}
                    className="relative flex flex-col gap-3 my-4 border cursor-pointer items-center justify-center p-7 rounded-lg drop-shadow-lg bg-white"
                  >
                    <div
                      className="w-32 h-32 hover:scale-105 transition-transform"
                      onClick={() => {
                        handleFetchLinkAndOpenTab(item.key);
                      }}
                    >
                      <img src="/file_type/image.png" alt="" />
                    </div>
                    <h1>{item.fileName.slice(0, 15)}</h1>
                    <div
                      className="absolute top-1 right-2 text-red-600 hover:scale-110 transition-transform"
                      onClick={() => handleFileDelete(item.key)}
                    >
                      <Trash size={20} />
                    </div>
                  </div>
                )}

                {item.fileType == "application/pdf" && (
                  <div
                    title={item.fileName}
                    className="relative flex flex-col gap-3 my-4 border cursor-pointer items-center justify-center p-7 rounded-lg drop-shadow-lg bg-white"
                  >
                    <div
                      className="w-32 h-32 hover:scale-105 transition-transform"
                      onClick={() => {
                        handleFetchLinkAndOpenTab(item.key);
                      }}
                    >
                      <img src="/file_type/pdf.png" alt="" />
                    </div>
                    <h1>{item.fileName.slice(0, 15)}</h1>
                    <div
                      className="absolute top-1 right-2 text-red-600 hover:scale-110 transition-transform"
                      onClick={() => handleFileDelete(item.key)}
                    >
                      <Trash size={20} />
                    </div>
                  </div>
                )}
                {item.fileType == "application/pdf" ||
                  (!item.fileType.startsWith("image/") && (
                    <div
                      title={item.fileName}
                      className="relative flex flex-col gap-3 my-4 border cursor-pointer items-center justify-center p-7 rounded-lg drop-shadow-lg bg-white"
                    >
                      <div
                        className="w-32 h-32 hover:scale-105 transition-transform"
                        onClick={() => {
                          handleFetchLinkAndOpenTab(item.key);
                        }}
                      >
                        <img src="/file_type/general.png" alt="" />
                      </div>
                      <h1>{item.fileName.slice(0, 15)}</h1>
                      <div
                        className="absolute top-1 right-2 text-red-600 hover:scale-110 transition-transform"
                        onClick={() => handleFileDelete(item.key)}
                      >
                        <Trash size={20} />
                      </div>
                    </div>
                  ))}
              </div>
            </Fragment>
          ))}
      </div>
    </>
  );
};
