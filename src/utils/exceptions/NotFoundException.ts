class NotFoundException extends Error {
    public status: number = 404;

    public constructor(message: string) {
        super(message);
    }

}

export default NotFoundException;