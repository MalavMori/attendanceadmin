"use client";
import { Button, Card, Center, Group, Title } from "@mantine/core";
import React from "react";
import { signIn } from "next-auth/react";
import { IconBrandGoogle } from "@tabler/icons-react";
const Login = () => {
  const handleGoogleLogin = () => {
    signIn("google");
    console.log("login in google");
  };
  return (
    <>
      <div
        style={{
          // background:"rgb(238 238 238)",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          shadow="xl"
          padding="lg"
          radius="lg"
          style={{ width: 400, backgroundColor: "#ffffffdd" }}
        >
          <Title
            order={2}
            align="center"
            style={{ marginBottom: "20px", color: "#6C63FF" }}
          >
            Hello Admin
          </Title>
          <Center>
            <Group position="center" style={{ marginBottom: "10px" }}>
              <Button
                color="gray"
                onClick={handleGoogleLogin}
                leftSection={<IconBrandGoogle />}
                size="md"
                radius="md"
                style={{
                  border: "1px solid #d3d3d3",
                  backgroundColor: "#fff",
                  color: "#000",
                  fontWeight: "bold",
                }}
              >
                Login with Google
              </Button>
            </Group>
          </Center>
        </Card>
      </div>
    </>
  );
};

export default Login;
