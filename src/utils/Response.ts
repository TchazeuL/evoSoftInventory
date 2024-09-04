class Response<T> {

    public readonly data: any;
    public readonly status: number;
    public readonly message: string;

    public constructor(data: T, status: number, message: string) {
        this.data = data;
        this.status = status;
        this.message = message;
    }



    public toJson(): any {
        return {
            "data": this.data,
            "status": this.status,
            "message": this.message
        }
    }
}

export default Response;