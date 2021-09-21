import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import miscSlice from '../../../redux/slices/misc/misc';
import converter from '../../../helpers/converter';
import drawer from '../../../helpers/drawer';
import myValidator from '../../../helpers/validator';
import CropWindow from './Crop-window';
import fetcher from '../../../helpers/fetcher';
import { IStoreState } from '../../../interfaces/state/i-store-state';

const AvatarUpload = (props) => {
    const { uploadedFileName, setUploadedFileName, setCroppedImageFile } = props;

    const portal = useSelector((state: IStoreState) => state.misc.portal);
    const dispatch = useDispatch();
    const togglePortal = miscSlice.actions.togglePortal;

    const [isCropWindowShown, setIsCropWindowShown] = React.useState(false);
    const imgRef = React.useRef<any>(null);
    const previewCanvasRef = React.useRef<any>(null);
    const [completedCrop, setCompletedCrop] = React.useState<any>(null);
    const [croppedImageFileSize, setCroppedImageFileSize] = React.useState<any>(null);
    const [externalImageLink, setExternalImageLink] = React.useState<any>("");
    const [isExternalImageLoading, setIsExternalImageLoading] = React.useState(false);
    const [isExternalImageUrlValid, setIsExternalImageUrlValid] = React.useState(false);
    const [isImageSourceLocal, setIsImageSourceLocal] = React.useState(true);

    const handleFileUploaded = async (e) => {
        !isImageSourceLocal && setIsImageSourceLocal(true);
        const baseUrl = await converter.convertFileToBase64(e.target.files[0]);
        setUploadedFileName(baseUrl);
        setIsCropWindowShown(true);
        !portal.isShown && dispatch(togglePortal({}));
        setExternalImageLink(e.target.files[0].name);
    };

    const handleCropComplete = React.useCallback((e) => { setCompletedCrop(e); }, []);

    const handleImageLoaded = React.useCallback((img) => { imgRef.current = img; }, [])

    React.useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) { return; }

        drawer.drawCroppedImage(imgRef.current, previewCanvasRef.current, completedCrop);

        setCroppedImageFile(previewCanvasRef.current.toDataURL());
        const content_without_mime = previewCanvasRef.current.toDataURL().split(",")[1];
        const size_in_bytes = window.atob(content_without_mime).length;
        setCroppedImageFileSize((size_in_bytes / 1048576).toFixed(2));
    }, [completedCrop]);

    const handleAcceptImage = React.useCallback(() => { setIsCropWindowShown(false); }, [])

    const handleCloseImage = React.useCallback(() => {
        setIsCropWindowShown(false);
        setUploadedFileName(null);
        setCompletedCrop(null);
        setExternalImageLink("");
        setCroppedImageFileSize(null);
        !isImageSourceLocal && setIsImageSourceLocal(true);
        
        drawer.clearCanvas(previewCanvasRef.current);
    }, []);

    const handleImageUrlProvided = async (e) => {
        let imgLink = '';

        if(e.target.value.includes('?')) {
            imgLink = e.target.value.split("?")[0];
        } else {
            imgLink = e.target.value;
        }

        setExternalImageLink(imgLink);

        setIsImageSourceLocal(false);

        const isValidImageUrl = myValidator.validateImageUrl(imgLink);
        setIsExternalImageUrlValid(isValidImageUrl);

        if(isValidImageUrl) {
            setIsExternalImageLoading(true);
        
            const file = await fetcher.fetchExternalImage(imgLink);

            if(file) {
                const base64 = await converter.convertFileToBase64(file);
    
                setUploadedFileName(base64);
                setIsCropWindowShown(true)
                !portal.isShown && dispatch(togglePortal({}));
            } else {
                console.log("error reading external image");
            }
            setIsExternalImageLoading(false);
        } else {
            console.log("not a URL");
        }
    };

    return (
        <React.Fragment>
            <div className="field"> <label className="label">Profile picture</label> </div>
                <div className="image-selection">
                    <p className="mb-3">Upload from your local machine:</p>
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
                    <br />
                    <p className="mb-3">Or pull from an external source:</p>
                    <div className="field url-wrapper">
                        <div className={isExternalImageLoading ? "control is-loading" : "control"}>
                            <input className={(externalImageLink.length < 1 || isImageSourceLocal)
                                ? "input" 
                                : isExternalImageUrlValid 
                                    ? "input is-success"
                                    : "input is-danger"
                                } 
                                type="text" placeholder="File URL" value={externalImageLink} onChange={handleImageUrlProvided} 
                            />
                        </div>
                        {(externalImageLink.length < 1 || isImageSourceLocal)
                            ? null
                            : !isExternalImageUrlValid && <p className="help is-danger">Invalid image link</p>
                        }
                        {externalImageLink.length > 0 
                            && <button className="delete" onClick={handleCloseImage}></button>
                        }
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

export default React.memo(AvatarUpload);
