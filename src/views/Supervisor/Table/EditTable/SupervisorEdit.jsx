import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Person from "@material-ui/icons/Person";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import PropTypes from "prop-types";
import CheckBox from "@material-ui/core/Checkbox";
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

class EditAllocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      degreeSelected: false,
      diplomaSelected: false
    };
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  upDateSupervisor = () => {
    const {
      firstName,
      lastName,
      email,
      degreeSelected,
      diplomaSelected
    } = this.state;
    const { history } = this.props;
    const data = {};
    data.firstName = firstName;
    data.lastName = lastName;
    data.email = email;
    data.degree = degreeSelected;
    data.diploma = diplomaSelected;
    this.props.onSubmit(data);
    history.push("/admin/superTable");
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Edit Supervisor </h4>
                <p className={classes.cardCategoryWhite}>
                  Enter Supervisor Details{" "}
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      className="text-center"
                      labelText="first Name"
                      id="fistName"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.firstName,
                        onChange: this.handleInput
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      className="lastName"
                      labelText="Last Name"
                      id="lastName"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.lastName,
                        onChange: this.handleInput
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      className="text-center"
                      labelText="Email"
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
                <Button color="success" round onClick={this.upDateSupervisor}>
                  <Person />
                  Update Row
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
EditAllocation.popTypes = {
  classes: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  history: PropTypes.object
};

export default withRouter(withStyles(styles)(EditAllocation));
