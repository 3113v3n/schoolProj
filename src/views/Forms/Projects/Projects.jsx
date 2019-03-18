import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomNumberInput from "components/CustomInput/CustomNumberInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import PropTypes from "prop-types";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CheckBox from "@material-ui/core/Checkbox";
import Button from "../../../components/CustomButtons/Button";
///////////
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

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectCode: "",
      projectName: "",
      trimesters: "",
      degreeSelected: false,
      diplomaSelected: false,
      tr: false,
      tl: false,
      error: true
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
    for (let i = 0; i < inputs.length; i++) inputs[i].value = " ";
  };

  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  checkBoxValidation = () => {
    const {
      degreeSelected,
      diplomaSelected,
      projectCode,
      projectName,
      trimesters
    } = this.state;

    const data = {};
    data.code = projectCode;
    data.name = projectName;
    data.trimesters = trimesters;
    data.degree = degreeSelected;
    data.diploma = diplomaSelected;
    if (
      projectCode.length === 0 ||
      projectName.length === 0 ||
      trimesters.length === 0 ||
      (degreeSelected === false && diplomaSelected === false)
    ) {
      this.setState({ error: false });
      this.showNotification("tl");
    } else {
      this.props.addProject(data);
      if (this.state.error === false) {
        this.showNotification("tr");
        this.resetValues();
      }
    }
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
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>PROJECTS</h4>
                <p className={classes.cardCategoryWhite}>Project Details</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Project Code"
                      id="projectCode"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.projectCode,
                        onChange: this.handleInput
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Project Name"
                      id="projectName"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        onChange: this.handleInput,
                        value: this.state.projectName
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
                <Button color="success" round onClick={this.checkBoxValidation}>
                  Add Project
                </Button>
                <Snackbar
                  place={"tl"}
                  color={"danger"}
                  icon={AddAlert}
                  message={"All fields Required"}
                  open={this.state.tl}
                  closeNotification={() => this.setState({ tl: false })}
                  close
                />
                <Snackbar
                  place={"tr"}
                  color={"success"}
                  icon={AddAlert}
                  message={"Project successfully Added."}
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
Projects.propTypes = {
  classes: PropTypes.object,
  addProject: PropTypes.func.isRequired,
  error: PropTypes.bool
};
export default withStyles(styles)(Projects);
