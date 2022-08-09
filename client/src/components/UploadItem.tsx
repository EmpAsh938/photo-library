import { ChangeEvent, useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { MdClose } from 'react-icons/md';

type Props = {
    pid: string;
    path: string;
    title: string;
}

const UploadItem = ({ pid, path, title }:Props) => {
    const { removeUpload, updateUpload } = useAppContext();
    const [description, setDescription] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagsValue, setTagsValue] = useState<string>('');

    const handleUploadUpdate = (id:string) => {
        if(description || tags.length > 0) {
            updateUpload(id,description,tags);
        }
    }

    const handleTagsChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(tagsValue && e.target.value.charAt(tagsValue.length-1) === ' ') {
            setTags([...tags,tagsValue.trim()]);
            setTagsValue('');
        } else {
            setTagsValue(e.target.value);
        }
    }

    const handleTagsActive = (tag:string) => {
        setTags(prev => {
            return prev.filter(item => item !== tag);
        })
    }

    return (
        <div className="relative flex gap-2 border border-solid border-slate-400 pt-4">
            <button onClick={() => removeUpload(pid)} className="absolute top-0 left-0 w-fit text-red-700"><MdClose /></button>
            <div>
                <img src={`${process.env.REACT_APP_API_ENDPOINT}/${path}`} alt={title} />
            </div>
            <div className="flex flex-col gap-1">
                
                <input value={description} onChange={e=>setDescription(e.target.value)} type="text" placeholder="Add Description" id="title" className="outline-none border border-slate-300 p-1 px-4"/>
                <div className="flex gap-2 flex-wrap my-2">
                    {tags.length > 0 && tags.map(tagItem => {
                        return (
                            <div className="relative p-1 bg-slate-200 rounded-sm text-xs text-slate-500">
                                <span key={tagItem} className="w-full h-full">{tagItem}</span>
                                <button className="absolute top-0 right-0 text-red-500" onClick={()=>handleTagsActive(tagItem)}><MdClose /></button>
                            </div>
                        )
                    })}
                </div>
                <input value={tagsValue} onChange={handleTagsChange} type="text" placeholder="Add Tags" id="tags" className="outline-none border border-slate-300 p-1 px-4"/>
                <button onClick={() => handleUploadUpdate(pid)}>Add</button>
            </div>
        </div>
    )
}


export default UploadItem;