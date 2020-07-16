import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
const save = require('../../save.js')

<<<<<<< HEAD
class ShowProduct extends React.Component {
  state = {
    product: null
  }

  componentDidMount () {
    axios.get(`${apiUrl}/products/` + this.props.match.params.id)
=======
const ShowProduct = props => {
  const [product, setProduct] = useState(null)
  // const [add, setAdd] = useState(0)

  useEffect(() => {
    axios.get(`${apiUrl}/products/` + props.match.params.id)
>>>>>>> Cart
      .then(response => {
      // handle success
        setProduct(response.data.product)
      })
      .catch(error => {
        // handle error
        console.log(error)
      })
  }, [])

  // useEffect(() => {
  //   if (add === 0) {
  //     if (save.cart.items.indexOf(product) === -1) {
  //       save.cart.items.push(product)
  //     }
  //     console.log(product)
  //     console.log(save)
  //   }
  // }, [])

  function saveData (product) {
    if (save.cart.items.indexOf(product) === -1) {
      return save.cart.items.push(product)
    }
    console.log(product)
    console.log(save)
    // useEffect((product) => {
    //
    // }, [])
  }

<<<<<<< HEAD
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
          <img width={200} height={200} src={this.state.product.image}/>
          <h4>Description: {this.state.product.description}</h4>
          <h4>Price: ${this.state.product.unitPrice}</h4>
          <Button variant="primary" onClick={() => this.saveData(product)}>Add To Cart</Button>
        </div>
      )
    }
    return (
=======
  let jsx
  // if the API has not responded yet
  if (product === null) {
    jsx = <p>Loading...</p>
  // after API responds
  } else {
    jsx = (
>>>>>>> Cart
      <div>
        <h3>{product.name}</h3>
        <h4>Description: {product.description}</h4>
        <h4>Price: ${product.unitPrice}</h4>
        <Button variant="primary" onClick={() => {
          saveData(product)
        }}>Add To Cart</Button>
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

export default ShowProduct
