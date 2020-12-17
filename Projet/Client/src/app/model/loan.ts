export class Loan {

    constructor(
        public id: string,
        public copyId: string,
        public userId: string,
        public bookId: string,
        public bookName ?: string,
        public userName ?: string) {}
}
