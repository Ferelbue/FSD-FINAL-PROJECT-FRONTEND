import { DataFetched, LoginData } from "../interfaces";

const ROOT: string = "http://localhost:4000/api/";

export const BringProducts = async (): Promise<DataFetched> => {
    console.log("Estoy en BringProducts");
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };

    try {
        const response: any = await fetch(`${ROOT}products`, options);

        const dataRes = await response.json();
        console.log(dataRes);
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
export const BringConversation = async (productId: number,userUserId: number, token:string): Promise<any> => {
    console.log(productId, userUserId, token, "BringConversation");
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

export const SendMessage = async (productId: number, userUserId: number, token:string, message:string): Promise<any> => {
    console.log(productId, userUserId, token, "SendMessage");
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({message})
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

export const BringAllChats = async (token:string): Promise<any> => {
    console.log(token, "BringAllChats");
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

export const Notification = async (token:string): Promise<any> => {
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