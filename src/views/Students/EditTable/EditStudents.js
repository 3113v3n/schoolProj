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
import Clear from "@material-ui/icons/Clear";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
      projCode: "",
      oldAdm: this.props.location.state.admNo,
      navigate: false
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

  cancelEdit = () => {
    const { history } = this.props;
    history.push("/admin/adminStudents");
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
      firstName: "",
      lastName: "",
      admNo: "",
      projCode: "",
      oldAdm: ""
    });
  };
  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  updateStudent = () => {
    const { firstName, lastName, admNo, projCode, oldAdm } = this.state; //TODO: ADD OLD ADM
    const { error } = this.props;
    const data = {};
    data.first_name = firstName;
    data.last_name = lastName;
    data.student_adm = parseInt(admNo);
    data.project_code = projCode;
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      admNo.length === 0 ||
      projCode.length === 0
    ) {
      this.showNotification("tl");
    } else {
      this.props.onSubmit(data);
      if (!error) {
       // this.resetValues();
        this.showNotification("tr");
      } else {
        this.showNotification("tl");
      }
    }
  };
  render() {
    const { classes, error, message, errorMessage, projects } = this.props;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>
                  Edit Students Details{" "}
                </h4>
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
                    <label htmlFor="lecturers">
                      Select Student Project Code
                    </label>
                    <Select
                      name="input"
                      style={{ marginLeft: 10, width: "40%", paddingTop: 20 }}
                      value={this.state.projCode}
                      onChange={event => {
                        this.setState({ projCode: event.target.value });
                      }}
                      formcontrolprops={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "input",
                        id: "projCode"
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
                    <Snackbar
                      place={"tl"}
                      color={"danger"}
                      icon={AddAlert}
                      message={error ? errorMessage : "All fields Are Required"}
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
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="success" round onClick={this.updateStudent}>
                  <Person />
                  Update Row
                </Button>
                <Button color="danger" round onClick={this.cancelEdit}>
                  <Clear />
                  Cancel / GoBack
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
EditStudents.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  onSubmit: PropTypes.func,
  location: PropTypes.object,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  message: PropTypes.string,
  projects: PropTypes.array
};

export default withRouter(withStyles(styles)(EditStudents));
