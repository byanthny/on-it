import { useColorMode, Button } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons'


function ModeToggle() {
    const { colorMode, toggleColorMode } = useColorMode();
    return(
        <Button align="center" my={1} p={2} size="lg" onClick={toggleColorMode} >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
    );
}

export default ModeToggle;