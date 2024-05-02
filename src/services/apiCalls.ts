import { DataFetched, LoginData } from "../interfaces";

const ROOT: string = "http://localhost:4000/api/";

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

export const productReview = async (productId: number, token: string, message: string, stars: string): Promise<any> => {
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
    try {
        const response = await fetch(`${ROOT}products/image`, {
          method: 'POST',
          headers: {
            "Authorization": `Bearer ${token}`
        },
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Error al subir la imagen');
        }
  
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
}   