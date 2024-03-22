import '../styles/image-input.scss'
import {ImageInputProps} from "../models/components.ts";

const ImageInput = ({onChange} : ImageInputProps) => {
    return (
        <label className='imageInput'>
            <span className='imageInput-visiblePart'>+</span>
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
