import { useState } from "react"

const UploadButton = (props) => {
      const [image, _setImage] = useState();
      const inputFileRef = useState();
      const cleanUp = () => {
            URL.revokeObjectURL(image && props.image);
            inputFileRef.current.value = null;
      }
      const setImage = (newImage) => {
            if (image) cleanUp;
            _setImage(newImage);
      }
      const hanldeOnChange = (event) => {
            const newImage = event.target.files[0];
            if (newImage) {
                  setImage(URL.createObjectURL(newImage));
            }
            props.imageUpload(event);
      }
}