import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomNumberInput from "components/CustomInput/CustomNumberInput.jsx";
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

class EditProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projCode: this.props.location.state.code,
      newProjectCode: "",
      trimesters: 0,
      degreeSelected: false,
      diplomaSelected: false,
      tl: false,
      tr: false
    };
  }

  resetValues = () => {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) inputs[i].value = "";
    this.setState({
      projCode: "",
      newProjectCode: "",
      trimesters:0,
      degreeSelected: false,
      diplomaSelected: false
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
  editProject = () => {
    const {
      projCode,
      newProjectCode,
      trimesters,
      degreeSelected,
      diplomaSelected
    } = this.state;
    const { error } = this.props;
    const data = {};
    data.new_project_code = newProjectCode;
    data.degree = degreeSelected;
    data.trimesters = parseInt(trimesters);
    data.diploma = diplomaSelected;
    data.old_project_code = projCode;
    if (
      projCode.length === 0 ||
      newProjectCode.length === 0 ||
      trimesters.length === 0 ||
      (degreeSelected === false && diplomaSelected === false)
    ) {
      this.showNotification("tl");
    } else {
      this.props.onSubmit(data);

      if (error === false) {
        this.showNotification("tr");
        this.resetValues();
      } else {
        this.showNotification("tr");
      }
    }
  };
  cancelEdit = () => {
    const { history } = this.props;
    history.push("/admin/projectsTable");
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  render() {
    const { classes, error, errorMessage, message } = this.props;
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Edit Project </h4>
                <p className={classes.cardCategoryWhite}>
                  Enter Project Details{" "}
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText=" Old Project Code"
                      id="projCode"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.projCode,
                        onChange: this.handleInput
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.projCode
                      }}
                    />
                    <CustomInput
                      labelText="Enter New Project Code"
                      id="newProjectCode"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.newProjectCode,
                        onChange: this.handleInput
                      }}
                      inputProps={{
                        value: this.state.newProjectCode
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomNumberInput
                      labelText="Trimesters number (1 || 2)"
                      id="trimesters"
                      value="number"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.trimesters,
                        onChange: this.handleInput
                      }}
                      inputProps={{
                        value: this.props.location.state.trimesters
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
                <Button color="success" round onClick={this.editProject}>
                  <Person />
                  Update Row
                </Button>
                <Button color="danger" round onClick={this.cancelEdit}>
                  <Clear />
                  Cancel / Go Back
                </Button>
                <Snackbar
                  place={"tl"}
                  color={"danger"}
                  icon={AddAlert}
                  message={"ALL FIELDS ARE REQUIRED"}
                  open={this.state.tl}
                  closeNotification={() => this.setState({ tl: false })}
                  close
                />
                <Snackbar
                  place={"tr"}
                  color={!error ? "success" : "danger"}
                  icon={AddAlert}
                  message={!error ? message : errorMessage}
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
EditProject.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object,
  history: PropTypes.object,
  studentName: PropTypes.string,
  projectCode: PropTypes.string,
  supervisor: PropTypes.string,
  status: PropTypes.string,
  lecturers: PropTypes.array,
  location: PropTypes.object,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  message: PropTypes.string
};

export default withRouter(withStyles(styles)(EditProject));
