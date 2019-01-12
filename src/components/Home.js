import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <h4 className="center">Home</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps)(Home);