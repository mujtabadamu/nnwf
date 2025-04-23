function Dashboard() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <h3 className="font-medium text-gray-800 mb-4">Card {item}</h3>
            <p className="text-gray-600">
              This is a sample content card that demonstrates the responsive
              layout.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
