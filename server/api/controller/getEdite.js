import usermodel from "../models/usermodel.js";

const getEdite = async (req, res) => {
  try {
    const { id } = req.params;

    // Search for the user by ID
    const isMatch = await usermodel.findById(id);

    //  If no user is found, STOP and return error
    if (!isMatch) {
      return res.status(404).json({ message: "User not found" });
    }

    //  If found, send the user data
    res.status(200).json(isMatch);

  } catch (error) {
    // Log the error in your terminal for debugging
    console.error("Error in getEdite:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default getEdite;