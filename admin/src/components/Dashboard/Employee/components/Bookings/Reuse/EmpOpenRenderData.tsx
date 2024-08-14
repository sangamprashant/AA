import { Col, Row, Typography } from "antd";
import { Booking } from "../../../../../../types/booking";

const { Title, Text } = Typography;
interface BookingG {
  selectedData: Booking;
}

const RenderData = ({ selectedData }: BookingG) => {
  return (
    <>
      {selectedData && (
        <>
          <Row gutter={16} className="mt-2">
            <Col span={12}>
              <Title level={5} className="m-0">
                First Name:
              </Title>
              <Text>{selectedData.firstName}</Text>
            </Col>
            <Col span={12}>
              <Title level={5} className="m-0">
                Last Name:
              </Title>
              <Text>{selectedData.lastName}</Text>
            </Col>
          </Row>
          <Row gutter={16} className="mt-2">
            <Col span={12}>
              <Title level={5} className="m-0">
                Email:
              </Title>
              <Text>{selectedData?.email}</Text>
            </Col>
            <Col span={12}>
              <Title level={5} className="m-0">
                Selected Class:
              </Title>
              <Text>{selectedData?.selectedClass}</Text>
            </Col>
          </Row>
          <Row gutter={16} className="mt-2">
            <Col span={12}>
              <Title level={5} className="m-0">
                Country:
              </Title>
              <Text>{selectedData?.country}</Text>
            </Col>
            <Col span={12}>
              <Title level={5} className="m-0">
                Phone Number:
              </Title>
              <Text>{selectedData?.phoneNumber}</Text>
            </Col>
          </Row>
          <Row gutter={16} className="mt-2">
            <Col span={12}>
              <Title level={5} className="m-0">
                Date of Class:
              </Title>
              <Text>{new Date(selectedData?.doc).toLocaleDateString()}</Text>
            </Col>
            <Col span={12}>
              <Title level={5} className="m-0">
                Allocation Date:
              </Title>
              <Text>
                {new Date(selectedData?.allocationDate).toLocaleString()}
              </Text>
            </Col>
          </Row>
          <Row gutter={16} className="mt-2">
            <Col span={12}>
              <Title level={5} className="m-0">
                Created At:
              </Title>
              <Text>{new Date(selectedData?.createdAt).toLocaleString()}</Text>
            </Col>
            <Col span={12}>
              <Title level={5} className="m-0">
                Updated At:
              </Title>
              <Text>{new Date(selectedData?.updatedAt).toLocaleString()}</Text>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default RenderData;
