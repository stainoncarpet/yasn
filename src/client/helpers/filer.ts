const filer = {
    uploadCroppedImage: async (file) => {
        const formData = new FormData();
        formData.append('profileimage', file)
        const res = await fetch("http://localhost:3000/upload", {
            method: 'POST',
            body: formData
        });
        const body = await res.json();
        
        return body.filename;
    }
};

export default filer;