import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Card from '../components/ui/Card';
import { Heart, Calendar, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const DonorDashboard = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const res = await axios.get('/donation/mine');
                setDonations(res.data.data);
            } catch (error) {
                toast.error('Failed to fetch donations');
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    const totalDonated = donations.reduce((acc, curr) => acc + curr.amount, 0);

    if (loading) return <div className="flex justify-center mt-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 pt-24">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Impact</h1>
                <p className="text-gray-600 mt-2">Track your contributions and see the difference you've made.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Card className="p-6 flex items-center space-x-4">
                    <div className="p-3 bg-primary-100 rounded-full text-primary-600">
                        <DollarSign className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Donated</p>
                        <p className="text-2xl font-bold text-gray-900">${totalDonated}</p>
                    </div>
                </Card>
                <Card className="p-6 flex items-center space-x-4">
                    <div className="p-3 bg-pink-100 rounded-full text-pink-600">
                        <Heart className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Donations Count</p>
                        <p className="text-2xl font-bold text-gray-900">{donations.length}</p>
                    </div>
                </Card>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-6">Donation History</h2>

            {donations.length > 0 ? (
                <div className="grid gap-6">
                    {donations.map((donation, index) => (
                        <motion.div
                            key={donation._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{donation.ngo?.name || 'Unknown NGO'}</h3>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {new Date(donation.createdAt).toLocaleDateString()}
                                    </div>
                                    {donation.message && (
                                        <p className="text-gray-600 mt-2 text-sm italic">"{donation.message}"</p>
                                    )}
                                </div>
                                <div className="mt-4 sm:mt-0 text-right">
                                    <span className="text-2xl font-bold text-primary-600">${donation.amount}</span>
                                    <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mt-1">Donated</div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <Card className="p-10 text-center">
                    <p className="text-gray-500">You haven't made any donations yet.</p>
                </Card>
            )}
        </div>
    );
};

export default DonorDashboard;

