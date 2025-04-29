import {
  Download,
  Calendar,
  Clock,
  FileText,
  Bell,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const NotificationsPage = () => {
  // Mock notification data
  const notifications = [
    {
      id: 1,
      type: "document",
      title: "Project Requirements Document",
      description: "New document uploaded for the Spring 2025 project",
      date: "2025-04-15",
      time: "10:30 AM",
      fileUrl: "#",
      read: false,
    },
    {
      id: 2,
      type: "meeting",
      title: "Quarterly Planning Meeting",
      description: "Scheduled for Friday, April 18 at 2:00 PM",
      date: "2025-04-10",
      time: "2:00 PM",
      meetingLink: "#",
      read: false,
    },
    {
      id: 3,
      type: "minutes",
      title: "March Team Meeting Minutes",
      description: "Minutes from the March 28 team meeting are now available",
      date: "2025-04-05",
      time: "11:45 AM",
      fileUrl: "#",
      read: true,
    },
    {
      id: 4,
      type: "document",
      title: "Updated Privacy Policy",
      description: "Please review the updated company privacy policy",
      date: "2025-04-02",
      time: "9:15 AM",
      fileUrl: "#",
      read: true,
    },
  ];

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Bell className="mr-2 text-blue-600" size={24} />
          Notifications
        </h1>
        <button className="text-sm text-blue-600 hover:text-blue-800">
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${
              notification.read ? "border-gray-200" : "border-blue-500"
            } hover:shadow-md transition-shadow`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <div
                  className={`p-2 rounded-lg mr-3 ${
                    notification.read ? "bg-gray-100" : "bg-blue-50"
                  }`}
                >
                  {notification.type === "document" && (
                    <FileText
                      className={
                        notification.read ? "text-gray-600" : "text-blue-600"
                      }
                      size={20}
                    />
                  )}
                  {notification.type === "meeting" && (
                    <Calendar
                      className={
                        notification.read ? "text-gray-600" : "text-orange-600"
                      }
                      size={20}
                    />
                  )}
                  {notification.type === "minutes" && (
                    <FileText
                      className={
                        notification.read ? "text-gray-600" : "text-green-600"
                      }
                      size={20}
                    />
                  )}
                </div>
                <div>
                  <h3
                    className={`font-medium ${
                      notification.read ? "text-gray-700" : "text-gray-900"
                    }`}
                  >
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.description}
                  </p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Clock size={14} className="mr-1" />
                    {notification.date} at {notification.time}
                  </div>
                </div>
              </div>
              {!notification.read && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  New
                </span>
              )}
            </div>

            <div className="mt-3 flex space-x-2">
              {notification.fileUrl && (
                <a
                  href={notification.fileUrl}
                  className="flex items-center text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-gray-700 transition-colors"
                  download
                >
                  <Download size={16} className="mr-1" />
                  Download
                </a>
              )}
              {notification.meetingLink && (
                <a
                  href={notification.meetingLink}
                  className="flex items-center text-sm bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-blue-700 transition-colors"
                >
                  <Calendar size={16} className="mr-1" />
                  Add to Calendar
                </a>
              )}
              <button className="text-sm text-gray-500 hover:text-gray-700 ml-auto">
                {notification.read ? "Mark as unread" : "Mark as read"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {/* <div className="text-center py-12">
        <Bell size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-500">No notifications yet</h3>
        <p className="text-gray-400 mt-1">You'll see notifications here when there's activity</p>
      </div> */}

      {/* Notification Types Filter (uncomment if needed) */}
      {/* <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        <button className="whitespace-nowrap px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
          All Notifications
        </button>
        <button className="whitespace-nowrap px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
          Documents
        </button>
        <button className="whitespace-nowrap px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
          Meetings
        </button>
        <button className="whitespace-nowrap px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
          Minutes
        </button>
      </div> */}
    </div>
  );
};

export default NotificationsPage;
