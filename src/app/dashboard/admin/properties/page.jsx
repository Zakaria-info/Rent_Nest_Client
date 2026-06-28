import React from 'react';

const mockProperties = [
    { id: 1, title: 'Sunny Apartment', owner: 'Jane Smith', status: 'Pending' },
    { id: 2, title: 'Cozy Cottage', owner: 'Bob Brown', status: 'Approved' },
    { id: 3, title: 'Luxury Villa', owner: 'Jane Smith', status: 'Rejected' },
    { id: 4, title: 'Downtown Loft', owner: 'Bob Brown', status: 'Pending' },
];

const AllPropertiesPage = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">All Properties</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Property Title</th>
                            <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Owner</th>
                            <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Status</th>
                            <th className="py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {mockProperties.map(property => (
                            <tr key={property.id}>
                                <td className="w-1/4 py-3 px-4">{property.title}</td>
                                <td className="w-1/4 py-3 px-4">{property.owner}</td>
                                <td className="w-1/4 py-3 px-4">{property.status}</td>
                                <td className="py-3 px-4">
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs mr-2">
                                        Approve
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs mr-2">
                                        Reject
                                    </button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs mr-2">
                                        Update
                                    </button>
                                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded text-xs">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllPropertiesPage;
