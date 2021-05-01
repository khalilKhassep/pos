const getCategories = async (url: string) => {
    const request = await fetch(url, {method: 'GET'});
    if (request.ok) {
        const response = await request.json();
        return Promise.resolve(response.data)
    }
    return Promise.reject(false);
};

export {getCategories}