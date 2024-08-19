import { notification } from "antd";

const getButtonColor = (role: string | undefined) => {
  switch (role) {
    case "admin":
      return "primary";
    case "employee":
      return "secondary";
    case "manager":
      return "success";
    default:
      return "primary";
  }
};

const openNotification = (
  message: string,
  description: string,
  type: "success" | "error"
) => {
  notification[type]({
    message,
    description,
    duration: 5,
  });
};

const handlePrint = (id: string) => {
  const printContents = document.getElementById(id)?.innerHTML;
  if (printContents) {
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      // Get all the stylesheets linked in the main document
      const styles = Array.from(
        document.querySelectorAll("link[rel='stylesheet'], style")
      )
        .map((node) => node.outerHTML)
        .join("\n");

      // Write the content to the print window
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            ${styles}
          </head>
          <body>
            ${printContents}
          </body>
        </html>
      `);

      printWindow.document.close();

      // Ensure images are fully loaded before printing
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      };
    }
  }
};

const getMonthDays = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export {
  getButtonColor, getFirstDayOfMonth, getMonthDays, handlePrint, openNotification
};

