import React from 'react';
import screenfull from 'screenfull';
import { withRouter } from 'react-router';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Progress,
    Row,
} from 'reactstrap';
import localforage from 'localforage';

// icons
import IconNotification from 'react-icons/lib/md/notifications-none';
import IconFullScreen from 'react-icons/lib/md/crop-free';
import IconSearch from 'react-icons/lib/md/search';
import IconFace from 'react-icons/lib/md/face';
import IconMail from 'react-icons/lib/md/mail';
import IconSecurity from 'react-icons/lib/md/security';
import IconHelp from 'react-icons/lib/md/help';
import IconLogout from 'react-icons/lib/md/power-settings-new';
import IconDownload from 'react-icons/lib/md/cloud-download';
import IconCake from 'react-icons/lib/md/cake';
import IconMenu from 'react-icons/lib/md/menu';
import MdExitToApp from 'react-icons/lib/md/exit-to-app';

// style
import './style.css';


class Header extends React.PureComponent {
    handleLogout = () => {
        localforage.removeItem('putri-duyung-session');
        this.props.router.push('/')
    }
    render() {
        let showSearch = false;
        if (this.props.location && this.props.location.pathname && this.props.location.pathname === 'bookings') {
            showSearch = true;
        }
        return (
            <header className="site-head d-flex align-items-center justify-content-between" style={{backgroundColor: 'white', position: 'fixed', zIndex: '9999', width: '100%'}}>
               
                <div className="wrap mr-4">
                <Row>
                  
                   
                    <IconMenu size="24" color="blue" onClick={this.props.toggleNav} style={{ cursor: 'pointer', marginLeft: '10px' }} />
                   &nbsp;
                   &nbsp;
                    <h4>KLIKDAILY</h4>
                    </Row>
                </div>
          
                {showSearch && (
                    <div className="col-7 col-sm-8 col-md-7 p-0 site-search">
                        <IconSearch color="#FFFFFFF" size="22" />
                        <input type="text" placeholder="Type your search ..." className="form-control" />
                    </div>
                )}
                <div className="right-elems ml-auto d-flex">
                    {/* <div className="wrap hidden-sm-down">
                        <IconFullScreen size="22" color="#fff" onClick={(event) => {
                            if (screenfull.enabled) {
                                screenfull.toggle(event.target);
                            }
                        }} />
                    </div> */}
                    <div className="wrap profile">
                        {/* <UncontrolledDropdown>
                            <DropdownToggle tag="div">
                                <img src={require('./../../assets/putri-duyung-logo.png')} alt="avatar" />
                            </DropdownToggle>
                            <DropdownMenu right style={{ minWidth: '12rem' }}>
                                <DropdownItem header>Administrator</DropdownItem>
                                <DropdownItem divider /> */}
                                <div className="text-right ml-3 mr-3 mt-2" color='#085CA0'><Button  size="sm" onClick={() => this.handleLogout()} style={{border: '0px', boxShadow: 'none'}}><MdExitToApp size="15" color="#085CA0" />&emsp;Logout</Button></div>
                            {/* </DropdownMenu>
                        </UncontrolledDropdown> */}
                    </div>
                </div>
            </header>
        )
    }
}

export default withRouter(Header);
