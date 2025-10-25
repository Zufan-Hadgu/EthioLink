// Update frontend/src/Components/Header.jsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { auth } from '../utility/fierbase'

export default function Header({ onMenuClick }) {
  const location = useLocation()
  const { currentUser, userProfile } = useAuth()
  const hideSidebarPages = ['/login', '/signup']
  const shouldShowMenu = !hideSidebarPages.includes(location.pathname)

  const handleLogout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Mobile menu button - only show when sidebar is available */}
        {shouldShowMenu && (
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-orange-500"
          >
            ☰
          </button>
        )}
        
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center mr-2">
            <span className="text-white font-bold text-sm">EL</span>
          </div>
          <span className="text-2xl font-bold text-orange-600">EthioLink</span>
        </div>
        
        {/* Search bar - only show on main pages */}
        {shouldShowMenu && (
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="Search for startups or products"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-orange-500 focus:border-orange-500"
            />
            <button className="ml-2 p-2 text-gray-600 hover:text-orange-500">
              🔍
            </button>
          </div>
        )}
        
        {/* Auth section - different content based on login status */}
        <div className="flex items-center space-x-4">
          {currentUser ? (
            // Logged in user - show logout and profile
            <>
              <button 
                onClick={handleLogout}
                className="text-gray-600 hover:text-orange-500 font-medium"
              >
                Logout
              </button>
              <Link to="/profile">
                <button className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors">
                  <span className="text-white font-medium text-sm">
                    {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </button>
              </Link>
            </>
          ) : (
            // Not logged in - show login and signup
            <>
              <Link to="/login">
                <button className="text-gray-600 hover:text-orange-500 font-medium">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 font-medium">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}