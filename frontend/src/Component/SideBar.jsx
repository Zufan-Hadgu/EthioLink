// Update frontend/src/Components/Sidebar.jsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { 
  ShoppingBagIcon, 
  GlobeAltIcon, 
  UserIcon,
  BuildingOfficeIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation()
  const { currentUser, userProfile } = useAuth()
  
  // Items for supporters (default users)
  const discoverItems = [
    { name: 'All Products', path: '/products', icon: <ShoppingBagIcon className='h-6 w-6 text-gray-500'/> },
    { name: 'Startups', path: '/startups', icon: <GlobeAltIcon className='h-6 w-6 text-gray-500'/> },
    { name: 'Explore', path: '/reel', icon: <UserIcon className='h-6 w-6 text-gray-500'/> },
  ]

  // Items for entrepreneurs
  const entrepreneurItems = [
    { name: 'Business Profile', path: '/business-profile', icon: <BuildingOfficeIcon className='h-6 w-6 text-gray-500'/> },
    { name: 'Settings', path: '/settings', icon: <CogIcon className='h-6 w-6 text-gray-500'/> },
    { name: 'Help & Support', path: '/help', icon: <QuestionMarkCircleIcon className='h-6 w-6 text-gray-500'/> },
  ]

  // Determine which items to show based on user role
  const isEntrepreneur = userProfile?.role === 'entrepreneur'
  const menuItems = isEntrepreneur ? entrepreneurItems : discoverItems
  const sectionTitle = isEntrepreneur ? 'BUSINESS' : 'DISCOVER'

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
          {/* Main Section */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              {sectionTitle}
            </h3>
            <nav className="space-y-2">
              {menuItems.map((item) => (
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

          {/* Additional section for supporters */}
          {!isEntrepreneur && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                SUPPORT
              </h3>
              <nav className="space-y-2">
                <Link
                  to="/fund"
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    location.pathname === '/fund' 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'hover:bg-gray-50 hover:text-gray-700'
                  }`}
                  onClick={onClose}
                >
                  <span className="text-lg"><HeartIcon className='h-6 w-6 text-gray-500'/></span>
                  <span className="font-medium">Fund Projects</span>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
