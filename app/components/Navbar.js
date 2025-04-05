"use client";
import { IconSearch, IconUser } from "@tabler/icons-react";
import {
  Autocomplete,
  Burger,
  Drawer,
  Flex,
  Group,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderSearch.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const links = [
  { link: "/", label: "Home" },
  { link: "/addfaculty", label: "Add Faculty" },
];

const Navbar = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const router = useRouter();
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => {
        event.preventDefault();
        router.push(link.link);
        toggle()
      }}
    >
      {link.label}
    </a>
  ));
  return (
    <>
      <header className={classes.header}>
        <div className={classes.inner}>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              size="sm"
              hiddenFrom="sm"
            />
            <Group>
              <Image
                src={"/attendencelogo.png"}
                width={50}
                height={50}
                alt="logo"
              />
              <Title size={20}>Attendance Panel</Title>
            </Group>
          </Group>

          <Group>
            <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
              {items}
            </Group>
          </Group>
          <Drawer
            opened={opened}
            onClose={toggle}
            size="100%"
            padding="md"
            title="Navigation"
            hiddenFrom="sm"
            zIndex={1000000}
          >
            <Flex gap={5} direction={"column"}>
              {items}
            </Flex>
          </Drawer>
        </div>
      </header>
    </>
  );
};

export default Navbar;
