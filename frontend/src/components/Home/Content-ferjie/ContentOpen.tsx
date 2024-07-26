import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingUI } from "../../../App";
import { AppContext } from "../../../AppProvider";
import { config } from "../../../config";
import Footer from "../../Footer";
import Loading from "../../Reuse/Loading";
import NoData from "../../Reuse/NoData";
import Section from "../../Reuse/Section";
import AccessModal from "./AccessModal";
import ContentSide from "./ContentSide";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
// import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
// import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

const ContentOpen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<{
    title: string;
    pdfUrl: string;
    imageUrl: string;
    content: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    likes: number;
    unlikes: number;
    free: boolean;
  } | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  //   const [hasLiked, setHasLiked] = useState<boolean>(false);
  //   const [hasUnliked, setHasUnliked] = useState<boolean>(false);

  const [showAccessModal, setShowAccessModal] = useState<boolean>(false);
  const appContext = useContext(AppContext);
  if (!appContext) {
    return <LoadingUI />;
  }

  const { locked } = appContext;

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    const fetchContent = async () => {
      try {
        const response = await fetch(`${config.SERVER}/study-materials/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setContent(data.material);

        // Check local storage for saved and liked items
        const savedItems = JSON.parse(
          localStorage.getItem("savedItems") || "[]"
        );
        setIsSaved(savedItems.includes(id));

        // const likedItems = JSON.parse(
        //   localStorage.getItem("likedItems") || "[]"
        // );
        // setHasLiked(likedItems.includes(id));

        // const unlikedItems = JSON.parse(
        //   localStorage.getItem("unlikedItems") || "[]"
        // );
        // setHasUnliked(unlikedItems.includes(id));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  const handleSave = async () => {
    const savedItems = JSON.parse(localStorage.getItem("savedItems") || "[]");

    if (isSaved) {
      const updatedItems = savedItems.filter((item: string) => item !== id);
      localStorage.setItem("savedItems", JSON.stringify(updatedItems));
    } else {
      savedItems.push(id);
      localStorage.setItem("savedItems", JSON.stringify(savedItems));
    }

    setIsSaved(!isSaved);
  };

  useEffect(() => {
    if (locked && content && !content.free) {
      setShowAccessModal(true);
    }
  }, [locked, content]);

  const handleShare = async () => {
    try {
      // Copy current URL to clipboard
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy link:", error);
      alert("Failed to copy link.");
    }
  };

  if (loading) {
    return (
      <div className="">
        <Loading />
      </div>
    );
  }

  if (!content) {
    return (
      <NoData
        heading="No Study Material Found"
        content="We couldn’t find any study materials for the provided ID. Please check the ID and try again."
      />
    );
  }

  return (
    <>
      {showAccessModal && <AccessModal />}
      <Section className="py-3">
        <div className="row">
          <div className="col-md-8">
            <h1>{content.title}</h1>
            <div
              className="my-3"
              dangerouslySetInnerHTML={{
                __html: content.content,
              }}
            />
            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(
                content.pdfUrl
              )}&embedded=true`}
              width="100%"
              height={500}
              title="PDF Viewer"
            ></iframe>
            <div className="mb-4 mt-2 d-flex gap-3 align-items-center">
              {/* <div className="content-open-options d-flex">
            <button className="content-open-options-like" onClick={handleLike}>
              <span>{hasLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}</span>{" "}
              {content.likes}
            </button>
            <span className="divider" />
            <button
              className="content-open-options-like"
              onClick={handleUnlike}
            >
              <span>
                {hasUnliked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
              </span>{" "}
              {content.unlikes}
            </button>
          </div> */}

              <button className="content-open-options" onClick={handleShare}>
                <ShareIcon /> Share
              </button>
              <button className="content-open-options" onClick={handleSave}>
                {isSaved ? (
                  <>
                    <BookmarkIcon /> Unsave
                  </>
                ) : (
                  <>
                    <BookmarkBorderIcon /> Save
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <ContentSide category={content.category} />
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};

export default ContentOpen;
