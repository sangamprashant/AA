"use client"
import LoadingUI from "@/components/LoadingUI";
import { AppContext } from "@/context/AppProvider";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { config } from "../../../config";
import Loading from "../../Reuse/Loading";
import Section from "../../Reuse/Section";
import { ContentData } from "./HHH";
import { studyMaterials } from "@/assets/links";

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
  const [content, setContent] = useState<StudyMaterial[]>([...ContentData]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [filteredData, setFilteredData] = useState<StudyMaterial[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (content.length !== 0) {
      const filteredByCategory = selectedClass
        ? content.filter((item) => item.category === selectedClass)
        : content;
      const uniqueFilteredData = Array.from(
        new Map(filteredByCategory.map((item) => [item._id, item])).values()
      );
      setFilteredData(uniqueFilteredData);
    }
  }, [content, selectedClass]);

  async function fetchData() {
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
      const filteredContentData: SavedMaterial[] = ContentData.map(
        (item: StudyMaterial) => ({
          _id: item._id,
          title: item.title,
          imageUrl: item.imageUrl,
          category: item.category,
        })
      );
      const combinedMaterials = [...filteredMaterials, ...filteredContentData];
      const uniqueFilteredData = Array.from(
        new Map(combinedMaterials.map((item) => [item._id, item])).values()
      );
      saveToLocalStorage(uniqueFilteredData);
      setContent([...ContentData, ...data.materials,]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const saveToLocalStorage = (materials: SavedMaterial[]) => {
    localStorage.setItem("studyMaterials", JSON.stringify(materials));
  };

  return (
    <Section className="py-5">
      <h1 className="mt-1">Featured Study Materials</h1>
      <p>
        Explore our extensive collection of study materials for each class. From
        detailed notes to practice problems, we have everything you need to
        excel in your studies.
      </p>
      <ul>
        <li>
          <b>Notes:</b> Comprehensive notes covering all important topics.
        </li>
        <li>
          <b>Practice Problems:</b> A variety of problems to practice and master
          each topic.
        </li>
        <li>
          <b>Sample Papers:</b> Practice with sample papers to prepare for your
          exams.
        </li>
        <li>
          <b>Video Lectures:</b> Watch video lectures by expert educators to
          understand difficult concepts.
        </li>
      </ul>
      <p>
        Join us today and take the first step towards academic excellence. Our
        study materials are designed to help you achieve your academic goals
        with ease and confidence.
      </p>
      <h2>Classes</h2>
      <div className="scroll-content-container">
        <button
          className={`btn btn-study-materials ${`` === selectedClass ? "active" : ""
            }`}
          onClick={() => setSelectedClass("")}
        >
          <img
            src={`${studyMaterials["all"]}?cache-control=max-age=31536000`}
            alt="Show All"
            height="35"
          />{" "}
          Show All
        </button>
        {[...Array(12)].map((_, index) => (
          <button
            key={index}
            className={`btn btn-study-materials ${`class ${index + 1}` === selectedClass ? "active" : ""
              }`}
            onClick={() => setSelectedClass(`class ${index + 1}`)}
          >
            <img
              src={`${studyMaterials[(index+1).toString()]}?cache-control=max-age=31536000`}
              alt={`Class ${index + 1}`}
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
  const appContext = useContext(AppContext);
  if (!appContext) {
    return <LoadingUI />;
  }

  const { classesUnlocked } = appContext;

  return (
    <Link href={`/free-study-material/access?code=${item._id}`} className="card-content-explore">
      <img
        src={`${item?.imageUrl}?cache-control=max-age=31536000`}
        className="card-img-top-content-explore"
        alt={item.title}
      />
      <div className="card-body">
        <p className="m-0">
          <strong>{item.title}</strong>
        </p>
      </div>
      {!item.free && (
        <div className="content-explore-offer">
          <p className={`m-0 ${item.free ? "free" : "email"}`}>
            <span className="icon">
              {item.free ? (
                <StarIcon style={{ fontSize: "15px" }} />
              ) : !classesUnlocked.includes(Number(item.category.split(' ')[1])) ? (
                <LockOutlinedIcon style={{ fontSize: "15px" }} />
              ) : (
                <LockOpenOutlinedIcon style={{ fontSize: "15px" }} />
              )}
            </span>{" "}
            {!classesUnlocked.includes(Number(item.category.split(' ')[1])) ? "Locked" : "Unlocked"}
          </p>
        </div>
      )}
    </Link>
  );
};