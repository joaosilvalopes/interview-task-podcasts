const fetchWithCors = (url: string, ...args: any[]) => {
    const prefix = (typeof window !== "undefined" && process.env.NODE_ENV !== 'test') ? 'https://cors-anywhere.herokuapp.com/' : '';

    return fetch(prefix + url, ...args);
}

export default fetchWithCors;
