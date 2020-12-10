class copyController {
    constructor(copyRepository) {
        this.copyRepository = copyRepository;
    }

    getAllByBookId(req, res) {
        const copies = this.copyRepository.getAllByBookId(req.params.bookId);
        res.json(copies);
    }

    create(req, res) {
        const copy = this.copyRepository.add(req.params.bookId);    
        res.location('/books/'+req.params.bookId+'/copies/'+req.params.copyId);
        res.status(201).send(copy);
    }
    
    get(req, res) {
        const copy = this.copyRepository.get(req.params.copyId);
        if (copy == null) {
            res.status(404).send(null);
        } else {
            res.status(200).send(copy);
        }
    }
    
    update(req, res) {
        const copy = this.copyRepository.update(req.params.bookId,req.params.copyId, req.body)
        res.status(200).send(copy);
    }
    
    delete(req, res) {
        this.copyRepository.delete(req.params.bookId,req.params.copyId);
        res.status(204).send(null);
    }
}

module.exports = copyController;