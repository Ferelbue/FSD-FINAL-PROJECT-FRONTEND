import { DataFetched, LoginData, UserUpdateData } from "../interfaces";

export const ROOT: string = "https://fsd-final-project-backend-production.up.railway.app/api/";
export const ROOT2: string = "https://fsd-final-project-backend-production.up.railway.app/";

export const BringProducts = async (criteria: string, pag: string, limit: string): Promise<any> => {

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };

    try {
        const response: any = await fetch(`${ROOT}products?name=${criteria}&page=${pag}&limit=${limit}`, options);

        const dataRes = await response.json();
        const data: DataFetched = {
            success: true,
            message: "Los datos han venido correctamente",
            data: dataRes.data,
        };
        return data;
    } catch (error) {
        let answer: DataFetched = {
            message: "Ha habido un error",
            data: [],
            success: false,
        };

        return answer;
    }
};

export const BringProductsNumber = async (): Promise<any> => {

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };

    try {
        const response: any = await fetch(`${ROOT}products/number`, options);

        const dataRes = await response.json();
        const data: DataFetched = {
            success: true,
            message: "Los datos han venido correctamente",
            data: dataRes.data,
        };
        return data;
    } catch (error) {
        let answer: DataFetched = {
            message: "Ha habido un error",
            data: [],
            success: false,
        };

        return answer;
    }
};


export const LoginMe = async (credentials: LoginData): Promise<any> => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    };

    try {
        const response: any = await fetch(`${ROOT}auth/login`, options);

        const data: DataFetched = await response.json();

        if (!data.success) {
            throw new Error(data.message)
        }

        return data;
    } catch (error: unknown) {
        let answer: DataFetched = {
            message: "",
            data: [],
            success: false,
        };

        return answer;
    }
}

export const RegisterMe = async (credentials: LoginData): Promise<any> => {
    console.log(credentials, "RegisterMe");
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    };

    try {
        const response: any = await fetch(`${ROOT}auth/register`, options);

        const data: DataFetched = await response.json();

        if (!data.success) {
            throw new Error(data.message)
        }

        return data;
    } catch (error: unknown) {
        let answer: DataFetched = {
            message: "",
            data: [],
            success: false,
        };

        return answer;
    }
}

export const BringCategoryProducts = async (id: number): Promise<any> => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };

    try {
        const response = await fetch(`${ROOT}products/category/${id}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
};

export const BringProductDetail = async (id: number): Promise<any> => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };

    try {
        const response = await fetch(`${ROOT}products/${id}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
};
export const BringConversation = async (productId: number, userUserId: number, token: string): Promise<any> => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${ROOT}chats/${productId}/${userUserId}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
};

export const SendMessage = async (productId: number, userUserId: number, token: string, message: string): Promise<any> => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ message })
    };

    try {
        const response = await fetch(`${ROOT}chats/${productId}/${userUserId}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
};

export const BringAllChats = async (token: string): Promise<any> => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${ROOT}chats`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
};

export const Notification = async (token: string): Promise<any> => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${ROOT}chats/notification`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
}

export const EraseNotification = async (productId: number, userUserId: number, token: string): Promise<any> => {
    console.log(productId, userUserId, token, "EraseNotification");
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${ROOT}chats/notification/${productId}/${userUserId}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
};

export const acceptDeal = async (productId: number, userUserId: number, token: string): Promise<any> => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${ROOT}deals/${productId}/${userUserId}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
}

export const DealStatus = async (productId: number, userUserId: number, token: string): Promise<any> => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${ROOT}deals/${productId}/${userUserId}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
}

export const productReview = async (productId: number, token: string, message: string, stars: number): Promise<any> => {
    console.log(productId, token, message, stars, "productReview");
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            description: message,
            starts: stars
        })
    };

    try {
        const response = await fetch(`${ROOT}products/review/${productId}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
}

export const BringFavoriteUserProduct = async (productId: number, token: string): Promise<any> => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${ROOT}products/favorite/${productId}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }

}

export const AddToFavorites = async (productId: number, token: string): Promise<any> => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${ROOT}products/favorite/${productId}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
}

export const FavoriteProducts = async (token: string): Promise<any> => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${ROOT}products/favorites/user`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
}

export const UploadImage = async (formData: FormData, token: string): Promise<any> => {
    console.log(formData, token, "UploadImage");
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData,
    };

    try {
        const response = await fetch(`${ROOT}products/image`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Error al subir la imagen');
        }
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const UploadProducto = async (name: string, description: string, image: string, city: string, hourPrice: string, dayPrice: string, depositPrice: string, category: number, token: string,): Promise<any> => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            description,
            image,
            city,
            hourPrice,
            dayPrice,
            depositPrice,
            category,
        })
    };

    try {
        const response = await fetch(`${ROOT}products`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
}

export const BringUserProfile = async (token: string): Promise<any> => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${ROOT}users/profile`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
}

export const BringUserProducts = async (token: string): Promise<any> => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${ROOT}products/own`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
}

export const UploadUserProfile = async (user: UserUpdateData, token: string): Promise<any> => {
    console.log(user, token, "UploadUserProfile");
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
    };

    try {
        const response = await fetch(`${ROOT}users/profile`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
}

export const BringAllUsers = async (token: string, criteria: string, page: number): Promise<any> => {
    console.log(token, criteria, page, "BringAllUsers");
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${ROOT}users?email=${criteria}&limit=10&page=${page}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        console.log(data, "BringAllUsers");
        return data;

    } catch (error) {
        return error;
    }
}
export const BringAllUsersNumber = async (token: string): Promise<any> => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${ROOT}users/number`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        console.log(data, "BringAllUsers");
        return data;

    } catch (error) {
        return error;
    }
}

export const DeleteUserById = async (token: string, userId: number): Promise<any> => {
    console.log(token, userId, "DeleteUserById");
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${ROOT}users/${userId}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
}

export const EditUserRole = async (token: string, userId: number, role: string): Promise<any> => {
    console.log(token, userId, role, "EditUserRole");
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            role: role,
        })
    };

    try {
        const response = await fetch(`${ROOT}users/${userId}/role`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
}

export const DeleteProductById = async (token: string, productId: number): Promise<any> => {
    console.log(token, productId, "DeleteProductById");
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${ROOT}products/${productId}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
}

export const BringAllmessages = async (token: string, criteria: string, page: number): Promise<any> => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${ROOT}chats/all?message=${criteria}&page=${page}&limit=10`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        console.log(data, "BringAllmessages");
        return data;

    } catch (error) {
        return error;
    }
}       

export const BringAllMessagesNumber = async (token: string): Promise<any> => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${ROOT}chats/allNumber`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        console.log(data, "BringAllmessages");
        return data;

    } catch (error) {
        return error;
    }
}

export const DeleteMessageById = async (token: string, messageId: number): Promise<any> => {
    console.log(token, messageId, "DeleteUserById");
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${ROOT}chats/${messageId}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return error;
    }
}