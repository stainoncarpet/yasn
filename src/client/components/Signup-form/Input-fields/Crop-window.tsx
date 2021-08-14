import React from 'react';

import ImageCropper from '../../Image-cropper/Image-cropper';

const CropWindow = ({ src, handleCropComplete, handleImageLoaded, handleAcceptImage, handleCloseImage }) => {

    return (
        <div className="crop-window">
            {<span className="close" onClick={handleCloseImage}></span>}
            {<span className="accept" onClick={handleAcceptImage}>OK</span>}
            <ImageCropper src={src}
            handleCropComplete={handleCropComplete}
            handleImageLoaded={handleImageLoaded}
        />
        </div>
    );
};

export default CropWindow;
