import { Tabs } from "antd";
import PaymentContainer from "./AdminReuse/PaymentContainer";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { LoadingUI } from "../../../../App";
import PaymentSearch from "./AdminReuse/PaymentSearch";

const AdminPayment = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <LoadingUI />;
  }

  const { setHeader } = authContext;

  useEffect(() => {
    setHeader("Payment's status");
  }, [authContext]);

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
      <PaymentSearch />
      <hr />
      <Tabs defaultActiveKey="1" centered items={items} onChange={onChange} />
    </div>
  );
};

export default AdminPayment;
