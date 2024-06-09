import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
    name: string;
    type?: string;
    fullWidth?: boolean;
    size?: "small" | "medium";
    label?: string;
    sx?: SxProps;
    placeholder?: string;
    required?: boolean;
}

const PHInput = ({ name, type, fullWidth, size = "small", label, sx, placeholder, required }: TInputProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    sx={{ ...sx }}
                    type={type}
                    fullWidth={fullWidth}
                    size={size}
                    label={label}
                    variant="outlined"
                    placeholder={label}
                    required={required}
                    error={!!error?.message}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export default PHInput;