const Upload = () => {
    return (
        <section className="fixed w-full h-full inset-0 bg-[rgba(0,0,0,0.9)] grid place-items-center p-2 z-20">
            <div  className="bg-white max-w-lg w-full p-4 rounded">
                <h2 className="text-center text-2xl font-medium
                 mb-4">Upload Images</h2>
                <div className="border-2 border-dashed border-slate-500 p-2 py-4 grid place-items-center">
                    <label htmlFor="browse" className="border border-solid border-slate-400 rounded-sm px-2 py-1 hover:cursor-pointer">Browse</label>
                    <input type="file" id="browse" className="hidden"/>
                </div>
                <div className="flex flex-col gap-4 my-4">
                    <div className="flex items-center">
                        <img src="" alt=""/>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="title" className="text-sm font-medium">Title<span className="
                                ml-1 italic font-normal">(optional)</span></label>
                                <input type="text" id="title" className="outline-none border border-slate-300 p-1 px-4"/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="tags" className="text-sm font-medium">Tags<span className="
                                ml-1 italic font-normal">(optional)</span></label>
                                <input type="text" id="tags" className="outline-none border border-slate-300 p-1 px-4"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-5 grid place-items-center">
                    <button className="inline-block border-none bg-green-700 text-white px-4 py-1 rounded-sm hover:bg-green-600">Upload</button>
                </div>
            </div>
        </section>
    )
}

export default Upload;