import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
} from "reactstrap";

import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import "../css.css";

const useStyles = makeStyles(theme => ({
  container: {
    // display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

const currencies = [
  {
    value: "1",
    label: "1"
  },
  {
    value: "2",
    label: "2"
  },
  {
    value: "3",
    label: "3"
  },
  {
    value: "4",
    label: "4"
  }
];

class Forms extends React.Component {
  state = {
    productName: "",
    barcode: "",
    category: "",
    stocks: "",
    costPrice: "",
    sellingPrice: "",
    description: "",
    margin: "",
    ppn: "",
    error: []
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  posting = () => {
    this.setState({ error: [] });
    const {
      productName,
      barcode,
      category,
      stocks,
      costPrice,
      sellingPrice,
      description,
      margin,
      ppn
    } = this.state;

    let errors = [];
    if (!productName) {
      errors = [...errors, "productName"];
    }
    if (!barcode) {
      errors = [...errors, "barcode"];
    }
    if (!category) {
      errors = [...errors, "category"];
    }
    if (!stocks) {
      errors = [...errors, "stocks"];
    }
    if (!costPrice) {
      errors = [...errors, "costPrice"];
    }
    if (!sellingPrice) {
      errors = [...errors, "sellingPrice"];
    }
    if (!description) {
      errors = [...errors, "description"];
    }
    if (!margin) {
      errors = [...errors, "margin"];
    }
    if (!ppn) {
      errors = [...errors, "ppn"];
    }

    if (errors.length > 0) {
      this.setState({ error: errors });
    } else {
      alert("success posting");
    }
  };

  render() {
    const {
      productName,
      barcode,
      category,
      stocks,
      costPrice,
      sellingPrice,
      description,
      margin,
      ppn,
      currency,
      error
    } = this.state;
    console.log("productName", productName);
    return (
      <div style={{ padding: "10px" }}>
        <form className={useStyles.container} noValidate autoComplete="off">
          <Col xs="12">
            <TextField
              id="product-name"
              label="Product Name"
              className={useStyles.textField}
              value={productName}
              onChange={this.handleChange("productName")}
              fullWidth
              margin="normal"
              error={error.includes("productName")}
            />
          </Col>
          <Col xs="12">
            <TextField
              id="barcode"
              label="Barcode"
              className={useStyles.textField}
              value={barcode}
              onChange={this.handleChange("barcode")}
              fullWidth
              margin="normal"
              error={error.includes("barcode")}
            />
          </Col>
          <Col xs="6">
            <TextField
              id="category"
              select
              label="Category"
              className={useStyles.textField}
              value={category}
              onChange={this.handleChange("category")}
              SelectProps={{
                MenuProps: {
                  className: useStyles.menu
                }
              }}
              fullWidth
              margin="normal"
            >
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Col>
          <Col xs="12">
            <TextField
              id="stocks"
              label="Number of Stock (box)"
              className={useStyles.textField}
              value={stocks}
              onChange={this.handleChange("stocks")}
              margin="normal"
              fullWidth
              error={error.includes("stocks")}
              helperText="The stock field is required"
            />
          </Col>
          <Row>
            <Col xs="6">
              <TextField
                id="costPrice"
                label="Cost Price / Pieces (Rp)"
                className={useStyles.textField}
                value={costPrice}
                onChange={this.handleChange("costPrice")}
                margin="normal"
                fullWidth
                error={error.includes("costPrice")}
              />
            </Col>
            <Col xs="6">
              <TextField
                id="sellingPrice"
                label="Selling Price / Pieces (Rp)"
                className={useStyles.textField}
                value={sellingPrice}
                onChange={this.handleChange("sellingPrice")}
                margin="normal"
                fullWidth
                error={error.includes("sellingPrice")}
              />
            </Col>
          </Row>
          <Col xs="12">
            <TextField
              id="description"
              label="Description"
              className={useStyles.textField}
              value={description}
              onChange={this.handleChange("description")}
              fullWidth
              margin="normal"
              error={error.includes("description")}
            />
          </Col>
          <Col xs="12">
            <TextField
              id="margin"
              label="Margin (%)"
              className={useStyles.textField}
              value={margin}
              onChange={this.handleChange("margin")}
              fullWidth
              margin="normal"
              error={error.includes("margin")}
            />
          </Col>
          <Col xs="12">
            <TextField
              id="ppn"
              label="PPn"
              className={useStyles.textField}
              value={ppn}
              onChange={this.handleChange("ppn")}
              fullWidth
              margin="normal"
              error={error.includes("ppn")}
            />
          </Col>
          <br></br>
          <Button onClick={() => this.posting()}> Cancel </Button>
          &nbsp;
          <Button color='primary' onClick={() => this.posting()}> ADD PRODUCT </Button>
        </form>
      </div>
    );
  }
}

export default Forms;
