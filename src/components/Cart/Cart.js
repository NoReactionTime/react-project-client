import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

import axios from 'axios'
// // import Products from '../Product/IndexProducts'
import apiUrl from '../../apiConfig'

const save = require('../../save.js')

class Cart extends Component {
  constructor () {
    super()

    this.state = {
      product: null,
      quantity: null,
      purchased: null,
      index: 0
    }
  }

  componentDidMount () {
    console.log(save)
    axios.get(`${apiUrl}/orderitems`, {
      headers: {
        'Authorization': `Bearer ${save.user.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      // .then((res) => console.log(res))
      .then((res) => {
        // handle success
        console.log(res)
        this.setState({
          product: res.data.orderItems
        })
        console.log(this.state.product)
      })
      .catch(error => {
        // handle error
        console.log(error)
      })
  }

  // handleChange = res => {
  //   axios({
  //     method: 'post',
  //     headers: {
  //       'Authorization': `Bearer ${save.user.token}`,
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     url: `${apiUrl}/orderitems`,
  //     data: {
  //       product: save.cart.items,
  //       quantity: null,
  //       purchased: null
  //     }
  //   })
  //     .then((res) => {
  //       console.log('INSIDE CREATE')
  //       console.log(res)
  //       this.setState({
  //       })
  //       // setQuantity(prev => prev + 1)
  //     })
  //     .catch(console.error)
  // }

  // removeData (product) {
  //   const index = save.cart.items.indexOf(product)
  //   if (index > -1) {
  //     save.cart.items.splice(index, 1)
  //   }
  //   console.log(product)
  //   console.log(save)
  // }

  render () {
    console.log('INSIDE Cart')
    console.log(this.state.product)
    let jsx
    // if the API has not responded yet
    if (this.state.product === null) {
      jsx = <p>Loading...</p>
    // if the API responds with no books
    } else if (this.state.product === 0) {
      jsx = <p>No products</p>
    // if the API responds with books
    } else {
      jsx = (
        <Container>
          <Row>
            {this.state.product[0].product.map(product => {
              return (
                <Col key={product._id}>
                  <Link to={`/products/${product._id}`}><h3>{product.name}</h3></Link>
                  <h4>Description: {product.description}</h4>
                  <h4>Price: $ {product.unitPrice}</h4>
                  <Button variant="danger" onClick={() => {
                    this.removeData(product)
                  }}>Remove From Cart</Button>
                </Col>
              )
            })}
          </Row>
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
