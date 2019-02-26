import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
//core components
import checkboxAdnRadioStyle from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.jsx";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

class CheckboxExample extends React.Component {
  state = {
    checked: []
  };
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem>
            <p>Degree</p>
            <Checkbox
              tabIndex={-1}
              onClick={this.handleToggle(1)}
              checkedIcon={<Check className={classes.checkedIcon} />}
              icon={<Check className={classes.uncheckedIcon} />}
              classes={{
                checked: classes.checked
              }}
            />
          </GridItem>
          <GridItem>
            <p>Diploma</p>
            <Checkbox
              tabIndex={-1}
              onClick={this.handleToggle(2)}
              checkedIcon={<Check className={classes.checkedIcon} />}
              icon={<Check className={classes.uncheckedIcon} />}
              classes={{
                checked: classes.checked
              }}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

CheckboxExample.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(checkboxAdnRadioStyle)(CheckboxExample);
