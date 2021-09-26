import React from 'react';
import 'react-image-crop/lib/ReactCrop.scss';
import ReactCrop from 'react-image-crop';

import "./Image-cropper.scss";

const ImageCropper = (props) => {
    const { handleCropComplete, handleImageLoaded } = props;

    const [crop, setCrop] = React.useState({
        aspect: 1 / 1,
        unit: "px",
    });

    return <ReactCrop
        src={props.src}
        crop={crop}
        minHeight={64}
        minWidth={64}
        onChange={newCrop => setCrop(newCrop)}
        ruleOfThirds
        circularCrop
        onComplete={(c) => handleCropComplete(c)}
        onImageLoaded={handleImageLoaded}
    />;
};

export default ImageCropper;