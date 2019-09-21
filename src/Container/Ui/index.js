import React from "react";
import {
  ButtonGroup,
  Button,
  ButtonToolbar,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardBlock,
  // ScrollArea
} from "reactstrap";
import Example from "../../utils/breadcrumb";
import Forms from "../../utils/form";
import Upload from "../../utils/upload.js";
import { Container, Row, Col } from "reactstrap";
import {
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  Label,
  Input
  // Form,
  // Col,
  // Row,
} from "reactstrap";

// social icons
import IconAlarm from "react-icons/lib/md/add-alarm";
import IconStar from "react-icons/lib/md/star";
import ScrollArea from "../../Component/scrollbar/index.js";
import { height } from "window-size";

class addProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dropdownOpen: false };
  }
  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

 

  render() {
    
    return (
      <div className="view">
        <div className="view-header">
        <Example />
        </div>

        <div className="view-content view-dashboard">
      
          <Row>
            <Col xs="6" sm="4">
              <Card >
                <CardHeader>Upload Image</CardHeader>
                <img
                  src={require("./../../assets/unavailable.jpg")}
                  alt="avatar"
                />
                <br></br>
                <Input type="file" name="file" />
                <br></br>
              </Card>
            </Col>
           
            <Col xs="6" sm="8" >
              
           
              <Card style= {{overflowY: 'scroll', height: '500px'}}>
                <CardHeader>Product Detail</CardHeader>
                <Forms />
                {/* <Upload /> */}
              </Card>
              
            </Col>
          
          </Row>
        </div>
      </div>
    );
  }
}
export default addProduct;
{
  /* // () => (
//     <div className="view">
//         <ViewHeader/>
//         <ViewContent>
//             <Card>
//                 <CardBlock>
//                     <DefaultButtons/>
//                     <OutlineButtons/>
//                     <FabButtons/>
//                     <ButtonSizes/>
//                     <ButtonStates/>
//                     <BlockButtons/>
//                     <div className="mb-5">
//                         <h6 className="h6 card-title text-uppercase">Button Dropdown</h6>
//                         <div className="mb-4"><ButtonGroupDropdown vertical={true}/></div>
//                         <div className="mb-5"><ButtonGroupDropdown/></div>
//                     </div>
//                     <ButtonToolbarExample/>
//                 </CardBlock>
//             </Card>
//         </ViewContent>
//     </div>
// ); */
}
