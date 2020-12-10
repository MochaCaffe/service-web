module.exports = function(app, loanController) {
    app.route('/users/:userId/loans')
        .get(loanController.getByUserId.bind(loanController))
    
    app.route('/books/:bookId/availableCopies')
        .get(loanController.getAvailableCopies.bind(loanController))

    app.route('/loans')
        .post(loanController.create.bind(loanController))
        .get(loanController.getAll.bind(loanController))

    app.route('/loans/:loanId')
        .delete(loanController.delete.bind(loanController))


}