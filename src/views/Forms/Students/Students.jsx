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
import {withRouter} from "react-router";

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
      selectedFile: null,
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
  validateFile = () => {
    let validator = /\.csv$/; //check if input is .CSV only
    let files = this.state.selectedFile;
    return validator.test(files);
  };
  validateInput = () => {
    var reg = /^\d+$/;
    var Input = this.state.admNo;
    return reg.test(Input);
  };
  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
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
      alert("Admission Number is Invalid");
    } else {
      this.props.addStudents(data);
      this.resetValues();
      if (error === false) {
        this.showNotification("tr");
      } else {
        this.showNotification("tc");
      }
    }
  };
  fileUpload = () => {
    const { selectedFile } = this.state;
    const data = {};
    data.file = selectedFile;
    if (selectedFile === null) {
      alert(" No file Selected");
    } else if (!this.validateFile()) {
      alert("INVALID FILE TYPE MUST BE OF CSV");
      this.setState({ selectedFile: null });
    } else {
      this.props.uploadNewFile(data);
      if (this.props.error) {
        this.showNotification("tl");
      }
    }
  };
  cancelAdd = () => {
    const { history } = this.props;
    history.push("/admin/adminStudents");
  };
  render() {
    const { classes, projects, error, errorMessage, message } = this.props;
    return (
      <div>
        <GridContainer>
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
                  message={!error ? "ALL FIELDS ARE REQUIRED !!!" : errorMessage}
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
              <Snackbar
                place={"tc"}
                color={"danger"}
                icon={AddAlert}
                message={errorMessage}
                open={this.state.tc}
                closeNotification={() => this.setState({ tc: false })}
                close
              />
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardBody>
                <CardHeader color="info">
                  <h4 className={classes.cardTitleWhite}>
                    UPLOAD FILE INSTEAD
                  </h4>
                  <p className={classes.cardCategoryWhite}>
                    SELECT FILE (.csv){" "}
                  </p>
                </CardHeader>
                <input
                  style={{ padding: 30 }}
                  type="file"
                  name="Choose File Instead"
                  id=""
                  accept="*.csv"
                  onChange={this.handleselectedFile}
                />
                <Button color="info" round onClick={this.fileUpload}>
                  Upload File
                </Button>
              </CardBody>
            </Card>
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
