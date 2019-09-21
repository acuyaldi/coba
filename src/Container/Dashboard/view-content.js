import React from "react";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  Sector,
  ResponsiveContainer
} from "recharts";
import { CardGroup, Card, CardBlock, CardTitle, Row, Button } from "reactstrap";

import IconLaptop from "react-icons/lib/fa/desktop";

export default () => (
  <div className="view-content view-dashboard">
    <Row>
      <div className="mb-4 col-sm-12 col-md-12">
        <Card style={{ height: "500px", paddingTop: "120px" }}>
          <CardBlock>
            <CardTitle className="h1 text-center">
              <IconLaptop size="60" color="#085CA0" />{" "}
              <IconLaptop size="95" color="#085CA0" />{" "}
              <IconLaptop size="60" color="#085CA0" />
            </CardTitle>
            {/* <div style={{width: '100%', height: '276px'}}><TrafficSourceChart/></div> */}
            <div className="h2 text-center"> Hi Administrator, </div>
          </CardBlock>
        </Card>
      </div>
    </Row>
  </div>
);
