import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router";
// @material-ui/icons
import Person from "@material-ui/icons/Person";

// core components
import PropTypes from "prop-types";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

class HeaderLinks extends React.Component {
  logout = () => {
    const { history, onLogout } = this.props;
    onLogout();
    history.push("/login");
  }
  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.searchWrapper} />
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Log Out"
          className={classes.buttonLink}
          onClick={this.logout}
        >
          <Person className={classes.icons} />
          <p className={classes.linkText}>Logout</p>
        </Button>
      </div>
    );
  }
}
HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  history: PropTypes.object
};

export default withRouter(withStyles(headerLinksStyle)(HeaderLinks));
