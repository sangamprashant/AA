import React, { useEffect, useLayoutEffect, useState } from "react";
import Section from "../../Reuse/Section";
import "./contentExplore.css";
import { Link } from "react-router-dom";
import { config } from "../../../config";

interface StudyMaterial {
  _id: string;
  title: string;
  pdfUrl: string;
  imageUrl: string;
  category: string;
  free: boolean;
}

interface SavedMaterial {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
}

const ContentExplore: React.FC = () => {
  const [content, setContent] = useState<StudyMaterial[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [filteredData, setFilteredData] = useState<StudyMaterial[]>([]);

  useLayoutEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (content.length !== 0) {
      setFilteredData(
        selectedClass
          ? content.filter((item) => item.category === selectedClass)
          : content
      );
    }
  }, [content, selectedClass]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${config.SERVER}/study-materials`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const filteredMaterials: SavedMaterial[] = data.materials.map(
        (material: StudyMaterial) => ({
          _id: material._id,
          title: material.title,
          imageUrl: material.imageUrl,
          category: material.category,
        })
      );
      saveToLocalStorage(filteredMaterials);
      setContent(data.materials);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const saveToLocalStorage = (materials: SavedMaterial[]) => {
    localStorage.setItem("studyMaterials", JSON.stringify(materials));
  };

  if (content.length === 0) {
    return null;
  }

  return (
    <Section className="py-5">
      <h1>Study Materials</h1>
      <h2>Classes</h2>
      <div className="scroll-content-container">
        <button
          className={`btn btn-study-materials ${
            `` === selectedClass ? "active" : ""
          }`}
          onClick={() => setSelectedClass("")}
        >
          <img src={`/home/study-materials/icon/all.png`} alt="" height="35" />{" "}
          Show All
        </button>
        {[...Array(12)].map((_, index) => (
          <button
            key={index}
            className={`btn btn-study-materials ${
              `class ${index + 1}` === selectedClass ? "active" : ""
            }`}
            onClick={() => setSelectedClass(`class ${index + 1}`)}
          >
            <img
              src={`/home/study-materials/icon/${index + 1}.png`}
              alt=""
              height="35"
            />{" "}
            Class {index + 1}
          </button>
        ))}
      </div>
      <h2 className="mt-4">Content</h2>
      <div className="scroll-content-container">
        {filteredData.map((item) => (
          <CardContainer key={item._id} item={item} />
        ))}
      </div>
    </Section>
  );
};

export default ContentExplore;

interface CardContainerProps {
  item: StudyMaterial;
}

const CardContainer: React.FC<CardContainerProps> = ({ item }) => {
  return (
    <Link to={`/study-material/${item._id}`} className="card-content-explore">
      <img
        src={item.imageUrl}
        className="card-img-top-content-explore"
        alt={item.title}
      />
      <div className="card-body">
        <p className="m-0">
          <strong>{item.title}</strong>
        </p>
      </div>
      <div className="content-explore-offer">
        <p className={`m-0 ${item.free ? "free" : "email"}`}>
          {item.free ? "Free" : "Email"}
        </p>
      </div>
    </Link>
  );
};
