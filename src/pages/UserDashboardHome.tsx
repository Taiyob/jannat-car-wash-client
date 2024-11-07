import React from "react";

const UserDashboardHome = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-6">User Dashboard Home</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-blue-600 bg-opacity-75 rounded-full">
              <svg
                className="w-8 h-8 text-white"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 2C7.373 2 2 7.373 2 14c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.627-5.373-12-12-12zm0 22C8.486 24 4 19.514 4 14S8.486 4 14 4s10 4.486 10 10-4.486 10-10 10z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="ml-5">
              <h4 className="text-2xl font-semibold text-gray-700">8,282</h4>
              <div className="text-gray-500">New Users</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-orange-600 bg-opacity-75 rounded-full">
              <svg
                className="w-8 h-8 text-white"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.2 1.4C3.427 1.4 2.8 2.027 2.8 2.8c0 .573 0 3.573 1.4 4.2h1.707L6.334 5.911C6.339 5.931 6.344 5.951 6.349 5.97l1.9 7.61-1.25 1.25C5.236 16.584 6.485 19.6 8.98 19.6h12.02c.773 0 1.4-.627 1.4-1.4 0-.773-.627-1.4-1.4-1.4H8.98l1.4-1.4h8.4c.53 0 1.015-.3 1.252-.674L25.052 6.226c.217-.434.194-.949-.061-1.362C24.736 4.451 24.285 4.2 23.8 4.2H8.793l-.435-1.739C8.202 1.837 7.642 1.4 6.999 1.4H4.2z"
                  fill="currentColor"
                />
                <path
                  d="M22.4 23.1C22.4 24.26 21.46 25.2 20.3 25.2c-1.16 0-2.3-.94-2.3-1.9 0-1.16 1.14-2.1 2.3-2.1 1.16 0 2.3.94 2.3 2.1z"
                  fill="currentColor"
                />
                <path
                  d="M9.1 25.2c1.16 0 2.1-.94 2.1-1.9 0-1.16-.94-2.1-2.1-2.1-1.16 0-2.1.94-2.1 2.1 0 1.16.94 1.9 2.1 1.9z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="ml-5">
              <h4 className="text-2xl font-semibold text-gray-700">200,521</h4>
              <div className="text-gray-500">Total Orders</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-pink-600 bg-opacity-75 rounded-full">
              <svg
                className="w-8 h-8 text-white"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="ml-5">
              <h4 className="text-2xl font-semibold text-gray-700">215,542</h4>
              <div className="text-gray-500">Available Products</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Title
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Role
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-10 h-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium leading-5 text-gray-900">
                          John Doe
                        </div>
                        <div className="text-sm leading-5 text-gray-500">
                          john@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-900">
                      Software Engineer
                    </div>
                    <div className="text-sm leading-5 text-gray-500">
                      Web dev
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                    Owner
                  </td>
                  <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
