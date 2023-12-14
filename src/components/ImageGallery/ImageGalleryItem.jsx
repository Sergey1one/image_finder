import { ImageItem, ImageItemImg } from "./ImageGallery.styled";

export const ImageGalleryItem = ({image}) => {
    const { webformatURL, tags, id } = image;
    return (
      <ImageItem key={id}>
                        <ImageItemImg src={webformatURL } alt={tags}/>
                    </ImageItem>
)
}


