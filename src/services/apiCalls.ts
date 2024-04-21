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
  
      if(!data.success){
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

// export const getPosts = async (token, criteria, limit, pag) => {

//     const options = {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`
//         },
//     };

//     try {
//         const response = await fetch(`${root}posts?title=${criteria}&page=${pag}&limit=${limit}`, options);
//         const data = await response.json();
//         if (!response.ok) {
//             throw new Error(data.message);
//         }

//         return data;

//     } catch (error) {
//         return error;
//     }
// };