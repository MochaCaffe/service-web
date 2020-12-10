const { v4: uuid } = require('uuid');
const _ = require('lodash');
const ValidationError = require('./validationError');

class CopyRepository {
    constructor(db, bookRepository) {
        this.db = db;
        this.bookRepository = bookRepository;
    }

    getAllByBookId(bookId) {
        const bookPath = this.bookRepository.getIdPath(bookId);
        if (bookPath == null) {
            throw new ValidationError('This book does not exists')
        }

        return this.db.getData(bookPath + '/copies');
    }

    add(bookId) {
        const copy = {}
        copy.id = uuid();
        const currentDate = new Date();
        copy.submissionDate = currentDate.getFullYear()+'/'+(currentDate.getMonth()+1)+'/'+currentDate.getDate();
        const bookPath = this.bookRepository.getIdPath(bookId);
        if (bookPath == null) {
            throw new ValidationError('This copy does not belong to a registered book');
        }
        this.db.push(bookPath+"/copies[]", copy);

        return copy;
    }

    get(bookId,id) {
        const copies = this.getAllByBookId(bookId);
        return _.find(copies, { id });
    }

    update(bookId,id, copy) {
        if (copy.id !== id) {
            throw new ValidationError('You cannot change the identifier.');
        }

        const path = this.getIdPath(bookId,id);
        if (path == null) {
            throw new ValidationError('This copy does not exists');
        }

        this.db.push(path, copy);

        return copy;
    }


    delete(bookId,id) {
        const path = this.getIdPath(bookId,id);
        if (path != null) {
            this.db.delete(path);
        }

    }
    
    getIdPath(bookId, id) {
        const copies = this.getAllByBookId(bookId);
        const index = _.findIndex(copies, { id });
        if (index == -1) {
            return null;
        }

        const bookPath = this.bookRepository.getIdPath(bookId);
        return bookPath +'/copies[' + index + ']';
    }
}

module.exports = CopyRepository;