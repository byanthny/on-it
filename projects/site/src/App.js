import { Box, Flex } from "@chakra-ui/react";
import Login from "./pages/auth/Login";
import ModeToggle from "src/components/ModeToggle";

function App() {
    return(
        <Flex width="100vw" height="100vh" pt={30}>
            <Box pos="absolute" bottom="5" right="5">
                < ModeToggle />
            </Box>
            <Login signup={false} />
            {/* <Text fontSize="md" textAlign="center">Coming Soon!</Text> */}
        </Flex>
    );
}

export default App;