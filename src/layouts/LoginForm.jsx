import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Person from "@material-ui/icons/Person";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

//import uuid from "uuid";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  Container: {
    paddingLeft: "37%",
    paddingTop: "10%"
  }
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staff_id: "",
      password: "",
      redirect: true,
      errors: {}
    };
  }

  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  validateInput = () => {
    var reg = /^\d+$/;
    var Input = this.state.staff_id;
    return reg.test(Input);
  };
  submitDetails = () => {
    //this.setState({ errors: {} });
    const { staff_id, password } = this.state;
    const data = {};
    data.staff_id = staff_id; //uuid();
    data.password = password;
    if (!this.validateInput()) {
      alert("Invalid ID");
      this.props.addFlashMessage({
        type: "error",
        text: "Invalid employee ID"
      });
    } else {
      this.props.handleSubmit(data);
      this.props.addFlashMessage({
        type: "success",
        text: "Successful login welcome"
      });
    }
  };
  render() {
    //const { redirect } = this.props;
    if (this.props.redirect === true) {
      return <Redirect to="/admin/dashboard" />;
    }
    const { errors } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <GridContainer container justify="center" alignItems="baseline">
          <GridItem xs={12} sm={12} md={3}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Login</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={10}>
                    <CustomInput
                      labelText=" Staff-Id"
                      id="staff_id"
                      name="staff_id"
                      formControlProps={{
                        fullWidth: true,
                        onChange: this.handleInput,
                        value: this.state.staff_id,
                        type: "password"
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={10}>
                    <CustomInput
                      labelText=" Password"
                      id="password"
                      name="password"
                      formControlProps={{
                        fullWidth: true,
                        onChange: this.handleInput,
                        value: this.state.password
                      }}
                      inputProps={{
                        type: "password"
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button
                  color="success"
                  round
                  onClick={() => this.submitDetails()}
                >
                  <Person />
                  Login
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
LoginForm.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  redirect: PropTypes.bool,
  addFlashMessage: PropTypes.func.isRequired
};

export default withStyles(styles)(LoginForm);
