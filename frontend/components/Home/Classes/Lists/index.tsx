import { heroImg } from "@/assets/links";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface ClassListProps {
  classNumber: string;
}

const ClassList = ({ classNumber }: ClassListProps) => {

  const returnImage = (i: string) => {
    switch (i) {
      case "1-4": return heroImg.classes.CLASSES_1_4;
      case "5": return heroImg.classes.CLASSES_5;
      case "6": return heroImg.classes.CLASSES_6;
      case "7": return heroImg.classes.CLASSES_7;
      case "8": return heroImg.classes.CLASSES_8;
      case "9": return heroImg.classes.CLASSES_9;
      case "10": return heroImg.classes.CLASSES_10;
      case "11": return heroImg.classes.CLASSES_11;
      case "12": return heroImg.classes.CLASSES_12;
    }

  }

  return (
    <Link href={`/class?code=${classNumber}`} className="text-decoration-none text-black">
      <div className="class-card shadow-sm rounded">
        <div>
          <div className="image-wrapper">
            <img
              src={`${returnImage(classNumber)}?cache-control=max-age=31536000`}
              alt={`Class ${classNumber}`}
              className="class-image"
              loading="lazy"

            />
            <div className="overlay">
              <a href="#" className="link-icon">
                <FontAwesomeIcon icon="link" />
              </a>
            </div>
          </div>
          <div>
            <p className="text-start p-2 m-0">
              <b>Class {classNumber}</b>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ClassList;
