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
      admNo: ""
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
  newStudent = () => {
    const { firstName, lastName, admNo, project } = this.state;
    const data = {};
    data.f_name = firstName;
    data.l_name = lastName;
    data.adm = admNo;
    data.project_code = project;
    this.props.addStudents(data);
    this.showNotification("tl");
  };
  render() {
    const { classes, projects } = this.props;
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
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <label>Select Project Code</label>{" "}
                    <select
                      onChange={event => {
                        this.setState({ project: event.target.value });
                      }}
                    >
                      {projects.map(item => (
                        <option key={item.course}> {item.code} </option>
                      ))}
                    </select>
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      className="admNumber"
                      labelText="Admission Number"
                      id="admNo"
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
                <Snackbar
                  place="tl"
                  color="success"
                  icon={AddAlert}
                  message="Student successfully Added."
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
Students.popTypes = {
  addStudents: PropTypes.func.isRequired,
  classes: PropTypes.object,
  projects: PropTypes.array
};

export default withStyles(styles)(Students);
