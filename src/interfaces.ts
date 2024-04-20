
export interface DataFetched {
    message: string,
    data: any[],
    success: boolean
}

export interface CharactersFetchedResults {
    info: CharactersInfo,
    results: any[]
}

export interface CharactersInfo {

    count: number,
    pages: number,
    next: string | null,
    prev: string | null
}

export interface CharactersData {

    characters: any[]
}

export interface LoginData {
    email: string,
    password: string
}

export interface CustomInputProps {
    type: string,
    name: string,
    placeholder: string,
    value: string | undefined,
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}