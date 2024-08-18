import { Button, Input, notification, Table, Tabs } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { config } from "../../../../config";
import { DBPayment } from "../../../../types/payment";
import { AuthContext } from "../../../context/AuthProvider";

import type { ColumnType, FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
// import { ColumnType } from "antd/es/list";

interface RangeProps {
  reload: boolean;
  startDate: string;
  endDate: string;
}

const Range = ({ reload, startDate, endDate }: RangeProps) => {
  return (
    <>
      <Tabs defaultActiveKey="1" className="px-2">
        <Tabs.TabPane key="1" tab="Success">
          <RenderPayments
            state="success"
            reload={reload}
            startDate={startDate}
            endDate={endDate}
            category="status"
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="Created">
          <RenderPayments
            state="created"
            reload={reload}
            startDate={startDate}
            endDate={endDate}
            category="status"
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="Pending">
          <RenderPayments
            state="pending"
            reload={reload}
            startDate={startDate}
            endDate={endDate}
            category="status"
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default Range;

interface RenderPaymentsProps {
  state: "created" | "success" | "pending";
  reload: boolean;
  startDate: string;
  endDate: string;
  category: "status" | "selectClass";
}

const RenderPayments = ({
  state,
  reload,
  startDate,
  endDate,
  category,
}: RenderPaymentsProps) => {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { token } = authContext;
  const [dataSource, setDataSource] = useState<DBPayment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [state, reload, startDate, endDate, category]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.SERVER}/payment/range`, {
        params: { startDate, endDate, category, categoryValue: state },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        console.log(response.data);
        setDataSource(response.data);
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

  const columnsDB: ColumnsType<DBPayment> = [
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
      ...getColumnSearchProps("email", "Search Email"),
    },
    {
      title: "Contact",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      ...getColumnSearchProps("mobileNumber", "Search Mobile Number"),
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
      ...getColumnSearchProps("purpose", "Search by Purpose"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount?: number) => <span>₹ {amount}</span>,
      ...getColumnSearchProps("amount", "Search by Amount"),
    },
    {
      title: "Class",
      dataIndex: "selectClass",
      key: "selectClass",
      filters: [
        { text: "Class 1", value: "1" },
        { text: "Class 2", value: "2" },
        { text: "Class 3", value: "3" },
        { text: "Class 4", value: "4" },
        { text: "Class 5", value: "5" },
        { text: "Class 6", value: "6" },
        { text: "Class 7", value: "7" },
        { text: "Class 8", value: "8" },
        { text: "Class 9", value: "9" },
        { text: "Class 10", value: "10" },
        { text: "Class 11", value: "11" },
        { text: "Class 12", value: "12" },
      ],
      onFilter: (value, record) => record.selectClass === value,
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
      key: "action",
      render: (record: DBPayment) => {
        const link = record.razorpayPaymentId
          ? `/dashboard/payment-open?payment_id=${record.razorpayPaymentId}`
          : `/dashboard/payment-open?order_id=${record.orderCreationId}`;
        const text = record.razorpayPaymentId ? "Payment" : "Order";

        return <Link to={link}>View {text}</Link>;
      },
    },
  ];

  return (
    <Fragment>
      <Table
        columns={columnsDB}
        dataSource={dataSource as DBPayment[]}
        rowKey="_id"
        className="table-responsive"
        loading={loading}
         id="print-payment"
      />
    </Fragment>
  );
};
