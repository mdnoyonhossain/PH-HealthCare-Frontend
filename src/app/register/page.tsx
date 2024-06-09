"use client"
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import assets from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/services/actions/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const patientValidationSchema = z.object({
    name: z.string().min(1, "Please enter your name!"),
    email: z.string().email("Please enter a valid email address!"),
    contactNumber: z.string().regex(/^\d{11}$/, "Please provide a valid phone number!"),
    address: z.string().min(1, "Please enter your address!")
});

export const validationSchema = z.object({
    password: z.string().min(6, "Must be at least 6 characters"),
    patient: patientValidationSchema
});

export const defaultValue = {
    password: "",
    patient: {
        name: "",
        email: "",
        contactNumber: "",
        address: ""
    }
}

const RegisterPage = () => {
    const router = useRouter();

    const handleRegister = async (values: FieldValues) => {
        const data = modifyPayload(values);

        try {
            const res = await registerPatient(data);
            if (res?.data?.id) {
                toast.success(res?.message);

                const result = await userLogin({ password: values.password, email: values.patient.email });
                if (result?.data?.accessToken) {
                    storeUserInfo({ accessToken: result?.data?.accessToken });
                    router.push('/dashboard');
                }
            }
        } catch (err: any) {
            console.error(err.message);
        }
    }

    return (
        <Container>
            <Stack sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ maxWidth: 600, width: "100%", boxShadow: 1, borderRadius: 1, padding: 4, textAlign: "center" }}>
                    <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                        <Box>
                            <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight={600}>Patient Register</Typography>
                        </Box>
                    </Stack>
                    <Box>
                        <PHForm onSubmit={handleRegister} resolver={zodResolver(validationSchema)} defaultValues={defaultValue}>
                            <Grid container spacing={2} my={1}>
                                <Grid item md={12}>
                                    <PHInput name="patient.name" label="Name" fullWidth={true} />
                                </Grid>
                                <Grid item md={6}>
                                    <PHInput type="email" name="patient.email" label="Email" fullWidth={true} />
                                </Grid>
                                <Grid item md={6}>
                                    <PHInput type="password" name="password" label="Password" fullWidth={true} />
                                </Grid>
                                <Grid item md={6}>
                                    <PHInput type="tel" name="patient.contactNumber" label="Contract Number" fullWidth={true} />
                                </Grid>
                                <Grid item md={6}>
                                    <PHInput name="patient.address" label="Address" fullWidth={true} />
                                </Grid>
                            </Grid>
                            <Button type="submit" fullWidth sx={{ margin: "20px 0 15px 0" }}>Register</Button>
                            <Typography component="p" fontWeight={300}>Do you already have an account? <Link href="/login">Login</Link></Typography>
                        </PHForm>
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
};

export default RegisterPage;