"use client"
import LoadingUI from '@/components/LoadingUI';
import { AppContext } from '@/context/AppProvider';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import { useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { config } from '../../../config';
import Footer from '../../Footer';
import Loading from '../../Reuse/Loading';
import NoData from '../../Reuse/NoData';
import Section from '../../Reuse/Section';
import AccessModal from './AccessModal';
import ContentSide from './ContentSide';
import { ContentData } from './HHH';
import ClientOnlyWrapper from './ClientOnlyWrapper';

const ContentOpen: React.FC = () => {
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
  const [showAccessModal, setShowAccessModal] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const searchParams = useSearchParams();
  const appContext = useContext(AppContext);

  if (!appContext) {
    return <LoadingUI />;
  }
  const { classesUnlocked, handleLock } = appContext;

  useEffect(() => {
    const classIdFromParams = searchParams.get('code') || '';
    setId(classIdFromParams);
  }, [searchParams]);

  useEffect(() => {
    if (id && id.length === 24) {
      fetchContentFromServer();
    } else {
      fetchContentFromLocal();
    }

    if (window !== undefined) {
      window.scrollTo(0, 0)
    }

  }, [id]);

  const fetchContentFromLocal = () => {
    if (id) {
      const localData = ContentData.find((item) => item._id === id) || null;
      setContent(localData);
    }
  };

  const handleSave = async () => {
    const savedItems = JSON.parse(localStorage.getItem('savedItems') || '[]');

    if (isSaved) {
      const updatedItems = savedItems.filter((item: string) => item !== id);
      localStorage.setItem('savedItems', JSON.stringify(updatedItems));
    } else {
      savedItems.push(id);
      localStorage.setItem('savedItems', JSON.stringify(savedItems));
    }

    setIsSaved(!isSaved);
  };

  useEffect(() => {
    if (content && !content.free && !classesUnlocked.includes(Number(content.category.split(' ')[1]))) {
      handleLock(true);
      setShowAccessModal(true);
    } else {
      handleLock(false);
    }
  }, [content, classesUnlocked]);

  const handleShare = async () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy link:', error);
        alert('Failed to copy link.');
      }
    } else {
      alert('Clipboard feature is not supported in this environment.');
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
    <ClientOnlyWrapper>
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
            {content.pdfUrl && (
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(
                  content.pdfUrl
                )}&embedded=true`}
                width="100%"
                height={500}
                title="PDF Viewer"
              ></iframe>
            )}
            <div className="mb-4 mt-2 d-flex gap-3 align-items-center">
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
    </ClientOnlyWrapper>
  );

  async function fetchContentFromServer() {
    try {
      setLoading(true);
      const response = await fetch(`${config.SERVER}/study-materials/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setContent(data.material);
      const savedItems = JSON.parse(localStorage.getItem("savedItems") || "[]");
      setIsSaved(savedItems.includes(id));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }
};

export default ContentOpen;
