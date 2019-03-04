import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CheckBox from "components/CheckBox/CheckBox.jsx";
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

class Supervisors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffId: "6r6r7612e",
      email: "basub@gmail.com",
      firstName: "Sidney",
      lastName: "Omondi",
      password: "#cc8g92 xjkb89",
      confirmPass: "#cc8g92 xjkb89",
      courseSelected: "diploma"
    };
  }
  render() {
    const { classes } = this.props;
    const {
      staffId,
      email,
      firstName,
      lastName,
      password,
      confirmPass,
      courseSelected
    } = this.state;
    const supervisor = {};
    supervisor.staffId = staffId;
    supervisor.email = email;
    supervisor.firstName = firstName;
    supervisor.lastName = lastName;
    supervisor.password = password;
    supervisor.confirmPass = confirmPass;
    supervisor.courseSelected = courseSelected;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Register SuperVisor</h4>
                <p className={classes.cardCategoryWhite}>
                  Enter supervisor Details
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="StaffId"
                      id="staff_id"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Email address"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="First Name"
                      id="first-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Last Name"
                      id="last-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <p>Course Option</p>
                    <CheckBox />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="set Password"
                      id="password"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Confirm Password"
                      id="confirm-password"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button
                  color="warning"
                  onClick={this.props.onSubmit(supervisor)}
                >
                  Add SuperVisor
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
Supervisors.propTypes = {
  onSubmit: PropTypes.func
};
export default withStyles(styles)(Supervisors);
