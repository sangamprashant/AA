import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { config } from "../../../../config";
import axios from "axios";
import { AuthContext } from "../../../context/AuthProvider";
import { Button, notification } from "antd";
import PaymentViewContainer from "./Open";
import { PaymentResponse } from "../../../../types/payment";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import ReloadIcon from "@mui/icons-material/Refresh";
import { handlePrint } from "../../../../functions";

const Payment = () => {
  const gloabls = useContext(AuthContext);
  if (!gloabls) return null;
  const [payId, setPayId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [searching, setSearching] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<PaymentResponse | null>(null);

  useLayoutEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("payment_id");
    const Oid = queryParams.get("order_id");

    if (id) {
      setPayId(id);
    } else if (Oid) {
      setOrderId(Oid);
    }
  }, []);

  useEffect(() => {
    if (payId || orderId) handleSearch();
  }, [payId, orderId]);

  const handleSearch = async () => {
    try {
      setSearching(true);
      const response = await axios.post(
        `${config.SERVER}/payment/view-one`,
        {
          order_id: orderId,
          payment_id: payId,
        },
        {
          headers: {
            Authorization: `Bearer ${gloabls.token}`,
          },
        }
      );
      if (response.data.success) {
        setSearchData(response.data);
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

  return (
    <>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5 className=" text-uppercase">Payment - open</h5>
        <div className="d-flex gap-2">
          <div className="d-flex justify-content-center gap-2">
            <Button icon={<ReloadIcon />} onClick={handleSearch} />
            <Button
              icon={<LocalPrintshopIcon />}
              onClick={() => handlePrint("printable-container")}
            />
          </div>
        </div>
      </div>
      {payId || orderId ? (
        <PaymentViewContainer loading={searching} data={searchData} />
      ) : (
        <div>No Payment or Order ID provided</div>
      )}
    </>
  );
};

export default Payment;
