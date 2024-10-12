import { welcomeGif } from "@/assets/links";
import Image from "next/image";
const LoadingUI = () => {
    return (
        <div className="loading-container">
            <Image
                src={`${welcomeGif}?cache-control=max-age=31536000`}
                alt=""
                loading="lazy"
            />
            <p className="rainbow-text text-center">Welcome to A to Z Classes</p>
        </div>
    );
};

export default LoadingUI