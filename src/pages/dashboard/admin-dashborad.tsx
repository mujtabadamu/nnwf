import {
  Users,
  Briefcase,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  AlertCircle,
  // CheckCircle,
} from "lucide-react";

const AdminDashboard = () => {
  // Mock data for the dashboard
  const stats = {
    totalUsers: 1245,
    newUsers: 42,
    activeProjects: 28,
    pendingApprovals: 17,
    totalRevenue: 125600,
    revenueChange: 12.5,
    avgResponseTime: "2.4h",
    tasksCompleted: 89,
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Users Card */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.totalUsers.toLocaleString()}
              </h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="text-blue-600" size={20} />
            </div>
          </div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUp size={16} className="mr-1" />
            <span>+{stats.newUsers} new this week</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <Users className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <h3 className="text-xl font-bold text-gray-800">843</h3>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <span className="text-green-600">↑ 5.2%</span> from last week
          </div>
        </div>

        {/* Pending Approvals Card */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Pending Approvals</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.pendingApprovals}
              </h3>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="text-yellow-600" size={20} />
            </div>
          </div>
          <div className="flex items-center mt-2 text-sm text-blue-600">
            <Clock size={16} className="mr-1" />
            <span>Avg. response: {stats.avgResponseTime}</span>
          </div>
        </div>

        {/* Active Projects Card */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Documents</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.activeProjects}
              </h3>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Briefcase className="text-purple-600" size={20} />
            </div>
          </div>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <FileText size={16} className="mr-1" />
            <span>12 in development</span>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800">
                ${stats.totalRevenue.toLocaleString()}
              </h3>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="text-green-600" size={20} />
            </div>
          </div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUp size={16} className="mr-1" />
            <span>↑ {stats.revenueChange}% from last month</span>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Tasks Completed Card */}
        {/* <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tasks Completed</p>
              <h3 className="text-xl font-bold text-gray-800">
                {stats.tasksCompleted}%
              </h3>
            </div>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${stats.tasksCompleted}%` }}
            ></div>
          </div>
        </div> */}

        {/* User Activity Card */}

        {/* System Health Card */}
        {/* <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <Briefcase className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">System Health</p>
              <h3 className="text-xl font-bold text-gray-800">Excellent</h3>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            All systems operational
          </div>
        </div>
           */}
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8 bg-white p-4 md:p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-start pb-4 border-b border-gray-100 last:border-0"
            >
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Users className="text-blue-600" size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  New user registration
                </p>
                <p className="text-xs text-gray-500">
                  User #{item}234 registered 2 hours ago
                </p>
              </div>
              <div className="ml-auto text-xs text-gray-500">Just now</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
