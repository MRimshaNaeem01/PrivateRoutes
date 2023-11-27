import React from 'react'

const Navbar = ({ role }) => {

  // Menu items for Super Admin
  const superAdminMenu = [
    { label: 'Users', path: '/superAdmin/users' },
    { label: 'Subscriptions', path: '/superAdmin/subscriptions' },
    { label: 'Merchants', path: '/superAdmin/merchants' },
  ];

  // Menu items for Store Owner
  const storeOwnerMenu = [
    { label: 'Questions', path: '/storeOwner/questions' },
    { label: 'Products', path: '/storeOwner/products' },
    { label: 'Orders', path: '/storeOwner/orders' },
    { label: 'Staff', path: '/storeOwner/staff' },
    { label: 'Withdraws', path: '/storeOwner/withdraws' },
    { label: 'Reviews', path: '/storeOwner/reviews' },
  ];


  return (
    <div>
      <nav>
        <ul className='nav-menu'>
          {role == "super_admin" && superAdminMenu.map((item) => (
            <li key={item.label}>
              <a href={item.path}>{item.label}</a>
            </li>
          ))}

          {role == "store_owner" &&
            storeOwnerMenu.map((item) => (
              <li key={item.label}>
                <a href={item.path}>{item.label}</a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar