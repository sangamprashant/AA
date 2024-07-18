import { appName } from "../Strings";

const Partner = () => {
  const data = [
    {
      text: "Aligned with the CBSE curriculum",
      imgSrc: "class/partners/cbse.svg",
    },
    {
      text: "Aligned with the ICSE curriculum",
      imgSrc: "class/partners/icse.svg",
    },
  ];

  return (
    <div id="class-partner">
      <div className="d-flex justify-content-center">
        <div className="col-md-5">
          <div className="shadow p-4 rounded-4">
            <h5 className="text-center">
              {appName} students outperform even their seniors!
            </h5>
            <p>
              Our students consistently excel and often outperform their seniors
              in standardized tests and academic achievements.
            </p>
            <div>
              <img src="/class/list/verified.png" alt="Verified" height={50} />{" "}
              Certified by <code>{appName} Certification Authority</code>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {data.map((d, i) => {
          return (
            <div
              className="col-md-4 d-flex justify-content-center flex-column align-items-center"
              key={i}
            >
              <img src={d.imgSrc} alt={d.text} />
              <p>
                <i>
                  <sub>{d.text}</sub>
                </i>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Partner;
