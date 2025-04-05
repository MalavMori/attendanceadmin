"use client";
import {
  Card,
  Text,
  Group,
  Button,
  Title,
  Badge,
  Stack,
  Image,
  Center,
  Modal,
} from "@mantine/core";
import { useEffect, useState } from "react";
import FacultyCard from "./components/FacultyCard";
import { useDisclosure } from "@mantine/hooks";
import Editfaculty from "./components/Editfaculty";

const Home = () => {
  const [facultydata, setFacultydata] = useState([]);
  const [editfacultymodal, editfacultymodalFun] = useDisclosure(false);
  const [editFacultydata, setEditFacultydata] = useState({});
  const getfaculty = async () => {
    const res = await fetch("/api/getfaculty", { method: "POST" });
    const data = await res.json();
    if (data.success) {
      setFacultydata(data.payload);
    }
  };
  const updateFacultyModal = (facultyid) => {
    const faculty = facultydata.find((data) => data._id === facultyid);
    if (faculty) {
      setEditFacultydata(faculty);
      editfacultymodalFun.open();
    }
  };
  useEffect(() => {
    getfaculty();
  }, []);
  return (
    <>
      <div>
        {facultydata.map((faculty) => {
          return (
            <FacultyCard
              firstname={faculty.firstname}
              lastname={faculty.lastname}
              department={faculty.department}
              email={faculty.email}
              imageurl={faculty.profile_img}
              phoneNo={faculty.phoneNo}
              updateFacultyModal={updateFacultyModal}
              facultyid={faculty._id}
              key={faculty._id}
            />
          );
        })}
        <Modal
          opened={editfacultymodal}
          onClose={() => {
            editfacultymodalFun.close();
            setEditFacultydata({});
          }}
          title="Edit Faculty"
        >
          <Editfaculty close={editfacultymodalFun.close} initialValues={{ ...editFacultydata }} />
        </Modal>
      </div>
    </>
  );
};
export default Home;
