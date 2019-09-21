import React, { Component } from 'react';
import {
  Card, CardBlock, CardGroup, CardImg, Col, CardTitle,
  Button, Modal, ModalHeader, ModalBody, FormGroup,
  ModalFooter, Label, Input
} from 'reactstrap';
import Swal from 'sweetalert2';
import CloudinaryUploader from './../../Component/CloudinaryUploader';

// Firestore
import firebaseSetup from '../../firebaseSetup.js'
import LazyImage from '../../Component/LazyImage';
const firestore = firebaseSetup.firestore();

const ViewContent = ({ children }) => (
  <div className="view-content view-components">
    <Card>
      <CardBlock>
        <h6 className="mb-4 text-uppercase">HOME</h6>
        {children}
      </CardBlock>
    </Card>
  </div>
);

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleries: this.props.galleries,
      editTab: null,
      modal: false,
      newGalleries: {
        caption: '',
        src: ''
      }
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleRemoveGallery = this.handleRemoveGallery.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.buildPreview = this.buildPreview.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.unregisterCollectionObserverWords = firestore.collection('home').onSnapshot((snap) => {
      const collection = {};
      snap.forEach((docSnapshot) => {
        collection[docSnapshot.id] = docSnapshot.data();
      });
      this.setState({ galleries: collection.images.data });
    });
  }


  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleChange = key => event => {
    const name = event.target.name;
    let { newGalleries } = this.state;
    newGalleries = {
      ...newGalleries,
      [name]: event.target.value
    }

    this.setState({ newGalleries })
  }

  buildPreview = (value) => {
    let imageObj = {
      caption: '',
      src: value
    }
    this.setState({ newGalleries: imageObj });
    this.toggleModal();
  }

  handleRemoveGallery = (index) => {

    Swal({
      title: 'Apa Anda Yakin?',
      text: `Anda akan menghapus gambar slider Home ini`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya!',
      cancelButtonText: 'Tidak!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        let { galleries } = this.state;
        galleries = [
          ...galleries.slice(0, index),
          ...galleries.slice(index + 1),
        ]
        this.setState({ galleries })
        const data = {
          data: galleries
        }
        firestore.collection('home')
          .doc('images')
          .set(data, { merge: true })
      }
    })
  }

  handleSubmit = () => {
    let { galleries, newGalleries } = this.state;
    if (newGalleries.caption === '') {
      alert('Caption tidak boleh kosong')
    } else {
      galleries.push(newGalleries);
      const data = {
        data: galleries
      }
      firestore.collection('home')
        .doc('images')
        .set(data, { merge: true })

      this.toggleModal();
      this.setState({
        newGalleries: {
          caption: '',
          src: ''
        }
      })
    }
  }

  render() {
    const { galleries, newGalleries } = this.state;
    return (
      <div className="view">
        <div className="view-header d-flex align-items-center">
          <header className="text-white">
            <h1 className="h5 title text-uppercase">Home Slider</h1>
            <p className="mb-0 subtitle text-nowrap">CRUD Slider for Home</p>
          </header>
          <div className="ml-auto d-flex mt-2">
            <div className="hidden-sm-down">
            </div>
            <div className="ml-5">
              <CloudinaryUploader callback={info => this.buildPreview(info)} noCropRatio>
                <input type="button" ref={ref => this.uploader = ref} id="upload_widget_opener" className="btn-warning btn" value="Add new Image" />
              </CloudinaryUploader>
              {/* <Button onClick={() => this.toggleModal()}> upload </Button> */}
            </div>
          </div>
        </div>
        <ViewContent>
          <Modal isOpen={this.state.modal} toggle={this.toggleModal} className='modalFadeInScale'>
            <ModalHeader toggle={this.toggleModal}>Add Slider</ModalHeader>
            <ModalBody>
              <FormGroup row>
                <Label for='caption' sm={3}>Caption</Label>
                <Col sm={9}><Input type="textarea" name='caption' placeholder={`Caption for Image ...`} value={newGalleries.caption} onChange={this.handleChange()} /></Col>
              </FormGroup>

              <FormGroup row>
                <Label for="images" sm={3}>Image</Label>
                <Col sm={9}>
                  <CardGroup>
                    <Col sm={12}>
                      <Card className="text-center mb-4">
                        <LazyImage src={newGalleries.src} alt={newGalleries.src} className="card-img-top" />
                      </Card>
                    </Col>
                  </CardGroup>
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button className="button-green" onClick={() => this.handleSubmit()}>Save</Button>{' '}
              <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
            </ModalFooter>
          </Modal>


          <CardGroup>
            {galleries && galleries.map((data, index) => {
              return (
                <Col sm={4} key={data.src}>
                  <Card className="text-center mb-4">
                    <LazyImage width="100%" src={data.src} alt={data.src} className="card-img-top" />
                    <CardBlock>
                      {/* <CardTitle>{mice[data].data.title}</CardTitle> */}
                      <p>{data.caption}</p>
                      <Button className="button-close" onClick={() => this.handleRemoveGallery(index)}>X</Button>
                    </CardBlock>
                  </Card>
                </Col>
              )
            })
            }
          </CardGroup>
        </ViewContent>
      </div>

    )
  }
}