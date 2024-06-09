"use client";
import { useGetMYProfileQuery, useUpdateMyProfileMutation } from "@/redux/api/myProfile";
import { Box, Button, Container, Stack, Typography, styled } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Image from "next/image";
import DoctorInformations from "./components/DoctorInformations";
import AutoFileUploader from "@/components/Forms/AutoFileUploader";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useState } from "react";
import ProfileUpdateModal from "./components/ProfileUpdateModal";

const StyledInformationBox = styled(Box)(({ theme }) => ({
    background: '#f4f7fe',
    borderRadius: theme.spacing(1),
    width: '45%',
    padding: '8px 16px',
    "& p": {
        fontWeight: 600
    }
}));

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, isLoading } = useGetMYProfileQuery(undefined);
    const [updateMyProfile, { isLoading: updating }] = useUpdateMyProfileMutation();

    const fileUploadHandler = (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify({}));

        updateMyProfile(formData);
    };

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <ProfileUpdateModal open={isModalOpen} setOpen={setIsModalOpen} id={data?.id} />
            <Container sx={{mt: 3}}>
                <Grid container spacing={4}>
                    <Grid xs={12} md={4}>
                        <Box sx={{ height: 300, width: '100%', overflow: 'hidden', borderRadius: 1 }}>
                            <Image height={300} width={400} src={data?.profilePhoto} alt='User Photo' />
                        </Box>
                        <Box my={2}>
                            {updating ? (
                                <p>Uploading...</p>
                            ) : (
                                <AutoFileUploader
                                    name='file'
                                    label='Choose Profile Photo'
                                    icon={<CloudUploadIcon />}
                                    onFileUpload={fileUploadHandler}
                                    variant='text'
                                />
                            )}
                        </Box>
                        <Button fullWidth endIcon={<ModeEditIcon />} onClick={() => setIsModalOpen(true)} >
                            Edit Profile
                        </Button>
                    </Grid>
                    <Grid xs={12} md={8}>
                        <DoctorInformations data={data} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Profile;