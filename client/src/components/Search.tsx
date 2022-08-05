import React, { ChangeEvent, FC } from 'react';

import { BsSearch } from 'react-icons/bs'
import { useAppContext } from '../hooks/useAppContext';

const Search:FC = () => {
    const { searchTerm, handleSearchTerm } = useAppContext();

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
       handleSearchTerm(event.target.value);
    }
    return (
        <section>
            <div className='max-w-[500px] m-auto mt-20 px-4'>
                <p className='w-3/4 text-left text-lg text-gray-800 first-letter:font-bold first-letter:text-4xl'>The internet’s source of freely-usable images.
    Powered by creators everywhere.</p>
                <form 
                className='flex items-center mt-5 border-[1px] border-solid border-gray-200 p-2 rounded'>
                    <BsSearch className='text-gray-500 pointer-events-none' />
                    <input 
                    type='text' 
                    placeholder='Search Photos' 
                    className='flex-1 border-none outline-none pl-2 text-base'
                    onChange={handleChange}
                    value={searchTerm}
                    />
                </form>
            </div>
        </section>
    )
}

export default Search;