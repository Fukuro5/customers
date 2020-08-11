import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
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
import { addInvoiceItems, loadInvoicesItems, changeProductQuantity } from '@/services/actions/invoiceItems'
import { Header } from '@/components/index'
import { LoaderSvg } from '@/assets/icons/index'
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
    axios.get('/invoices')
      .then(res => {
        this.props.addInvoice(res.data)
    })
    axios.get(`invoices/${this.props.match.params.id}/items`)
      .then(res => {
        this.props.changeProductQuantity([])
    })
  }


  createInvoice = () => {
    axios.post('/invoices', {
      customer_id: null,
      discount: 0,
      total: 0,
    })
    axios.get('/invoices')
      .then(res => {
        const last = res.data.length
        const id = res.data[last - 1].id
        this.props.history.push(`/invoices/${id+1}/edit`)
      })
  }

  render() {
    if(!this.props.invoice.data) {
      return (
        <div className={st.loader}>
          <LoaderSvg />
        </div>
      )
    }

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
                    <td>{this.props.customer.map(cust => {
                      if(cust.id == data.customer_id) return cust.name
                    })}</td>
                    <td>{data.discount}</td>
                    <td>{(data.total).toFixed(2)}</td>
                    <td><Link to={`/invoices/${data.id}/edit`}>edit</Link></td>
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

const InvoicesWithRouter = withRouter(Invoices)

export default connect(selector, {
  addCustomers,
  addProducts,
  addInvoice,
  changeProductQuantity,
})(InvoicesWithRouter)