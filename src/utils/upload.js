import React from 'react';
import ImageUploader from 'react-images-upload';

class Upload extends React.Component {

	constructor(props) {
		super(props);
		 this.state = { pictures: [] };
		 this.onDrop = this.onDrop.bind(this);
	}

	onDrop(pictureFiles, pictureDataURLs) {
		this.setState({
            pictures: this.state.pictures.concat(pictureFiles),
        });
	}

    render() {
        return (
            <div>
            <ImageUploader
                    // withIcon={true}
                    // defaultImages={'ImgUrl1'}
                	// buttonText='Choose images'  
                	// onChange={this.onDrop}
                	// imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    // maxFileSize={5242880}
                    withPreview={true}
            />
            </div>
        );
    }
}

export default Upload;