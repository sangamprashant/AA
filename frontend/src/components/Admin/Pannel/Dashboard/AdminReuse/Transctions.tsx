import React from 'react';
import { Card, Table } from 'antd';

interface Payment {
  id: string;
  notes: {
    name: string;
    email: string;
  };
  amount: number;
}

interface TransctionsProps {
  payments: Payment[];
}

const Transctions: React.FC<TransctionsProps> = ({ payments }) => {
  console.log({ payments });

  const dataColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'notes',
      key: 'notes',
      render: (data: { name: string }) => <div>{data.name}</div>,
    },
    {
      title: 'Email',
      dataIndex: 'notes',
      key: 'notes',
      render: (data: { email: string }) => <div>{data.email}</div>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => <div>{amount / 100}</div>,
    },
  ];

  return (
    <div className="col-md-8">
      <Card
        style={{
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          background: "#f9f9f9",
        }}
      >
        <h5 className="p-0 m-0">Payments</h5>
        <Table className="table-responsive" dataSource={payments} columns={dataColumns} />
      </Card>
    </div>
  );
};

export default Transctions;
