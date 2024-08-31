class BadRequestException {
    private readonly status : number = 400;
    private readonly message: string;

    public constructor (message: string){
        this.message = message
    }
}