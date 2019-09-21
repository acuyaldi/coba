import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

class OGPreviewer extends React.PureComponent {
  render() {
    const {
      previewType,
      image,
      title,
      description,
      url
    } = this.props;
    return (
      <div id="facebook_open_graph_editor">
        <div id="facebook_open_graph_content" className="clearfix">
          <div id="facebook-open-graph-editor-widget-container">
            <div id="facebook-open-graph-editor-widget" style={{ display: 'block', margin: 0 }}>
              <div className={`realfavicongenerator-widget-open-graph format_1_1 ${previewType}`} style={{ margin: 'auto' }}>
                <div className="overall-image-container">
                  <div className="grabbed-image-container">
                    <div className="overflow-gradient top">
                      <div className="overflow-gradient right">
                        <div className="overflow-gradient bottom">
                          <div className="overflow-gradient left">
                            <div className="image-container grabbable" style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
                              {image &&
                                <Image cloudName="putriduyungancol" publicId={image}>
                                  <Transformation gravity="custom" crop="fill" />
                                </Image>
                              }
                              <div className="borders"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-container">
                  <div className="text-inner-container">
                    <div className="title">{title}</div>
                    <div className="description">{description}</div>
                    <div className="url">{url}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OGPreviewer;