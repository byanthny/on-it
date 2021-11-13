import ModeToggle from "../../components/ModeToggle";
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Spacer,
    Link,
    CircularProgress
  } from '@chakra-ui/react';
import { useState } from "react";
import { userSchema } from "common";
//from "@chakra-ui/react";

/* https://blog.logrocket.com/how-to-create-forms-with-chakra-ui-in-react-apps/ */

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => { console.log(`Email: ${email} Password: ${password}`) }, 2000);
        setLoading(false);

    }

    const login = () => {

    }

    return (<>
        < ModeToggle />
        <Flex width="full" align="right" justifyContent="center">
            <Spacer />
            <Box p={10} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="md" textAlign="center">
            <Heading m={3}>On - {"\n"}It</Heading>
                <Box textAlign="center">
                    {/* <Heading>Login</Heading> */}
                </Box>
                <Box my={4} textAlign="left">
                    <form onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" placeholder="email@gmail.com"  onChange={(event)=>{setEmail(event.target.value)}}/>
                        </FormControl>
                        <FormControl mt={6} isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="*******" onChange={(event)=>{setPassword(event.target.value)}}/>
                        </FormControl>
                        <Button width="full" mt={4} type="submit">{loading ? <CircularProgress isIndeterminate size="24px" /> : ("Login In")}</Button>
                    </form>
                </Box>
                <Link textAlign="center">Need to sign up? Click here</Link>
            </Box>
            <Spacer />
        </Flex>
    </>);
}

export default Login;