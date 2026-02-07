import usermodel from "../models/usermodel.js";

const getUser = async (req, res) => {
  try {
    // 1. You MUST use await to get the actual data
    const users = await usermodel.find();

    // 2. Check if the array is empty using .length
    if (users.length === 0) {
      return res.status(404).json({ message: "No data in the database" });
    }

    // 3. Send the actual users array
    res.status(200).json(users);

  } catch (error) {
    // 4. Always wrap in try/catch for safety
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export default getUser;