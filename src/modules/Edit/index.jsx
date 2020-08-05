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
  constructor(props) {
    super(props)

    this.discount = React.createRef()
    this.customer = React.createRef()
    this.product = React.createRef()

    this.state = {
      id: null
    }
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
      id: event.target.value
    })
  }

  productSubmit = (e) => {
    e.preventDefault();
    let data = {
      id: null,
      name: null,
      price: null
    }

    this.props.product.map((el) => {
      if(el.id == this.state.id) {
        data = {
          id: el.id,
          name: el.name,
          price: el.price
        }
      }
      else return null
    })

    this.props.addInvoice(data)
  }

  invoiceSave = (e) => {
    e.preventDefault()

    axios.post('/invoices', {
      customer_id: this.customer.current.value,
      discount: this.discount.current.value
    })
    console.log('g')
    // console.log(this.selCust.current.value)
    // axios.get('/invoices/1')
    //   .then(res => {
    //     console.log(res)
    //   })
  }

  render() {
    let totalSum = 0
    this.props.invoice.data.map((data) => {
      totalSum += data.price
    })
    axios.get('/invoices')
      .then(res => {
        console.log(res)
    })
    return (
      <>
        <Header />
        <section className={st.container}>
          <div className={st.head}>Edit Invoice</div>
          <form onSubmit={this.invoiceSave}>
            <label>Discount(%)<input className={st.inDisc} type='text' ref={this.discount} /></label>
            <div className={st.subtitle}>Customer</div>
            <select className={st.choose} ref={this.customer}>
              {this.props.customer.map((data) => {
                return (
                  <option key={data.name} defaultValue={0} className={st.op}>{data.name}</option>
                )
              })}
            </select>
            <div className={st.subtitle}>Add product</div>
            <select className={st.choose} onChange={this.productChange} ref={this.product}>
              <option disabled>Select...</option>
              {this.props.product.map((data) => {
                return (
                  <option key={data.id} value={data.id}>{data.name}</option>
                )
              })}
            </select>
            <button onClick={this.productSubmit} className={st.add}>Add</button>
            <table className={st.listShop}>
              <tbody>
                <tr>
                  <th id={st.name}>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
                {this.props.invoice.data.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.name}</td>
                      <td>{data.price}</td>
                      <td><input defaultValue="1" /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className={st.total}>
              Total: {totalSum.toFixed(2)}
              <input type="submit" className={st.save} value="Save" />
            </div>
          </form>
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