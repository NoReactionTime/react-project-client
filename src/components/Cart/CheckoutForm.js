import React from 'react'
import { ElementsConsumer, CardElement } from '@stripe/react-stripe-js'

import { Redirect } from 'react-router-dom'

import CardSection from './CardSection'

import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

const save = require('../../save.js')

class CheckoutForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      route: false
    }
  }

  handleSubmit = async event => {
    event.preventDefault()

    const { stripe, elements } = this.props
    if (!stripe || !elements) {
      return
    }
    const msgAlert = this.props
    const card = elements.getElement(CardElement)
    const result = await stripe.createToken(card)
    if (result.error) {
      console.log(result.error.message)
    } else {
      console.log('Props: ', this.props)
      console.log(save)
      const orders = save.orderItem
      orders.forEach((item, index) => {
        if (item !== null) {
          axios({
            method: 'patch',
            url: apiUrl + '/orderitems/' + item._id,
            headers: {
              'Authorization': `Bearer ${save.user.token}`,
              'Content-Type': 'application/json'
            },
            data: {
              orderItem: {
                product: item.product.id,
                quantity: 1,
                purchased: true
              }
            }
          })
            .then(() => {
              save.orderItem = orders.splice(index, 1)
              this.setState({
                route: true
              })
            })
            .then(() => msgAlert({
              heading: 'Checkout Success',
              message: messages.checkoutSuccess,
              variant: 'succes'
            }))
            .catch(console.error)
        }
      })
      console.log(result.token)
    }
  }

  render () {
    if (this.state.route) {
      return <Redirect to='/orderhistory'/>
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <CardSection />
          <button disabled={!this.props.stripe} className="btn-pay">
            Buy Now
          </button>
        </form>
      </div>
    )
  }
}

export default function InjectedCheckoutForm () {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  )
}
