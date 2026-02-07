import usermodel from "../models/usermodel.js"

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email } = req.body;

    // Perform the update
    const updateduser = await usermodel.findByIdAndUpdate(
      id, 
      { name, age, email }, 
      { new: true }
    );

    // If no user was found with that ID, return 404
    if (!updateduser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Success response
    res.status(200).json(updateduser);

  } catch (error) {
    // Log the actual error for you to see in terminal
    console.error(error); 
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export default updateUser;