import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import '../App.css';

class Me extends Component{
    render(){
        const { name } = this.props.auth.user
        return (
            <div className="me">
                <p>用户名: {name}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(withRouter(Me));