class Response {

    private readonly data: any;
    private readonly status: number;
    private readonly message: string;

    public constructor(data: any, status: number, message: string) {
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