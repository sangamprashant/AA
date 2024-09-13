import Link from "next/link";
import React, { useEffect, useState } from "react";

interface ContentSideProps {
  category: string;
}

interface StudyMaterial {
  _id: string;
  title: string;
  pdfUrl: string;
  imageUrl: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  unlikes: number;
}

// Function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const ContentSide: React.FC<ContentSideProps> = ({ category }) => {
  const storedMaterials = localStorage.getItem("studyMaterials");
  const initialMaterials: StudyMaterial[] = storedMaterials
    ? JSON.parse(storedMaterials)
    : [];
  const [studyMaterials, setStudyMaterials] =
    useState<StudyMaterial[]>(initialMaterials);

  useEffect(() => {
    const filteredMaterials = initialMaterials.filter(
      (material) => material.category === category
    );

    if (filteredMaterials.length > 0) {
      const shuffledMaterials = shuffleArray(filteredMaterials);
      setStudyMaterials(shuffledMaterials);
    }
  }, [category]);

  return (
    <div className="side-content">
      <header>
        <h4 className="m-0">Recommended Contents</h4>
      </header>
      <article>
        {studyMaterials.length > 0 ? (
          studyMaterials.map((material) => (
            <Link
              href={`/free-study-material/${material._id}`}
              key={material._id}
              className="d-flex gap-3 material-item align-items-center"
            >
              <img
                src={material.imageUrl}
                alt={material.title}
                height={40}
                width={40}
                className="rounded-circle object-fit-cover"
              />
              <p>{material.title}</p>
            </Link>
          ))
        ) : (
          <p>No materials found for this category.</p>
        )}
      </article>
    </div>
  );
};

export default ContentSide;
