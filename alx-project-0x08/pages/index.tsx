import ImageCard from "@/components/common/ImageCard";
import { ImageProps } from "@/interfaces";
import { useState } from "react";

const Home: React.FC = () => {
    const [prompt, setPrompt] = useState<string>("");
    const [generatedImages, setGeneratedImages] = useState<ImageProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGenerateImage = async () => {
        if (!prompt.trim()) {
            alert("Please enter a prompt!");
            return;
        }

        console.log("Generating Images...");
        setIsLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            // For demonstration, using a placeholder image service
            // In a real app, you'd call an actual image generation API
            const randomId = Math.floor(Math.random() * 1000);
            const newImage: ImageProps = {
                imageUrl: `https://picsum.photos/400/300?random=${randomId}`,
                prompt: prompt,
            };

            // Add the new image to the beginning of the array
            setGeneratedImages(prev => [newImage, ...prev]);
            setPrompt(""); // Clear the input
            setIsLoading(false);
        }, 1500);
    };

    const handleImageClick = (imageUrl: string) => {
        console.log("Image clicked:", imageUrl);
        // You can add functionality like opening the image in a modal
        window.open(imageUrl, '_blank');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleGenerateImage();
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-4xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">Image Generation App</h1>
                    <p className="text-lg text-gray-700 mb-4">
                        Generate stunning images based on your prompts!
                    </p>
                </div>

                {/* Input Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter your prompt here (e.g., 'A sunset over mountains')..."
                            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleGenerateImage}
                            disabled={isLoading}
                            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </div>
                            ) : "Generate Image"}
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Press Enter to generate or click the button
                    </p>
                </div>

                {/* Generated Images Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Generated Images ({generatedImages.length})</h2>
                    
                    {generatedImages.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg shadow">
                            <p className="text-gray-500">No images generated yet. Enter a prompt above to get started!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {generatedImages.map((image, index) => (
                                <ImageCard
                                    key={index}
                                    imageUrl={image.imageUrl}
                                    prompt={image.prompt}
                                    action={handleImageClick}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Stats Section */}
                {generatedImages.length > 0 && (
                    <div className="mt-8 bg-white p-4 rounded-lg shadow">
                        <h3 className="font-semibold text-lg mb-2">Statistics</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold">{generatedImages.length}</p>
                                <p className="text-sm text-gray-600">Images Generated</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">
                                    {generatedImages.reduce((acc, img) => acc + img.prompt.length, 0)}
                                </p>
                                <p className="text-sm text-gray-600">Total Characters</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">
                                    {new Set(generatedImages.map(img => img.prompt)).size}
                                </p>
                                <p className="text-sm text-gray-600">Unique Prompts</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">
                                    {isLoading ? "In Progress" : "Ready"}
                                </p>
                                <p className="text-sm text-gray-600">Status</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
