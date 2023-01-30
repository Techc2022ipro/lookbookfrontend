import { useState } from 'react';
import { Tags } from '../../entities/Props';
import Requests, { Url } from '../../requests/Requests';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllTags = () => {
    const [tags, setTags] = useState<Tags[]>([]);

    const getAllTags = async () => {
        const tags = await Requests.get(Url.PRODUCT, "tags");
        setTags(tags);
    };

    useEffect(()=>{
        getAllTags();
    },[]);

    return (
        <div className='tag-box'>
            <h2 className='tag-title'>Tags</h2>
            <div className='tag-lists'> 
            {
                tags.map(tag => (
                    <Link to={`/tag/${tag.tag}`} className='tags'>{tag.tag}</Link>
                ))
            }
            </div>
        </div>
    )
}


export default AllTags;
