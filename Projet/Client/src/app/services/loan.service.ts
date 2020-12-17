import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Loan } from '../model/loan';


import { BaseHttpService } from './baseHttpService';

@Injectable()
export class LoanService extends BaseHttpService {
  public post(bookId, copyId, userId): Observable<void> {
      return this.http.post<Loan>(`${this.baseUrl}/loans`,
          {
              copyId: copyId,
              userId: userId,
              bookId: bookId
          })
      .pipe(
        map(() => null),
        catchError((err) => { console.log(err); return null; })
      );
  }

    public getAll(): Observable<Loan[]> {
        return this.http
            .get<Loan[]>(`${this.baseUrl}/loans`);
    }

    public return(loanId): Observable<Loan> {
        return this.http
            .delete<Loan>(`${this.baseUrl}/loans/${loanId}`);
    }
}
