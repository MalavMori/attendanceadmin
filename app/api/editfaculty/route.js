import verifyuser from "../db/verifyuser";
import FacultyModel from "../db/models/facultySchema";

export const POST = async (req, res) => {
  const userdata = verifyuser({ req });
  const { facultydata } = await req.json();
  try {
    if (userdata.user.email === process.env.NEXTAUTH_ADMINEMAIL) {
      if (
        Object.values(facultydata).find((value) => value.toString().trim() === "") ==
        undefined
      ) {
        const updatefaculty = await FacultyModel.updateOne(
          {
            _id: facultydata._id,
          },
          {
            $set: {
              firstname: facultydata.firstname,
              lastname: facultydata.lastname,
              phoneNo: facultydata.phoneNo,
              email: facultydata.email,
              department: facultydata.department,
            },
          }
        );
        return Response.json({
          message: "Record Updated",
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
