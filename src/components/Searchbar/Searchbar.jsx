import { Component } from "react";
import { SearchbarStyled, SearchBtnLabel, SearchForm, SearchFormButton, SearchInput } from "./Searchbar.styled";


export class Searchbar extends Component {
    state = {
        input:''
    }

    inputChange = (e) => {
        const {  value } = e.target;
       this.setState({input:value})
        
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit")
        this.props.onSubmit(this.state)
        this.resetForm()

    }

    resetForm = () => {
        this.setState({input:''})
    }

    render()
  {  return (
        <SearchbarStyled>
  <SearchForm onSubmit={this.handleSubmit}>
    <SearchFormButton type="submit" >
      <SearchBtnLabel>Search</SearchBtnLabel>
    </SearchFormButton>

    <SearchInput
     
      type="text"
                    onChange={this.inputChange}
                    autoFocus
                   value={this.state.input}
                    placeholder="Search images and photos"
                    
    />
  </SearchForm>
</SearchbarStyled>
    )}
}