import verifyuser from "../db/verifyuser";
import FacultyModel from "../db/models/facultySchema";

export const POST = async (req, res) => {
  const userdata = verifyuser({ req });
  const { facultyid } = await req.json();
  try {
    if (userdata.user.email === process.env.NEXTAUTH_ADMINEMAIL) {
      if (facultyid) {
        const deletefaculty = await FacultyModel.deleteOne({ _id: facultyid });
        return Response.json({
          message: "Record Deleted",
          success: true,
        });
      }
    } else {
      return Response.json({
        message: "Unauthorised access denied",
        success: false,
      });
    }
  } catch (error) {
    return Response.json({
      message: "Internal server Error",
      success: false,
    });
  }
  return Response.json({
    message: "Internal server Error",
    success: false,
  });
};
