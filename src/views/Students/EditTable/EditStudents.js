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
import AddAlert from "@material-ui/icons/AddAlert";
//core components
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
  }
};

class EditStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tl: false,
      firstName: "",
      lastName: "",
      admNo: this.props.location.state.admNo,
      projCode: this.props.location.state.projectCode
    };
  }
  componentDidMount() {
    let name = this.props.location.state.name;
    let res = name.split(" ");
    let f_name = res[0];
    let l_name = res[1];
    this.setState({
      firstName: f_name,
      lastName: l_name
    });
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
      admNo: "",
      projCode: ""
    });
  };
  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  updateStudent = () => {
    const { firstName, lastName, admNo, projCode } = this.state;
    const { history } = this.props;
    const data = {};
    data.firstName = firstName;
    data.lastName = lastName;
    data.admNo = admNo;
    data.projCode = projCode;
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      admNo.legth === 0 ||
      projCode.length === 0
    ) {
      this.showNotification("tl");
    } else {
      this.props.onSubmit(data);
      this.resetValues();
      history.push("/admin/adminStudents");
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Edit Students </h4>
                <p className={classes.cardCategoryWhite}>
                  Enter Student Details{" "}
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      className="admNo"
                      labelText="admission"
                      id="admNo"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.admNo,
                        onChange: this.handleInput
                      }}
                      inputProps={{
                        value: this.state.admNo
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      className="firstName"
                      labelText="first Name"
                      id="firstName"
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
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      className="lastName"
                      labelText="Last Name"
                      id="lastName"
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
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      className="project Code"
                      labelText="Project Code"
                      id="projCode"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.projCode,
                        onChange: this.handleInput
                      }}
                      inputProps={{
                        value: this.state.projCode
                      }}
                    />
                    <Snackbar
                      place={"tl"}
                      color={"danger"}
                      icon={AddAlert}
                      message={"All fields Are Required"}
                      open={this.state.tl}
                      closeNotification={() => this.setState({ tl: false })}
                      close
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="success" round onClick={this.updateStudent}>
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
EditStudents.popTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  location: PropTypes.object
};

export default withRouter(withStyles(styles)(EditStudents));
