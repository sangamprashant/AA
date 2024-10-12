import Section from "../../../Reuse/Section";
import MentorsList from "./MentorsList";

const mentorsData = [
  "Highly qualified and experienced Maths tutors",
  "Passionate about helping students achieve academic goals",
  "In-depth understanding of Maths concepts",
  "Innovative teaching methods to make learning effective and enjoyable",
  "Personalized attention to cater to individual learning styles",
  "Emphasis on developing strong problem-solving skills",
  "Dedicated to helping students excel in Maths",
]

const Mentors = () => {
  return (
    <Section id="mentor" className="py-5">
      <div className="row align-items-center m-0">
        <div
          className="col-md-5">
          <header>
            <h1
              className="mentor-header">
              Meet Your Mentors
            </h1>
          </header>
          <article
            className="mentor-content mt-2">
            <ul className="list-unstyled">
              {mentorsData.map((item, index) => (
                <li key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
        <div
          className="col-md-7 mt-2">
          <MentorsList />
        </div>
      </div>
    </Section>
  );
};

export default Mentors;
