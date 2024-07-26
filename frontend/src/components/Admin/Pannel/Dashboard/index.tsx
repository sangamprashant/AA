import axios from "axios";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { LoadingUI } from "../../../../App";
import { config } from "../../../../config";
import { AuthContext } from "../../Auth/AuthProvider";
import Counts from "./AdminReuse/Counts";
import Transctions from "./AdminReuse/Transctions";
import Visits from "./AdminReuse/Visits";
import "./dashboard.css";

interface Payment {
  id: string;
  notes: {
    name: string;
    email: string;
  };
  amount: number;
}

interface PaymentCounts {
  created: number;
  success: number;
  pending: number;
  total: number;
}

interface ContactCounts {
  checkedTrue: number;
  checkedFalse: number;
  total: number;
}

interface BookingCounts {
  checked: number;
  unchecked: number;
  total: number;
}

interface VisitorsCounts {
  total: number;
  new: number;
}

interface DashboardData {
  payments: Payment[];
  paymentCounts: PaymentCounts;
  contactCounts: ContactCounts;
  bookingCounts: BookingCounts;
  visitorsCounts: VisitorsCounts;
}

const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <LoadingUI />;
  }
  const { setHeader, token } = authContext;
  useEffect(() => {
    setHeader("Welcome to Dashboard");
  }, [authContext]);

  const [data, setData] = useState<DashboardData | undefined>(undefined);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    Promise.all([fetchPayments(), fetchData()]);
  }, []);

  return (
    <React.Fragment>
      <article>
        <div className="row">
          <Counts
            icon="/admin/icon/group.png"
            title="Total Visitors"
            count={data?.visitorsCounts.total || 0}
          />
          <Counts
            icon="/admin/icon/human.png"
            title="New Visitors"
            count={data?.visitorsCounts.new || 0}
          />
          <Counts
            icon="/admin/icon/revenue.png"
            title="Total Payments"
            count={data?.paymentCounts.total || 0}
          />
          <Counts
            icon="/admin/icon/clock.png"
            title="Created Payments"
            count={data?.paymentCounts.created || 0}
          />
          <Counts
            icon="/admin/icon/clock.png"
            title="Successful Payments"
            count={data?.paymentCounts.success || 0}
          />
          <Counts
            icon="/admin/icon/research.png"
            title="Pending Payments"
            count={data?.paymentCounts.pending || 0}
          />
          <Counts
            icon="/admin/icon/arrow.png"
            title="Checked Contacts"
            count={data?.contactCounts.checkedTrue || 0}
          />
          <Counts
            icon="/admin/icon/new-email.png"
            title="Unchecked Contacts"
            count={data?.contactCounts.checkedFalse || 0}
          />
          <Counts
            icon="/admin/icon/message.png"
            title="Total Contacts"
            count={data?.contactCounts.total || 0}
          />
          <Counts
            icon="/admin/icon/booking.png"
            title="Checked Bookings"
            count={data?.bookingCounts.checked || 0}
          />
          <Counts
            icon="/admin/icon/calender.png"
            title="Unchecked Bookings"
            count={data?.bookingCounts.unchecked || 0}
          />
          <Counts
            icon="/admin/icon/booking-total.png"
            title="Total Bookings"
            count={data?.bookingCounts.total || 0}
          />
        </div>
        <div className="row mt-3">
          <Transctions payments={payments || []} loading={loading}/>
          <Visits
            total={data?.visitorsCounts.total || 0}
            newVisitors={data?.visitorsCounts.new || 0}
          />
        </div>
      </article>
    </React.Fragment>
  );

  async function fetchData() {
    try {
      const response = await axios.get(`${config.SERVER}/payment/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function fetchPayments() {
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.SERVER}/payment/dashboard/payments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setPayments(response.data.payments);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
};

export default Dashboard;
