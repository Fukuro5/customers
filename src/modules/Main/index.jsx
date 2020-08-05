import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { customerDataSelector } from '@/services/selectors/customers'
import { addCustomers } from '@/services/actions/customers'
import { productDataSelector } from '@/services/selectors/products'
import { addProducts } from '@/services/actions/products'
import { Header } from '@/components/index'
import st from './styles.scss'

const selector = createSelector(
  customerDataSelector,
  productDataSelector,
  (customer, product) => ({
    customer,
    product,
  }),
)

class Main extends Component {
  componentDidMount() {
    axios.get('/customers')
      .then(res => {
        this.props.addCustomers(res.data)
      })
    axios.get('/products')
      .then(res => {
        this.props.addProducts(res.data)
      })
  }

  render() {
    return (
      <>
        <Header />
      </>
    )
  }
}

export default connect(selector, {
  addCustomers,
  addProducts,
})(Main)