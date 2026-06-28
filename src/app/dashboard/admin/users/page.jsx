import React from 'react';

const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Tenant' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Owner' },
    { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'Admin' },
    { id: 4, name: 'Alice Johnson', email: 'alice.j@example.com', role: 'Tenant' },
    { id: 5, name: 'Bob Brown', email: 'bob.b@example.com', role: 'Owner' },
];

const AllUsersPage = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">All Users</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Name</th>
                            <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Email</th>
                            <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Role</th>
                            <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {mockUsers.map(user => (
                            <tr key={user.id}>
                                <td className="w-1/4 py-3 px-4">{user.name}</td>
                                <td className="w-1/4 py-3 px-4">{user.email}</td>
                                <td className="w-1/4 py-3 px-4">{user.role}</td>
                                <td className="w-1/4 py-3 px-4">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Change Role
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

export default AllUsersPage;
