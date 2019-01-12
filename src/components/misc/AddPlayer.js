import React, { Component } from 'react';

class AddPlayer extends Component {
    state = {
        playerNumber: null,
        firstName: null,
        lastName: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addPlayer(this.state);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="playerNumber">Number:</label>
                    <input type="text" id="playerNumber" onChange={this.handleChange} />
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" onChange={this.handleChange} />
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" onChange={this.handleChange} />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddPlayer;
