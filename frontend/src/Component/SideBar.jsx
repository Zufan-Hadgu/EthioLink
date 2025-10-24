// Update frontend/src/Components/Sidebar.jsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {ShoppingBagIcon, GlobeAltIcon, UserIcon } from '@heroicons/react/24/outline'

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation()
  
  const discoverItems = [
    { name: 'All Products', path: '/products', icon: <ShoppingBagIcon className='h-6 w-6 text-gray-500'/> },
    { name: 'Startups', path: '/startups', icon: <GlobeAltIcon className='h-6 w-6 text-gray-500'/> },
    { name: 'Explore', path: '/explore', icon: <UserIcon className='h-6 w-6 text-gray-500'/> },
  ]
  
    

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed  top-16 bottom-0 inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          {/* DISCOVER Section */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              DISCOVER
            </h3>
            <nav className="space-y-2">
              {discoverItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    location.pathname === item.path 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'hover:bg-gray-50 hover:text-gray-700'
                  }`}
                  onClick={onClose}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* COMMUNITY Section */}
          {/* <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              COMMUNITY
            </h3>
            <nav className="space-y-2">
              {communityItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    location.pathname === item.path 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'hover:bg-gray-50 hover:text-gray-700'
                  }`}
                  onClick={onClose}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div> */}
        </div>
      </aside>
    </>
  )
}
