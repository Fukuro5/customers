import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { customerDataSelector } from '@/services/selectors/customers'
import { addCustomers } from '@/services/actions/customers'
import { productDataSelector } from '@/services/selectors/products'
import { addProducts } from '@/services/actions/products'
import { invoiceDataSelector } from '@/services/selectors/invoice'
import { addInvoice } from '@/services/actions/invoice'
import { Header } from '@/components/index'
import st from './styles.scss'

const selector = createSelector(
  customerDataSelector,
  productDataSelector,
  invoiceDataSelector,
  (customer, product, invoice) => ({
    customer,
    product,
    invoice,
  }),
)

class Edit extends Component {
  state = {
    product: null
  }

  componentDidMount() {
    if(this.props.product.length == 0) {
      axios.get('/customers')
      .then(res => {
        this.props.addCustomers(res.data)
      })
      axios.get('/products')
      .then(res => {
        this.props.addProducts(res.data)
      })
    }
  }

  productChange = (event) => {
    this.setState({
      product: event.target.value
    })
    // console.log(event.target.value)
  }

  productSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.product)
    // this.props.addInvoice(this.state.product)
    // axios.post('/invoices', {
    //   name: this.state.product
    // })

    // axios.get('/invoices')
    //   .then(res => {
    //     console.log(res)
    //   })
  }

  render() {
    return (
      <>
        <Header />
        <section className={st.container}>
          <div className={st.head}>Edit Invoice</div>
          <div className={st.subtitle}>Customer</div>
          <select className={st.choose}>
            {this.props.customer.map((data) => {
              return (
                <option key={data.name} className={st.op}>{data.name}</option>
              )
            })}
          </select>
          <div className={st.subtitle}>Add product</div>
          <form onSubmit={this.productSubmit}>
            <select className={st.choose} onChange={this.productChange}>
              <option disabled>Select...</option>
              {this.props.product.map((data) => {
                return (
                  <option key={data.id} value={data.id}>{data.name}</option>
                )
              })}
            </select>
            <input type="submit" value="Add" className={st.add} />
          </form>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
              <tr>
                {/* <td>{this.props.invoice}</td> */}
                <td>{this.state.product}</td>
              </tr>
              {/* {this.state.product.map((data) => {
                return (
                  <tr>
                    <td>{data}</td>
                  </tr>
                )
              })} */}
            </tbody>
          </table>
        </section>
      </>
    )
  }
}

export default connect(selector, {
  addCustomers,
  addProducts,
  addInvoice,
})(Edit)