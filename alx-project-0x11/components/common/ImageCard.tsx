import { GeneratedImageProps } from "@/interfaces";

const ImageCard: React.FC<GeneratedImageProps> = ({ 
    imageUrl, 
    prompt, 
    width, 
    height,
    action 
}) => {
    return (
        <div 
            onClick={() => action(imageUrl)} 
            className={`${width || 'w-full'} ${height || 'h-auto'} border rounded-lg overflow-hidden hover:cursor-pointer hover:shadow-lg transition-shadow duration-200`}
        >
            <img 
                src={imageUrl} 
                alt={prompt} 
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default ImageCard;
