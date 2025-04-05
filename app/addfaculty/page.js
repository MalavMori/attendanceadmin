"use client";
import {
  TextInput,
  NumberInput,
  Button,
  Group,
  Select,
  Box,
  Title,
  Card,
  Paper,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import AlertLoading from "../components/AlertLoading";
import AlertSuccess from "../components/AlertSuccess";
import AlertError from "../components/AlertError";

const AddFaculty = () => {
  const [alertbox, setAlertbox] = useState("");

  const form = useForm({
    initialValues: {
      firstname: "",
      lastname: "",
      phoneNo: "",
      email: "",
      department: "",
    },

    validate: {
      firstname: (value) => (value ? null : "First name is required"),
      lastname: (value) => (value ? null : "Last name is required"),
      phoneNo: (value) =>
        /^\d{10}$/.test(value) ? null : "Enter a valid 10-digit phone number",
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Enter a valid email address",
      department: (value) => (value ? null : "Department is required"),
    },
  });
  const handleSubmit = async (values) => {
    setAlertbox(<AlertLoading />);
    const res = await fetch("/api/addfaculty", {
      method: "POST",
      body: JSON.stringify({
        facultydata: { ...values },
      }),
    });
    const data = await res.json();
    if (data.success) {
      setAlertbox(
        <AlertSuccess
          title={"Done"}
          message={data.message}
          close={() => setAlertbox("")}
        />
      );
    } else {
      setAlertbox(
        <AlertError
          title={"Error"}
          message={data.message}
          close={() => setAlertbox("")}
        />
      );
    }
  };
  return (
    <Paper
      style={{ maxWidth: 350, margin: "auto", padding: 20 }}
      radius={"md"}
      shadow="md"
    >
      <Box>
        <Title order={3} align="center" style={{ marginBottom: 20 }}>
          Add Faculty Details
        </Title>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            label="First Name"
            placeholder="Enter first name"
            {...form.getInputProps("firstname")}
            required
          />
          <TextInput
            label="Last Name"
            placeholder="Enter last name"
            {...form.getInputProps("lastname")}
            required
            style={{ marginTop: 10 }}
          />
          <NumberInput
            label="Phone Number"
            placeholder="Enter phone number"
            {...form.getInputProps("phoneNo")}
            required
            style={{ marginTop: 10 }}
          />
          <TextInput
            label="Email"
            placeholder="Enter email"
            {...form.getInputProps("email")}
            required
            style={{ marginTop: 10 }}
          />
          <Select
            label="Department"
            placeholder="Select department"
            data={[
              { value: "Computer Engineering", label: "Computer Engineering" },
              {
                value: "Electrical Engineering",
                label: "Electrica  Engineering",
              },
              {
                value: "Mechanical Engineering",
                label: "Mechanical Engineering",
              },
              { value: "Chemical Engineering", label: "Chemical Engineering" },
              { value: "Civil Engineering", label: "Civil Engineering" },
            ]}
            s
            {...form.getInputProps("department")}
            required
            style={{ marginTop: 10 }}
          />
          <Center>
            <Group position="center" style={{ marginTop: 20 }}>
              <Button type="submit" color="blue">
                Submit
              </Button>
            </Group>
          </Center>
        </form>
      </Box>
      {alertbox}
    </Paper>
  );
};

export default AddFaculty;
