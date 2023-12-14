import axios from "axios";

export async function fetchImg(inputQuery, page) {
    const BASE_URL = 'https://pixabay.com/api/';
    const PERS_KEY = '38310415-880d668019c8861033767a4c2'
    const Options=new URLSearchParams
 (    {
        key: PERS_KEY,
            q: inputQuery,
            page,
            image_type: 'photo',
            orientation: 'horizontal',
                        per_page:12,
            
    })
    const images = await axios.get(`${BASE_URL}?${Options}`);
   
    return images.data
}

