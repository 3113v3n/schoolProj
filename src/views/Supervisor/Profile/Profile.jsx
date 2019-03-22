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
import Snackbar from "components/Snackbar/Snackbar";
import AddAlert from "@material-ui/core/SvgIcon/SvgIcon";
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

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPass: "",
      password: "",
      confirmPass: "",
      tl: false,
      tr: false,
      tc: false,
      bl: false
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
    for (let i = 0; i < inputs.length; i++) inputs[i].value = "";
    this.setState({ oldPass: "", password: "", confirmPass: "" });
  };

  submitDetails = () => {
    //Input Validation
    const data = {};
    const { oldPass, password, confirmPass } = this.state;
    const { error } = this.props;
    data.old_Pass = oldPass;
    data.password = password;
    if (
      oldPass.length === 0 ||
      password.length === 0 ||
      confirmPass.length === 0
    ) {
      alert("ALL FIELDS ARE REQUIRED");
    } else if (password !== confirmPass) {
      this.showNotification("tc");
    } else {
      this.props.updateProfile(data);
      if (error === false) {
        this.resetValues();
        this.showNotification("tr");
      } else {
        this.showNotification("tl");
      }
    }
  };
  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  render() {
    const { classes, message, errorMessage } = this.props;

    return (
      <div>
        <GridContainer container justify="center" alignItems="baseline">
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
                      labelText="Enter Old Password"
                      id="oldPass"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        value: this.state.oldPass,
                        onChange: this.handleInput
                      }}
                      inputProps={{
                        type: "password"
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
                <Snackbar
                  place="tl"
                  color="danger"
                  icon={AddAlert}
                  message={errorMessage}
                  open={this.state.tl}
                  closeNotification={() => this.setState({ tl: false })}
                  close
                />
                <Snackbar
                  place="tr"
                  color="success"
                  icon={AddAlert}
                  message={message}
                  open={this.state.tr}
                  closeNotification={() => this.setState({ tr: false })}
                  close
                />
              </CardFooter>
              <Snackbar
                place="tc"
                color="danger"
                icon={AddAlert}
                message="PASSWORDS DONT MATCH"
                open={this.state.tc}
                closeNotification={() => this.setState({ tc: false })}
                close
              />
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
Profile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  classes: PropTypes.object,
  error: PropTypes.bool,
  message: PropTypes.string,
  errorMessage: PropTypes.string
};

export default withStyles(styles)(Profile);
