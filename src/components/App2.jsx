
import { Component } from "react";
import PostApiService from "utils/PostApiService"
import { AppStyle } from "./App.styled";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const postApiService = new PostApiService;

console.log(postApiService);

export class App2 extends Component{
    state = {
        searchQuery: '',
        galleryItems: [],
        galleryPage:1,
    }

    fetchGalleryItems=(nextQuery,nextPage)=>{
        postApiService.query = nextQuery;
        postApiService.page = nextPage;

        postApiService.fetchPost().then(data => {
            postApiService.hits = data.totalHits
            const newData = data.hits;
            const currentData = [...this.state.galleryItems, ...newData];
            this.setState(prevState => ({ galleryItems: [...prevState.galleryItems, ...newData] }));

            if (!data.totalHits) {
                toast('')
                return
            }
        })
    }

    onSearchSubmit = ({input}) => {
        this.setState({searchQuery:input})
    }

    render() {
        return (
            <AppStyle>
                <Searchbar onSubmit={this.onSearchSubmit} />
                <ImageGallery images={this.state.galleryItems} />
                <ToastContainer/>
            </AppStyle>
        )
    }
}

