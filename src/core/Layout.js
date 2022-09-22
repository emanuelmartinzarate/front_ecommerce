import React from 'react'
import Menu from './Menu'

const Layout = ({title = 'Title', description = 'Description', className, children}) => (
    <div>
        <Menu />
        <div className='text-bg-light p-3'>
            <h2>{title}</h2>
            <p className='lead'>{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
)

export default Layout