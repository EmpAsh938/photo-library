import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

type Props = {
    children: ReactNode;
}

type urlType = {
    regular: string
}

type PhotosObj = {
    id: string
    alt_description: string
    urls: urlType
}

export type AppContextValue = {
    page: number;
    searchTerm: string;
    photos: PhotosObj[];
    handleSearchTerm: (val:string) => void;
    handleLoadMore: () => void;
}


enum ApiEndpoint {
    listPhoto = "photos",
    searchPhoto = "search/photos"
}

export const AppContext = createContext<AppContextValue>({} as AppContextValue);


const AppProvider:FC<Props> = ({ children }) => {
    const [page, setPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [photos, setPhotos] = useState<PhotosObj[]>([]);


    const fetchRequest = async (term:string,pageno:number) => {
        let url = '';
        if(term){
            url = `${process.env.REACT_APP_API_ENDPOINT}/${ApiEndpoint.searchPhoto}/?client_id=${process.env.REACT_APP_ACCESS_KEY}&query=${term}&page=${pageno}&per_page=30`
        } else url = `${process.env.REACT_APP_API_ENDPOINT}/${ApiEndpoint.listPhoto}/?client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${pageno}&per_page=30`
        try {
            const req = await fetch(url);
            const res = await req.json();
            if(Array.isArray(res)) setPhotos([...photos, ...res]);
            else setPhotos([...res.results]);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearchTerm = (input:string) => {
        setSearchTerm(input);
        setPage(1);
    }

    const handleLoadMore = () => {
        setPage(oldPage => oldPage + 1);
    }

    useEffect(() => {
        fetchRequest(searchTerm,page);
	// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page,searchTerm])

    return (
        <AppContext.Provider value={{
            page,
            photos,
            searchTerm,
            handleLoadMore,
            handleSearchTerm
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext);

export default AppProvider;
