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
      email: "newSupervisor@@gmail.com",
      firstName: "Sidney",
      lastName: "Omondi",
      password: "#cc8g92 xjkb89",
      confirmPass: "#cc8g92 xjkb89",

      degreeSelected: true,
      diplomaSelected: false
    };
  }
  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
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
                        value: this.state.staff_id,
                        onChange: this.handleInput
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Email address"
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.email,
                        onChange: this.handleInput
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
                        value: this.state.firstName,
                        onChange: this.handleInput
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
                        value: this.state.password,
                        onChange: this.handleInput
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Confirm Password"
                      id="confirmPass"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.confirmPass,
                        onChange: this.handleInput
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
              </CardFooter>
            </Card>
            <Button color="success">Alert n go back</Button>
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
