import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { customerDataSelector } from '@/services/selectors/customers'
import { addCustomers } from '@/services/actions/customers'
import { productDataSelector } from '@/services/selectors/products'
import { addProducts } from '@/services/actions/products'
import { invoiceDataSelector } from '@/services/selectors/invoice'
import { addInvoice } from '@/services/actions/invoice'
import { invoiceItemsDataSelector } from '@/services/selectors/invoiceItems'
import { Header } from '@/components/index'
import st from './styles.scss'

const selector = createSelector(
  customerDataSelector,
  productDataSelector,
  invoiceDataSelector,
  invoiceItemsDataSelector,
  (customer, product, invoice, invoiceItems) => ({
    customer,
    product,
    invoice,
    invoiceItems,
  }),
)

class Invoices extends Component {
  componentDidMount() {
    axios.get('/customers')
      .then(res => {
        this.props.addCustomers(res.data)
      })
    axios.get('/products')
      .then(res => {
        this.props.addProducts(res.data)
      })
    // axios.get('/invoices')
    //   .then(res => {
    //     this.props.addInvoice(res.data)
    // })
  }


  createInvoice = () => {
    axios.post('/invoices', {
      customer_id: null,
      discount: 0,
      total: 0,
    })
    axios.get('/invoices')
      .then(res => {
        this.props.addInvoice(res.data)
    })
  }

  render() {
    return (
      <>
      <Header />
      <section className={st.container}>
        <div className={st.fl}>
          <div className={st.head}>Invoice List</div>
          <button className={st.create} onClick={this.createInvoice}>Create</button>
        </div>
        <table className={st.invoices}>
          <tbody>
            <tr>
              <th>#</th>
              <th id={st.cust}>customer</th>
              <th>discount</th>
              <th>total</th>
              <th></th>
            </tr>
            {this.props.invoice.data.map((data) => {
                return (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.customer_id}</td>
                    <td>{data.discount}</td>
                    <td>{(this.props.invoiceItems.total).toFixed(2)}</td>
                    <td><Link to={`/invoices/${data.id}/edit`} style={{textDecoration: 'none'}}>edit</Link></td>
                  </tr>
                )
              })}
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
})(Invoices)