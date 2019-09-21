import React, { Component } from 'react';
import {
    Row, Col, InputGroup, InputGroupButton,
    Card, CardBlock, TabContent, TabPane, Nav,
    NavItem, NavLink, FormGroup, Label, Input,
    Button
} from 'reactstrap';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import CloudinaryUploader from './../../Component/CloudinaryUploader';
import OGPreviewer from './../../Component/OGPreviewer';

// Firestore
import firebaseSetup from '../../firebaseSetup.js'
const firestore = firebaseSetup.firestore();


const ViewHeader = () => (
    <div className="view-header">
        <header className="title text-white">
            <h1 className="h4 text-uppercase">App Pages</h1>
            <p className="mb-0">App Pages' CRUD</p>
        </header>
    </div>
);

const ViewContent = ({ children }) => (
    <div className="view-content view-components">
        <Card>
            <CardBlock>
                {children}
            </CardBlock>
        </Card>
    </div>
);

export default class AppPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
            pages: props.pages,
            previewType: 'desktop',
        };
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.unregisterCollection = firestore.collection('pages').onSnapshot((snap) => {
            const collection = {};
            snap.forEach((docSnapshot) => {
                collection[docSnapshot.id] = docSnapshot.data();
            });
            this.setState({ pages: collection });
        });
    }

    componentWillUnmount() {
        this.unregisterCollection();
    }

    toggle = (tab, data) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
                data
            });
        }
    }

    handleMeta = (key) => (event) => {
        let { pages } = this.state;
        let page = pages[key];
        const { target: { name, value } } = event;
        page = {
            ...page,
            meta: {
                ...page.meta,
                [name]: value,
            }
        };
        pages = {
            ...pages,
            [key]: page,
        }
        this.setState({ pages });
    }

    handleChange = key => event => {
        let { pages } = this.state;
        let page = pages[key];
        const { target: { name, value } } = event;
        page = {
            ...page,
            [name]: value,
        };
        pages = {
            ...pages,
            [key]: page,
        }
        this.setState({ pages });
    }

    handleImage = key => image => {
        let { pages } = this.state;
        let page = pages[key];
        page = {
            ...page,
            image,
        };
        pages = {
            ...pages,
            [key]: page,
        }
        this.setState({ pages });
    }

    handleSubmit = (key) => () => {
        const { pages } = this.state;
        const page = pages[key];
        firestore.collection('pages')
            .doc(key)
            .set(page, { merge: true })
    }

    buildPreview = (key) => (image) => {
        console.log(key);
        console.log(image);
        let { pages } = this.state;
        let page = pages[key];
        page = {
            ...page,
            meta: {
                ...page.meta,
                image,
            }
        };
        pages = {
            ...pages,
            [key]: page,
        }
        this.setState({ pages });
    }

    render() {

        const { pages } = this.state;

        return (
            <div className="view">
                <ViewHeader />
                <ViewContent>
                    <Nav tabs>
                        {pages && Object.keys(pages).map((data, index) => {
                            return (
                                <NavItem key={data}>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === index + 1 })}
                                        onClick={() => { this.toggle(index + 1, data); }}
                                        style={{ color: '#38afa6' }}
                                    >
                                        {data}
                                    </NavLink>
                                </NavItem>
                            )
                        })}
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        {pages && Object.keys(pages).map((data, index) => {
                            const page = pages[data];
                            return (
                                <TabPane tabId={index + 1} key={data}>
                                    <Row style={{ padding: 10 }}>
                                        <Col sm="12">
                                            <p /><p /><p /><p /><p /><p />
                                            <OGPreviewer
                                                previewType={this.state.previewType}
                                                image={page.meta.image}
                                                title={page.meta.title}
                                                description={page.meta.description}
                                                url={`/${data}`}
                                            />
                                            <br /><br /><br /><br />
                                            {Object.keys(page).map(key => {
                                                if (key === 'meta') {
                                                    return (
                                                        <div key={key}>
                                                            {Object.keys(page[key]).map(meta => (
                                                                <FormGroup row key={meta}>
                                                                    <Label for={meta} sm={3}>meta_{meta}</Label>
                                                                    <Col sm={9}>
                                                                        {meta === 'image' ?
                                                                            <InputGroup>
                                                                                <Input disabled type="name" className="custom-file-input" name={meta} id={meta} placeholder={`Insert ${meta} for a better SEO`} value={page[key][meta]} onChange={this.handleMeta(data)} />
                                                                                <CloudinaryUploader
                                                                                    callback={this.buildPreview(data)}
                                                                                    folder={`page_${data}`}
                                                                                    placeholder="Change Meta Image"
                                                                                >
                                                                                    <InputGroupButton>Browse</InputGroupButton>
                                                                                </CloudinaryUploader>
                                                                            </InputGroup> :
                                                                            <Input disabled={meta === 'image' ? true : false} type="name" name={meta} id={meta} placeholder={`Insert ${meta} for a better SEO`} value={page[key][meta]} onChange={this.handleMeta(data)} />
                                                                        }
                                                                    </Col>
                                                                </FormGroup>
                                                            ))}
                                                        </div>
                                                    );
                                                }
                                                if (key === 'image') {
                                                    return (
                                                        <FormGroup row key={key}>
                                                            <Label for={key} sm={3}>{key}</Label>
                                                            <Col sm={9}>
                                                                <InputGroup>
                                                                    <Input disabled type="name" className="custom-file-input" name={key} id={key} placeholder={`Page's banner`} value={page[key]} onChange={this.handleChange(data)} />
                                                                    <CloudinaryUploader
                                                                        callback={this.handleImage(data)}
                                                                        folder={`page_${data}`}
                                                                        cropRatio={1.5}
                                                                    >
                                                                        <InputGroupButton>Browse</InputGroupButton>
                                                                    </CloudinaryUploader>
                                                                </InputGroup>
                                                            </Col>
                                                        </FormGroup>
                                                    );
                                                }
                                                return (
                                                    <FormGroup row key={key}>
                                                        <Label for={key} sm={3}>{key}</Label>
                                                        <Col sm={9}>
                                                            <Input type="name" name={key} id={key} placeholder={`Insert ${key} for a better content`} defaultValue={page[key]} onChange={this.handleChange(data)} />
                                                        </Col>
                                                    </FormGroup>
                                                )
                                            })}
                                            <FormGroup row style={{ marginTop: '40px' }}>
                                                <Col sm={12} className="text-right">
                                                    <Button style={{ backgroundColor: '#38afa6', color: '#fff', borderColor: '#38afa6' }} onClick={this.handleSubmit(data)}>Update</Button>
                                                    {/* <Button>Cancel</Button> */}
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </TabPane>
                            )
                        })}
                    </TabContent>
                </ViewContent>
            </div>
        )
    }
}

class CustomDatePicker extends React.Component {
    state = {
        startDate: new Date(),
        endDate: new Date(moment().add(1, 'days')),
    }
    handleChangeEnd = (endDate) => {
        this.setState({ endDate })
    }
    handleChangeStart = (startDate) => {
        this.setState({ startDate })
    }
    render() {
        return (
            <React.Fragment>
                <DatePicker
                    selected={this.state.startDate}
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeStart}
                />

                <DatePicker
                    selected={this.state.endDate}
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeEnd}
                />
            </React.Fragment>
        );
    }
}