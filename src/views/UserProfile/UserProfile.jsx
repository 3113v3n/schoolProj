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
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Person from "@material-ui/icons/Person";
import avatar from "assets/img/faces/marc.jpg";
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

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPass: ""
    };
    //this.initialState = this.state;
  }
  resetValues = () => {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) inputs[i].value = "";
  };

  submitDetails = () => {
    //Input Validation
    const data = {};
    const { username, email, password, confirmPass } = this.state;
    data.username = username;
    data.email = email;
    data.password = password;
    if (password !== confirmPass) {
      alert(" PASSWORDS DONT MATCH");
    } else {
      this.props.updateProfile(data);
      this.resetValues();
    }
  };
  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  render() {
    const { classes, user } = this.props;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <CustomInput
                      labelText="Username"
                      id="username"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.username,
                        onChange: this.handleInput
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={8}>
                    <CustomInput
                      labelText="Email address"
                      id="email"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.email,
                        onChange: this.handleInput
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <CustomInput
                      labelText="New Password"
                      id="password"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.password,
                        onChange: this.handleInput
                      }}
                      inputProps={{
                        type: "password"
                      }}
                    />
                    <CustomInput
                      labelText="Confirm New Password"
                      id="confirmPass"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.confirmPass,
                        onChange: this.handleInput
                      }}
                      inputProps={{
                        type: "password"
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" round onClick={this.submitDetails}>
                  <Person />
                  Update Profile
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>ADMIN</h6>
                <h4 className={classes.cardTitle}>Name: {user.username}</h4>
                <h5 className={classes.cardTitle}>Email: {user.email}</h5>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
UserProfile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  classes: PropTypes.object,
  user: PropTypes.object
};

export default withStyles(styles)(UserProfile);
