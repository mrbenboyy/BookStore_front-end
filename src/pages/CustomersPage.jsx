import React from 'react'
import CustomerList from '../components/CustomerList'
import AddCustomerForm from '../components/AddCustomerForm'

function CustomersPage() {
  return (
    <div>
      <AddCustomerForm />
      <CustomerList />
    </div>
  )
}

export default CustomersPage