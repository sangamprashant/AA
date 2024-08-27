import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { config } from "../../../../config";
import { AuthContext } from "../../../context/AuthProvider";

interface TeachingNoteData {
  _id: string;
  title: string;
  pdfUrl: string;
  subject: {
    title: string;
  };
}

const TeachingNotesOpen = () => {
  const globles = useContext(AuthContext);
  if (!globles) return null;
  const { token, user } = globles;
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<TeachingNoteData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pdfLoading, setPdfLoading] = useState<boolean>(true); // New state for PDF loading

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `${config.SERVER}/teaching-notes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNote(response.data.note);
      } catch (error) {
        console.error("Failed to fetch note:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, token]);

  const handleIframeLoad = () => {
    setPdfLoading(false);
  };

  return (
    <>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5 className="text-uppercase">
          Teaching Notes {note?.title && `:${note?.title}`}
        </h5>
        <div className="d-flex gap-2">
          <Link to={`/${user?.role}/teaching-notes`}>Go Back</Link>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      {note && (
        <div
          className="note-details"
          style={{ position: "relative", height: "100%" }}
        >
          {pdfLoading && <p>Loading PDF...</p>}
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(
              note.pdfUrl
            )}&embedded=true`}
            width="100%"
            onLoad={handleIframeLoad}
            style={{
              height: "80vh",
              position: "absolute",
              top: 0,
              left: 0,
              border: "none",
              // display: pdfLoading ? "none" : "block",
            }}
          />
        </div>
      )}
    </>
  );
};

export default TeachingNotesOpen;
