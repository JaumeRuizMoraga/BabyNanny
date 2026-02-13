export const login = async () => {
    try {
        const response = await fetch('http://');
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    }

    catch (error) {
        console.log(error);
    }
}