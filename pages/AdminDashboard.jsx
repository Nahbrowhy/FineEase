import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Check, X, ShieldAlert } from 'lucide-react';

const AdminDashboard = () => {
    const [ngos, setNgos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNgos();
    }, []);

    const fetchNgos = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/admin/ngos');
            setNgos(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch NGOs');
            toast.error(err.response?.data?.message || 'Failed to fetch NGOs');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await axios.put(`/api/admin/ngos/${id}/approve`);
            toast.success('NGO approved successfully!');
            fetchNgos();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to approve NGO');
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.put(`/api/admin/ngos/${id}/reject`);
            toast.success('NGO rejected successfully!');
            fetchNgos();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to reject NGO');
        }
    };

    if (loading) {
        return <div className="text-center py-8">Loading NGOs...</div>;
    }

    if (error) {
        return (
            <div className="text-center py-8 text-red-500">
                <ShieldAlert className="inline-block mr-2" />
                {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

            <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">NGO Applications</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    NGO Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {ngos.map((ngo) => (
                                <tr key={ngo._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {ngo.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {ngo.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ngo.status === 'approved'
                                                ? 'bg-green-100 text-green-800'
                                                : ngo.status === 'rejected'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            {ngo.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {ngo.status === 'pending' ? (
                                            <div className="flex space-x-2">
                                                <Button
                                                    size="sm"
                                                    className="px-2 py-1 bg-green-600 hover:bg-green-700 shadow-none"
                                                    onClick={() => handleApprove(ngo._id)}
                                                >
                                                    <Check className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="danger"
                                                    className="px-2 py-1 shadow-none"
                                                    onClick={() => handleReject(ngo._id)}
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-xs italic">No actions</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AdminDashboard;

