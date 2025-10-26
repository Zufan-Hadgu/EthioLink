import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Component/context/AuthContext';

// Main App component that renders the full Edit Listing interface.
const CreatePage = () => {
    const navigate = useNavigate();
    const { userProfile } = useAuth();

    // ✅ 1. Updated State: Set all fields to empty strings for a real 'Create' form
    const [title, setTitle] = useState("");
    const [tagline, setTagline] = useState("");
    const [story, setStory] = useState("");
    const [category, setCategory] = useState("Agriculture");
    const [tags, setTags] = useState([]);


    
    // 2. State for image file and upload/submission status (No changes needed)
    const [imageFile, setImageFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // State for the Listing Visibility toggle switch
    const [isListingPublic, setIsListingPublic] = useState(true);

    // Function to update input text fields
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        switch(name) {
            case 'title':
                setTitle(value);
                break;
            case 'tagline':
                setTagline(value);
                break;
            case 'story':
                setStory(value);
                break;
            case 'category':
                setCategory(value);
                break;
            default:
                break;
        }
    }, []);

    // Function to handle image file selection
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            // Create a preview URL for immediate display
            setImagePreviewUrl(URL.createObjectURL(file));
        }
    };
    
    // ... (handleTagInput and handleRemoveTag functions are unchanged and correct)
    const handleTagInput = (e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            e.preventDefault();
            const newTag = e.target.value.trim().toLowerCase();
            if (!tags.includes(newTag)) {
                setTags(prev => [...prev, newTag]);
            }
            e.target.value = ''; // Clear input field
        }
    };

    // Function to remove a tag
    const handleRemoveTag = (tagToRemove) => {
        setTags(prev => prev.filter(tag => tag !== tagToRemove));
    };


    // 🚀 THE CORE SUBMISSION LOGIC - Save to Local Storage
    const handleSubmitListing = (e) => {
        e.preventDefault();
        setError(null);

        // Basic validation
        if (!title || !tagline || !story || !imageFile) {
            setError("Please fill in the Title, Tagline, Story, and upload a Product Image.");
            return;
        }

        setLoading(true);

        try {
            // Convert image to base64 for local storage
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageBase64 = event.target.result;
                
                // Prepare product data
                const productData = {
                    title: title,
                    tagline: tagline,
                    story: story,
                    category: category,
                    tags: tags,
                    imageBase64: imageBase64,
                    imageFileName: imageFile.name,
                    status: isListingPublic ? 'Public' : 'Draft',
                    createdAt: new Date().toISOString(),
                    id: Date.now().toString() // Simple ID generation
                };

                // Get existing products from local storage
                const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
                
                // Add new product
                const updatedProducts = [...existingProducts, productData];
                
                // Save to local storage
                localStorage.setItem('products', JSON.stringify(updatedProducts));

                console.log("Product saved to local storage successfully!");

                // Show success message and redirect
                alert("Product successfully uploaded! You can now view it in your dashboard.");
                navigate('/b');
            };

            reader.readAsDataURL(imageFile);

        } catch (err) {
            console.error("Error creating listing:", err);
            setError(`Failed to create listing: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };


    // ... (Card, ImagePlaceholder, and ActionButtons components are unchanged and correct)
    const Card = ({ title, subtitle, children }) => (
        <section className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500 mb-6">{subtitle}</p>}
            {children}
        </section>
    );

    const ImagePlaceholder = ({ url, altText = "Product Image" }) => (
        <div
            className="w-24 h-24 rounded-lg shadow-inner border border-gray-100 flex items-center justify-center text-xs text-gray-500 overflow-hidden"
            style={{
                backgroundImage: url ? `url(${url})` : 'none',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "#f3f4f6",
            }}
            title={altText}
        >
            {!url && "No Image"}
        </div>
    );
    
    const ActionButtons = ({ isSubmitting }) => (
        <div className="flex space-x-3">
            <button 
                type="button" 
                className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-orange-300 transition-all duration-200 text-sm font-medium"
            >
                Preview
            </button>
            <button 
                type="button" 
                className="flex items-center px-4 py-2 text-orange-600 bg-white border border-orange-300 rounded-lg hover:bg-orange-50 hover:border-orange-400 transition-all duration-200 text-sm font-medium"
            >
                Save Draft
            </button>
            <button 
                type="submit" 
                className="flex items-center px-6 py-2 text-white bg-orange-600 rounded-lg hover:bg-orange-700 shadow-md transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Uploading...' : 'Upload Product'}
            </button>
        </div>
    );


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* ... Header (Unchanged) */}
            <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shadow-sm">
                <div className="flex items-center space-x-4">
                    <span 
                        className="text-sm text-gray-500 cursor-pointer hover:text-gray-700"
                        onClick={() => navigate('/b')}
                    >
                        ← Back to Dashboard
                    </span>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Upload Your Product
                    </h1>
                </div>
                <ActionButtons isSubmitting={loading} />
            </header>

            <div className="flex flex-1">
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <form onSubmit={handleSubmitListing} className="max-w-4xl mx-auto space-y-8">
                        
                        {/* 🔴 Error Display */}
                        {error && (
                            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                {error}
                            </div>
                        )}
                        
                        {/* Mobile Header (Hidden on Desktop) */}
                        <div className="md:hidden flex flex-col space-y-3 pt-2">
                            <span className="text-sm text-gray-500 cursor-pointer" onClick={() => navigate('/b')}>
                                ← Back to Dashboard
                            </span>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Upload Your Product
                            </h1>
                            <ActionButtons isSubmitting={loading} />
                        </div>

                        {/* Welcome Message */}
                        <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                            <h2 className="text-lg font-semibold text-green-800 mb-2">
                                🎉 Welcome to EthioLink!
                            </h2>
                            <p className="text-green-700">
                                Your business registration is complete! Now you can start uploading your products to showcase them to potential supporters and investors.
                            </p>
                        </div>

                        {/* --- 1. Listing Information Section --- */}
                        <Card
                            title="Product Information"
                            subtitle="Provide basic details about your product or service."
                        >
                            <div className="space-y-6">
                                {/* Listing Title */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                        Product Name
                                    </label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        value={title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                        placeholder="Enter your product name"
                                        autoComplete="off"
                                    />
                                </div>

                                {/* Short Tagline */}
                                <div>
                                    <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-1">
                                        Product Tagline
                                    </label>
                                    <input
                                        id="tagline"
                                        name="tagline"
                                        type="text"
                                        value={tagline}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                        maxLength="100"
                                        placeholder="Enter a catchy tagline for your product"
                                        autoComplete="off"
                                    />
                                    <p className="text-xs text-right text-gray-500 mt-1">
                                        Max 100 characters. {tagline.length}/100
                                    </p>
                                </div>
                                

                            </div>
                        </Card>

                        {/* --- 2. Product Story Section --- */}
                        <Card
                            title="Product Description"
                            subtitle="Tell potential supporters about your product and its benefits."
                        >
                            <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-1">
                                Detailed Description
                            </label>
                            <textarea
                                id="story"
                                name="story"
                                rows="6"
                                value={story}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none bg-white text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                placeholder="Describe your product in detail..."
                                autoComplete="off"
                            />
                        </Card>

                        {/* --- 3. Product Images Section (Unchanged, relies on correct Firebase setup) --- */}
                        <Card
                            title="Product Images"
                            subtitle="Upload high quality images of your product/service. Max 8 images."
                        >
                            {/* Image Upload Area */}
                            <label htmlFor="image-upload" className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-300 rounded-xl text-center bg-white hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 cursor-pointer focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    Drag & drop images here or click to upload
                                </p>
                                <p className="text-xs text-gray-500 mb-4">
                                    Supports JPG, PNG, GIF up to 10MB
                                </p>
                                <button type="button" className="px-6 py-2 text-sm font-medium text-white bg-orange-600 border border-orange-600 rounded-lg hover:bg-orange-700 shadow-sm transition-all duration-200">
                                    Browse Files
                                </button>
                                {/* 🔴 Hidden file input */}
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>

                            {/* Uploaded Images Preview */}
                            <div className="flex mt-6 space-x-4">
                                {imagePreviewUrl ? (
                                    <ImagePlaceholder url={imagePreviewUrl} altText={imageFile.name} />
                                ) : (
                                    <ImagePlaceholder url={null} altText="No Image Selected" />
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {imageFile ? `Selected: ${imageFile.name}` : "Please select one main product image."}
                            </p>
                        </Card>

                        {/* --- 4. Categorization & Tags Section (Unchanged) --- */}
                        <Card
                            title="Categorization & Tags"
                            subtitle="Improve listing discoverability by categorizing it and adding relevant tags."
                        >
                            {/* Primary Category Dropdown */}
                            <div className="mb-6">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                    Primary Category
                                </label>
                                <div className="relative">
                                    <select
                                        id="category"
                                        name="category"
                                        value={category}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 appearance-none rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                    >
                                        <option>Agriculture</option>
                                        <option>Technology</option>
                                        <option>Sustainability</option>
                                        <option>Hardware</option>
                                        <option>Other</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Relevant Tags */}
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Relevant Tags
                            </label>
                            <div className="flex flex-wrap items-center gap-2 border border-gray-300 p-2 rounded-lg bg-white min-h-[50px] focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 transition-all duration-200">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="flex items-center px-3 py-1 text-sm font-medium text-orange-700 bg-orange-100 rounded-full"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            className="ml-2 text-orange-500 hover:text-orange-700 transition duration-150"
                                            title="Remove tag"
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    placeholder="Add a tag and press Enter"
                                    onKeyDown={handleTagInput}
                                    className="p-1 text-sm focus:outline-none bg-transparent flex-1 min-w-[200px]"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Press Enter to add tags. Max 5 tags recommended.
                            </p>
                        </Card>

                        {/* --- 5. Listing Visibility Section (Unchanged) --- */}
                        <Card
                            title="Listing Visibility"
                            subtitle="Control when your listing becomes visible to potential backers."
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-base font-medium text-gray-700">
                                        Make listing publicly visible
                                    </span>
                                    <span className="text-xs text-gray-500 mt-1">
                                        Toggle to control if this listing is visible to potential backers.
                                    </span>
                                </div>

                                {/* Toggle Switch */}
                                <button
                                    type="button"
                                    onClick={() => setIsListingPublic(!isListingPublic)}
                                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                                        isListingPublic ? "bg-orange-500" : "bg-gray-300"
                                    }`}
                                    role="switch"
                                    aria-checked={isListingPublic}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                                            isListingPublic ? "translate-x-5" : "translate-x-0.5"
                                        }`}
                                    ></span>
                                </button>
                            </div>
                        </Card>

                        {/* --- Final Bottom Action Buttons --- */}
                        <div className="flex justify-end space-x-3 pb-8">
                            <ActionButtons isSubmitting={loading} />
                        </div>
                    </form>
                </main>
            </div>

            {/* --- Footer (Unchanged) --- */}
            <footer className="w-full flex items-center justify-between p-3 bg-white border-t border-gray-200 text-xs text-gray-500 mt-auto shadow-inner">
                <div className="flex space-x-4 ml-4">
                    <p className="hover:text-gray-700 cursor-pointer">Quick Links</p>
                    <p className="hover:text-gray-700 cursor-pointer">Legal</p>
                </div>
                <p className="mr-4">
                    Made with <span className="font-bold text-gray-700">Visily</span>
                </p>
            </footer>
        </div>
    );
};

export default CreatePage;