import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// The extends allows us to pass props
class ProductShow extends React.Component {
  // this allows us to display data
  // this defines it as null before it's recieved from the API
  state = {
    product: null
  }
  // updates the current state of data in real time
  componentDidMount () {
    // this.props.match.params.id is a way to get the id from the route in the app.js file
    axios.get(`${apiUrl}/products` + this.props.match.params.id)
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

  // Render defines what's being called in the component
  // Return defines what is actually being rendered
  render () {
    let jsx
    // if the API has not responded yet
    if (this.state.product === null) {
      jsx = <p>Loading...</p>
    // after API responds
    } else {
      jsx = (
        <div>
          <h3>{this.state.product.name}</h3>
          <h4>By: {this.state.product.description}</h4>
          <h4>By: {this.state.product.unitPrice}</h4>
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

export default ProductShow
