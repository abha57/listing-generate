import React, { Component } from 'react';
import ReactDropZone from 'react-dropzone';
import './style.scss';
import cx from 'classnames';

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingPercentage: 0,
      status: undefined
    };
  }

  componentDidMount() {
    const { initialStatus } = this.props.data;
    this.setState({ status: initialStatus });
  }

  componentWillReceiveProps(nextProps) {
    const { initialStatus } = nextProps.data;
    this.setState({ status: initialStatus });
  }

  render() {
    const { status, loadingPercentage } = this.state;
    const { className, actions, data } = this.props;
    const { title } = data;
    const { onDrop } = actions;
    return (
      <div className={cx(className, 'drop-zone-component')}>
        <ReactDropZone
          multiple
          minSize={0}
          maxSize={5242880}
          accept="image/png, image/jpeg"
          onDropRejected={() => {
            this.setState({ status: 'rejected' });
          }}
          onDropAccepted={accepted => {
            this.setState({ status: 'uploading'})
            onDrop(accepted);
          }}
        >
          {/* {({
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
              </div>
            );
          }} */}
          {({ getRootProps,getInputProps }) => {
            return (
              <div {...getRootProps()}
              className={cx('drop-zone', {
                'drop-zone-uploading': status === 'uploading',
                'drop-zone-uploaded': status === 'uploaded',
                'drop-zone-rejected': status === 'rejected' || status === 'failed',
                'enable-progress': status === 'uploading'
              })}>
                <input {...getInputProps()} />
                <div className="dropzone-title">{title}</div>
                <div>
                  {status === 'uploaded' && <div>File Uploaded</div>}
                  {status === 'uploading' && (
                    <div>Your file is being uploaded...</div>
                  )}

                  {(status === 'rejected' || status === 'failed') && (
                    <div>Upload</div>
                  )}
                  {status === 'uploading' && (
                    <div className="progress-bar">
                      <div
                        className="bar"
                        style={{ width: `${loadingPercentage}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          }}
        </ReactDropZone>
      </div>
    );
  }
}

export default Dropzone;
