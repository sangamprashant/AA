import { Tabs } from "antd";
import PaymentContainer from "./AdminReuse/PaymentContainer";

const AdminPayment = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: `Created`,
      children: <PaymentContainer type="created" />,
    },
    {
      key: "2",
      label: `Pending`,
      children: <PaymentContainer type="pending" />,
    },
    {
      key: "3",
      label: `Success`,
      children: <PaymentContainer type="success" />,
    },
    {
      key: "4",
      label: `All`,
      children: <PaymentContainer type="all" />,
    },
    {
      key: "5",
      label: `Razorpay`,
      children: <PaymentContainer type="razorpay" />,
    },
  ];
  return (
    <div className="card p-3 border-0 shadow">
      <h3 className="display-6 theme-color">Payment</h3>
      <Tabs defaultActiveKey="1" centered items={items} onChange={onChange} />
    </div>
  );
};

export default AdminPayment;
