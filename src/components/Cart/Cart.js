import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap'

// import axios from 'axios'
// // import Products from '../Product/IndexProducts'
// import apiUrl from '../../apiConfig'

const save = require('../../save.js')

class Cart extends Component {
  constructor () {
    super()

    this.state = {
      orderItems: {
        product: null,
        quantity: null,
        purchased: null
      }
    }
  }

  // componentDidMount () {
  //   console.log(save.cart)
  //   axios.get(`${apiUrl}/orderitems`)
  //   // .then(res => console.log(res))
  //     .then(() => console.log(save.cart))
  //     .then(response => {
  //       // handle success
  //       this.setState({
  //         orderItems: save.cart.items[0]
  //       })
  //     })
  //     .catch(error => {
  //       // handle error
  //       console.log(error)
  //     })
  // }

  render () {
    let jsx
    // if the API has not responded yet
    if (save.cart.items[0] === null) {
      jsx = <p>Loading...</p>
    // if the API responds with no books
    } else if (save.cart.items === 0) {
      jsx = <p>No products</p>
    // if the API responds with books
    } else {
      jsx = (
        <Container>
          <Row>
            {save.cart.items.map(product => {
              return (
                <Col key={product._id}>
                  <Link to={`/products/${product._id}`}><h3>{product.name}</h3></Link>
                  <h4>Description: {product.description}</h4>
                  <h4>Price: $ {product.unitPrice}</h4>
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
