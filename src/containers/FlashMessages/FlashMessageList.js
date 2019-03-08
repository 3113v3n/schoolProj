import { connect } from "react-redux";
import React from "react";
import FlashMessage from "./FlashMessage";
import PropTypes from "prop-types";
class FlashMessageList extends React.Component {
  render() {
    const messages = this.props.messages.map(message => (
      <FlashMessage key={message.id} message={message} />
    ));
    return <div>{messages}</div>;
  }
}

const mapStateToProps = state => {
  return {
    messages: state.flashMessageReducer
  };
};
FlashMessageList.propTypes = {
  messages: PropTypes.array.isRequired
};
export default connect(mapStateToProps)(FlashMessageList);
