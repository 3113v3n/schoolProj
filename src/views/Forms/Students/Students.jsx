import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
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
import AddAlert from "@material-ui/core/SvgIcon/SvgIcon";
import Snackbar from "../../../components/Snackbar/Snackbar";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Clear from "@material-ui/icons/Clear";
import { withRouter } from "react-router";
import UploadCsvFile from "./UploadCsvFile";
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

class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      project: "",
      admNo: "",
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
  validateInput = () => {
    var reg = /^\d+$/;
    var Input = this.state.admNo;
    return reg.test(Input);
  };
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
      lastName: "",
      project: "",
      admNo: "",
      firstName: ""
    });
  };
  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  newStudent = () => {
    const { firstName, lastName, admNo, project } = this.state;
    const data = {};
    const { error } = this.props;
    data.first_name = firstName;
    data.last_name = lastName;
    data.student_adm = parseInt(admNo);
    data.project_code = project;
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      admNo.length === 0 ||
      project.length === 0
    ) {
      this.setState({ error: false });
      this.showNotification("tl");
    } else if (!this.validateInput()) {
      this.showNotification("tl");
    } else {
      this.props.addStudents(data);
      this.resetValues();
      if (error === false) {
        this.showNotification("tr");
      } else {
        this.showNotification("tr");
      }
    }
  };
  cancelAdd = () => {
    const { history } = this.props;
    history.push("/admin/adminStudents");
  };
  render() {
    const {
      classes,
      projects,
      error,
      errorMessage,
      status,
      message,
      uploadNewFile
    } = this.props;
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Register Students </h4>
                <p className={classes.cardCategoryWhite}>
                  Enter Student Details{" "}
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      className="firstName"
                      labelText="First Name"
                      id="firstName"
                      name="input"
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
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.lastName,
                        onChange: this.handleInput
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <label htmlFor="lecturers">
                      Select Student Project Code
                    </label>
                    <Select
                      name="input"
                      style={{ marginLeft: 10, width: "40%", paddingTop: 20 }}
                      value={this.state.project}
                      onChange={event => {
                        this.setState({ project: event.target.value });
                      }}
                      formcontrolprops={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "input",
                        id: "project"
                      }}
                    >
                      {projects.map(item => (
                        <MenuItem
                          key={item.project_code}
                          value={item.project_code}
                        >
                          {item.project_code}
                        </MenuItem>
                      ))}
                    </Select>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      className="admNumber"
                      labelText="Admission Number"
                      id="admNo"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.admNo,
                        onChange: this.handleInput
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="success" round onClick={this.newStudent}>
                  <Person />
                  Update Students
                </Button>
                <Button color="danger" onClick={this.cancelAdd} round>
                  <Clear />
                  Cancel and Go back
                </Button>
                <Snackbar
                  place={"tl"}
                  color={"danger"}
                  icon={AddAlert}
                  message={
                    !this.validateInput()
                      ? "INVALID STUDENT ID SUPPLIED"
                      : "ALL FIELDS ARE REQUIRED !!!"
                  }
                  open={this.state.tl}
                  closeNotification={() => this.setState({ tl: false })}
                  close
                />
                <Snackbar
                  place={"tr"}
                  color={status !== "failed" || !error ? "success" : "danger"}
                  icon={AddAlert}
                  message={
                    status !== "failed" || !error
                      ? "STUDENT WAS SUCCESSFULLY ADDED"
                      : errorMessage
                  }
                  open={this.state.tr}
                  closeNotification={() => this.setState({ tr: false })}
                  close
                />
              </CardFooter>
            </Card>
          </GridItem>
          <GridContainer />
          <GridItem xs={12} sm={12} md={8}>
            <UploadCsvFile
              status={status}
              error={error}
              message={message}
              errorMessage={errorMessage}
              upload={uploadNewFile}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
Students.propTypes = {
  addStudents: PropTypes.func.isRequired,
  classes: PropTypes.object,
  projects: PropTypes.array,
  uploadNewFile: PropTypes.func.isRequired,
  status: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  message: PropTypes.string,
  history: PropTypes.object
};

export default withRouter(withStyles(styles)(Students));
