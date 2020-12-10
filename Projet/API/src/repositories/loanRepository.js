const { v4: uuid } = require('uuid');
const _ = require('lodash');
const ValidationError = require('./validationError');


class LoanRepository {
    constructor(db,copyRepository,userRepository) {
        this.db = db;
        this.copyRepository = copyRepository;
        this.userRepository = userRepository;
    }

    checkLoan(loan) {
        const copies = this.copyRepository.getAllByBookId(loan.bookId);
        const loans = this.getAll();

        if (!_.some(copies, { id: loan.copyId })) {
            throw new ValidationError('This copy does not exist');
        }

        if (_.some(loans, { copyId: loan.copyId })) {
            throw new ValidationError('This copy is already loaned.');
        }

       if (!_.some(this.userRepository.getAll(), { id: loan.userId })) {
            throw new ValidationError('This user does not exist');
        }
   
    }

    getAll() {
        return this.db.getData("/loans");
    }

    getAvailableCopies(bookId) {

        const copies = this.copyRepository.getAllByBookId(bookId);
        const loans = this.getAll();

        return _.filter(copies, ({ id }) => !_.some(loans, { copyId: id }));
	}

    add(loan) {
        this.checkLoan(loan);
        loan.id = uuid();
        const currentDate = new Date();
        loan.loanDate = currentDate.getFullYear() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getDate();
        this.db.push("/loans[]", loan);

        return loan;
    }

    get(id) {
        const loans = this.getAll();
        return _.find(loans, { id });
    }

    update(id, loan) {
        if (loan.id !== id) {
            throw new ValidationError('You cannot change the identifier.');
        }

        checkloan(loan);
        const path = this.getIdPath(id);
        if (path == null) {
            throw new ValidationError('This loan does not exists');
        }

        this.db.push(path, loan);

        return loan;
    }

    delete(id) {
        const path = this.getIdPath(id);
        if (path != null) {
            this.db.delete(path);
        }

    }

    getIdPath(id) {
        const loans = this.getAll();
        const index = _.findIndex(loans, { id });
        if (index == -1) {
            return null;
        }

        return '/loans[' + index + ']';
    }
}

module.exports = LoanRepository;