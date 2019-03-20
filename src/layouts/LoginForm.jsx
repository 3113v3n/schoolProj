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
import { withRouter } from "react-router";
import AddAlert from "@material-ui/icons/AddAlert";
// //core components
import Snackbar from "components/Snackbar/Snackbar.jsx";
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
      tr: false
    };
  }
  componentWillUnmount() {
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }
  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }

  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  validateInput = () => {
    var reg = /^\d+$/;
    var Input = this.state.staff_id;
    return reg.test(Input);
  };
  validatePassInput = () => {
    const { password, staff_id } = this.state;
    if (password.length === 0 || staff_id.length === 0) {
      this.showNotification("tr");
    } else if (password.length !== 0 && staff_id.length !== 0) {
      const data = {};
      data.emp_no = staff_id; //uuid();
      data.password = password;
      if (!this.validateInput()) {
        this.showNotification("tr");
      } else {
        this.props.handleSubmit(data);
      }
    }
  };

  render() {
    if (this.props.isAuthenticated === true) {
      const { history } = this.props;
      history.push("/admin/dashboard");
    }
    const { classes } = this.props;
    const { staff_id, password } = this.state;
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
                      formControlProps={{
                        fullWidth: true,
                        onChange: this.handleInput,
                        value: this.state.staff_id
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={10}>
                    <CustomInput
                      labelText=" Password"
                      id="password"
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
                  onClick={() => this.validatePassInput()}
                >
                  <Person />
                  Login
                </Button>
                <Snackbar
                  place="tr"
                  color={"danger"}
                  icon={AddAlert}
                  message={
                    staff_id.length === 0 || password.length === 0
                      ? "ALL FIELDS ARE REQUIRED"
                      : "INVALID LOGIN CREDENTIALS"
                  }
                  open={this.state.tr}
                  closeNotification={() => this.setState({ tr: false })}
                  close
                />
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
  error: PropTypes.bool,
  history: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default withRouter(withStyles(styles)(LoginForm));
