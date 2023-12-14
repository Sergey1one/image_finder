import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const PERS_KEY = '38310415-880d668019c8861033767a4c2'
    
export default class PostApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.totalHits = 0;
    }

    async fetchPost() {
        const OPTIONS = new URLSearchParams({
            key: PERS_KEY,
            q: this.searchQuery,
            page: this.page,
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
        });
        try {
            const responce = await axios.get(`${BASE_URL}?${OPTIONS}`)
            
            return responce.data
        } catch (error) {
            console.log(error.toJSON());
        }
    }


        get query(){
            return this.searchQuery
        }
    set query(newQuery) {
    this.searchQuery=newQuery
    }
    
    get hits() {
        return this.totalHits
    }
    set hits(newTotalHits) {
        this.totalHits=newTotalHits
    }
    incrementPage() {
        this.page+=1
    }
    resetPage() {
        this.page=1
    }



    }
