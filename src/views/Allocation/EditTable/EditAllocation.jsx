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
    const fname = this.props.location.state.studentName;
    const superv = this.props.location.state.supervisor;
    const code = this.props.location.state.projectCode;
    const datee = this.props.location.state.date;
    this.state = {
      firstName: fname,
      lastName: fname,
      supervisor: superv,
      projCode: code,
      dateRegistered: datee
    };
  }

  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  editAllocation = () => {
    const {
      firstName,
      lastName,
      supervisor,
      projCode,
      dateRegistered
    } = this.state;
    const { history } = this.props;
    const data = {};
    data.firstName = firstName;
    data.lastName = lastName;
    data.supervisor = supervisor;
    data.projCode = projCode;
    data.date = dateRegistered;
    this.props.onSubmit(data);

    history.push("/admin/allocation");
  };
  render() {
    const { classes } = this.props;
    console.log(this.props);
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
                      className="Supervisor"
                      labelText="Supervisor Name"
                      id="supervisor"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.supervisor,
                        onChange: this.handleInput
                      }}
                      inputProps={{
                        value: this.state.supervisor
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
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      className="bootstrap-datetimepicker-widget"
                      labelText="Date Registered"
                      id="dateRegistered"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.dateRegistered,
                        onChange: this.handleInput
                      }}
                      inputProps={{
                        value: this.state.dateRegistered
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
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
EditAllocation.popTypes = {
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object,
  history: PropTypes.object,
  studentName: PropTypes.string,
  projectCode: PropTypes.string,
  supervisor: PropTypes.string,
  date: PropTypes.string
};

export default withRouter(withStyles(styles)(EditAllocation));
