import SyncIcon from "@mui/icons-material/Sync";
import { Button, DatePicker, Modal, Select } from "antd";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateFilter, DateRangeProps } from "../../../../../types/leads";
import { AuthContext } from "../../../../context/AuthProvider";
import { useLeads } from "../../../../context/LeadsProvider";

const { RangePicker } = DatePicker;

const filters = [
  {
    title: "Ascending order",
    value: "ascending",
  },
  {
    title: "Descending order",
    value: "descending",
  },
  {
    title: "Most recent",
    value: "most-recent",
  },
];

const dateFilters = [
  {
    title: "Today",
    value: "today",
  },
  {
    title: "Yesterday",
    value: "yesterday",
  },
  {
    title: "In 7 days",
    value: "in-7-days",
  },
  {
    title: "In a month",
    value: "in-a-month",
  },
  {
    title: "In a year",
    value: "in-a-year",
  },
  {
    title: "Custom date range",
    value: "custom-date-range",
  },
];

const TopBar: React.FC = () => {
  const {
    handleReload,
    sort,
    setSort,
    dateFilter,
    setDateFilter,
    setCustomDateRange,
  } = useLeads();
  const auth = useContext(AuthContext);
  if (!auth) return null;
  const { user } = auth;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ctr, setCtr] = useState<DateFilter>("today");
  const [dates, setDates] = useState<DateRangeProps>(null);
  const navigate = useNavigate();

  const handleFilterChange = (val: DateFilter) => {
    if (val === "custom-date-range") {
      setIsModalVisible(true);
      setCtr(val);
    } else {
      setDateFilter(val);
      setIsModalVisible(false);
    }
  };

  const handleDateRangeOk = () => {
    setDateFilter(ctr);
    setIsModalVisible(false);
    setCustomDateRange(dates);
  };

  return (
    <>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5>LEADS</h5>
        <div className="d-flex gap-2 align-items-center">
          <Select
            style={{ width: "170px" }}
            value={dateFilter}
            onChange={handleFilterChange}
          >
            {dateFilters.map((filter, index) => (
              <Select.Option key={index} value={filter.value}>
                {filter.title}
              </Select.Option>
            ))}
          </Select>
          <Select
            style={{ width: "170px" }}
            value={sort}
            onChange={(val) => setSort(val)}
          >
            {filters.map((filter, index) => (
              <Select.Option key={index} value={filter.value}>
                {filter.title}
              </Select.Option>
            ))}
          </Select>
          {user?.role === "employee" && (
            <Button
              type="primary"
              onClick={() => navigate(`/employee/leads-bucket/create`)}
            >
              Create New Lead
            </Button>
          )}
          <Button icon={<SyncIcon />} onClick={handleReload} />
        </div>
      </div>

      <Modal
        title="Select Custom Date Range"
        open={isModalVisible}
        onOk={handleDateRangeOk}
        onCancel={() => setIsModalVisible(false)}
        centered
      >
        <RangePicker
          className="w-100"
          onChange={(dates) => {
            setDates(
              dates
                ? (dates.map((date) => date?.format("YYYY-MM-DD")) as [
                    string,
                    string
                  ])
                : null
            );
          }}
        />
      </Modal>
    </>
  );
};

export default TopBar;
