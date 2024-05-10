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
export interface DataFetched3 {
    message: string,
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
    maxLength: number
}
export interface CustomInputProps5 {
    className: string,
    type: string,
    name: string,
    placeholder: string,
    value: string | undefined,
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CustomInputProps2 {
    className: string,
    placeholder: string,
    name: string,
    disabled: boolean,
    value: string | undefined,
    onChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
    maxLength: number
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
export interface RegisterData {
    name: string,
    lastName: string,
    city: string,
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


export interface UserUpdateData {
    name: string,
    lastName: string,
    image: string,
    city: string,
}
export interface UserUpdateRole {
    role: string
}

export interface ProductData {
    category: { id: number, name: string },
    city: string,
    dayPrice: string,
    description: string,
    hourPrice: string,
    id: number,
    image: string,
    name: string,
    owner: { id: number, name: string },
    starts: number,
    totalReviews: number
}

export type ProductData6 = ProductData[];

export interface UserData {
    city: string,
    email: string,
    id: number,
    image: string,
    lastName: string,
    name: string,
    role: { name: string }
}
export interface ChatData {
    message: string,
    product: { id: number, name: string, image: string },
    updated_at: string,
    userOwner: { id: number, name: string },
    userOwner_notification: boolean,
    userUser: { id: number, name: string },
    userUser_notification: boolean
}
export interface ProductData2 {
    city: string,
    dayPrice: string,
    depositPrice: string,
    description: string,
    hourPrice: string,
    id: number,
    image: string,
    name: string,
    owner: { id: number, name: string },
    reviews: [{
        created_at: string,
        description: string,
        id: number,
        name: string,
        starts: number,
        updated_at: string,
    }],
    starts: number
}
export interface ChatData2 {
    message: string,
    updated_at: string,
    userOwner: { id: number, name: string },
    userOwner_author: boolean,
    userUser: { id: number, name: string },
    userUser_author: boolean
}
export interface DataDeal {
    id: number,
    userOwner: {
        city: string,
        created_at: string,
        email: string,
        id: number,
        image: string,
        is_active: boolean,
        lastName: string,
        name: string,
        passwordHash: string,
        updated_at: string,
        userOwner_confirm: boolean,
    },
    userOwner_confirm: boolean,
    userUser: {
        city: string,
        created_at: string,
        email: string,
        id: number,
        image: string,
        is_active: boolean,
        lastName: string,
        name: string,
        passwordHash: string,
        updated_at: string,
        userOwner_confirm: boolean,
    },
    userUser_confirm: boolean
}
export interface MessageData {
    text: string
}
export interface StarsData {
    stars: number
}
export interface ProductData3 {
    id: number,
    product: {
        available: boolean,
        city: string,
        created_at: string,
        dayPrice: string,
        depositPrice: string,
        description: string,
        hourPrice: string,
        id: number,
        image: string,
        name: string,
        starts: number,
        totalReviews: number,
        updated_at: string
    },
    user: {
        city: string,
        created_at: string,
        email: string,
        id: number,
        image: string,
        is_active: boolean,
        lastName: string,
        name: string,
        passwordHash: string,
        updated_at: string,
    }
}

export interface FavoriteData {
    id: number,
    user: {
        id: number
    }
}

export interface UserData2 {
    city: string,
    email: string,
    id: number,
    image: string,
    lastName: string,
    name: string,
    reviews: [{
        created_at: string,
        description: string,
        id: number,
        name: string,
        starts: number,
        updated_at: string,
    }],
    role: { name: string }
}
export interface DataReview {
    created_at: string,
    description: string,
    id: number,
    name: string,
    starts: number,
    updated_at: string,
}

export interface UserProfile {
    reviews: DataReview[];
}

export interface FileImageData {
    destination: string,
    encoding: string,
    fieldname: string,
    filename: string,
    mimetype: string,
    originalname: string,
    path: string,
    size: number
}

export interface ProductData4 {

    city: string,
    dayPrice: string,
    depositPrice: string,
    description: string,
    hourPrice: string,
    id: number,
    image: string,
    name: string,
    owner: { id: number, name: string },
    starts: number,
    totalReviews: number
}
export type ProductData5 = ProductData4[];

export interface CategoryData {
    category: string,
    categoryId: number
}
export interface UserReducer {
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
    }
}
export interface CategoryReducer {
    category: {
        category: number | undefined,

    }
}
export interface ProductDetailReducer {
    productDetail: {
        productId: number | undefined
    }
}
export interface NotificationReducer {
    notification: {
        notification: {
            id: number | undefined
        }
    }
}
export interface SearchReducer {
    search: {
        criteria: string | undefined
    }
}
export interface Search2Reducer {
    search2: {
        criteria2: string | undefined,
        criteria: string | undefined

    }
}