import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import Button from 'react-bootstrap/Button'
const save = require('../../save.js')

class ShowProduct extends React.Component {
  state = {
    product: null
  }

  componentDidMount () {
    axios.get(`${apiUrl}/products/` + this.props.match.params.id)
      .then(response => {
      // handle success
        this.setState({
          product: response.data.product
        })
      })
      .catch(error => {
        // handle error
        console.log(error)
      })
  }

  saveData (product) {
    console.log(product)
    console.log(save)
    save.cart.items.push(product)
  }

  render () {
    const { product } = this.state
    let jsx
    // if the API has not responded yet
    if (this.state.product === null) {
      jsx = <p>Loading...</p>
    // after API responds
    } else {
      jsx = (
        <div>
          <h3>{this.state.product.name}</h3>
          <h4>Description: {this.state.product.description}</h4>
          <h4>Price: ${this.state.product.unitPrice}</h4>
          <Button variant="primary" onClick={() => this.saveData(product)}>Add To Cart</Button>
        </div>
      )
    }
    return (
      <div>
        <h2>Single Product Page</h2>
        {jsx}
      </div>
    )
  }
}

export default ShowProduct
