import { Searchbar } from "./Searchbar/Searchbar";
import React, { Component } from "react";
import { fetchImg } from "utils/serviceAPI";
import { AppStyle } from "./App.styled";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ErrorMsg } from "./Error/Error";

let page = 1;
export class App extends Component  {

  state = {
    images: [],
    searchInput: '',
    status:'idle',
    totalHits: 0,
    pageGallery: 1,
  }
  
  componentDidUpdate(prevProps, prevState) {
  
    const prevQuery = prevState.searchInput;
    const currentQuery = this.state.searchInput;
    const prevPage = prevState.pageGallery;
    const currentPage = this.state.pageGallery;


    console.log(prevQuery)

}
  

  onSearchSubmit = async ({ input }) => {
    page = 1;
    if (input.trim() === '') {
      toast("No words enouchf")
      return
    }
    try {
      this.setState({status:'pending'})
      const { hits,totalHits } = await fetchImg(input, page);
      this.setState({
        searchInput: input,
        images: hits,
        totalHits,
        status:'resolved'
      })
      console.log(totalHits);

    }
    catch (error) {
      this.setState({status:"rejected"})
    }
  }
  

  onLoadMore = async() => {
    try {
       this.setState({status:'pending'})
      const { hits } = await fetchImg(this.state.searchInput, (page+=1));
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        status:"resolved"
      }))
      // console.log(hits);
      console.log(page)

    }
    catch (error) {
     this.setState({status:"rejected"})
    }
  }
  

render()
{const { status,images,totalHits } = this.state
  console.log(status)
   if (status === 'idle') {
     return (
       <AppStyle>
         <Searchbar value={this.state.searchInput} onSubmit={this.onSearchSubmit} />
         <ToastContainer/> 
        </AppStyle>
      )
   }
  
   if (status === 'pending') {
     return (
       <AppStyle>
         <Searchbar value={this.state.searchInput} onSubmit={this.onSearchSubmit} />
          <ImageGallery images={this.state.images} />
          <Loader/>
        </AppStyle>
      )
   }
  if (status === "resolved") {
    return (
         <AppStyle>
        <Searchbar value={this.state.searchInput} onSubmit={this.onSearchSubmit} />
         <ImageGallery images={this.state.images} />
    { totalHits>12 && totalHits>images.length&& <Button onClick={ this.onLoadMore} />}
        </AppStyle>
    )
  }
   if (status === "rejected") {
    return (
         <AppStyle>
        <Searchbar value={this.state.searchInput} onSubmit={this.onSearchSubmit} />
        <ErrorMsg/>
        </AppStyle>
    )
  }
  // return (
   

  // <AppStyle>
  
  //   <Loader/>
  //   <Searchbar value={this.state.searchInput} onSubmit={this.onSearchSubmit} />
  //   <ImageGallery images={this.state.images} />
  //   {this.state.images.length > 0 && <Button onClick={ this.onLoadMore} />}
  // <ToastContainer/> 
  // </AppStyle>
  // )
}
};
