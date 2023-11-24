import { LogOut, MinusCircle, PlusCircle, X } from "lucide-react";
import Input from "../components/ui/input";
import { useUploadFiles } from "../utils/s3Upload";
import { useAuth } from "../hooks/useAuth";
import { Link, Outlet, useParams } from "react-router-dom";
import { useState } from "react";
import Button from "../components/ui/button";
import { auth_api } from "../utils/axios";
import { useNewUpload } from "../hooks/useNewUpload";

function Layout() {
  return (
    <>
      <NavBar />
      <SidePanel />
      <MainPanel />
    </>
  );
}
const NavBar = () => {
  const params = useParams();
  const { user } = useAuth();

  const { folder_id, username } = params;
  console.log(user);
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <div className="text-white text-2xl font-bold flex items-center justify-center gap-4">
                <img src="/cloud.png" alt="logo" className="w-9 " />
                <Link
                  to={`/u/${username}/${folder_id}`}
                  className="cursor-pointer"
                >
                  CLOUD VAULT
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-white text-xs flex  flex-col mx-2">
                <span>Username : {user.username}</span>
                <span>Email : {user.email}</span>
              </div>
              <span
                className="text-white cursor-pointer"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                }}
              >
                <LogOut />
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

const SidePanel = () => {
  const params = useParams();
  const { folder_id } = params;

  const { progress, uploadFiles, filesMsg } = useUploadFiles();
  const { setNewFileUploaded } = useNewUpload();
  const [showProgrss, setShowProgress] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);

  const [folderName, setFolderName] = useState("");

  const handleFileUpload = async (e) => {
    const files = e.target.files;

    setShowProgress(true);
    await uploadFiles(files, folder_id);
  };
  const handleCreateFolder = async () => {
    const response = await auth_api.post("/file/create_folder", {
      folderName: folderName,
      parentFolder: folder_id,
    });
    const data = response.data;
    if (data.status_code == 200) {
      setNewFileUploaded({ uploadedAt: Date.now() });
      setFolderName("");
    }
  };
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col gap-8 text-2xl font-semibold text-white">
          <div className="cursor-pointer flex flex-col gap-4  hover:bg-slate-500 p-2 rounded-lg">
            <label
              htmlFor="folderName"
              className="cursor-pointer flex gap-4 items-center  "
              onClick={() => setShowCreateFolder(!showCreateFolder)}
            >
              <span>Create Folder </span>
              {showCreateFolder ? <MinusCircle /> : <PlusCircle />}
            </label>
            {showCreateFolder ? (
              <div className="">
                <Input
                  type={"text"}
                  name="folderName"
                  id="folderName"
                  onChange={(e) => {
                    setFolderName(e.target.value);
                  }}
                  value={folderName}
                />
                <Button text="create" onClick={handleCreateFolder} />
              </div>
            ) : null}
          </div>
          <div className=" hover:bg-slate-500 p-2 rounded-lg">
            <label
              htmlFor="files"
              className="cursor-pointer flex gap-4 items-center  "
            >
              <span>Upload Files </span>
              <PlusCircle />
            </label>
            <Input
              type="file"
              name="files"
              id="files"
              hidden={true}
              onChange={handleFileUpload}
              multiple
            />
          </div>
          <div className="  flex-1 flex items-end gap-4">
            {showProgrss ? (
              <div className="relative w-full h-24 rounded-lg bg-slate-400 flex flex-col justify-center items-center ">
                <div
                  className="absolute top-0 right-0 cursor-pointer"
                  onClick={() => setShowProgress(false)}
                >
                  <X />
                </div>
                <h1>
                  {progress == 100 ? "Uploaded " : "Uploading.. "}
                  {filesMsg.uploading}/{filesMsg.total}
                </h1>
                <div>{<div>{progress.toFixed(0)}%</div>}</div>
              </div>
            ) : null}
          </div>
          {import.meta.env.VITE_ALLOW_UPLOAD == 0 ? (
            <div className="  flex-1 flex items-end gap-4">
              <div className="relative w-full h-24 rounded-lg bg-red-600 flex flex-col justify-center items-center ">
                <h1 className="text-2xl font-bold text-center">
                  UPLOAD FILE IS TURNED OFF
                </h1>
              </div>
            </div>
          ) : null}
        </div>
      </aside>
    </>
  );
};

const MainPanel = () => {
  return (
    <>
      <div className="p-4 sm:ml-64 mt-14">
        <Outlet />
      </div>
    </>
  );
};
export default Layout;
