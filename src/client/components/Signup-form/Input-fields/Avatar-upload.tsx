import React from 'react';

import UserContext from '../../../data/context/User-context';
import togglePortal from '../../../data/context/action-creators/toggle-portal';
import Portal from '../../Portal/Portal';
import ImageCropper from '../../Image-cropper/Image-cropper';

import converter from '../../../helpers/converter';
import drawer from '../../../helpers/drawer';

const AvatarUpload = (props) => {
    const { uploadedFileName, setUploadedFileName, setCroppedImageFile } = props;
    const { state, dispatch } = React.useContext<any>(UserContext);
    const imgRef = React.useRef<any>(null);
    const previewCanvasRef = React.useRef<any>(null);
    const [completedCrop, setCompletedCrop] = React.useState<any>(null);
    const [croppedImageFileSize, setCroppedImageFileSize] = React.useState<any>(null);

    const handleFileUploaded = async (e) => {
        const baseUrl = await converter.convertFileToBase64(e.target.files[0]);
        setUploadedFileName(baseUrl);
        dispatch(togglePortal());
    };

    const handleCropComplete = React.useCallback((e) => { setCompletedCrop(e); }, []);

    const handleImageLoaded = React.useCallback((img) => { imgRef.current = img; }, []);

    React.useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {return;}

        drawer.drawCroppedImage(imgRef.current, previewCanvasRef.current, completedCrop);
        
        setCroppedImageFile(previewCanvasRef.current.toDataURL());
        const content_without_mime = previewCanvasRef.current.toDataURL().split(",")[1];
        const size_in_bytes = window.atob(content_without_mime).length;   
        setCroppedImageFileSize((size_in_bytes / 1048576).toFixed(2));
    }, [completedCrop]);

    return (
        <React.Fragment>
            <div className="field"> <label className="label">Profile picture</label> </div>
            <div className="image-selection">
                <div className={uploadedFileName ? "file is-boxed is-success has-name mb-4" : "file is-boxed has-name mb-4"}>
                    <label className="file-label">
                        <input className="file-input" type="file" accept="image/*" name="profile-image" onChange={handleFileUploaded} />
                        <span className="file-cta">
                            <span className="file-icon"> <i className="fas fa-upload" /> </span>
                            <span className="file-label">Profile image</span>
                        </span>
                        <span className="file-name has-text-centered">{uploadedFileName ? (croppedImageFileSize + " Megabytes") : ""}</span>
                    </label>
                </div>
                <div className="cropped-preview">
                    <canvas ref={previewCanvasRef} style={{ width: completedCrop ? "384px" : "0", height: completedCrop ? "384px" : "0"}} />
                </div>
            </div>
            {state.portal.isShown && <Portal> <ImageCropper src={uploadedFileName} handleCropComplete={handleCropComplete} handleImageLoaded={handleImageLoaded} /> </Portal>}
        </React.Fragment>
    );
};

export default AvatarUpload;
