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
// import messages from '../AutoDismissAlert/messages'

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
    axios({
      method: 'get',
      url: apiUrl + '/orderitems',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        save.orderItem = response.data.orderItems
        this.setState({
          orderItem: response.data.orderItems[0],
          orders: response.data.orderItems
        })
        this.totalPrice()
      })
      .catch(error => {
        // handle error
        console.log(error)
      })
  }

  update (count, product, orderID, index, purchased) {
    if (count >= 1 && !purchased) {
      axios({
        method: 'patch',
        url: apiUrl + '/orderitems/' + orderID,
        headers: {
          'Authorization': `Bearer ${save.user.token}`,
          'Content-Type': 'application/json'
        },
        data: {
          orderItem: {
            product: product,
            quantity: count,
            purchased: false
          }
        }
      })
        .then(() => {
          save.orderItem[index].quantity = count
          return save.orderItem
        })
        .then((response) => {
          this.setState({
            orders: response,
            total: 0
          })
          this.totalPrice()
        })
        .catch(console.error)
    }
  }

  remove (res, index) {
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
        this.setState({
          orders: this.state.orders,
          total: 0
        })
        this.totalPrice()
      })
      .catch(console.error)
  }

  totalPrice () {
    this.state.orders.forEach(item => {
      if (item !== null && !item.purchased) {
        this.setState({
          total: Math.round(((this.state.total + item.product.unitPrice * item.quantity) + Number.EPSILON) * 100) / 100
        })
      }
    })
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
                <Row key={item._id}>
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
                    <div>
                      <h5>
                        <Button variant="outline-warning" onClick={(res) => {
                          if (item.quantity > 0) {
                            const quant = item.quantity - 1
                            const purchased = item.purchased
                            this.update(quant, item.product._id, item._id, index, purchased)
                          }
                        }}> - </Button>   Quantity: {item.quantity}   <Button variant="outline-success" onClick={(res) => {
                          if (item.quantity > 0) {
                            const quant = item.quantity + 1
                            const purchased = item.purchased
                            this.update(quant, item.product._id, item._id, index, purchased)
                          }
                        }}> + </Button>
                      </h5>
                    </div>
                    <h4>
                    Price: ${item.product.unitPrice * item.quantity}
                    </h4>
                    <Button variant="danger" onClick={(res) => {
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
