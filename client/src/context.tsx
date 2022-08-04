import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import axios from 'axios';

type Props = {
    children: ReactNode;
}

type urlType = {
    regular: string;
}

type PhotosObj = {
    id: string;
    alt_description: string;
    urls: urlType;
}

type Photos = {
    pid: string;
    path: string;
    creator_name: string;
    uploaded_at: string;
    title:string;
    tags: string;
    creator_id: string;
}

export type AppContextValue = {
    page: number;
    isLoggedIn: boolean;
    isFailed: boolean;
    isLoading: boolean;
    searchTerm: string;
    photos: PhotosObj[];
    userUploadPhotos: Photos[];
    activeUploadModal: boolean;
    resultFile: File | null;
    saveUpload: () => void;
    handleLogOut: () => void;
    handleLoadMore: () => void;
    uploadFile: (item:File) => void;
    removeUpload: (id?:string) => void;
    handleSearchTerm: (val:string) => void;
    handleResultFile: (val:File|null) => void;
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
    const [resultFile, setResultFile] = useState<File | null>(null);
    const [photos, setPhotos] = useState<PhotosObj[]>([]);
    const [userUploadPhotos, setUserUploadPhotos] = useState<Photos[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFailed, setIsFailed] = useState<boolean>(false);
    const [activeUploadModal, setActiveUploadModal] = useState<boolean>(false);

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

    const handleResultFile = (param:File|null) => {
        setResultFile(param);
    }

    const uploadFile = (imageItem:File) => {
        let uploadUrl = 'http://localhost:8000/uploads/';
        const formData = new FormData();
        formData.append('photosArray',imageItem);
        axios.post(uploadUrl, formData, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        }).then((res) => {
            if(res.data.body) setUserUploadPhotos([...userUploadPhotos, res.data.body]);
        }).catch((err) => {
            console.log(err);
        })
    }

    const saveUpload = () => {
        let uploadUrl = 'http://localhost:8000/uploads/save';
        axios.get(uploadUrl).then((res) => {
            if(res.data.success) {
                setResultFile(null);
                setUserUploadPhotos([]);
                setActiveUploadModal(false);
            }
        }).catch(err => console.log(err));
    }

    const removeUpload = async (id?:string) => {
        let uploadUrl = 'http://localhost:8000/uploads/';
        let uploadUrlId = uploadUrl+id;
        if(id) {
            await axios.delete(uploadUrlId)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        } else {
            await axios.delete(uploadUrl)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
    }

    // toggle upload modal
    const handleActiveUploadModal = (param:boolean) => {
        setActiveUploadModal(param);
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
            resultFile,
            searchTerm,
            userUploadPhotos,
            activeUploadModal,
            saveUpload,
            uploadFile,
            removeUpload,
            handleLogOut,
            handleLoadMore,
            handleSearchTerm,
            handleResultFile,
            handleActiveUploadModal
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext);

export default AppProvider;
