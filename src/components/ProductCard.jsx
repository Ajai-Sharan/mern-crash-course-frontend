import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
	Box,
	Button,
	Heading,
	HStack,
	Icon,
	IconButton,
	Image,
	Input,
	// Modal,
	// ModalBody,
	// ModalCloseButton,
	// ModalContent,
	// ModalFooter,
	// ModalHeader,
	// ModalOverlay,
	Text,
	// useColorModeValue,
	// useDisclosure,
	// useToast,
	VStack,
	CloseButton,
	Dialog,
	Portal,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "../store/product.store.js";
import { toaster } from "./ui/toaster";
import { useState } from "react";


const ProductCard = ({ product }) => {


	const [open, setOpen] = useState(false);
	const [updatedProduct, setUpdatedProduct] = useState(product);


	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { deleteProduct, updateProduct } = useProductStore();

	const handleDelete = async (pid) => {
		const { success, message } = await deleteProduct(pid);

		if (success) {
			toaster.create({
				description: message,
				type: "success",
			})
		} else {
			toaster.create({
				description: message,
				type: "error",
			})
		}

	}

	const handleOnSave = async (pid, updatedProduct) => {
		const {success, message} = await updateProduct(pid, updatedProduct);

		if (success) {
			toaster.create({
				description: message,
				type: "success",
			})
			setOpen(false);
		} else {
			toaster.create({
				description: message,
				type: "error",
			})
			
		}
		
	}




	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					${product.price}
				</Text>

				<HStack spacing={4}>

					<Icon color='blue' onClick={() => setOpen(true)}>
						<FaEdit size={"25px"}/>
					</Icon>

					<Icon color='red' onClick={() => handleDelete(product._id)}>
						<RiDeleteBin6Line size={"25px"} />
					</Icon>
				</HStack>
			</Box>


			<Dialog.Root open = {open} key={"UpdateBox"} placement={"center"} >
						
						<Portal>
							<Dialog.Backdrop />
							<Dialog.Positioner>
								<Dialog.Content>
									<Dialog.Header>
										<Dialog.Title>Update Product</Dialog.Title>
									</Dialog.Header>
									<Dialog.Body>
										
											<VStack spacing={4}>
												<Box width="100%">
													<Text mb={2} fontWeight="medium">Product Name</Text>
													<Input
														name="name"
														placeholder="Enter product name"
														size="lg"
														value={updatedProduct.name}
														onChange={(e) => setUpdatedProduct({... product, name : e.target.value})}
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
														value={updatedProduct.price}
														onChange={(e) => setUpdatedProduct({... product, price : e.target.value})}
													/>
												</Box>
			
												<Box width="100%">
													<Text mb={2} fontWeight="medium">Image URL</Text>
													<Input
														name="imageUrl"
														placeholder="Enter image URL"
														size="lg"
														value={updatedProduct.image}
														onChange={(e) => setUpdatedProduct({... product, image : e.target.value})}
													/>
												</Box>
		
											</VStack>
									</Dialog.Body>
									<Dialog.Footer>
                                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                                <Button onClick={() => handleOnSave(product._id, updatedProduct)}>Save</Button>
                            </Dialog.Footer>
							<Dialog.CloseTrigger asChild>
							<CloseButton size="sm" onClick={() => setOpen(false)} />
							</Dialog.CloseTrigger>
                            
								</Dialog.Content>
							</Dialog.Positioner>
						</Portal>
					</Dialog.Root>



		</Box>
	);
};
export default ProductCard;