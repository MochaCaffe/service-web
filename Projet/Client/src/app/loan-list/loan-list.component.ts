import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../model/loan';
import { map, tap } from 'rxjs/operators';
import { LoanService } from '../services/loan.service';
import { BookService } from '../services/book.service';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {
    public loans$: Observable<Loan[]>;

    constructor(    private router: Router, private bookService: BookService, private userService: UserService, private loanService: LoanService) { }


    ngOnInit(): void {
        this.init();

    }

    public init() {
        this.loans$ = this.loanService.getAll()
            .pipe(
                tap(this.addInfos.bind(this))
            );
    }

    private addInfos(loans: Loan[]) {
        for (const loan of loans) {
            this.bookService.get(loan.bookId)
                .pipe(map(book => loan.bookName = book.name))
                .subscribe();

            this.userService.get(loan.userId)
                .pipe(map(user => loan.userName = user.name))
                .subscribe();
        }
    }


    public return(loanId) {
        this.loanService.return(loanId).subscribe();
        this.router.navigateByUrl('/books');
    }

}
