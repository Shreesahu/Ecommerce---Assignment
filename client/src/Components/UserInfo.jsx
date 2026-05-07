export default function UserInfo({ user }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      {console.log(user , "users")}
      <p><strong>Name:</strong> {user.fullName}</p>
      <p><strong>Phone:</strong> {user.mobile}</p>

    </div>
  );
}