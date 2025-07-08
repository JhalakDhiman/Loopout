import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { fetchLeaderboard } from '../services/operations/leaderboardApis';

const Leaderboard = () => {
  const { user,token } = useContext(AuthContext);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentUserRank, setCurrentUserRank] = useState(null);

  useEffect(() => {
    const getLeaderboard = async()=>{
        const res = await fetchLeaderboard({token});
        console.log(res)
        setLeaderboardData(res.data);

        const rank = res?.data.findIndex((u) => u.email === user?.email);
        if (rank !== -1) {
          setCurrentUserRank(rank + 1); // Rank is 1-based
        }
    }


    getLeaderboard();
  }, [user]);

  return (
    <div className="p-6 text-richblack-5">
      <h2 className="text-2xl font-bold mb-4">🏆 Leaderboard</h2>

      {/* Current User's Rank */}
      {user && currentUserRank && (
        <div className="mb-6 bg-richblack-800 p-4 rounded-lg border border-richblack-600">
          <p className="text-yellow-50 font-semibold">
            Your Rank: {currentUserRank}
          </p>
          <div className="flex items-center gap-4 mt-2">
            <img src={user.image} alt="Profile" className="w-12 h-12 rounded-full" />
            <div>
              <p>{user.name}</p>
              <p className="text-sm text-richblack-300">{user.email}</p>
              <p className="text-sm text-yellow-100">Points: {user.points}</p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse border border-richblack-600">
          <thead className="bg-richblack-700">
            <tr>
              <th className="p-3 border border-richblack-600">Rank</th>
              <th className="p-3 border border-richblack-600">User</th>
              <th className="p-3 border border-richblack-600">Email</th>
              <th className="p-3 border border-richblack-600">Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((userItem, index) => (
              <tr
                key={userItem._id}
                className={`${
                  user?.email === userItem.email ? 'bg-yellow-600/20 font-semibold' : ''
                } hover:bg-richblack-800 transition-all`}
              >
                <td className="p-3 border border-richblack-600">{index + 1}</td>
                <td className="p-3 border border-richblack-600 flex items-center gap-2">
                  <img src={userItem.image} className="w-8 h-8 rounded-full" />
                  {userItem.firstName} {userItem.lastName}
                </td>
                <td className="p-3 border border-richblack-600">{userItem.email}</td>
                <td className="p-3 border border-richblack-600">{userItem.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
