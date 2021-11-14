import ModeToggle from "../components/ModeToggle";
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
    Spinner
  } from '@chakra-ui/react';
import { useState } from "react";
import api from "../services/OnItApi";
//from "@chakra-ui/react";

/* https://blog.logrocket.com/how-to-create-forms-with-chakra-ui-in-react-apps/ */

function Login(props) {

    //var api = new OnItApi();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confpassword, setConfPassword] = useState("");
    const [signup, setSignup] = useState(props.signup);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        //TODO Contact API
        //Send necessary info back to parent
        setLoading(true);
        if(signup) {
            try{
                //console.log(api.register(email, password));
                props.auth(true);
            } catch (err) {
                console.log(err);
            }
        } else {
            try{
                //console.log(api.login(email, password));
                props.auth(true);
            } catch(err) {
                console.log(err);
            }
        }
        //TODO Error Handling
    }

    return (<>
        <Flex width="full" align="right" justifyContent="center">
            <Spacer />
            <Box p={10} maxWidth="500px" maxHeight={signup ? "500px" : "430px"} borderWidth={1} borderRadius={8} boxShadow="md" textAlign="center">
            <Heading m={3}>On-It</Heading>
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
                        {signup ? (
                            <FormControl mt={6} isRequired>
                                <Input type="password" placeholder="*******" onChange={(event)=>{setConfPassword(event.target.value)}}/>
                            </FormControl>
                        ) : (<></>)}
                        <Button width="full" mt={4} type="submit">{loading ? (<Spinner />) : (signup ? "Sign Up" : "Login")}</Button>
                    </form>
                </Box>
                <Link onClick={()=>{setSignup(!signup)}} textAlign="center">Need to {!signup ? "sign up" : "login"}? Click here</Link>
            </Box>
            <Spacer />
        </Flex>
    </>);
}

export default Login;