import { ImageGalleryContainer } from "./ImageGallery.styled"
import { ImageGalleryItem } from "./ImageGalleryItem"

export const ImageGallery = ({images}) => {
  
    return (
        <ImageGalleryContainer>
            {images.map(img => {
               
                return (
                   <ImageGalleryItem image={img}/>
                )
            })}
  
</ImageGalleryContainer>
    )
}