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
import Person from "@material-ui/icons/Person";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
//

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
  },
  Container: {
    paddingLeft: "37%",
    paddingTop: "10%"
  }
};

class LoginForm extends React.Component {
  render() {
    const {
      handleSubmit,
      handleInput,
      staffId,
      password,
      classes
    } = this.props;
    return (
      <div>
        <GridContainer container justify="center" alignItems="baseline">
          <GridItem xs={12} sm={12} md={3}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Login</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={10}>
                    <CustomInput
                      labelText="Staff-Id"
                      id="staffId"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={() => handleInput()}
                      value={staffId}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={10}>
                    <CustomInput
                      labelText=" Password"
                      id="password"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={() => handleInput()}
                      value={password}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="success" round onClick={() => handleSubmit()}>
                  <Person />
                  Login
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
LoginForm.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(LoginForm);
