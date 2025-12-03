import ImageCard from "@/components/common/ImageCard";
import React, { useState } from "react";

const Home: React.FC = () => {
    const [prompt, setPrompt] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGenerateImage = async () => {
        if (!prompt.trim()) {
            alert("Please enter a prompt!");
            return;
        }

        setIsLoading(true);
        
        try {
            const resp = await fetch('/api/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: prompt
                })
            });

            const data = await resp.json();
            setImageUrl(data.message);
            console.log("Image generated successfully:", data.message);
            
        } catch (error) {
            console.error("Error generating image:", error);
            
            // Fallback to placeholder image
            const randomId = Math.floor(Math.random() * 1000);
            setImageUrl(`https://picsum.photos/600/400?random=${randomId}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageClick = (imagePath: string) => {
        window.open(imagePath, '_blank');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isLoading) {
            handleGenerateImage();
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-2">Image Generation App</h1>
                <p className="text-lg text-gray-700 mb-4">
                    Generate stunning images based on your prompts!
                </p>

                <div className="w-full max-w-md">
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
                        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        {isLoading ? "Loading..." : "Generate Image"}
                    </button>
                </div>

                {imageUrl && <ImageCard action={() => handleImageClick(imageUrl)} imageUrl={imageUrl} prompt={prompt} />}
            </div>
        </div>
    );
};

export default Home;
