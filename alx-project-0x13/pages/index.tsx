import ImageCard from "@/components/common/ImageCard";
import useFetchData from "@/hooks/useFetchData";
import { ImageProps } from "@/interfaces";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
    const [prompt, setPrompt] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    
    const { 
        isLoading, 
        responseData, 
        generatedImages, 
        fetchData,
        error
    } = useFetchData<any, { prompt: string }>();

    const handleGenerateImage = () => {
        if (!prompt.trim()) {
            alert("Please enter a prompt!");
            return;
        }
        fetchData('/api/generate-image', { prompt });
    };

    useEffect(() => {
        if (!isLoading && responseData?.message) {
            setImageUrl(responseData.message);
        }
    }, [isLoading, responseData]);

    const handleImageClick = (imagePath: string) => {
        window.open(imagePath, '_blank');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isLoading) {
            handleGenerateImage();
        }
    };

    const handleThumbnailClick = (imageUrl: string) => {
        setImageUrl(imageUrl);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <div className="flex flex-col items-center w-full max-w-6xl">
                <h1 className="text-4xl font-bold mb-2">Image Generation App</h1>
                <p className="text-lg text-gray-700 mb-4">
                    Generate stunning images based on your prompts!
                </p>

                <div className="w-full max-w-md mb-8">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter your prompt here..."
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleGenerateImage}
                        disabled={isLoading}
                        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                    >
                        {isLoading ? "Loading..." : "Generate Image"}
                    </button>
                </div>

                {imageUrl && (
                    <div className="mb-8 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-center">Current Image</h2>
                        <ImageCard 
                            action={() => handleImageClick(imageUrl)} 
                            imageUrl={imageUrl} 
                            prompt={prompt} 
                        />
                    </div>
                )}

                {generatedImages.length > 0 && (
                    <div className="w-full mt-8">
                        <h3 className="text-xl font-bold text-center mb-4">
                            Generated Images ({generatedImages.length})
                        </h3>
                        <div className="border rounded-lg p-4 bg-white">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-2">
                                {generatedImages.map((image: ImageProps, index: number) => (
                                    <div 
                                        key={index} 
                                        className={`cursor-pointer border-2 ${image.imageUrl === imageUrl ? 'border-blue-500' : 'border-transparent'} rounded-lg overflow-hidden`}
                                        onClick={() => handleThumbnailClick(image.imageUrl)}
                                    >
                                        <ImageCard
                                            action={() => handleImageClick(image.imageUrl)}
                                            imageUrl={image.imageUrl}
                                            prompt={image.prompt}
                                            width="w-full"
                                            height="h-40"
                                        />
                                        <p className="text-xs text-gray-600 p-2 truncate" title={image.prompt}>
                                            {image.prompt.substring(0, 30)}{image.prompt.length > 30 ? '...' : ''}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 mt-4 text-center">
                                Click on thumbnails to view them in the main area above. Click images to open in new tab.
                            </p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600">Error: {error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
