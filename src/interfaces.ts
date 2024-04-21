export interface DataFetched {
    message: string,
    data: any[],
    success: boolean
}

export interface CustomInputProps {
    type: string,
    name: string,
    placeholder: string,
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