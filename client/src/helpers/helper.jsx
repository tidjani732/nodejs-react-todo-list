export const util = {
    getStorage: key => {
        return JSON.parse(localStorage.getItem(key));
    },
    setStorage: (key, objectToSave) => {
        localStorage.setItem(key, JSON.stringify(objectToSave));
    },
    isEmail: str => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(str);
    },
    mapStateToProps: (...args) => {
        return (state) => {
            var obj = {}
            args.forEach(arg => {
                obj[arg] = state[arg];
            })
            return obj;
        }
    }
}

export const generateBase64FromImage = imageFile => {
    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
        reader.onload = e => resolve(e.target.result);
        reader.onerror = err => reject(err);
    });

    reader.readAsDataURL(imageFile);
    return promise;
};
