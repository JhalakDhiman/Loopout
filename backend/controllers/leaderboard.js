// controllers/leaderboardController.js
import User from '../models/user.js'

export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({})
      .sort({ points: -1 }) // sort in descending order of points
      .select('firstName lastName email points image'); // return only required fields

    return res.status(200).json({
      success: true,
      message:"leaderboard is here",
      data: users,
    });

  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch leaderboard',
    });
  }
};
