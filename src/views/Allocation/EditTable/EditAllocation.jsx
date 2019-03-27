import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Person from "@material-ui/icons/Person";
import Clear from "@material-ui/icons/Clear";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import PropTypes from "prop-types";
import AddAlert from "@material-ui/icons/AddAlert";
//core components
import Snackbar from "components/Snackbar/Snackbar.jsx";
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

class EditAllocation extends React.Component {
  constructor(props) {
    super(props);
    const code = this.props.location.state.projectCode;
    const id = this.props.location.state.allocation_id;
    this.state = {
      allocation_id: id,
      firstName: "",
      lastName: "",
      supervisor: "",
      projCode: code,
      tl: false,
      tr: false,
      tc: false
    };
  }
  componentDidMount() {
    let uname = this.props.location.state.studentName;
    let name = uname.split(" ");
    let fname = name[0];
    let lname = name[1];
    this.setState({
      firstName: fname,
      lastName: lname
    });
  }
  resetValues = () => {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) inputs[i].value = "";
    this.setState({
      allocation_id: "",
      firstName: "",
      lastName: "",
      supervisor: "",
      projCode: ""
    });
  };
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
  editAllocation = () => {
    const { allocation_id, supervisor, projCode } = this.state;
    const { history, error, status } = this.props;
    const data = {};
    data.allocation_id = allocation_id;
    data.supervisor_id = supervisor;
    if (supervisor.length === 0 || projCode.length === 0) {
      this.showNotification("tl");
    } else {
      this.props.onSubmit(data);
      if (error === false) {
        this.showNotification("tr");
        if (status !== "failed") {
          this.resetValues();
          history.push("/admin/allocation");
        }
      } else {
        this.showNotification("tl");
      }
    }
  };
  cancelEdit = () => {
    const { history } = this.props;
    history.push("/admin/allocation");
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const {
      classes,
      lecturers,
      message,
      errorMessage,
      error,
      status
    } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Edit Allocation </h4>
                <p className={classes.cardCategoryWhite}>
                  Enter Allocation Details{" "}
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      className="firstName"
                      labelText="first Name"
                      id="firstName"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.firstName,
                        onChange: this.handleInput
                      }}
                      inputProps={{
                        disabled: true,
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
                        disabled: true,
                        value: this.state.lastName
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <label htmlFor="lecturers">Select Supervisor</label>
                    <Select
                      style={{ marginLeft: 10, width: "50%" }}
                      value={this.state.supervisor}
                      onChange={this.handleChange}
                      formcontrolprops={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "supervisor",
                        id: "supervisor"
                      }}
                    >
                      {lecturers.map(item => (
                        <MenuItem
                          key={item.supervisor_id}
                          value={item.supervisor_id}
                        >
                          {item.name} : {item.allocations_count}
                        </MenuItem>
                      ))}
                    </Select>
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      className="project Code"
                      labelText="Project Code"
                      id="projCode"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.projCode,
                        onChange: this.handleInput
                      }}
                      inputProps={{
                        value: this.state.projCode
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="success" round onClick={this.editAllocation}>
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
                    error !== true ? "All fields Required" : errorMessage
                  }
                  open={this.state.tl}
                  closeNotification={() => this.setState({ tl: false })}
                  close
                />
                <Snackbar
                  place={"tr"}
                  color={status !== "failed" ? "success" : "danger"}
                  icon={AddAlert}
                  message={
                    status !== "failed" ? "Successful reallocation" : message
                  }
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
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object,
  history: PropTypes.object,
  studentName: PropTypes.string,
  projectCode: PropTypes.string,
  supervisor: PropTypes.string,
  lecturers: PropTypes.array,
  location: PropTypes.object,
  message: PropTypes.string,
  errorMessage: PropTypes.string,
  error: PropTypes.bool,
  status: PropTypes.string
};

export default withRouter(withStyles(styles)(EditAllocation));
