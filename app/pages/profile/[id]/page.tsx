
export default async  function UserProfile(props: any) {

   const params = await props.params;
  return (
    <div className="min-h-screen flex items-center justify-center">
      
      <div className=" border shadow-lg rounded-2xl p-6 w-80 text-center">
        <h2>{JSON.stringify(params)}</h2>
        {/* Profile Image */}
        <div className="flex justify-center bg-white">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-gray-200"
          />
        </div>

        {/* User Info */}
        <h2 className="text-xl font-semibold mt-4">{params.id}</h2>
        <p className="text-gray-500">{params.id}</p>
        <p className="text-sm text-gray-400 mt-1">{params.id}</p>

        {/* Buttons */}
        <div className="mt-4 flex gap-2 justify-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Edit
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}