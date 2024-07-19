import { useEffect, useState } from "react";
import Section from "../../Reuse/Section";
import PaymentViewContainer from "../../Reuse/PaymentViewContainer";

const ViewPayment = () => {
  const [payId, setPayId] = useState<string>("");

  useEffect(() => {
    // Extract query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("payment_id"); // Extract the 'payment_id' parameter

    if (id) {
      setPayId(id);
    }
  }, [window.location.search]);

  if(!payId) {
    return null
  }

  return (
    <Section>
      <PaymentViewContainer payId={payId}/>
    </Section>
  );
};

export default ViewPayment;
