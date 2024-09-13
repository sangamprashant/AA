"use client"
import { useEffect, useState } from "react";
import Section from "../../Reuse/Section";
import PaymentViewContainer from "../../Reuse/PaymentViewContainer";

const ViewPayment = () => {
  const [payId, setPayId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("payment_id");
    const Oid = queryParams.get("order_id");

    if (id) {
      setPayId(id);
    } else if (Oid) {
      setOrderId(Oid);
    }
  }, []);

  return (
    <Section className="pb-5">
      {payId || orderId ? (
        <PaymentViewContainer payId={payId || ""} orderId={orderId || ""} />
      ) : (
        <div>No Payment or Order ID provided</div>
      )}
    </Section>
  );
};

export default ViewPayment;
