import '../styles/image-input.scss'
import {ImageInputProps} from "../models/components.ts";

const ImageInput = ({onChange} : ImageInputProps) => {
    return (
        <label className='imageInput'>
            <p className='imageInput-visiblePart'>+</p>
            <input
                className='imageInput-input'
                type="file"
                accept="image/png,image/jpg"
                onChange={onChange}
            />
        </label>
    );
};

export default ImageInput;
