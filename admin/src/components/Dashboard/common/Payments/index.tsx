import { SearchOutlined } from "@ant-design/icons";
import CloseIcon from "@mui/icons-material/Close";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import ReloadIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  DatePicker,
  Input,
  notification,
  Radio,
  Table,
  Tabs,
} from "antd";
import { ColumnType, FilterDropdownProps } from "antd/es/table/interface";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../../../../config";
import { handlePrint } from "../../../../functions";
import { DBPayment, Payment, PaymentResponse } from "../../../../types/payment";
import { AuthContext } from "../../../context/AuthProvider";
import PaymentViewContainer from "./Open";
import Range from "./Range";
dayjs.extend(isBetween);

type Type = "payment_id" | "order_id";

type Win = "main" | "search" | "date";

type reqBodyProps = {
  payment_id?: string;
  order_id?: string;
};

const { RangePicker } = DatePicker;

const AMPayments = () => {
  const gloabls = useContext(AuthContext);
  if (!gloabls) return null;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);
  const [type, setType] = useState<Type>("payment_id");
  const [reload, setReload] = useState<boolean>(false);
  const [win, setWin] = useState<Win>("main");
  const [searching, setSearching] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<PaymentResponse | null>(null);
  const [pintId, setPrintId] = useState("printable-container");

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      notification.warning({
        message: "Warning",
        description: "Search input cannot be empty. Please enter a valid ID.",
      });
      return;
    }

    const reqBody: reqBodyProps = {};
    if (type === "payment_id") {
      reqBody.payment_id = searchTerm;
    } else if (type === "order_id") {
      reqBody.order_id = searchTerm;
    }

    try {
      setSearching(true);
      const response = await axios.post(
        `${config.SERVER}/payment/view-one`,
        reqBody,
        {
          headers: {
            Authorization: `Bearer ${gloabls.token}`,
          },
        }
      );
      if (response.data.success) {
        setSearchData(response.data);
        setWin("search");
      }
    } catch (error: any) {
      notification.error({
        message: "Error",
        description:
          error?.response?.data?.message ||
          "An error occurred while searching. Please try again.",
      });
    } finally {
      setSearching(false);
    }
  };

  const handleRange = async () => {
    setWin("date");
  };

  const handleReload = () => {
    setReload((prev) => !prev);
  };

  useEffect(() => {
    if (win === "main") setPrintId("print-payment");
    else setPrintId("printable-container");
  }, [win, reload, searchData, dateRange]);

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
                loading={searching}
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
              ></Button>
            </div>
            <Button
              type="default"
              icon={<ReloadIcon />}
              onClick={handleReload}
            />
            <Button
              icon={<CloseIcon />}
              type="primary"
              danger
              disabled={win === "main"}
              onClick={() => {
                setWin("main");
              }}
            />
            <Button
              type="primary"
              icon={<LocalPrintshopIcon />}
              onClick={() => handlePrint(pintId)}
            />
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
      {win === "search" && <PaymentViewContainer data={searchData} />}
      {win === "date" && (
        <Range
          reload={reload}
          startDate={dateRange[0] ? dateRange[0].format("YYYY-MM-DD") : ""}
          endDate={dateRange[1] ? dateRange[1].format("YYYY-MM-DD") : ""}
        />
      )}
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

  const getColumnSearchProps = (
    dataIndex: keyof DBPayment,
    placeholder: string
  ): ColumnType<DBPayment> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={placeholder}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => confirm()}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && clearFilters()}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? (record[dataIndex] as string)
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : false,
    render: (text: string) => (text ? <span>{text}</span> : ""),
  });

  const columnsDB = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        ...getColumnSearchProps("name", "Search By Name"),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        ...getColumnSearchProps("email", "Search By Email"),
      },
      {
        title: "Contact",
        dataIndex: "mobileNumber",
        key: "mobileNumber",
        ...getColumnSearchProps("mobileNumber", "Search By Contact Number"),
      },
      {
        title: "Purpose",
        dataIndex: "purpose",
        key: "purpose",
        ...getColumnSearchProps("purpose", "Search By Purpose"),
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
        id="print-payment"
      />
    </Fragment>
  );
};
