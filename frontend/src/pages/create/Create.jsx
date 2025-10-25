import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// 🟢 FIREBASE & HOOKS IMPORTS
import { useAuth } from '../../Component/context/AuthContext';
import { 
    db, 
    storage, 
    collection, 
    addDoc, 
    ref, 
    uploadBytes, 
    getDownloadURL 
} from '../../utility/fierbase'; // Assuming the corrected imports are in here

// Main App component that renders the full Edit Listing interface.
const CreatePage = () => {
    const navigate = useNavigate();
    const { currentUser, userProfile } = useAuth();

    // ✅ 1. Updated State: Set all fields to empty strings for a real 'Create' form
    const [listingData, setListingData] = useState({
        title: "",    // Changed from default text to empty string
        tagline: "",  // Changed from default text to empty string
        story: "",    // Changed from default text to empty string
        category: "Agriculture", // Keep a default category
        tags: [], // Changed from default tags to an empty array
    });
    
    // 2. State for image file and upload/submission status (No changes needed)
    const [imageFile, setImageFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // State for the Listing Visibility toggle switch
    const [isListingPublic, setIsListingPublic] = useState(true);

    // Function to update input text fields (No changes needed here)
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setListingData(prev => ({ ...prev, [id]: value }));
    };

    // Function to handle image file selection (No changes needed here)
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
            if (!listingData.tags.includes(newTag)) {
                setListingData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
            }
            e.target.value = ''; // Clear input field
        }
    };

    // Function to remove a tag
    const handleRemoveTag = (tagToRemove) => {
        setListingData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };


    // 🚀 THE CORE SUBMISSION LOGIC (No changes needed here)
    const handleSubmitListing = async (e) => {
        e.preventDefault();
        setError(null);

        // Basic validation
        if (!listingData.title || !listingData.tagline || !listingData.story || !imageFile) {
            setError("Please fill in the Title, Tagline, Story, and upload a Product Image.");
            return;
        }

        if (!currentUser) {
             setError("You must be logged in to create a listing.");
             return;
        }

        setLoading(true);

        try {
            // --- 1. Upload Image to Firebase Storage ---
            const fileExtension = imageFile.name.split('.').pop();
            const storagePath = `products/${currentUser.uid}/${Date.now()}.${fileExtension}`;
            const imageRef = ref(storage, storagePath);

            const uploadResult = await uploadBytes(imageRef, imageFile);
            const imageUrl = await getDownloadURL(uploadResult.ref);
            
            console.log("Image uploaded successfully:", imageUrl);


            // --- 2. Prepare Data for Firestore ---
            const newListing = {
                ...listingData,
                imageUrl: imageUrl, // Add the generated URL
                ownerId: currentUser.uid,
                ownerRole: userProfile?.userRole || 'Entrepreneur',
                status: isListingPublic ? 'Public' : 'Draft',
                createdAt: new Date(),
            };

            // --- 3. Save Data to Firestore ---
            const docRef = await addDoc(collection(db, "products"), newListing);
            console.log("Document written with ID: ", docRef.id);

            // --- 4. Redirect on Success ---
            alert("Listing successfully submitted!");
            navigate('/dashboard');

        } catch (err) {
            console.error("Error creating listing:", err);
            setError(`Failed to create listing: ${err.message}. Check console for details and ensure Firebase Storage is initialized correctly.`);
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
                className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-150 text-sm font-medium"
            >
                Preview
            </button>
            <button 
                type="button" 
                className="flex items-center px-4 py-2 text-orange-600 bg-orange-50 border border-orange-600 rounded-lg hover:bg-orange-100 transition duration-150 text-sm font-medium"
            >
                Save Draft
            </button>
            <button 
                type="submit" 
                className="flex items-center px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 shadow-md transition duration-150 text-sm font-medium disabled:opacity-50"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Listing'}
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
                        onClick={() => navigate('/dashboard')}
                    >
                        ← Back to Dashboard
                    </span>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Create/Edit Listing
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
                            <span className="text-sm text-gray-500 cursor-pointer" onClick={() => navigate('/dashboard')}>
                                ← Back to Dashboard
                            </span>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Create/Edit Listing
                            </h1>
                            <ActionButtons isSubmitting={loading} />
                        </div>

                        {/* --- 1. Listing Information Section --- */}
                        <Card
                            title="Listing Information"
                            subtitle="Provide basic details about your product or service."
                        >
                            <div className="space-y-6">
                                {/* Listing Title */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                        Listing Title
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={listingData.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-orange-500 focus:border-orange-500"
                                    />
                                </div>

                                {/* Short Tagline */}
                                <div>
                                    <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-1">
                                        Short Tagline
                                    </label>
                                    <input
                                        id="tagline"
                                        type="text"
                                        value={listingData.tagline}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-orange-500 focus:border-orange-500"
                                        maxLength="100"
                                    />
                                    <p className="text-xs text-right text-gray-500 mt-1">
                                        Max 100 characters. {listingData.tagline.length}/100
                                    </p>
                                </div>
                                
                                {/* URL Slug (Unchanged) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Custom URL Slug
                                    </label>
                                    <div className="flex rounded-lg shadow-sm">
                                        <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                                            www.visily.com/
                                        </span>
                                        <input
                                            type="text"
                                            defaultValue="innovative-solar-pump-approved"
                                            readOnly
                                            className="flex-1 block w-full p-3 border border-gray-300 rounded-none rounded-r-lg bg-gray-50 text-gray-800 focus:ring-orange-500 focus:border-orange-500"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Unique identifier for your listing URL (Generated automatically).
                                    </p>
                                </div>

                            </div>
                        </Card>

                        {/* --- 2. Product Story Section --- */}
                        <Card
                            title="Your Product Story"
                            subtitle="Craft a compelling narrative to engage potential backers."
                        >
                            <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-1">
                                Detailed Description
                            </label>
                            <textarea
                                id="story" // ✅ Ensure this ID matches the state key
                                rows="6"
                                value={listingData.story}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none bg-gray-50 text-gray-800 focus:ring-orange-500 focus:border-orange-500"
                            />
                        </Card>

                        {/* --- 3. Product Images Section (Unchanged, relies on correct Firebase setup) --- */}
                        <Card
                            title="Product Images"
                            subtitle="Upload high quality images of your product/service. Max 8 images."
                        >
                            {/* Image Upload Area */}
                            <label htmlFor="image-upload" className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-300 rounded-xl text-center bg-gray-50 hover:border-orange-400 transition duration-150 cursor-pointer">
                                {/* SVG Icon here... */}
                                <p className="mt-2 text-sm text-gray-600">
                                    Drag & drop images here or click to upload
                                </p>
                                <button type="button" className="mt-3 px-4 py-2 text-sm font-medium text-orange-600 bg-white border border-orange-300 rounded-lg hover:bg-orange-50 shadow-sm">
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
                                        value={listingData.category}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 appearance-none rounded-lg bg-gray-50 text-gray-800 focus:ring-orange-500 focus:border-orange-500"
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
                            <div className="flex flex-wrap items-center gap-2 border border-gray-300 p-2 rounded-lg bg-gray-50 min-h-[50px]">
                                {listingData.tags.map((tag) => (
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
                                    className="p-1 text-sm focus:outline-none bg-transparent"
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