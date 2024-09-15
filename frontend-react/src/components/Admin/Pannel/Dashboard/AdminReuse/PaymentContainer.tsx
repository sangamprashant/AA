import axios from "axios";
import { Fragment, useEffect, useState, useMemo, useContext } from "react";
import { config } from "../../../../../config";
import { Table, notification } from "antd";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Auth/AuthProvider";
import { LoadingUI } from "../../../../../App";

// Types for payment data
interface RazorpayPayment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  order_id: string;
  notes: {
    name: string;
    email: string;
    purpose: string;
    class: string;
    mobileNumber: string;
  };
}

interface DBPayment {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  purpose: string;
  amount: number;
  status: string;
  orderCreationId: string;
  razorpayPaymentId: string;
}

// Union type for dataSource
type Payment = RazorpayPayment | DBPayment;

// Props interface
interface PaymentContainerProps {
  type: "created" | "success" | "pending" | "all" | "razorpay";
}

const PaymentContainer = ({ type }: PaymentContainerProps) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <LoadingUI />;
  }
  const { token } = authContext;
  const [dataSource, setDataSource] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [type]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.SERVER}/payment/view/${type}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setDataSource(response.data.payments);
      } else {
        notification.error({
          message: "Error",
          description: "Failed to fetch payment data.",
        });
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Error",
        description: "An error occurred while fetching payment data.",
      });
    } finally {
      setLoading(false);
    }
  };

  const columnsRazorPay = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Name",
        dataIndex: "notes",
        key: "name",
        render: (notes: { name?: string }) => <span>{notes?.name}</span>,
      },
      {
        title: "Email",
        dataIndex: "notes",
        key: "email",
        render: (notes: { email?: string }) => <span>{notes?.email}</span>,
      },
      {
        title: "Contact",
        dataIndex: "notes",
        key: "contact",
        render: (notes: { mobileNumber?: string }) => (
          <span>{notes.mobileNumber || "N/A"}</span>
        ),
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount: number) => <span>{amount / 100} ₹</span>,
      },
      {
        title: "Currency",
        dataIndex: "currency",
        key: "currency",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Order ID",
        dataIndex: "order_id",
        key: "order_id",
      },
    ],
    []
  );

  const columnsDB = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Contact",
        dataIndex: "mobileNumber",
        key: "mobileNumber",
      },
      {
        title: "Purpose",
        dataIndex: "purpose",
        key: "purpose",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount?: number) => <span>{amount} ₹</span>,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Order ID",
        dataIndex: "orderCreationId",
        key: "orderCreationId",
      },
      {
        title: "Payment ID",
        dataIndex: "razorpayPaymentId",
        key: "razorpayPaymentId",
      },
      {
        title: "Action",
        dataIndex: "",
        key: "action",
        render: (data: DBPayment) => {
          const link = data.razorpayPaymentId
            ? `/admin/payment-open?payment_id=${data.razorpayPaymentId}`
            : `/admin/payment-open?order_id=${data.orderCreationId}`;
          const text = data.razorpayPaymentId ? "Payment" : "Order";

          return <Link to={link}>View {text}</Link>;
        },
      },
    ],
    []
  );

  return (
    <Fragment>
      <Table
        columns={type === "razorpay" ? columnsRazorPay : columnsDB}
        dataSource={dataSource as any} // Use 'any' to bypass TypeScript issue, ensure to use proper dataSource
        rowKey={type === "razorpay" ? "id" : "_id"}
        className="table-responsive"
        loading={loading}
      />
    </Fragment>
  );
};

export default PaymentContainer;
