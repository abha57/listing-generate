import React, { Component } from "react";
import ReactDropZone from "react-dropzone";

class Dropzone extends Component {

  render() {
    return (
      <div>
        <ReactDropZone
          onDrop={this.props.onDrop}
          multiple
          minSize={0}
          maxSize={5242880}
          accept="image/png, image/jpeg"
        >
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragReject,
            rejectedFiles
          }) => {
            return (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                Click me to upload a file!
                {isDragActive ? <div> Uploading in process. </div> : null}
                {isDragReject ? (
                  <div> Please choose a different file </div>
                ) : null}
                {/* {rejectedFiles &&
                  rejectedFiles.length > 0 && (
                      <div>
                      <ul> Sorry the files
                       {
 rejectedFiles.map((file,index) => (
                    
                       <li key={`${file.name}${index}`>{file.name}</li>
                    
                  ))
                       }
                 
                  </ul>
                      </div>
                       
                  )
                  } */}
              </div>
            );
          }}
        </ReactDropZone>
      </div>
    );
  }
}

export default Dropzone;
