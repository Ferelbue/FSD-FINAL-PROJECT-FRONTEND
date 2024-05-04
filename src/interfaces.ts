export interface DataFetched {
    message: string,
    data: any[],
    success: boolean
}

export interface DataFetched2 {
    message: string,
    data: any,
    success: boolean
}

export interface CustomInputProps {
    className: string,
    type: string,
    name: string,
    placeholder: string,
    min: string,
    value: string | undefined,
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface CustomInputProps1 {
    className: string,
    type: string,
    name: string,
    placeholder: string,
    value: string | undefined,
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CustomInputProps2 {
    className: string,
    placeholder: string,
    name: string,
    disabled: boolean,
    value: string | undefined,
    onChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export interface CustomInputProps3 {
    className: string,
    type: string,
    placeholder: string,
    name: string,
    disabled: boolean,
    value: string | undefined,
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface CustomInputProps4 {
    className: string,
    type: string,
    name: string,
    placeholder: string,
    disabled: boolean,
    value: string | undefined,
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    hourPrice: number;
    dayPrice: number;
    category: { name: string };
}

export interface LoginData {
    email: string,
    password: string
}

export interface ReduxData {
    user: {
        credentials: {
            token: string | undefined,
            user: {
                userId: number | undefined,
                roleName: string | undefined,
                userName: string | undefined,
                iat: number | undefined,
                exp: number | undefined
            }
        }
    },
    category: {
        category: {
            id: number | undefined,
        }
    }
}

// interface AnyReactComponentProps {
//     text: string;
//     lat: number;
//     lng: number;
// }

export interface UserUpdateData{
    name: string,
    lastName: string,
    image: string,
    city: string,
}
export interface UserUpdateRole{
    role: string
}