import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  state = {
    value: 0
  };
  render() {
    const {
      classes,
      StudentCount,
      SupervisorCount,
      oneTrimester,
      twoTrimester
    } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>assignment_ind</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Allocated Students</p>
                <h3 className={classes.cardTitle}>
                  {StudentCount} <small>students</small>
                </h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>assignment_ind</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>SuperVisors</p>
                <h3 className={classes.cardTitle}>{SupervisorCount}</h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>assignment_ind</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>1 trimester Students</p>
                <h3 className={classes.cardTitle}>{oneTrimester}</h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>assignment_ind</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>2 Trimester Students</p>
                <h3 className={classes.cardTitle}>{twoTrimester}</h3>
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  StudentCount: PropTypes.number,
  SupervisorCount: PropTypes.number,
  oneTrimester: PropTypes.number,
  twoTrimester: PropTypes.number
};

export default withStyles(dashboardStyle)(Dashboard);
