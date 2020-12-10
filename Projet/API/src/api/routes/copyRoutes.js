module.exports = function(app, copyController) {
    app.route('/books/:bookId/copies')
        .get(copyController.getAllByBookId.bind(copyController))
        .post(copyController.create.bind(copyController)); //Expects empty body
    
    app.route('/books/:bookId/copies/:copyId')
        .get(copyController.get.bind(copyController))
        .put(copyController.update.bind(copyController))
        .delete(copyController.delete.bind(copyController));
}