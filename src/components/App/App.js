import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../CheckoutForm'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import IndexProducts from '../Products/IndexProducts'
import ShowProduct from '../Products/ShowProduct'
import Cart from '../Cart/Cart'
class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const promise = loadStripe('pk_test_51H5c9lLWfFPh4sc7Ub3kD1DzHU98LfKtJoA3vUcVKjJaisT7KhzhBOQbbijmqwK7kEeq3u8YWlqrYWRdmGqURlYX00liaElRMx')
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/orderitems' render={() => (
            <Cart user={user}/>
          )}/>
          <div>
            <Route exact path='/' component={IndexProducts} />
            <Route path="/products/:id" component={ShowProduct} />
            <Elements stripe={promise}>
              <CheckoutForm />
            </Elements>
          </div>
        </main>
      </Fragment>
    )
  }
}

export default App
