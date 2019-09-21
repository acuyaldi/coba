import React from 'react';
import { Link, IndexLink, withRouter } from 'react-router';
import { Collapse } from 'reactstrap';
import localforage from 'localforage';
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


// icons
import IconDashboard from 'react-icons/lib/md/dashboard';
import IconWidgets from 'react-icons/lib/md/extension';
import IconUI from 'react-icons/lib/md/gradient';
// import IconPages from 'react-icons/lib/md/filter-none';
// import IconChart from 'react-icons/lib/md/landscape';
import IconTable from 'react-icons/lib/md/grid-on';
// import IconForm from 'react-icons/lib/md/layers';
import IconDown from 'react-icons/lib/md/chevron-right';
import IconBed from 'react-icons/lib/fa/bed';
import IconHome from 'react-icons/lib/md/home';
import IconSearch from 'react-icons/lib/fa/search';
import IconResto from 'react-icons/lib/md/restaurant-menu';
import IconPeople from 'react-icons/lib/io/ios-people';
import IconPool from 'react-icons/lib/md/pool';
import IconGallery from 'react-icons/lib/md/photo-library';
import IconDropbox from 'react-icons/lib/io/social-dropbox';
import ScrollArea from '../scrollbar';
import MdFolderOpen from 'react-icons/lib/md/folder-open';
import MdExpandMore from 'react-icons/lib/md/expand-more';
import IconMenu from 'react-icons/lib/md/menu';

import './nav.css';


const NavHead = (props) => (
    <header className="nav-head">
        
        <Link to="/">
            {/* <img style={{ height: '42px' }} src={require('../../assets/putri-duyung-logo.jpg')} alt="avatar" /> */}
            <h3>KLIKDAILY</h3>
            
            {/* <strong className="h4 text-uppercase">CMS</strong> */}
        </Link>
    </header>
);

class NavList extends React.Component {
    constructor(props) {
        super(props);
       
        this.state = {
            selected: 10,
            user: '',
            reservation: false,
           
        }
    }

    
     

    async componentDidMount() {
        const user = await localforage.getItem('putri-duyung-session');
        if (!user) {
            this.props.router.push('/');
        } else {
            this.setState({ user: user })
        }
        if (user === 'reservation@putriduyungancol-ancol.com') {
            this.setState({ reservation: true });
            if (this.props.router.location.pathname !== '' || this.props.router.location.pathname !== 'bookings') {
                this.props.router.push('/');
            }
        }
    }

    handleClick = (index, e) => {
        const { user } = this.state;
        let c = e.currentTarget.className;
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            selected: (c.indexOf('selected') >= 0) ? '' : index
        })
    }
    handleOpen = (index, e) => {
        e.stopPropagation();
        this.setState({
            selected: index
        })
    }


    render() {
        const { reservation } = this.state
        return (
            <nav className={`site-nav ${this.props.mini ? 'mini' : ''}`}>
                <NavHead {...this.props} />
                <ScrollArea className="nav-list-container" horizontal={false} verticalScrollbarStyle={{ width: '4px', marginLeft: '10px' }}>
                    <ul className="list-unstyled nav-list clearfix">
                        {/* <li><div className="nav-list-title">Views</div></li> */}

                        
                        <li onClick={this.handleClick.bind(this, 10)} className={(this.state.selected === 10) ? 'selected' : ''}>
                            <IndexLink to="/" activeClassName="active">
                                <img style={{ height: '14px' }} src={require('../../assets/dashboard.svg')}></img>
                                <span className="name">Dashboard</span>
                            </IndexLink>
                        </li>

                        <li onClick={this.handleClick.bind(this, 9)} className={(this.state.selected === 9) ? 'selected': ''}>
                    <Link to="">
                        <MdFolderOpen size="18"/>
                        <span className="name">Product</span>
                        <MdExpandMore size="14" className="icon-down"/>
                    </Link>
                    <Collapse isOpen={this.state.selected === 9 ? true: false} onClick={this.handleOpen.bind(this, 9)}>
                        <ul className="inner-drop list-unstyled">
                            <li><Link to="/ui" activeClassName="active">Add Product</Link></li>
                            
                        </ul>
                    </Collapse>
                </li>


                       


                    </ul>

                    {/* end scroll-area */}
                </ScrollArea>
            </nav>
        )
    }
}




export default withRouter(NavList);
