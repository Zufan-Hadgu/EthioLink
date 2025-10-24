import React, { useState } from 'react'
import { useParams, useNavigate ,Link} from 'react-router-dom'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(0)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Abebe Kebede",
      time: "2 hours ago",
      text: "This is a fantastic initiative! Ethiopia needs more solutions like this."
    },
    {
      id: 2,
      user: "Sara Ahmed",
      time: "1 day ago",
      text: "I'm interested in partnering. How can I reach out?"
    }
  ])

  // Sample product data - in real app, this would come from API
  const product = {
    id: 1,
    name: "PureFlow Water Filter",
    category: "Technology",
    location: "Addis Ababa",
    mainImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    description: "PureFlow Water Filter is an innovative solution providing clean, safe drinking water to communities. Utilizing advanced filtration technology, it removes impurities, bacteria, and viruses, ensuring health and well-being. Designed for durability and ease of use, PureFlow is ideal for both urban and rural settings, offering a sustainable approach to water purification.",
    upvotes: 250,
    comments: 78,
    isStartup: true,
    goal: 50000,
    raised: 35000,
    progress: 70
  }

  const relatedProducts = [
    {
      id: 2,
      name: "Innovate Ethiopia",
      category: "Technology",
      location: "Addis Ababa",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "EcoCoffee Processor",
      category: "Agriculture",
      location: "Tigray",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "KidLearn Digital Platform",
      category: "Education",
      location: "Amhara",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ]

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: "Current User",
        time: "Just now",
        text: comment
      }
      setComments([newComment, ...comments])
      setComment('')
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Navigation */}
      <Link to="/"> <button 
        className="flex items-center text-gray-600 hover:text-orange-600 mb-6"
      >
        <span className="mr-2">←</span>
        Back to Discover
      </button></Link>

      {/* Product Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          <span className="bg-gray-100 px-3 py-1 rounded-full">{product.category}</span>
          <span>📍 {product.location}</span>
        </div>
        <div className="flex items-center space-x-6 text-sm text-gray-500">
          <span className="flex items-center">
            <span className="mr-1">👍</span>
            {product.upvotes} Upvotes
          </span>
          <span className="flex items-center">
            <span className="mr-1">💬</span>
            {product.comments} Comments
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Main Image */}
          <div className="mb-6">
            <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all">
                  <span className="text-2xl">▶️</span>
                </button>
              </div>
            </div>
          </div>

          {/* Image Thumbnails */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index ? 'border-orange-500' : 'border-gray-200'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story: Cultivating a Sustainable Future</h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['Agriculture', 'Sustainability', 'Tech Innovation', 'Food Security', 'Ethiopian Startup'].map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-8">
            <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
              <span>❤️</span>
              <span>Upvote ({product.upvotes})</span>
            </button>
            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
              Contact Startup
            </button>
          </div>

          {/* More from this Startup */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">More from this Startup</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{item.name}</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded mr-2">{item.category}</span>
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Comments</h3>
            
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 resize-none"
                rows="4"
              />
              <button 
                type="submit"
                className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Post Comment
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{comment.user}</h4>
                    <span className="text-sm text-gray-500">{comment.time}</span>
                  </div>
                  <p className="text-gray-600">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Support {product.name}</h3>
            <p className="text-gray-600 mb-6">
              Your contribution fuels our mission to bring sustainable agriculture to every community in Ethiopia.
            </p>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Support our Growth!</h4>
              <p className="text-gray-600 mb-4">
                Help us reach our goal of ${product.goal.toLocaleString()} to expand our operation and impact
              </p>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Raised: ${product.raised.toLocaleString()}</span>
                  <span>Progress: {product.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-orange-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${product.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <Link to="/fund"><button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold">
                Support our campaign
              </button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
