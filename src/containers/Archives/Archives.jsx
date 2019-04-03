import React from "react";
import ArchiveMUItable from "../../components/DataTable/ArchiveMUItable";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actionCreators from "../../Redux/Actions";
class Archives extends React.Component {
  componentDidMount() {
    this.props.fetchArchives();
  }

  render() {
    const { archives, isLoading, status } = this.props;
    if(!isLoading){
      return <div> Loading...</div>;
    } else {
      return (
        <div>
          <ArchiveMUItable archives={archives} status={status} />
        </div>
      );
    }
  }
}
Archives.propTypes = {
  archives: PropTypes.array.isRequired,
  fetchArchives: PropTypes.func,
  isLoading: PropTypes.bool,
  status: PropTypes.string
};
const mapDispatchToProps = dispatch => {
  return {
    fetchArchives: () => dispatch(actionCreators.fetchArchives())
  };
};
const mapStateToProps = state => {
  return {
    archives: state.admin.archives,
    isLoading: state.admin.isLoading,
    status: state.admin.status
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Archives);
