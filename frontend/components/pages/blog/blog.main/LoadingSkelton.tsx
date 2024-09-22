
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const SkeletonLoader = () => (
    <div className="col-md-4 mb-4">
        <div className="card shadow-sm border-0">
            <div
                className="card-img-top bg-body-secondary"
                style={{ aspectRatio: "1/1", objectFit: "cover" }}
            ></div>
            <div className="card-body">
                <h5 className="bg-body-secondary" style={{ height: "20px", width: "70%" }}></h5>
                <p className="bg-body-secondary" style={{ height: "15px", width: "100%", marginTop: "10px" }}></p>
                <p className="bg-body-secondary" style={{ height: "15px", width: "80%" }}></p>
                <div className="text-end mt-2">
                    <button className="btn btn-secondary disabled">
                        Loading <NavigateNextIcon />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default SkeletonLoader