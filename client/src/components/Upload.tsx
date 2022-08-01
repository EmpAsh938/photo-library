import { useEffect, useRef, useState, MouseEvent } from "react";
import { useGlobalContext } from "../context";
import { MdClose } from 'react-icons/md';

const Upload = () => {
    const [resultFile, setResultFile] = useState<File[]>([]);
    const { userUploadPhotos, handleActiveUploadModal, handleRemoveUserPhoto, handleUploadPhotos } = useGlobalContext();
    const inputRef = useRef({} as HTMLInputElement);

    const handleChange = () => {
        const files = inputRef.current.files;
        if(files) {
            const length = files.length;
            for(let i=0;i<length;i++) {
                if(files[i].type.split('/')[0] === 'image') {
                    setResultFile([...resultFile, files[i]]);
                }
            }
        }
    }

    const handleClick = (event:MouseEvent) => {
        handleActiveUploadModal(false);
    }
    
    useEffect(() => {
        handleUploadPhotos(resultFile);
    // eslint-disable-next-line
    }, [resultFile])
    return (
        <section className="fixed w-full h-full inset-0 bg-[rgba(0,0,0,0.9)] grid place-items-center p-2 z-20">
            <div className="absolute w-full h-full z-30" onClick={handleClick}></div>
            <div className="bg-white max-w-lg w-full p-4 rounded z-50">
                <h2 className="text-center text-2xl font-medium
                 mb-4">Upload Images</h2>
                <div className="border-2 border-dashed border-slate-500 p-2 py-4 grid place-items-center">
                    <label htmlFor="browse" className="border border-solid border-slate-400 rounded-sm px-2 py-1 hover:cursor-pointer">Browse</label>
                    <input ref={inputRef} type="file" id="browse" className="hidden" onChange={handleChange} accept="image/*" />
                </div>
                <div className="flex flex-col gap-4 my-4">
                    {userUploadPhotos.length > 0 && (
                        userUploadPhotos.map(item => {
                            return (
                                <div key={item.lastModified} className="flex flex-col gap-2 border border-solid border-slate-400 p-2">
                                    <button onClick={() => handleRemoveUserPhoto(item.lastModified)}><MdClose /></button>
                                    <h3 className="text-center">{item.name}</h3>
                                    <div className="flex flex-col gap-1">
                                        
                                        <input type="text" placeholder="Add Title" id="title" className="outline-none border border-slate-300 p-1 px-4"/>
                                    </div>
                                <div className="flex flex-col gap-1">
                                    
                                        <input type="text" placeholder="Add Tags" id="tags" className="outline-none border border-slate-300 p-1 px-4"/>
                                </div>
                                </div>
                            )
                        })
                    )}  
                </div>
                <div className="my-5 grid place-items-center">
                    <button className="inline-block border-none bg-green-700 text-white px-4 py-1 rounded-sm hover:bg-green-600">Upload</button>
                </div>
            </div>
        </section>
    )
}

export default Upload;