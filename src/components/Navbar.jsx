import {
    Container,
    Flex,
    HStack,
    Text,
    IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { ColorModeButton, useColorModeValue } from "./ui/color-mode";

const Navbar = () => {
    
    return (
        <Container maxW={"1140px"} mt={4} px={4} borderRadius="lg" boxShadow={"lg"}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row",
                }}
            >
                <Text
                    fontSize={{ base: "22px", sm: "28px" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient="to-r"
                    gradientFrom="cyan.400"
                    gradientTo="blue.500"
                    bgClip={"text"}
                >
                    <Link to={"/"}>Product Store 🛒</Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <IconButton
                            variant="ghost"
                            aria-label="Create Product"
                            size="lg"
                        >
                            <CiSquarePlus fontSize={"50px"} color={useColorModeValue("black", "white")} />

                            </IconButton>

                    </Link>
                    <ColorModeButton />
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;