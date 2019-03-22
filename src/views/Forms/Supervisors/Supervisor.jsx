import React from "react";
import {withRouter} from "react-router";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Person from "@material-ui/icons/Person";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import uuid from "uuid";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CheckBox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";
import Snackbar from "components/Snackbar/Snackbar";
import AddAlert from "@material-ui/core/SvgIcon/SvgIcon";
import Clear from "@material-ui/icons/Clear";
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
  }
};

class Supervisors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staff_id: uuid(),
      f_name: "",
      l_name: "",
      password: "",
      confirmPass: "",
      degreeSelected: false,
      diplomaSelected: false,
      error: true,
      tl: false,
      tr: false,
      tc: false
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
  validateInput = () => {
    var reg = /^\d+$/;
    var Input = this.state.staff_id;
    return reg.test(Input);
  };
  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  resetValues = () => {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) inputs[i].value = "";
    this.setState({
      staff_id: "",
      f_name: "",
      l_name: "",
      password: "",
      confirmPass: "",
      degreeSelected: false,
      diplomaSelected: false
    });
  };

  addSupervisor = () => {
    const {
      staff_id,
      f_name,
      l_name,
      password,
      confirmPass,
      degreeSelected,
      diplomaSelected
    } = this.state;
    const data = {};
    data.emp_no = staff_id;
    data.f_name = f_name;
    data.l_name = l_name;
    data.password = password;
    data.degree = degreeSelected;
    data.diploma = diplomaSelected;
    if (
      staff_id.length === 0 ||
      f_name.length === 0 ||
      l_name.length === 0 ||
      password.length === 0 ||
      confirmPass.length === 0 ||
      (degreeSelected === false && diplomaSelected === false)
    ) {
      this.showNotification("tl");
    } else {
      if (password !== confirmPass) {
        alert("Password dont match");
      } else if (!this.validateInput()) {
        alert("NOT A VALID ID SUBMITTED");
      } else {
        this.props.onSubmit(data);
        if (this.props.error === false) {
          this.resetValues();
          this.showNotification("tr");
        } else {
          this.showNotification("tc");
        }
      }
    }
  };
  cancelAdd = () => {
    const { history } = this.props;
    history.push("/admin/SuperTable");
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  render() {
    const { classes, errorMessage, message } = this.props;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Register SuperVisor</h4>
                <p className={classes.cardCategoryWhite}>
                  Enter supervisor Details
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="StaffId"
                      id="staff_id"
                      name="input"
                      formControlProps={{
                        fullWidth: true,

                        onChange: this.handleInput,
                        value: this.state.staff_id
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="First Name"
                      id="f_name"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        onChange: this.handleInput,
                        value: this.state.f_name
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Last Name"
                      id="l_name"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.l_name,
                        onChange: this.handleInput
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="set Password"
                      id="password"
                      name="input"
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
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Confirm Password"
                      id="confirmPass"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        onChange: this.handleInput,
                        value: this.state.confirmPass
                      }}
                      inputProps={{
                        type: "password"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <div>
                      <p>Course Option</p>
                      <p> Degree</p>
                      <CheckBox
                        checked={this.state.degreeSelected}
                        onChange={this.handleChange("degreeSelected")}
                        value="degreeSelected"
                      />
                      <p> Diploma</p>
                      <CheckBox
                        checked={this.state.diplomaSelected}
                        onChange={this.handleChange("diplomaSelected")}
                        value="diplomaSelected"
                      />
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="info" onClick={this.addSupervisor} round>
                  <Person />
                  Add SuperVisor
                </Button>
                <Button color="danger" onClick={this.cancelAdd} round>
                  <Clear />
                  Cancel and Go back
                </Button>
                <Snackbar
                  place="tl"
                  color="danger"
                  icon={AddAlert}
                  message="All fields required."
                  open={this.state.tl}
                  closeNotification={() => this.setState({ tl: false })}
                  close
                />
                <Snackbar
                  place="tr"
                  color={"success"}
                  icon={AddAlert}
                  message={message}
                  open={this.state.tr}
                  closeNotification={() => this.setState({ tr: false })}
                  close
                />
              </CardFooter>
              <Snackbar
                place="tc"
                color="danger"
                icon={AddAlert}
                message={errorMessage}
                open={this.state.tc}
                closeNotification={() => this.setState({ tc: false })}
                close
              />
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
Supervisors.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object,
  status: PropTypes.string,
  errorMessage: PropTypes.string,
  message: PropTypes.string,
  error: PropTypes.bool,
  history: PropTypes.object
};
export default withRouter(withStyles(styles)(Supervisors));
