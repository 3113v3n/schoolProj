import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import PropTypes from "prop-types";
import Snackbar from "../../../components/Snackbar/Snackbar";
import AddAlert from "@material-ui/core/SvgIcon/SvgIcon";

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

class UploadCsvFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      error: true,
      tl: false,
      tr: false
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
  handleUploadFile = ev => {
    ev.preventDefault();

    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);
    this.props.upload(data);
    if (!this.props.error) {
      this.showNotification("tr");
    } else {
      this.showNotification("tl");
    }
  };
  render() {
    const { classes, status, errorMessage, message } = this.props;
    return (
      <Card>
        <CardBody>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>UPLOAD FILE INSTEAD</h4>
            <p className={classes.cardCategoryWhite}>SELECT FILE (.csv) </p>
          </CardHeader>
          <form onSubmit={this.handleUploadFile}>
            <div style={{ paddingTop: "5%" }}>
              <input
                ref={ref => {
                  this.uploadInput = ref;
                }}
                type="file"
                accept={".csv"}
              />
            </div>
            <div style={{ paddingTop: "2%" }}>
              <button>Upload</button>
            </div>
          </form>
          <Snackbar
            place={"tr"}
            color={
              status !== "failed" && status !== undefined ? "success" : "danger"
            }
            icon={AddAlert}
            message={message}
            open={this.state.tr}
            closeNotification={() => this.setState({ tr: false })}
            close
          />
          <Snackbar
            place={"tl"}
            color={"danger"}
            icon={AddAlert}
            message={errorMessage}
            open={this.state.tl}
            closeNotification={() => this.setState({ tl: false })}
            close
          />
        </CardBody>
      </Card>
    );
  }
}
UploadCsvFile.propTypes = {
  error: PropTypes.string,
  errorMessage: PropTypes.string,
  status: PropTypes.string,
  classes: PropTypes.object,
  upload: PropTypes.func,
  message: PropTypes.string
};

export default withStyles(styles)(UploadCsvFile);
