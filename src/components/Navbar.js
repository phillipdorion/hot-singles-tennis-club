import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Link, Button } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          <Link as={RouterLink} to="/" color="white" fontWeight="bold">
            Hot Singles Tennis Club
          </Link>
        </Box>

        <Flex alignItems={'center'}>
          <Link as={RouterLink} to="/matchlogging" color="white" mr={4}>
            Log Match
          </Link>
          <Link as={RouterLink} to="/members" color="white" mr={4}>
            Members
          </Link>
          <Link as={RouterLink} to="/resources" color="white" mr={4}>
            Resources
          </Link>
          {currentUser ? (
            <>
              <Link as={RouterLink} to="/profile" color="white" mr={4}>
                Profile
              </Link>
              <Button onClick={logout} colorScheme="red" size="sm">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link as={RouterLink} to="/login" color="white" mr={4}>
                Login
              </Link>
              <Link as={RouterLink} to="/register" color="white">
                Register
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;