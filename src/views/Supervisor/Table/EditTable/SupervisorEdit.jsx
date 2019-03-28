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
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Clear from "@material-ui/icons/Clear";
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

class EditAllocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emp_no: this.props.location.state.emp_no,
      firstName: this.props.location.state.firstName,
      lastName: this.props.location.state.lastName,
      degreeSelected: false,
      diplomaSelected: false,
      tr: false,
      tl: false
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
  resetValues = () => {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) inputs[i].value = "";
    this.setState({
      firstName: "",
      lastName: "",
      degreeSelected: false,
      diplomaSelected: false
    });
  };
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
      degreeSelected,
      diplomaSelected,
      emp_no
    } = this.state;
    const { history, error, onSubmit } = this.props;
    const data = {};
    data.f_name = firstName;
    data.l_name = lastName;
    data.degree = degreeSelected;
    data.diploma = diplomaSelected;
    data.emp_no = emp_no
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      (degreeSelected === false && diplomaSelected === false)
    ) {
      this.showNotification("tl");
    } else {
      onSubmit(data);
      if (error === false) {
        this.resetValues();
        this.showNotification("tr");
        history.push("/admin/superTable");
      } else {
        this.showNotification("tl");
      }
    }
  };
  cancelEdit = () => {
    const { history } = this.props;
    history.push("/admin/superTable");
  };
  render() {
    const { classes, error, errorMessage, message } = this.props;
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
                  <GridItem>
                    <CustomInput
                      labelText="Staff Id"
                      id="emp_no"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.emp_no
                      }}
                      inputProps={{
                        value: this.state.emp_no,
                        disabled: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>

                    <CustomInput
                      className="text-center"
                      labelText="first Name"
                      id="fistName"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.firstName,
                        onChange: this.handleInput
                      }}
                      inputProps={{
                        value: this.state.firstName
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      className="lastName"
                      labelText="Last Name"
                      id="lastName"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.lastName,
                        onChange: this.handleInput
                      }}
                      inputProps={{
                        value: this.state.lastName
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
                <Button color="danger" round onClick={this.cancelEdit}>
                  <Clear />
                  Cancel
                </Button>
                <Snackbar
                  place={"tl"}
                  color={"danger"}
                  icon={AddAlert}
                  message={
                    error === true ? errorMessage : "All fields Are Required"
                  }
                  open={this.state.tl}
                  closeNotification={() => this.setState({ tl: false })}
                  close
                />
                <Snackbar
                  place={"tr"}
                  color={"success"}
                  icon={AddAlert}
                  message={message}
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
EditAllocation.propTypes = {
  classes: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  history: PropTypes.object,
  location: PropTypes.object,
  status: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  message: PropTypes.string
};

export default withRouter(withStyles(styles)(EditAllocation));
