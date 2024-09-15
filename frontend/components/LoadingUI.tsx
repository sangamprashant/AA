import Image from "next/image";


const LoadingUI = () => {
    return (
        <div className="loading-container">
            <Image
                src="./welcome.gif?cache-control=max-age=31536000"
                alt=""
                loading="lazy"
                // width="100%"
            />
            <p className="rainbow-text text-center">Welcome to A to Z Classes</p>
        </div>
    );
};

export default LoadingUI