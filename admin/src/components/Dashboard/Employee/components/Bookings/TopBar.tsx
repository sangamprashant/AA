import SearchIcon from '@mui/icons-material/Search';
import SyncIcon from "@mui/icons-material/Sync";
import { Alert, Button, DatePicker, Form, Input, Modal, Select } from "antd";
import axios from 'axios';
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from '../../../../../config';
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
  const { user, token } = auth;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

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

  const handleSearchModal = () => {
    setSearchModalVisible(!searchModalVisible);
    setSearchPerformed(false);
    setSearchResults([]);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${config.SERVER}/auth/bookings/search`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          mobileNumber,
          email,
        },
      });

      setSearchResults(response.data);

    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setSearchResults([]);
      } else {
      }
    } finally {
      setSearchPerformed(true);
    }
  }

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
          <Button icon={<SearchIcon />} onClick={handleSearchModal} type="dashed" />
          <Button icon={<SyncIcon />} onClick={handleReload} danger />
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
                ? (dates.map((date) => date?.format("YYYY-MM-DD")) as [string, string])
                : null
            );
          }}
        />
      </Modal>

      <Modal
        title="Search Leads"
        open={searchModalVisible}
        onOk={handleSearchModal}
        onCancel={handleSearchModal}
        centered
        width={1000}
        style={{ maxHeight: "80vh", overflowY: "auto" }}
        footer={[
          <Button key="close" type="primary" danger onClick={handleSearchModal}>
            Close
          </Button>,
          <Button key="search" type="primary" onClick={handleSearch}>
            Search
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Enter Mobile Number to search">
            <Input
              placeholder="Enter Mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Enter Email to search">
            <Input
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
        </Form>

        {searchPerformed && (
          <div>
            {searchResults.length > 0 ? (
              <>
                <Alert message="Leads found!" type="success" showIcon />
                <ul>
                  {searchResults.map((lead) => (
                    <li key={lead._id}>
                      <Link to={`/${user?.role}/leads-bucket/${lead._id}`}>{lead.firstName} {lead.lastName} - {lead.phoneNumber} - {lead.email}</Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Alert message="No leads found" type="error" showIcon />
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default TopBar;
