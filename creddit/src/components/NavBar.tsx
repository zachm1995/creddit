import React from "react";
import { Box, Link, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  // Loading data
  if (fetching) {
  }

  // No user authenticated
  else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>

        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
  }

  // User authenticated
  else {
    body = (
      <Flex>
        <Box mr={5}>{data.me.username}</Box>
        <Button
          variant="link"
          onClick={() => logout()}
          isLoading={logoutFetching}
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tomato" p={5}>
      <Box ml={"auto"} color={"white"}>
        {body}
      </Box>
    </Flex>
  );
};

export default NavBar;
