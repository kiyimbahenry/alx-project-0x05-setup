// components/common/ImageCard.tsx
import { GeneratedImageProps } from "@/interfaces";

const ImageCard: React.FC<GeneratedImageProps> = ({ 
    imageUrl, 
    prompt, 
    width = "w-full", 
    height = "h-auto",
    action 
}) => {
    return (
        <div 
            onClick={() => action(imageUrl)} 
            className={`${width} ${height} border rounded-lg overflow-hidden hover:cursor-pointer hover:shadow-lg transition-shadow duration-200`}
        >
            <img 
                src={imageUrl} 
                alt={prompt} 
                className="w-full h-full object-cover"
                onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/400/cccccc/333333?text=Image+Error";
                }}
            />
        </div>
    );
};

export default ImageCard;
