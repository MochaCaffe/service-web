import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../model/loan';
import { LoanService } from '../services/loan.service';


@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {

	public loans$: Observable<Loan[]>;

  constructor(private loanService: LoanService) { }


	ngOnInit(): void {
		this.init()

	}

	public init() {
		this.loans$ = this.loanService.getAll();
	}

	public return(loanId) {
		this.loanService.return(loanId).subscribe();
	}

}
