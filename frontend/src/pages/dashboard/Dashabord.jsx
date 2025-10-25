import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HandThumbUpIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'

export default function Dashboard() {
  const navigate = useNavigate()

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`)
  }

  return (
    <div className="max-w-7xl">
      {/* Startup of the Month Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Startup of the Month</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Innovate Ethiopia team"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Innovate Ethiopia: AgriTech Solutions
              </h3>
              <p className="text-gray-600 mb-6">
                Revolutionizing small-scale farming with sustainable, AI-driven agricultural solutions. 
                Connecting farmers with market insights and empowering them with smart tools for 
                better yields and sustainable practices.
              </p>
              <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center">
                View more
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Products & Startups Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Discover Products & Startups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Cards */}
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

// Product Card Component
function ProductCard({ product, onClick }) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <span className="bg-gray-100 px-2 py-1 rounded mr-2">{product.category}</span>
          <span>{product.location}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span><LikeButton product={product}/></span>
          <span><CommentButton product={product}/></span>
        </div>
      </div>
    </div>
  )
}

// Sample data
const products = [
  {
    id: 1,
    name: "PureFlow Water Filter",
    category: "Environmental",
    location: "Addis Ababa",
    image: "https://lh3.googleusercontent.com/p/AF1QipM2BosNhg1gKO3XsrZaexK5Z6G3_9b5avP48IiT=s1360-w1360-h1020-rw",
    upvotes: 150,
    comments: 25
  },
  {
    id: 2,
    name: "Handmade Leather Tote",
    category: "Artisanal",
    location: "Oromia",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    upvotes: 120,
    comments: 18
  },
  {
    id: 3,
    name: "KidLearn Digital Platform",
    category: "Education",
    location: "Amhara",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    upvotes: 200,
    comments: 35
  },
  {
    id: 4,
    name: "EcoCoffee Processor",
    category: "Agriculture",
    location: "Tigray",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    upvotes: 90,
    comments: 10
  },
  {
    id: 5,
    name: "Highland Artisanal Honey",
    category: "Food & Beverage",
    location: "Southern Nations",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    upvotes: 180,
    comments: 30
  },
  {
    id: 6,
    name: "Afya Mobile Health App",
    category: "Healthcare",
    location: "Addis Ababa",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    upvotes: 210,
    comments: 40
  }
]

function LikeButton({ product }) {
    return (
      <button className="flex items-center space-x-1">
        <HandThumbUpIcon className="h-6 w-6 text-gray-500" />
        <span>{product.upvotes} Upvotes</span>
      </button>
    );
  }


  function CommentButton({ product }){
    return (
        <button  className = "flex items-center space-x-1">
            <ChatBubbleLeftIcon className='h-6 w-6 text-gray-500'/>
            <span>{product.comments} Comments</span>
        </button>
    )
  }