import { useEffect, useRef, MouseEvent } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { MdClose } from 'react-icons/md';

const Upload = () => {
    const { resultFile, userUploadPhotos, removeUpload, saveUpload, handleResultFile, handleActiveUploadModal, uploadFile } = useAppContext();
    const inputRef = useRef({} as HTMLInputElement);

    const handleChange = () => {
        const files = inputRef.current.files;
        if(files) {

            if(files[0].type.split('/')[0] === 'image') {
                handleResultFile(files[0]);
            }
        }
    }

    const handleClick = (event:MouseEvent) => {
        if(userUploadPhotos.length === 0) {
            handleActiveUploadModal(false);
            handleResultFile(null);
        }
    }
    
    useEffect(() => {
        if(resultFile) uploadFile(resultFile);
        handleResultFile(null);
    // eslint-disable-next-line
    }, [resultFile])
    return (
        <section className="fixed w-full min-h-screen h-full top-0 left-0 bg-[rgba(0,0,0,0.9)] p-2 z-20 overflow-y-scroll overflow-x-hidden">
            <div className="absolute w-full h-full z-30" onClick={handleClick}></div>
            <div
            className="bg-white max-w-lg w-full mx-auto mt-4 p-4 rounded z-50 relative"
            >
                <button className="text-3xl absolute right-4 top-2 text-red-500" onClick={handleClick}><MdClose /></button>
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
                                <div key={item.pid} className="relative flex gap-2 border border-solid border-slate-400 pt-4">
                                    <button onClick={() => removeUpload(item.pid)} className="absolute top-0 left-0 w-fit text-red-700"><MdClose /></button>
                                    <div>
                                        <img src={'http://localhost:8000/'+item.path} alt={item.title} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        
                                        <input type="text" placeholder="Add Title" id="title" className="outline-none border border-slate-300 p-1 px-4"/>
                                        <input type="text" placeholder="Add Tags" id="tags" className="outline-none border border-slate-300 p-1 px-4"/>
                                    </div>
                                </div>
                            )
                        })
                    )}  
                </div>
                <div className="my-5 flex justify-center gap-2">
                    <button className="inline-block border-none bg-red-700 text-white px-4 py-1 rounded-sm hover:bg-red-600" onClick={() => removeUpload()}>Cancel</button>
                    <button className="inline-block border-none bg-green-700 text-white px-4 py-1 rounded-sm hover:bg-green-600" onClick={saveUpload}>Publish</button>
                </div>
            </div>
        </section>
    )
}

export default Upload;