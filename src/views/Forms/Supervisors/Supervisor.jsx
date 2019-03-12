import React from "react";
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
import Snackbar from "../../../components/Snackbar/Snackbar";
import AddAlert from "@material-ui/core/SvgIcon/SvgIcon";
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
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPass: "",
      degreeSelected: false,
      diplomaSelected: false
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
  clearInput = () => {
    this.setState({
      staff_id: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPass: "",
      degreeSelected: false,
      diplomaSelected: false
    });
  };
  addSupervisor = () => {
    const {
      staff_id,
      email,
      firstName,
      lastName,
      password,
      confirmPass,
      degreeSelected,
      diplomaSelected
    } = this.state;
    const data = {};
    data.staff_id = staff_id;
    data.email = email;
    data.firstName = firstName;
    data.lastName = lastName;
    data.password = password;
    data.confirmPass = confirmPass;
    data.degreeSelected = degreeSelected;
    data.diplomaSelected = diplomaSelected;
    this.props.onSubmit(data);
    this.clearInput();
    this.showNotification("tl");
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="warning">
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
                      formControlProps={{
                        fullWidth: true,

                        onChange: this.handleInput,
                        value: this.state.staff_id
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Email address"
                      id="email"
                      formControlProps={{
                        fullWidth: true,

                        onChange: this.handleInput,
                        value: this.state.email
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="First Name"
                      id="firstName"
                      formControlProps={{
                        fullWidth: true,
                        onChange: this.handleInput,
                        value: this.state.firstName
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Last Name"
                      id="lastName"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.lastName,
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
                <Button color="warning" onClick={this.addSupervisor}>
                  <Person />
                  Add SuperVisor
                </Button>
                <Snackbar
                  place="tl"
                  color="success"
                  icon={AddAlert}
                  message="Supervisor successfully Added."
                  open={this.state.tl}
                  closeNotification={() => this.setState({ tl: false })}
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
Supervisors.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object
};
export default withStyles(styles)(Supervisors);
