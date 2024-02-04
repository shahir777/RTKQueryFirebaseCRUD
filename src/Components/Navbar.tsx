import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="flex justify-start items-center space-x-4 p-4">
        {/* Home button with link */}
        <Link to="/" className="text-blue-500 hover:underline">Home</Link>
  
        {/* Create Blog button with link */}
        <Link to="/create" className="text-blue-500 hover:underline">Create Blog</Link>
      </div>
    )
}

export default Navbar
