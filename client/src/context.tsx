import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import axios from 'axios';

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
    isLoggedIn: boolean;
    isFailed: boolean;
    isLoading: boolean;
    searchTerm: string;
    photos: PhotosObj[];
    userUploadPhotos: File[];
    activeUploadModal: boolean;
    handleLogOut: () => void;
    handleSearchTerm: (val:string) => void;
    handleLoadMore: () => void;
    handleUploadPhotos: (item: File[]) => void;
    handleActiveUploadModal: (param:boolean) => void;
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
    const [userUploadPhotos, setUserUploadPhotos] = useState<File[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFailed, setIsFailed] = useState<boolean>(false);
    const [activeUploadModal, setActiveModal] = useState<boolean>(false);

    const fetchRequest = async (term:string,pageno:number) => {
        setIsLoading(true);
        let url = '';
        if(term){
            url = `${process.env.REACT_APP_API_ENDPOINT}/${ApiEndpoint.searchPhoto}/?client_id=${process.env.REACT_APP_ACCESS_KEY}&query=${term}&page=${pageno}&per_page=30`;
        } else url = `${process.env.REACT_APP_API_ENDPOINT}/${ApiEndpoint.listPhoto}/?client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${pageno}&per_page=30`;
        try {
            const response = await axios.get(url);
            const results = response.data;
            if(Array.isArray(results)) setPhotos([...photos, ...results]);
            else setPhotos([...results.results]);
        } catch (error) {
            setIsFailed(true);
            console.log(error);
        }
        setIsLoading(false);
    }

    const uploadFile = () => {
        let uploadUrl = 'http://localhost:8000/images/upload';
        const formData = new FormData();
        userUploadPhotos.forEach(item => {
            formData.append('photosArray',item);
        })
        axios.post(uploadUrl, formData, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    // storing upload files ready to be uploaded
    const handleUploadPhotos = (files:File[]) => {
        setUserUploadPhotos([...files]);
    }


    // toggle upload modal
    const handleActiveUploadModal = (param:boolean) => {
        if(param) setActiveModal(true);
        else setActiveModal(false);
    }

    // logout
    const handleLogOut = () => {
        setIsLoggedIn(false);
    }

    // search photos
    const handleSearchTerm = (input:string) => {
        setSearchTerm(input);
        setPage(1);
    }


    // load more photos
    const handleLoadMore = () => {
        setPage(oldPage => oldPage + 1);
    }

    useEffect(() => {
        if(userUploadPhotos.length > 0) uploadFile();
    // eslint-disable-next-line
    }, [userUploadPhotos]);

    useEffect(() => {
        fetchRequest(searchTerm,page);
	// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page,searchTerm])

    return (
        <AppContext.Provider value={{
            page,
            photos,
            isFailed,
            isLoading,
            isLoggedIn,
            searchTerm,
            userUploadPhotos,
            activeUploadModal,
            handleLogOut,
            handleLoadMore,
            handleSearchTerm,
            handleUploadPhotos,
            handleActiveUploadModal
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext);

export default AppProvider;
