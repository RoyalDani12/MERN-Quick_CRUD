import usermodel from "../models/usermodel.js";

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Check if user exists before trying to delete
    const isExist = await usermodel.findById(id);
    if (!isExist) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Perform the deletion
    await usermodel.findByIdAndDelete(id);

    // 3. Success response
    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    console.error("Delete Error:", error.message);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default deleteUser;