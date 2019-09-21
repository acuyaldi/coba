import React, { Component } from 'react';
import { Card, CardBlock } from 'reactstrap';

const ViewHeader = () => (
  <div className="view-header">
    <header className="title text-white">
      <h1 className="h4 text-uppercase">About Us</h1>
      <p className="mb-0">CRUD Content for About-Us Page</p>
    </header>
  </div>
)

const ViewContent = ({ children }) => (
  <div className="view-content view-components">
    <Card>
      <CardBlock>
        <h6 className="mb-4 text-uppercase">About Us</h6>
        {children}
      </CardBlock>
    </Card>
  </div>
);

export default class AboutUs extends Component {
  render() {
    return (
      <div className="view">
        <ViewHeader />
        <ViewContent />
      </div>

    )
  }
}