import verifyuser from "../db/verifyuser";
import FacultyModel from "../db/models/facultySchema";

export const POST = async (req, res) => {
  const userdata = verifyuser({ req });
  try {
    if (userdata.user.email === process.env.NEXTAUTH_ADMINEMAIL) {
      const faculty = await FacultyModel.find({});
      return Response.json({
        payload: faculty,
        message: "Record found",
        success: true,
      });
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
};
