import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { createSelector } from 'reselect'
import { customerDataSelector } from '@/services/selectors/customers'
import { addCustomers } from '@/services/actions/customers'
import { productDataSelector } from '@/services/selectors/products'
import { addProducts } from '@/services/actions/products'
import { invoiceDataSelector } from '@/services/selectors/invoice'
import { addInvoice, invoiceChange } from '@/services/actions/invoice'
import { invoiceItemsDataSelector } from '@/services/selectors/invoiceItems'
import { addInvoiceItems, changeProductQuantity } from '@/services/actions/invoiceItems'
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
  
    // this.props.product.map((el) => {
    //   if(el.id == this.state.id) {
    //     axios.post(`invoices/${this.props.match.params.id}/items`, {
    //       invoice_id: this.props.match.params.id,
    //       product_id: el.id,
    //       quantity: 1
    //     })
    //   }
    // })
  }

  productSubmit = (e) => {
    e.preventDefault();
    let data = {
      id: null,
      name: null,
      price: null
    }

    // this.props.product.map((el) => {
    //   if(el.id == this.state.id) {
    //     axios.post(`invoices/${this.props.match.params.id}/items`, {
    //       invoice_id: this.props.match.params.id,
    //       product_id: el.id,
    //       quantity: 1
    //     })
    //   }
    // })

    this.props.product.map((el) => {
      if(el.id == this.state.id) {
        data = {
          id: el.id,
          name: el.name,
          price: el.price,
          quantity: 1,
        }
      }
      else return null
    })

    this.props.addInvoiceItems(data)
    // this.props.addInvoiceItems(data)
    // for(let i = 17; i < 27; i++) {
    //   axios.delete(`invoices/${this.props.match.params.id}/items/${i}`)
    // }
    
    // axios.get(`invoices/${this.props.match.params.id}/items`)
    //   .then(res => {
    //     res.data.map((data) => {
    //       this.props.product.map((prod) => {
    //         if(data.product_id == prod.id) {
    //           console.log(prod)
    //           dataProd = {
    //             id: prod.id,
    //             name: prod.name,
    //             price: prod.price,
    //           }
    //         }
    //         return null
    //       })
    //     })
    // })
    // console.log(dataProd)
   
    // this.props.addInvoiceItems(data)
  }

  deleteProduct = () => {

  }

  onDiscountChange = (e) => {
    const arr = this.props.invoice.data
    arr.forEach((data) => {
      if(data.id == this.props.match.params.id) {
        data.discount = +e.target.value
      }
    })
    this.props.invoiceChange(arr)
  }

  onCustomerChange = (e) => {
    const arr = this.props.invoice.data
    arr.forEach((data) => {
      if(data.id == this.props.match.params.id) {
        data.customer_id = +e.target.value
      }
    })
    this.props.invoiceChange(arr)
  }

  onTotalChange = (e) => {
    const arr = this.props.invoice.data
    arr.forEach((data) => {
      if(data.id == this.props.match.params.id) {
        data.total = +e
      }
    })
    this.props.invoiceChange(arr)
  }

  onQuantityChange = (e, i) => {
    const arr = this.props.invoiceItems.data;
    arr[i] = {
      ...arr[i],
      quantity: +e.target.value
    }
    this.props.changeProductQuantity(arr)
  }

  invoiceSave = (e) => {
    e.preventDefault()
    this.props.invoiceItems.data.map((data) => {
      axios.post(`invoices/${this.props.match.params.id}/items`, {
        invoice_id: this.props.match.params.id,
        product_id: data.id,
        quantity: data.quantity
      })
    })

    this.props.invoice.data.map((data) => {
      if(data.id == this.props.match.params.id) {
        axios.put(`invoices/${data.id}`, {
          customer_id: data.customer_id,
          discount: data.discount,
          total: this.props.invoiceItems.total
        })
      }
    })
    this.props.history.goBack()
  }

  render() {
    // console.log(this.props.invoiceItems)
    return (
      <>
        <Header />
        <section className={st.container}>
          <div className={st.head}>Edit Invoice</div>
          <form onSubmit={this.invoiceSave}>
            <label>Discount(%)<input className={st.inDisc} defaultValue={this.props.invoice.data.map((data) => {
              if(data.id == this.props.match.params.id){
                return data.discount
              }
            })} type='text' onChange={this.onDiscountChange} ref={this.discount} /></label>
            <div className={st.subtitle}>Customer</div>
            <select className={st.choose} onChange={this.onCustomerChange} ref={this.customer}>
              {this.props.customer.map((data) => {
                return (
                  <option key={data.name} className={st.op} value={data.id}>{data.name}</option>
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
                  <th></th>
                </tr>
                {this.props.invoiceItems.data.map((data, i) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.name}</td>
                      <td>{data.price}</td>
                      <td><input value={data.quantity} onChange={(e) => this.onQuantityChange(e, i)} /></td>
                      <td><button className={st.delete} onClick={this.deleteProduct}>Delete</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className={st.total}>
              Total: {(this.props.invoiceItems.total).toFixed(2)}
              <input type="submit" className={st.save} value="Save" />
            </div>
          </form>
        </section>
      </>
    )
  }
}

const EditWithRouter = withRouter(Edit)

export default connect(selector, {
  addCustomers,
  addProducts,
  addInvoice,
  invoiceChange,
  addInvoiceItems,
  changeProductQuantity,
})(EditWithRouter)