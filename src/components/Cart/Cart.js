import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
// stripe imports
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm.js'
// // import Products from '../Product/IndexProducts'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

const stripePromise = loadStripe('pk_test_51H5c9lLWfFPh4sc7Ub3kD1DzHU98LfKtJoA3vUcVKjJaisT7KhzhBOQbbijmqwK7kEeq3u8YWlqrYWRdmGqURlYX00liaElRMx')
const save = require('../../save.js')

class Cart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      orderItem: {
        product: null,
        quantity: null,
        purchased: null
      },
      orders: null,
      total: 0
    }
  }

  componentDidMount () {
    const msgAlert = this.props
    console.log('Mounting', save)
    console.log('Props', this.props)
    axios({
      method: 'get',
      url: apiUrl + '/orderitems',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`,
        'Content-Type': 'application/json'
      }
    })

    // .then(res => console.log(res))
      .then(response => {
        // handle success
        console.log(response)
        save.orderItem = response.data.orderItems
        this.setState({
          orderItem: response.data.orderItems[0],
          orders: response.data.orderItems
        })
        this.totalPrice()
      })
      .then(() => msgAlert({
        heading: 'Added to cart',
        message: messages.addedToCartSuccess,
        variant: 'success'
      }))
      .catch(error => {
        // handle error
        console.log(error)
      })
  }
  remove (res, index) {
    console.log('Remove')
    console.log(res)
    console.log(this.props)
    console.log(this.state.orders[index])
    axios({
      method: 'delete',
      url: apiUrl + '/orderitems/' + this.state.orders[index]._id,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        save.orderItem = this.state.orders.splice(index, 1)
      })
      .then((response) => {
        console.log(response)
        this.setState({
          orders: this.state.orders,
          total: 0
        })
        this.totalPrice()
        console.log(this.state)
      })
      .catch(console.error)
  }

  totalPrice () {
    this.state.orders.forEach(item => {
      if (item !== null && !item.purchased) {
        this.setState({
          total: this.state.total + item.product.unitPrice
        })
      }
    })
    console.log(this.state.total)
    // return this.state.total
  }
  // one array is created for every account, with orders in respective carts
  // but the values are null if the current user doesnt have access to see ('get') them
  // so it will be null if this current user has no items in their cart, but another user does have items in their cart
  checkEvery (order) {
    if (order === null) {
      return true
    }
  }
  render () {
    console.log('this.state.orders:', this.state.orders)
    console.log('save.orderitem:', save.orderItem)
    let jsx
    // if the API has not responded yet
    if (this.state.orders === null) {
      jsx = <p>Loading...</p>
    // if the API responds with no books
    } else if ((this.state.orders.length === 0) || this.state.orders.every(this.checkEvery)) {
      jsx = <p>No products</p>
    // if the API responds with books
    } else {
      jsx = (
        <Container>
          {this.state.orders.map((item, index) => {
            if (item !== null && !item.purchased) {
              return (
                <Row>
                  <div className="column-image">
                    <img width={150} height={150} src={item.product.image}/>
                  </div>
                  <Col sm={12} key={index}>
                    <h3>
                      {item.product.name}
                    </h3>
                    <h5>
                      Description: {item.product.description}
                    </h5>
                    <h4>
                    Price: ${item.product.unitPrice}
                    </h4>
                    <Button variant="danger" onClick={(res) => {
                      console.log('clicked')
                      this.remove(res, index)
                    }}>Remove From Cart</Button>
                  </Col>
                </Row>
              )
            }
          })}
          <h3 className="cart-total">Total: ${this.state.total}</h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </Container>
      )
    }
    return (
      <div>
        <h2>Shopping Cart</h2>
        {jsx}
      </div>
    )
  }
}
export default withRouter(Cart)
