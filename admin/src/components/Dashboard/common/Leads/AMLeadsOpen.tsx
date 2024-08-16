import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { config } from "../../../../config";
import { Booking } from "../../../../types/booking";
import { AuthContext } from "../../../context/AuthProvider";
import Spinner from "../Spinner";

const AMLeadsOpen = () => {
  const [data, setData] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();

  const appContext = useContext(AuthContext);
  if (!appContext) {
    return null;
  }

  const { token, user } = appContext;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.SERVER}/auth/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString: Date) =>
    new Date(isoString).toLocaleDateString();

  if (loading) return <Spinner />;
  if (!data) return <div className="text-center mt-5">No data available</div>;

  return (
    <>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5>LEADS Details</h5>
        <div className="d-flex gap-2">
          <Link to={`/${user?.role}/leads-bucket`} className="btn btn-danger">
            Go Back
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Basic Information</h5>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Name:</strong> {data.firstName} {data.lastName}
              </div>
              <div className="col-md-6">
                <strong>Email:</strong> {data.email}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Phone Number:</strong> {data.phoneNumber}
              </div>
              <div className="col-md-6">
                <strong>Country:</strong> {data.country}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Selected Class:</strong> {data.selectedClass}
                {data.time ? `at ${data.time}` : ""}
              </div>
              <div className="col-md-6">
                <strong>Current State:</strong> {data.state}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Assigned Employee:</strong> {data.assignedEmployee.name}
              </div>
              <div className="col-md-6">
                <strong>Allocation Date:</strong>{" "}
                {formatDate(data.allocationDate)}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Created At:</strong> {formatDate(data.createdAt)}
              </div>
              <div className="col-md-6">
                <strong>Last Updated:</strong> {formatDate(data.updatedAt)}
              </div>
            </div>

            <hr />

            <h5 className="card-title">State History</h5>
            <ul className="list-group mb-3">
              {data.stateHistory?.map((history, index) => (
                <li key={index} className="list-group-item">
                  <strong>{history.state}</strong> - {history.comment}
                  <span className="text-muted">
                    (Updated by: {history.updatedBy} on{" "}
                    {formatDate(history.updatedAt)})
                  </span>
                </li>
              ))}
            </ul>

            <hr />

            <h5 className="card-title">Files</h5>
            <div className="mb-3">
              <strong>Documents:</strong>
              <ul className="list-group">
                {data.files?.documents?.map((doc, index) => (
                  <li key={index} className="list-group-item">
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                      {doc.description}
                    </a>
                    <span className="text-muted">
                      Uploaded on: {formatDate(doc.uploadDate)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Receipts:</strong>
              <ul className="list-group">
                {data.files?.receipts?.map((receipt, index) => (
                  <li key={index} className="list-group-item">
                    <a
                      href={receipt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {receipt.description}
                    </a>
                    <span className="text-muted">
                      Uploaded on: {formatDate(receipt.uploadDate)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AMLeadsOpen;
