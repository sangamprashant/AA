import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../../../config";
import Section from "../../Reuse/Section";
import Footer from "../../Footer";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
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
  } | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
//   const [hasLiked, setHasLiked] = useState<boolean>(false);
//   const [hasUnliked, setHasUnliked] = useState<boolean>(false);

  useEffect(() => {
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

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Section className="py-3">
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
      </Section>
      <Footer />
    </>
  );
};

export default ContentOpen;
