import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
// import Image from "next/image";
import Link from "next/link";

interface ClassListProps {
  classNumber: string;
}

const ClassList = ({ classNumber }: ClassListProps) => {
  return (
    <Link href={`/class?code=${classNumber}`} className=" text-decoration-none">
      <motion.div className="class-card">
        <motion.div
          className="card"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="image-wrapper">
            <img
              src={`classes/${classNumber}.png?cache-control=max-age=31536000`}
              alt={`Class ${classNumber}`}
              className="class-image"

            />
            <div className="overlay">
              <a href="#" className="link-icon">
                <FontAwesomeIcon icon="link" />
              </a>
            </div>
          </div>
          <motion.div
            className="p-2"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-start p-2 m-0">
              <b>Class {classNumber}</b>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default ClassList;
