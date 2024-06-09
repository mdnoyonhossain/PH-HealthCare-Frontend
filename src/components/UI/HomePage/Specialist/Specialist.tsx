import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

const Specialist = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/specialties`, {
        next: {
            revalidate: 30
        }
    });
    const { data: specialties } = await res.json();

    return (
        <Container>
            <Box sx={{ margin: "40px 0px", textAlign: "center" }}>
                <Box sx={{ textAlign: "start" }}>
                    <Typography variant="h4" fontWeight={600}>Explore Treatments Across Specialites</Typography>
                    <Typography component="p" fontWeight={300} fontSize={18}>Find Experienced Doctors Across All Specialties</Typography>
                </Box>
                <Stack direction="row" gap={4} mt={5}>
                    {
                        specialties?.slice(0, 6)?.map((specialty: any) => <Box key={specialty.id} sx={{
                            flex: 1,
                            width: "150px",
                            backgroundColor: "rgba(245, 245, 245, 1)",
                            border: "2px solid rgba(250, 250, 250, 1)",
                            borderRadius: "10px",
                            textAlign: "center",
                            padding: "40px 10px",
                            "& img": {
                                width: "50px",
                                height: "50px",
                                margin: "0 auto"
                            },
                            "&:hover": {
                                border: "2px solid #0E82FD",
                                padding: "40px 10px",
                                borderRadius: "10px"
                            }
                        }}>
                            <Image src={specialty.icon} width={100} height={100} alt="Specialty Icon" />
                            <Box>
                                <Typography component="p" fontWeight={600} fontSize={18} mt={1}>{specialty.title}</Typography>
                            </Box>
                        </Box>)
                    }
                </Stack>
                <Button variant="outlined" sx={{ marginTop: "40px" }}>View ALL</Button>
            </Box>
        </Container>
    );
};

export default Specialist;