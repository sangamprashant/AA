import { Col, Image, Row, Typography } from "antd";
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
          {/* Basic Information */}
          <Row gutter={[16, 16]} className="mt-2">
            <Col xs={24} sm={12} lg={12}>
              <Title level={5} className="m-0">First Name:</Title>
              <Text>{selectedData.firstName}</Text>
            </Col>
            <Col xs={24} sm={12} lg={12}>
              <Title level={5} className="m-0">Last Name:</Title>
              <Text>{selectedData.lastName}</Text>
            </Col>
          </Row>

          {/* Contact Information */}
          <Row gutter={[16, 16]} className="mt-2">
            <Col xs={24} sm={12} lg={12}>
              <Title level={5} className="m-0">Email:</Title>
              <Text>{selectedData.email}</Text>
            </Col>
            <Col xs={24} sm={12} lg={12}>
              <Title level={5} className="m-0">Phone Number:</Title>
              <Text>{selectedData.phoneNumber}</Text>
            </Col>
          </Row>

          {/* Class and Country */}
          <Row gutter={[16, 16]} className="mt-2">
            <Col xs={24} sm={12} lg={12}>
              <Title level={5} className="m-0">Selected Class:</Title>
              <Text>{selectedData.selectedClass}</Text>
            </Col>
            <Col xs={24} sm={12} lg={12}>
              <Title level={5} className="m-0">Country:</Title>
              <Text>{selectedData.country}</Text>
            </Col>
          </Row>

          {/* Dates */}
          <Row gutter={[16, 16]} className="mt-2">
            <Col xs={24} sm={12} lg={12}>
              <Title level={5} className="m-0">Date of Class:</Title>
              <Text>{new Date(selectedData.doc).toLocaleDateString()}</Text>
            </Col>
            <Col xs={24} sm={12} lg={12}>
              <Title level={5} className="m-0">Allocation Date:</Title>
              <Text>{new Date(selectedData.allocationDate).toLocaleString()}</Text>
            </Col>
          </Row>

          {/* State */}
          <Row gutter={[16, 16]} className="mt-2">
            <Col xs={24} sm={12} lg={12}>
              <Title level={5} className="m-0">Current State:</Title>
              <Text>{selectedData.state}</Text>
            </Col>
          </Row>
          <hr />
          {/* State History */}
          {selectedData.stateHistory && selectedData.stateHistory.length > 0 && (
            <Row gutter={[16, 16]} className="mt-2">
              <Col xs={24}>
                <Title level={3} className="m-0">State History:</Title>
                <>
                  <table className="table table-responsive table-striped table-borderless">
                    <thead>
                      <th>State</th>
                      <th>Comment</th>
                      <th>Updated At</th>
                    </thead>
                    <tbody>
                      {selectedData.stateHistory.map((history, index) => (
                        <tr key={index}>
                          <td>{history.state}</td>
                          <td>{history.comment}</td>
                          <td>{new Date(history.updatedAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              </Col>
            </Row>
          )}
          {/* Files */}
          {selectedData.files && (
            <Row gutter={[16, 16]} className="mt-2">
              <Col xs={24} sm={12} lg={12}>
                <hr />
                <Title level={3} className="m-0">Documents:</Title>
                <>
                  <table className="table table-responsive table-striped table-borderless">
                    <thead>
                      <th>Image</th>
                      <th>Description</th>
                      <th>Upload Date</th>
                    </thead>
                    <tbody>
                      {selectedData?.files?.documents?.map((doc, index) => (
                        <tr key={index}>
                          <td><Image src={doc.url} alt="Document Image" height={100} /></td>
                          <td>{doc.description}</td>
                          <td>{new Date(doc.uploadDate).toLocaleDateString()}</td>
                        </tr>

                      ))}
                    </tbody>
                  </table>
                </>
              </Col>

              <Col xs={24} sm={12} lg={12}>
                <hr />
                <Title level={3} className="m-0">Receipts:</Title>
                <table className="table table-responsive table-striped table-borderless">
                  <thead>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Upload Date</th>
                  </thead>
                  <tbody>
                    {selectedData?.files?.receipts?.map((receipt, index) => (
                      <tr key={index}>
                        <td><Image src={receipt.url} alt="Document Image" height={100} /></td>
                        <td>{receipt.description}</td>
                        <td>{new Date(receipt.uploadDate).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
          )}

          {/* Timestamps */}
          <Row gutter={[16, 16]} className="mt-2">
            <Col xs={24} sm={12} lg={12}>
              <Title level={5} className="m-0">Created At:</Title>
              <Text>{new Date(selectedData.createdAt).toLocaleString()}</Text>
            </Col>
            <Col xs={24} sm={12} lg={12}>
              <Title level={5} className="m-0">Updated At:</Title>
              <Text>{new Date(selectedData.updatedAt).toLocaleString()}</Text>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default RenderData;
