import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import portalSlice from '../../../data/redux/slices/portal/portal';

import converter from '../../../helpers/converter';
import drawer from '../../../helpers/drawer';
import CropWindow from './Crop-window';

const AvatarUpload = (props) => {
    const { uploadedFileName, setUploadedFileName, setCroppedImageFile } = props;

    const portal = useSelector((state: any) => state.portal);
    const dispatch = useDispatch();
    const togglePortal = portalSlice.actions.togglePortal;

    const [isCropWindowShown, setIsCropWindowShown] = React.useState(false);
    const imgRef = React.useRef<any>(null);
    const previewCanvasRef = React.useRef<any>(null);
    const [completedCrop, setCompletedCrop] = React.useState<any>(null);
    const [croppedImageFileSize, setCroppedImageFileSize] = React.useState<any>(null);

    const handleFileUploaded = async (e) => {
            const baseUrl = await converter.convertFileToBase64(e.target.files[0]);
            setUploadedFileName(baseUrl);
            setIsCropWindowShown(true)
            !portal.isShown && dispatch(togglePortal({}));
    };

    const handleCropComplete = React.useCallback((e) => { setCompletedCrop(e); }, []);

    const handleImageLoaded = React.useCallback((img) => {  imgRef.current = img; }, [])

    React.useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {return;}

        drawer.drawCroppedImage(imgRef.current, previewCanvasRef.current, completedCrop);

        setCroppedImageFile(previewCanvasRef.current.toDataURL());
        const content_without_mime = previewCanvasRef.current.toDataURL().split(",")[1];
        const size_in_bytes = window.atob(content_without_mime).length;   
        setCroppedImageFileSize((size_in_bytes / 1048576).toFixed(2));
    }, [completedCrop]);

    const handleAcceptImage = React.useCallback(() => {  setIsCropWindowShown(false); }, [])

    const handleCloseImage = React.useCallback(() => {
        setIsCropWindowShown(false);
        setUploadedFileName(null);
        setCompletedCrop(null);
    }, []);

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
                        <span className="file-name has-text-centered">
                            {uploadedFileName 
                                ? croppedImageFileSize <= 5 
                                    ? (croppedImageFileSize + " Megabytes") 
                                    : "The tile is too big - please upload a smaller file"
                                : ""
                            }
                        </span>
                    </label>
                </div>
                <div className={croppedImageFileSize ? "cropped-preview filled" : "cropped-preview empty"}>
                    <canvas ref={previewCanvasRef} />
                </div>
            </div>
            {isCropWindowShown && 
                <CropWindow 
                    src={uploadedFileName} 
                    handleCropComplete={handleCropComplete} 
                    handleImageLoaded={handleImageLoaded} 
                    handleAcceptImage={handleAcceptImage} 
                    handleCloseImage={handleCloseImage} 
                />
            }
        </React.Fragment>
    );
};

export default AvatarUpload;
