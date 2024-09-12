const FerjiDetails = () => {
  return (
    <>
      <p className="m-0 mt-3">
        <strong>For Domestic Students:</strong>
      </p>
      <p>
        Payments are to be made in INR. Please note that additional platform
        charges may apply.
      </p>

      <p className="m-0">
        <strong>For International Students:</strong>
      </p>
      <p>
        To make a payment, choose the "Pay using international banks or cards"
        option. Select your country from the list and proceed with the payment.
        If your country is not listed, select "United States of America" and
        make the payment in USD.
      </p>

      <p>
        International applicants who do not have a 10-digit mobile number should
        enter "9999999999" in the mobile number field to proceed.
      </p>

      <p>
        The amount will be automatically converted to your local currency based
        on the country you select. Please be aware that currency conversion fees
        and platform charges may apply.
      </p>

      <p className="mt-5">
        Powered by <strong>RazorPay</strong>
      </p>
    </>
  );
};

export default FerjiDetails;
