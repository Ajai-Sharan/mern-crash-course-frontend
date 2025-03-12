import { toaster } from '@/components/ui/toaster'
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '@/store/product.store'
import {
    Container,
    Input,
    Button,
    Box,
    VStack,
    Text,
} from '@chakra-ui/react'
import { useState } from 'react'

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    })

    const { createProduct } = useProductStore();
    const navigate = useNavigate();

    const handleOnClick = async (e) => {
        e.preventDefault();
        const { success, message } = await createProduct(newProduct);
        console.log("Success: ", success);
        console.log("Message: ", message);

        if (success) {
            toaster.create({
                description: message,
                type: "success",
            })
            setNewProduct({name : "", price : "", image : ""});
            navigate('/'); // Navigate to the home page
        } else {
            toaster.create({
                description: message,
                type: "error",
            })
        }
    }

    return (
        <Container maxW="2xl" py={8}>
            <Box
                as="form"
                p={6}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="lg"
            >
                <VStack spacing={4}>
                    <Box width="100%">
                        <Text mb={2} fontWeight="medium">Product Name</Text>
                        <Input
                            name="name"
                            placeholder="Enter product name"
                            size="lg"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                    </Box>

                    <Box width="100%">
                        <Text mb={2} fontWeight="medium">Price</Text>
                        <Input
                            name="price"
                            placeholder="Enter price"
                            size="lg"
                            type='text'
                            inputMode='numeric'
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                    </Box>

                    <Box width="100%">
                        <Text mb={2} fontWeight="medium">Image URL</Text>
                        <Input
                            name="imageUrl"
                            placeholder="Enter image URL"
                            size="lg"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        />
                    </Box>

                    <Button
                        mt={4}
                        type="submit"
                        colorScheme="blue"
                        alignSelf="flex-start"
                        width="full"
                        onClick={handleOnClick}
                    >
                        Create Product
                    </Button>
                </VStack>
            </Box>
        </Container>
    )
}

export default CreatePage