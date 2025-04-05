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
  Avatar,
  Modal,
} from "@mantine/core";
import { useState } from "react";
import AlertLoading from "./AlertLoading";
import AlertSuccess from "./AlertSuccess";
import AlertError from "./AlertError";

const FacultyCard = ({
  facultyid,
  firstname,
  lastname,
  phoneNo,
  email,
  department,
  imageurl,
  updateFacultyModal,
}) => {
  const [opened, setOpened] = useState(false);
  const [alertbox, setAlertbox] = useState("");
  const handleEdit = () => {
    updateFacultyModal(facultyid);
  };

  const handleDelete = async () => {
    if (facultyid) {
      setAlertbox(<AlertLoading />);
      const res = await fetch("/api/deletefaculty", {
        method: "POST",
        body: JSON.stringify({
          facultyid,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setAlertbox(
          <AlertSuccess
            title={"Done"}
            message={data.message}
            close={() => setAlertbox("")}
          />
        );
        setOpened(false);
      } else {
        setAlertbox(
          <AlertError
            title={"Error"}
            message={data.message}
            close={() => setAlertbox("")}
          />
        );
        setOpened(false);
      }
    }
  };
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      style={{ maxWidth: 350, margin: "auto" }}
    >
      <Center>
        <Avatar src={imageurl} size={80} />
      </Center>
      <Title order={4} style={{ marginBottom: "10px" }}>
        {firstname} {lastname}
      </Title>
      <Stack spacing="xs">
        <Text>
          <strong>Email:</strong> {email}
        </Text>
        <Text>
          <strong>Phone No:</strong> {phoneNo}
        </Text>
        <Text>
          <strong>Department:</strong> {department}
        </Text>
      </Stack>
      <Group position="apart" style={{ marginTop: "20px" }}>
        <Button onClick={handleEdit} color="blue" variant="light">
          Edit
        </Button>
        <Button onClick={() => setOpened(true)} color="red" variant="light">
          Delete
        </Button>
      </Group>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Confirm Deletion"
        centered
      >
        <Text>Are you sure you want to delete this faculty?</Text>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
          }}
        >
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Confirm
          </Button>
        </div>
      </Modal>
      {alertbox}
    </Card>
  );
};

export default FacultyCard;
