import SearchIcon from "@mui/icons-material/Search";
import ReloadIcon from "@mui/icons-material/Refresh";
import {
  Button,
  DatePicker,
  Input,
  notification,
  Radio,
  Table,
  Tabs,
} from "antd";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { config } from "../../../../config";
import { AuthContext } from "../../../context/AuthProvider";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

// Extend dayjs with isBetween
dayjs.extend(isBetween);

type Type = "payment_id" | "order_id";

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

type Win = "main" | "search" | "date";

const { RangePicker } = DatePicker;

const AMPayments = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);
  const [type, setType] = useState<Type>("payment_id");
  const [reload, setReload] = useState<boolean>(false);
  const [win, setWin] = useState<Win>("main");

  const handleSearch = () => {
    setReload((prev) => !prev); // Toggle reload to trigger data fetching
    setWin("search");
  };

  const handleRange = () => {
    setWin("date");
  };

  const handleReload = () => {
    setReload((prev) => !prev); // Toggle reload to trigger data fetching
  };

  return (
    <>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5 className=" text-uppercase">Payments</h5>
        <div className="d-flex gap-2">
          <div className="d-flex justify-content-center gap-2">
            <div className="d-flex justify-content-center align-items-center bg-body-tertiary ps-3 rounded">
              <Radio.Group
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                <Radio value="payment_id">Payment Id</Radio>
                <Radio value="order_id">Order Id</Radio>
              </Radio.Group>
              <Input
                className=" rounded-end-0 m-0 border-0"
                placeholder={`Search by ${
                  type === "payment_id" ? "Payment Id" : "Order Id"
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "200px" }}
              />
              <Button
                type="primary"
                icon={<SearchIcon />}
                onClick={handleSearch}
                className=" rounded-start-0 m-0"
                // loading
              ></Button>
            </div>
            <div className="d-flex align-items-center">
              <RangePicker
                className=" rounded-end-0 m-0"
                placeholder={["Start Date", "End Date"]}
                value={dateRange}
                onChange={(dates) => {
                  if (dates && dates.length === 2) {
                    setDateRange(dates as [Dayjs, Dayjs]);
                  } else {
                    setDateRange([null, null]);
                  }
                }}
              />
              <Button
                type="primary"
                icon={<SearchIcon />}
                onClick={handleRange}
                className=" rounded-start-0 m-0"
                // loading
              ></Button>
            </div>
            <Button type="default" icon={<ReloadIcon />} onClick={handleReload}>
              Reload
            </Button>
            <Button
              icon={<CloseIcon />}
              className={`opacity-100`}
              disabled={win === "main"}
              onClick={()=>{
                setWin("main")
              }}
            ></Button>
          </div>
        </div>
      </div>
      {win === "main" && (
        <Tabs defaultActiveKey="1" className="px-2">
          <Tabs.TabPane key="1" tab="All">
            <RenderPayments state="all" reload={reload} />
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="Pending">
            <RenderPayments state="pending" reload={reload} />
          </Tabs.TabPane>
          <Tabs.TabPane key="3" tab="Created">
            <RenderPayments state="created" reload={reload} />
          </Tabs.TabPane>
          <Tabs.TabPane key="4" tab="Success">
            <RenderPayments state="success" reload={reload} />
          </Tabs.TabPane>
          <Tabs.TabPane key="5" tab="From Razorpay">
            <RenderPayments state="razorpay" reload={reload} />
          </Tabs.TabPane>
        </Tabs>
      )}
      {win === "search" && <>Search</>}
      {win === "date" && <>Date</>}
    </>
  );
};

export default AMPayments;

interface RenderPaymentsProps {
  state: "created" | "success" | "pending" | "all" | "razorpay";
  reload: boolean;
}

const RenderPayments = ({ state, reload }: RenderPaymentsProps) => {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { token } = authContext;
  const [dataSource, setDataSource] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [state, reload]); // Reloads the data when 'state' or 'reload' changes

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.SERVER}/payment/view/${state}`,
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
            ? `/dashboard/payment-open?payment_id=${data.razorpayPaymentId}`
            : `/dashboard/payment-open?order_id=${data.orderCreationId}`;
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
        columns={state === "razorpay" ? columnsRazorPay : columnsDB}
        dataSource={dataSource as any}
        rowKey={state === "razorpay" ? "id" : "_id"}
        className="table-responsive"
        loading={loading}
      />
    </Fragment>
  );
};
