import { useState } from "react";
import PropTypes from "prop-types";
import {newUploadContext} from "./newUploadContext"

function NewUploadProvider({ children }) {
    const [newFileUploaded, setNewFileUploaded] = useState({});
  
    return (
      <newUploadContext.Provider value={{newFileUploaded, setNewFileUploaded}}>
        {children}
      </newUploadContext.Provider>
    );
  }
  
  NewUploadProvider.propTypes = {
      children:PropTypes.node.isRequired
    };
  
  export default NewUploadProvider;