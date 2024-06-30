import { Card } from "antd";

const Transctions = () => {
  return (
    <div className="col-md-8">
      <Card
        style={{
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          background: "#f9f9f9",
        }}
      >
        <h5>Enterprise Clients</h5>
        <p> 15 new acquired this month</p>
      </Card>
    </div>
  );
};

export default Transctions;
