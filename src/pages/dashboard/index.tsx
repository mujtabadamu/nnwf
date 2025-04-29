//@ts-nocheck
import { Check, Clock, X, Edit } from "lucide-react";

const mockUser = {
  id: "1234",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  role: "Software Developer",
  status: "verified", // Possible values: pending, verified, suspended
  profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
  joinDate: "2025-03-15",
};

function Dashboard() {
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <Clock size={14} className="mr-1" />,
        text: "Pending",
      },
      verified: {
        color: "bg-green-100 text-green-800",
        icon: <Check size={14} className="mr-1" />,
        text: "Verified",
      },
      suspended: {
        color: "bg-red-100 text-red-800",
        icon: <X size={14} className="mr-1" />,
        text: "Suspended",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.icon}
        <span className="ml-1">{config.text}</span>
      </span>
    );
  };

  return (
    <div className="p-4 sm:p-6 max-w-md mx-auto w-full">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 w-full">
        {/* Header with status badge - now always shows text */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Account Overview
          </h2>
          <StatusBadge status={mockUser.status} />
        </div>

        {/* Profile section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
          {/* Profile image */}
          <div className="flex justify-center sm:justify-start">
            <div className="relative">
              <img
                src={mockUser.profileImage}
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover border-2 border-gray-200"
              />
            </div>
          </div>

          {/* User info */}
          <div className="text-center sm:text-left">
            <h3 className="text-md sm:text-lg font-semibold text-gray-800">
              {mockUser.name}
            </h3>
            <p className="text-sm text-gray-500 mb-3 sm:mb-4">
              {mockUser.role}
            </p>

            {/* Edit profile button */}
            <button className="flex items-center justify-center sm:justify-start px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm sm:text-base w-full sm:w-auto">
              <Edit size={14} className="mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Account details */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-xs sm:text-sm text-gray-500">Account ID</span>
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              {mockUser.id}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-xs sm:text-sm text-gray-500">Email</span>
            <span className="text-xs sm:text-sm font-medium text-gray-700 break-all">
              {mockUser.email}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-xs sm:text-sm text-gray-500">
              Member Since
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              {mockUser.joinDate}
            </span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-xs sm:text-sm text-gray-500">
              Account Type
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Standard
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
