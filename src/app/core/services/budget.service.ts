import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Budget, BudgetResults } from '../models/Budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) { }

  private readonly api = 'http://localhost:3000/api/v1';

  getBudgets(id:string, filters: any, t: number, s:number): Observable<any>{
    const body = {userId: id, filters: filters, take: t, skip: s};

    return this.http.post(this.api+'/Budgets/getList',body);
  }
  nextBudgetName(id: any): Observable<any>{
    const body = {userId: id};

    return this.http.post(this.api+'/Budgets/nextName', body);
  }
  editBudget(id:number, budget:Budget){
    return this.http.put(this.api+'/Budgets/'+id, budget)
  }
  addBudget(budget:Budget){
    return this.http.post<Budget>(this.api+'/Budgets', budget)
  }
  deleteBudget(id: number){
    return this.http.delete(this.api+'/Budgets/'+id);
  }
  getBudgetById(id: number){
    return this.http.get(this.api+'/Budgets/'+id);
  }
  sendEmail(from:any, to:any, mail:any){
    const body = {from: from, to: to, mail: mail};

    console.log(body);

    return this.http.post(this.api+'/Budgets/mailInfo', body);
  }
}
