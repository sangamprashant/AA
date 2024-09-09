import ChecklistIcon from '@mui/icons-material/Checklist';
import SyncIcon from "@mui/icons-material/Sync";
import { Badge, Button, Popconfirm, Table, notification } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { config } from "../../../../../config";
import { Booking } from "../../../../../types/booking";
import { AuthContext } from "../../../../context/AuthProvider";
import ManagerWrapper from "../../../Manager/ManagerWrapper";

const LeadsApproval = () => {
    const globles = useContext(AuthContext);
    if (!globles) return null;
    const { token } = globles;
    const navigate = useNavigate();
    const [leads, setLeads] = useState<Booking[]>([]);
    const [reload, setReload] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchCount();
    }, [token, reload]);

    const fetchCount = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${config.SERVER}/manager/bookings/count`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    type: "data",
                },
            });
            setLeads(response.data);
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                setLeads([]);
            } else {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            await axios.patch(`${config.SERVER}/manager/booking/approve/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            notification.success({ message: 'Booking approved successfully' });
            fetchCount(); // Refresh the data
        } catch (error) {
            notification.error({ message: 'Failed to approve booking' });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${config.SERVER}/manager/booking/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            notification.success({ message: 'Booking deleted successfully' });
            fetchCount(); // Refresh the data
        } catch (error) {
            notification.error({ message: 'Failed to delete booking' });
        }
    };

    const columns = [
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Selected Class",
            dataIndex: "selectedClass",
            key: "selectedClass",
        },
        {
            title: "Assigned Employee",
            dataIndex: ["assignedEmployee", "email"],
            key: "assignedEmployee",
        },
        {
            title: "Allocation Date",
            dataIndex: "allocationDate",
            key: "allocationDate",
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: "Date Of Class",
            dataIndex: "doc",
            key: "doc",
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: "Action",
            dataIndex: "_id",
            key: "_id",
            render: (id: string) => (
                <div className='d-flex gap-2'>
                    <Button type='primary' className='py-0' onClick={() => handleApprove(id)}>Approve</Button>
                    <Popconfirm
                        title="Are you sure to delete this booking?"
                        onConfirm={() => handleDelete(id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='primary' danger className='py-0'>Delete</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    function handleReload() {
        setReload((prev) => !prev);
    }

    return (
        <ManagerWrapper>
            <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
                <h5 className='text-uppercase'>LEADS - Added by employees</h5>
                <div className="d-flex gap-2 align-items-center">
                    <Button icon={<SyncIcon />} onClick={handleReload} danger />
                    <Badge count={leads.length}>
                        <Button icon={<ChecklistIcon />} type='primary' danger onClick={() => navigate(`/manager/leads-bucket`)}>Go Back</Button>
                    </Badge>
                </div>
            </div>
            <div className='table-responsive'>
                <Table dataSource={leads} columns={columns} rowKey="_id" loading={loading} />
            </div>
        </ManagerWrapper>
    );
};

export default LeadsApproval;
