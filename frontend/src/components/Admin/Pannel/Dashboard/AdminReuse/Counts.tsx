import { Card, Typography } from "antd";

const { Title, Text } = Typography;

interface CountsProps {
  title: string;
  count: number;
  icon: string;
}

const Counts = ({ title, count, icon }: CountsProps) => {
  return (
    <div className="col-md-4 mb-3">
      <Card
        style={{
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          background: "#f9f9f9",
        }}
      >
        <div className="d-flex gap-3 align-items-center">
          <img src={icon} alt="" height={50} />
          <div>
            <Text type="secondary" className="m-0 p-0">
              {title}
            </Text>
            <Title level={2} className="m-0 p-0 bold-text">
              <b>{count}</b>
            </Title>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Counts;
