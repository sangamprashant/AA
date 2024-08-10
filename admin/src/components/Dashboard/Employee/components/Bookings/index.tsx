import type { TabsProps } from "antd";
import { Tabs } from "antd";
import EmployeeWrapper from "../../EmployeeWrapper";
const Bookings = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "New leads",
      children: "New leads ",
    },
    {
      key: "2",
      label: "Attempt to contacted (1)",
      children: "Attempt to contacted (1)",
    },
    {
      key: "3",
      label: "Attempt to contacted ( 2)",
      children: "Attempt to contacted ( 2)",
    },
    {
      key: "4",
      label: "Connected ",
      children: "Connected ",
    },
    {
      key: "Prospect",
      label: "Prospect ",
      children: "Prospect ",
    },
    {
      key: "5",
      label: "Hot leads ",
      children: "Hot leads ",
    },
    {
      key: "6",
      label: "Payment Received ",
      children: "Payment Received ",
    },
    {
      key: "7",
      label: "Not Interested",
      children: "Not Interested ",
    },
  ];

  // Example list of users
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
    { id: 5, name: "Eve" },
  ];

  // Function to select a random user
  function getRandomUser(users: { id: number; name: string }[]): {
    id: number;
    name: string;
  } {
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
  }

  // Select a random user
  const selectedUser = getRandomUser(users);

  console.log("Selected User:", selectedUser);

  return (
    <EmployeeWrapper>
      <div className="card p-4">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </EmployeeWrapper>
  );
};

export default Bookings;
