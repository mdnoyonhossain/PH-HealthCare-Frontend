import { USER_ROLE } from "@/constants/role";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type TMeta = {
    page: number;
    limit: number;
    total: number;
}

export type UserRole = keyof typeof USER_ROLE;

export interface DrawerItem {
    title: string;
    path: string;
    parentPath?: string;
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
    child?: DrawerItem[];
}

export type ResponseSuccessType = {
    data: any;
    meta?: TMeta;
};

export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: TGenericErrorMessage[];
};

export type TGenericErrorMessage = {
    path: string | number;
    message: string;
};

export const Gender = ["MALE", "FEMALE"];