"use client";
import assets from "@/assets";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const validationSchema = z.object({
    email: z.string().email("Please enter a valid email address!"),
    password: z.string().min(6, "Must be at least 6 characters")
});

const LoginPage = () => {
    const router = useRouter();
    const [error, setError] = useState("");

    const handleLogin = async (values: FieldValues) => {
        try {
            const res = await userLogin(values);

            if (res?.data?.accessToken) {
                toast.success(res?.message);
                storeUserInfo({ accessToken: res?.data?.accessToken });
                // router.push('/dashboard');
            }
            else {
                setError(res?.message);
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
                            <Typography variant="h6" fontWeight={600}>Login PH HealthCare</Typography>
                        </Box>
                    </Stack>
                    {error && <Box>
                        <Typography sx={{
                            backgroundColor: "red",
                            padding: "1px",
                            borderRadius: "4px",
                            color: "white",
                            marginTop: "6px"
                        }}>
                            {error}
                        </Typography>
                    </Box>}
                    <Box>
                        <PHForm onSubmit={handleLogin} resolver={zodResolver(validationSchema)} defaultValues={{ email: "", password: "" }}>
                            <Grid container spacing={2} my={1}>
                                <Grid item md={6}>
                                    <PHInput type="email" name="email" label="Email" fullWidth={true} />
                                </Grid>
                                <Grid item md={6}>
                                    <PHInput type="password" name="password" label="Password" fullWidth={true} />
                                </Grid>
                            </Grid>
                            <Link href={'/forgot-password'}><Typography textAlign="end" component="p" fontWeight={300} sx={{ textDecoration: "underline" }}>Forgot Password?</Typography></Link>
                            <Button type="submit" fullWidth sx={{ margin: "20px 0 15px 0" }}>Login</Button>
                            <Typography component="p" fontWeight={300}>Don&apos;t have an account? <Link href="/register">Create an account</Link></Typography>
                        </PHForm>
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
};

export default LoginPage;