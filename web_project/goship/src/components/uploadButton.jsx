import { useState } from "react"

const UploadButton = (props) => {
      document.addEventListener('contextmenu', event => event.preventDefault());
      useEffect(() => {
            const handleKeyDown = (event) => {
                  if (event.ctrlKey || event.shiftKey) {
                        event.preventDefault();
                  }
            };

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                  document.removeEventListener('keydown', handleKeyDown);
            };
      }, []);
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