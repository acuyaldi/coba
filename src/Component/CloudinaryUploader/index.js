import React from 'react';
import PropTypes from 'prop-types';

class CloudinaryUploader extends React.PureComponent {
  static propTypes = {
    callback: PropTypes.func,
    cropping: PropTypes.bool,
    multiple: PropTypes.bool,
    cropRatio: PropTypes.number,
    noCropRatio: PropTypes.bool,
    folder: PropTypes.string,
  }

  static defaultProps = {
    callback: () => { },
    cropping: true,
    multiple: false,
    cropRatio: 1,
    noCropRatio: false,
    folder: 'widgetdocs',
  }

  componentDidMount() {
    if (window && window.cloudinary) {
      this.uploader.addEventListener("click", (event) => {
        event.preventDefault();
        window.cloudinary.openUploadWidget({
          multiple: this.props.multiple,
          cloudName: 'putriduyungancol',
          uploadPreset: 'facebook_graph',
          cropping: this.props.multiple ? false : this.props.cropping ? 'server' : false,
          croppingAspectRatio: this.props.noCropRatio ? 0 : this.props.cropRatio,
          croppingShowDimensions: true,
          croppingCoordinatesMode: 'custom',
          folder: this.props.folder,
        }, (error, result) => {
          if (error) {
            throw error;
            return;
          }
          console.log('result', result);
          if (result.event === 'success') {
            this.props.callback(result.info.secure_url);
          }
        });
      }, false);
    }
  }

  componentWillUnmount() {
    this.uploader.removeEventListener('click', this.uploader, false);
  }

  render() {
    const { children } = this.props;
    return (
      <div ref={ref => { this.uploader = ref; }}>
        {React.Children.map(children, child =>
          React.cloneElement(child)
        )}
      </div>
    )

  }
}

export default CloudinaryUploader;