
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Plus, Building2 } from 'lucide-react';

const NGODashboard = () => {
    const [ngos, setNgos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyNGOs = async () => {
            try {
                const res = await axios.get('/ngo/mine');
                setNgos(res.data.data);
            } catch (error) {
                toast.error('Failed to fetch your NGOs');
            } finally {
                setLoading(false);
            }
        };

        fetchMyNGOs();
    }, []);

    if (loading) return <div className="flex justify-center mt-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 pt-24">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My NGOs</h1>
                    <p className="text-gray-600 mt-1">Manage your registered organizations.</p>
                </div>
                <Link to="/ngo/add">
                    <Button>
                        <Plus className="w-5 h-5 mr-2" /> Register New NGO
                    </Button>
                </Link>
            </div>

            {ngos.length > 0 ? (
                <div className="grid gap-6">
                    {ngos.map((ngo) => (
                        <Card key={ngo._id} className="p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-primary-50 rounded-lg text-primary-600">
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{ngo.name}</h3>
                                        <p className="text-sm text-gray-500 font-mono mt-1">Reg: {ngo.registrationNumber}</p>
                                        <div className="flex items-center mt-2 space-x-2">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${ngo.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    ngo.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {ngo.status.charAt(0).toUpperCase() + ngo.status.slice(1)}
                                            </span>
                                            <span className="text-xs text-gray-400">•</span>
                                            <span className="text-xs text-gray-500">Registered on {new Date(ngo.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Future actions can go here */}
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="p-12 text-center">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Building2 className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No NGOs Registered</h3>
                    <p className="text-gray-500 mt-2 mb-6">Get started by registering your first NGO.</p>
                    <Link to="/ngo/add">
                        <Button>Register NGO</Button>
                    </Link>
                </Card>
            )}
        </div>
    );
};

export default NGODashboard;

