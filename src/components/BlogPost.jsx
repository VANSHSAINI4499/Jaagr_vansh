import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const BlogPost = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Michael Chen",
      text: "Great article!",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) 
    }
  ]);
  
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment = {
      id: comments.length + 1,
      author: "Guest User", 
      text: newComment,
      timestamp: new Date()
    };
    
    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-orange-500">Jaagr</span>
            <div className="ml-10 space-x-4">
              <a href="#" className="text-gray-700">Home</a>
              <a href="#" className="text-gray-700">About Us</a>
              <a href="#" className="text-gray-700">Blogs</a>
            </div>
          </div>
          <div className="space-x-4">
            <button className="text-gray-700">Login</button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded">Sign Up</button>
          </div>
        </div>
      </nav>

      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-8">
         
          <div className="col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Understanding Mental Health: A Guide to Wellness and Resilience
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="ml-3">
                <p className="text-gray-900">John Doe</p>
                <p className="text-gray-500 text-sm">Published on March 15, 2023</p>
              </div>
            </div>

           
            <div className="bg-gray-200 h-64 mb-8 rounded border border-gray-300">
  <img 
    className="w-full h-full  rounded object-cover" 
    src="https://plus.unsplash.com/premium_photo-1734545294056-9dbee090d3ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D" 
    alt="" 
  />
</div>

            <p className="text-gray-700 mb-8">
              Mental health is an essential part of overall well-being, yet it often takes a backseat in conversations about
              health. Just as physical health is crucial for a thriving body, mental health is the cornerstone of a fulfilled and
              balanced life. In this blog, we'll explore what mental health is, why it matters, and practical steps to maintain it.
            </p>

            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="ml-4">
                    <p className="font-medium">John Doe</p>
                    <p className="text-gray-500 text-sm">Mental Health Specialist</p>
                    <p className="text-gray-500 text-sm">John is a leading Mental Health researcher with over 10 years of experience in Human Psychology.</p>
                  </div>
                </div>
                <button className="bg-orange-500 text-white px-4 py-2 rounded">Follow</button>
              </div>
            </div>

            {/* Comments Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>
              
              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows="3"
                    />
                    <button 
                      type="submit"
                      className="mt-2 bg-orange-500 text-white px-4 py-2 rounded"
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </form>

              
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-gray-500 text-sm">
                          {formatDistanceToNow(comment.timestamp)} ago
                        </span>
                      </div>
                      <p className="text-gray-700 mt-1">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

         
          <div className="col-span-1">
            <h2 className="text-xl font-bold mb-4">Related Articles</h2>
            <div className="space-y-4">
              <div className="bg-gray-200 h-32 rounded"></div>
              <div className="bg-gray-200 h-32 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;