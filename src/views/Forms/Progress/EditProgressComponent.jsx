import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import PropTypes from "prop-types";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
////////////////////////////

import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomMarkInput from "components/CustomInput/CustomMarkInput.jsx";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AddAlert from "@material-ui/icons/AddAlert";
import Clear from "@material-ui/icons/Clear";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import CardFooter from "../../../components/Card/CardFooter";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  tableUpgradeWrapper: {
    display: "block",
    width: "100%",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    MsOverflowStyle: "-ms-autohiding-scrollbar"
  },
  table: {
    width: "100%",
    maxWidth: "100%",
    marginBottom: "1rem",
    backgroundColor: "transparent",
    borderCollapse: "collapse",
    display: "table",
    borderSpacing: "2px",
    borderColor: "grey",
    "& thdead tr th": {
      fontSize: "1.063rem",
      padding: "12px 8px",
      verticalAlign: "middle",
      fontWeight: "300",
      borderTopWidth: "0",
      borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
      textAlign: "inherit"
    },
    "& tbody tr td": {
      padding: "12px 8px",
      verticalAlign: "middle",
      borderTop: "1px solid rgba(0, 0, 0, 0.06)"
    },
    "& td, & th": {
      display: "table-cell"
    }
  },
  center: {
    textAlign: "center"
  },
  left: {
    flexDirection: "row"
  }
};
class EditProgressComponent extends React.Component {
  constructor(props){
    super(props);
    const { location } = this.props;
    const {
      progress_id,
      allocation_id,
      documents,
      comments,
      marks
    } = location.state;
    this.state = {
      progress_id: progress_id,
      allocation_id: allocation_id,
      documents: documents,
      editComments: comments,
      editMarks: marks,
      tr: false
    };
  }

  componentWillUnmount() {
    let id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }
  showNotification(place) {
    let x = [];
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
  cancelProgress = () => {
    const { history } = this.props;
    history.push("/admin/studentTable");
  };
  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  resetValues = () => {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) inputs[i].value = "";
  };
  submitForm = () => {
    const data = {};
    const {
      documents,
      editComments,
      editMarks,
      allocation_id,
      progress_id
    } = this.state;
    data.progress_id = progress_id;
    data.allocation_id = allocation_id;
    data.document = documents;
    data.comments = editComments;
    data.marks = editMarks;
    if (
      editComments.length === 0 ||
      documents.length === 0 ||
      editMarks.length === 0
    ) {
      this.showNotification("tr");
    } else {
      this.props.onEditProgress(data);

      const { history, error } = this.props;
      if (!error) {
        this.resetValues();
        history.push("/admin/studentTable");
      }
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer container justify="center" alignItems="baseline">
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>
                  Edit Student Progress
                </h4>
              </CardHeader>
              <CardBody>
                <Snackbar
                  place="tr"
                  color={"danger"}
                  icon={AddAlert}
                  message={"ALL FIELDS ARE REQUIRED !!!"}
                  open={this.state.tr}
                  closeNotification={() => this.setState({ tr: false })}
                  close
                />
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Edit Documents"
                      id="documents"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        onChange: this.handleInput,
                        value: this.state.documents
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 3,
                        value: this.state.documents
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Edit Comments"
                      id="editComments"
                      name="input"
                      formControlProps={{
                        fullWidth: true,
                        onChange: this.handleInput,
                        value: this.state.editComments
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                        value: this.state.editComments
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomMarkInput
                      labelText="Marks"
                      id="editMarks"
                      name="input"
                      inputProps={{
                        value: this.state.editMarks
                      }}
                      formControlProps={{
                        fullWidth: true,
                        onChange: this.handleInput,
                        value: this.state.editMarks
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="success" round onClick={this.submitForm}>
                  Update
                </Button>

                <Button color="danger" round onClick={this.cancelProgress}>
                  <Clear />
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
EditProgressComponent.propTypes = {
  onEditProgress: PropTypes.func.isRequired,
  classes: PropTypes.object,
  location: PropTypes.object.isRequired,
  history: PropTypes.object,
  error: PropTypes.bool,
  message: PropTypes.string,
  status: PropTypes.string
};

export default withRouter(connect()(withStyles(styles)(EditProgressComponent)));
