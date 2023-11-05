import { useContext } from "react"
import {newUploadContext} from "../context/newUploadContext"

export const useNewUpload=()=> { 
  return  useContext(newUploadContext)
}
