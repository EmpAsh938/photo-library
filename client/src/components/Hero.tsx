import  { FC } from 'react';
import { useGlobalContext } from '../context';

const Hero:FC = () => {
    const { photos, isFailed, handleLoadMore } = useGlobalContext();

    if (isFailed) {
        return (
            <section>
                <h3 className='text-center text-red-800 text-4xl font-bold py-10'>Error Occured while fetching</h3>
            </section>
        )
    }

    if (photos.length === 0) {
        return (
            <section className='h-[800px]'>
                <h3 className='text-center text-blue-900 text-5xl font-bold py-10'>Loading...</h3>
            </section>
        )
    }

    let len = photos.length;
    let first_mid = len/3;
    let second_mid = 2*first_mid;
    return (
        <section className='px-4 max-w-screen-2xl mx-auto'>
            <div className='py-10 flex flex-wrap items-start gap-2'>
                <div className='flex-1 flex flex-col justify-between gap-2'>
                    {photos.slice(0,first_mid).map((item,index) => {
                        const { id, alt_description, urls: { regular } } = item;
                        return (
                            <div key={id+index} className='flex-1 relative'>
                                <img 
                                    alt={alt_description}
                                    src={regular}
                                    />
                            </div>
                        )
                    })}
                </div>
                <div className='hidden flex-1 sm:flex flex-col justify-between gap-2'>
                {photos.slice(first_mid,second_mid).map((item,index) => {
                    const { id, alt_description, urls: { regular } } = item;
                    return (
                        <div key={id+index} className='flex-1 relative'>
                            <img 
                                alt={alt_description}
                                src={regular}
                            />
                        </div>
                        )
                    })}
                </div>
                <div className='hidden flex-1 lg:flex flex-col justify-center gap-2'>
                {photos.slice(second_mid,len).map((item,index) => {
                    const { id, alt_description, urls: { regular } } = item;
                        return (
                            <div key={id+index} className='flex-1 relative'>
                                <img 
                                    alt={alt_description}
                                    src={regular}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='py-2'>

                <button onClick={handleLoadMore} className='block w-fit uppercase text-slate-700 text-sm font-semibold text-center mx-auto'>Load More</button>
            </div>
        </section>
    )
}

export default Hero;