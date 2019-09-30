import axios from 'axios'
import React, { Component } from 'react'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email:'',
            passwod:'',
            errors: []
        }

        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleFieldChange(event) {
        this.setState({[event.target.name]: event.target.value });
    }

    hasErrorFor(field) {
        return !!this.state.errors[field]
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    handleLogin(event) {
     
    }

    componentDidMount() {

    }   

    render() {
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-4'>
                        <div className='card'>
                            <div className='card-header'>Login</div>
                            <div className='card-body'>
                                <div className="mb-3">
                                    <input
                                        id='email'
                                        type='text'
                                        className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                        name='email'
                                        placeholder="email"
                                        maxLength='50'
                                        value={this.state.email}
                                        onChange={this.handleFieldChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        id='password'
                                        type='text'
                                        placeholder="password"
                                        className={`form-control ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
                                        name='password'
                                        maxLength='50'
                                        value={this.state.password}
                                        onChange={this.handleFieldChange}
                                    />
                                </div>
                                <div>
                                    <button className='btn btn-primary btn-sm mb-3 right' onClick={this.handleUpdateCapacity}>
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login