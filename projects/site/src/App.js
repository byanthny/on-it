import { Box, Flex } from "@chakra-ui/react";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import ModeToggle from "src/components/ModeToggle";
import { useState } from "react";

function App() {
  const [auth, setAuth] = useState(false);
    return(

        <Flex width="100vw" height="100vh" pt={30}>
            <Box pos="absolute" bottom="5" right="5">
                < ModeToggle />
            </Box>
            {!auth ? <Login signup={false} auth={setAuth} /> : <Overview />}
            {/* <Text fontSize="md" textAlign="center">Coming Soon!</Text> */}
        </Flex>
    );
}

export default App;