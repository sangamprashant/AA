import { Card, Typography } from "antd";

const Visits = () => {
  return (
    <div className="col-md-4">
      <Card
        style={{
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          background: "#f9f9f9",
        }}
      >
        <table className="table table-borderless p-0 m-0">
          <tbody className="">
            <tr>
              <td>
                <h5>#9354</h5>
                <Typography.Text type="secondary" className="m-0 p-0">
                  Website Visitors
                </Typography.Text>
              </td>
              <td>
                <h5>#9354</h5>
                <Typography.Text type="secondary" className="m-0 p-0">
                  New Customers
                </Typography.Text>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Visits;
