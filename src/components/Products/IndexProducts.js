import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import apiUrl from '../../apiConfig'
import { Row, Col } from 'react-bootstrap'

class IndexProducts extends React.Component {
  state = {
    products: null
  }
  componentDidMount () {
    axios(`${apiUrl}/products`)
      .then(res => this.setState({ products: res.data.products }))
      .catch(error => {
        // handle error
        console.log(error)
      })
  }
  render () {
    console.log(this.state)
    let jsx
    // if the API has not responded yet
    if (this.state.products === null) {
      jsx = <p>Loading...</p>
    // if the API responds with no books
    } else if (this.state.products.length === 0) {
      jsx = <p>No products</p>
    // if the API responds with books
    } else {
      jsx = (
        <Container>
          <Row>
            {this.state.products.map(product => {
              return (
                <Col sm={4} key={product._id}>
                  <Link to={`/products/${product._id}`}>
                    <img className="indexproducts-image" width={300} height={300} src={product.image}/>
                  </Link>
                  <h3 style={{ color: 'forestgreen' }}>{product.name}</h3>
                  <h6>{product.description}</h6>
                  <h4>$ {product.unitPrice}</h4>
                </Col>
              )
            })}
          </Row>
        </Container>
      )
    }
    return (
      <div>
        {jsx}
      </div>
    )
  }
}
export default IndexProducts
