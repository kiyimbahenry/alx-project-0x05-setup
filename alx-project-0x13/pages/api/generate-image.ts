// pages/api/generate-image.ts - SIMPLIFIED VERSION
import { HEIGHT, WIDTH } from "@/constants";
import { RequestProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        const { prompt }: RequestProps = request.body;
        
        // Generate a unique ID for the prompt
        const promptHash = Buffer.from(prompt).toString('base64').substring(0, 10);
        
        // Use a placeholder service that always works
        const imageUrl = `https://picsum.photos/${WIDTH}/${HEIGHT}?random=${Date.now()}`;
        
        // Alternative placeholder with text
        // const imageUrl = `https://via.placeholder.com/${WIDTH}x${HEIGHT}/4a90e2/ffffff?text=${encodeURIComponent(prompt.substring(0, 30))}`;
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return response.status(200).json({
            message: imageUrl,
            prompt: prompt,
            generated_at: new Date().toISOString(),
            note: "Mock image - replace with real API key for actual generation"
        });
        
    } catch (error) {
        console.error("Error:", error);
        return response.status(200).json({
            message: `https://via.placeholder.com/512x512/cccccc/333333?text=Error+${Date.now()}`,
            error: "Mock error for testing"
        });
    }
}

export default handler
