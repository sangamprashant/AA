import Section from "../../Reuse/Section";
import ClassList from "./Lists";

const Classes = () => {
  const classNumbers = ["1-4", "5", "6", "7", "8", "9", "10", "11", "12"];

  return (
    <Section className="py-5 banner-show">
      <div className="classes-container">
        <h2>
          Classes
        </h2>
        <p>
          Find the best teacher for academic excellence
        </p>
        <div className="classes-grid">
          {classNumbers.map((classNumber, index) => (
            <div>
              <ClassList classNumber={classNumber} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Classes;
