import { environment } from './../../environments/environment';
// tslint:disable:variable-name
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { PaginatorState } from '../models/paginator.model';
import { ITableState, TableResponseModel } from '../models/table.model';
import { SortState } from '../models/sort.model';
import { GroupingState } from '../models/grouping.model';
import { BaseModel } from '../models/base.model';

const DEFAULT_STATE: ITableState = {
  filter: {},
  paginator: new PaginatorState(),
  sorting: new SortState(),
  searchTerm: '',
  grouping: new GroupingState(),
  entityId: undefined
};

export abstract class TableService<T> {
  // Private fields
  private _items$ = new BehaviorSubject<T[]>([]);
  public _itemsacount$ = new BehaviorSubject<T[]>([]);
  public _itemsTypeSong$ = new BehaviorSubject<T[]>([]);
  public _itemsAllSong$ = new BehaviorSubject<T[]>([]);
  public _itemsAllRadio$ = new BehaviorSubject<T[]>([]);
  public _itemsThu$ = new BehaviorSubject<T[]>([]);
  public _itemsThuChi$ = new BehaviorSubject<T[]>([]);
  public _itemsBill$ = new BehaviorSubject<T[]>([]);
  public _itemsPlanChi$ = new BehaviorSubject<T[]>([]);
  public _itemsPayment$ = new BehaviorSubject<T[]>([]);
  public _itemsBebt$ = new BehaviorSubject<T[]>([]);
  public _itemsDebtt$ = new BehaviorSubject<T[]>([]);

  public _itemsContract$ = new BehaviorSubject<T[]>([]);
  public _itemsphongban$ = new BehaviorSubject<T[]>([]);
  public _itemsnhomuser$ = new BehaviorSubject<T[]>([]);
  public _items_userRoles$ = new BehaviorSubject<T[]>([]);
  public _itemsCustomer$ = new BehaviorSubject<T[]>([]);
  public _itemsSup$ = new BehaviorSubject<T[]>([]);
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  private _isFirstLoading$ = new BehaviorSubject<boolean>(true);
  private _tableState$ = new BehaviorSubject<ITableState>(DEFAULT_STATE);
  private _errorMessage = new BehaviorSubject<string>('');
  private _subscriptions: Subscription[] = [];
  public __responseData$ = new BehaviorSubject<any>(DEFAULT_STATE);
  // Getters
  get items$() {
    return this._items$.asObservable();
  }
  get isLoading$() {
    return this._isLoading$.asObservable();
  }
  get isFirstLoading$() {
    return this._isFirstLoading$.asObservable();
  }
  get errorMessage$() {
    return this._errorMessage.asObservable();
  }
  get subscriptions() {
    return this._subscriptions;
  }
  // State getters
  get paginator() {
    return this._tableState$.value.paginator;
  }
  get filter() {
    return this._tableState$.value.filter;
  }
  get sorting() {
    return this._tableState$.value.sorting;
  }
  get searchTerm() {
    return this._tableState$.value.searchTerm;
  }
  get grouping() {
    return this._tableState$.value.grouping;
  }

  protected http: HttpClient;
  protected cookie_servics: CookieService;
  // API URL has to be overrided
  API_URL = `${environment}/endpoint`;
  constructor(http: HttpClient, cookie_servics: CookieService) {
    this.http = http;
    this.cookie_servics = cookie_servics;
  }

  public patchState_Alldebt(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetchAlldebt(apiRoute, "");
  }
  public patchState_Bebt(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetchBebt(apiRoute, "");
  }
  public patchStateThuchi(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetchThuchi(apiRoute, "");
  }
  public patchStatechi(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetchchi(apiRoute, "");
  }

  public patchStatePayments(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetchPayments(apiRoute, "");
  }
  public patchStateBill(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetchBill(apiRoute, "");
  }

  public patchStateAllSong(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_AllSong(apiRoute, "");
  }
  public patchStateAllRadio(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_AllRadio(apiRoute, "");
  }
  public patchStateAllTypeSong(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_AllTypeSong(apiRoute, "");
  }
  public patchStateAllUser(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_AllTypeSong(apiRoute, "");
  }
  public patchStateAllSup(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_AllSup(apiRoute, "");
  }
  public patchStateAllAcountRoles(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_AllAcountRoles(apiRoute, "");
  }
  public patchStateAllAcount(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_AllAcount(apiRoute, "");
  }
  public patchStateAllPhongBan(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_AllPhongBan(apiRoute, "");
  }
  public patchStateAllCustomer(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_AllCustomer(apiRoute, "");
  }
  public patchStateAllContract(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_AllContract(apiRoute, "");
  }
  public patchStateAllNhomUser(patch: Partial<ITableState>, apiRoute: string = '') {
    this.patchStateWithoutFetch(patch);
    this.fetch_AllNhomUser(apiRoute, "");
  }
  getHttpHeaders() {

    const token = this.cookie_servics.get("accessToken")
    // console.log('auth.token',auth.access_token)
    let result = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return result;
  }
  public fetch_AllNhomUser(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_AllNhomUser(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res) {
            resItems = res.data;
            resTotalRow = res.total;
          }
          this._itemsnhomuser$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsacount$.value.map((el: T) => {
            const item: any = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  public fetch_AllPhongBan(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_AllPhongBan(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res) {
            resItems = res.data;
            resTotalRow = res.total;
          }
          this._itemsphongban$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsacount$.value.map((el: T) => {
            const item: any = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  public fetch_AllCustomer(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_AllCustomer(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res) {
            resItems = res.data;
            resTotalRow = res.total;
          }
          console.log("_itemsCustomer", resItems)

          this._itemsCustomer$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsacount$.value.map((el: T) => {
            const item: any = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  public fetch_AllContract(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_AllContract(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res) {
            resItems = res.data;
            resTotalRow = res.total;
          }
          this._itemsContract$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsacount$.value.map((el: T) => {
            const item: any = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }

  public fetch_AllAcount(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_AllAcount(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res) {
            resItems = res.data;
            resTotalRow = res.panigator.total;
          }
          // console.log("Acccount", resItems)
          this._itemsacount$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsacount$.value.map((el: T) => {
            const item: any = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }

  public fetch_AllAcountRoles(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_AllAcountRoles(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res) {
            resItems = res.data[0].permission_users;
            resTotalRow = res.total;
          }
          this._items_userRoles$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsacount$.value.map((el: T) => {
            const item: any = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  public fetch_AllSup(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_AllSup(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res) {
            resItems = res.data;
            resTotalRow = res.total;
          }
          this._itemsSup$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsacount$.value.map((el: T) => {
            const item: any = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  public fetch_AllTypeSong(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_AllTypeSong(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res) {
            resItems = res.data;
            resTotalRow = res.panigator.total;
          }
          this._itemsTypeSong$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsacount$.value.map((el: T) => {
            const item: any = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  public fetch_AllUser(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_AllDMThu(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res) {
            resItems = res.data;
            resTotalRow = res.total;
          }
          this._itemsThu$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsacount$.value.map((el: T) => {
            const item: any = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  public fetch_AllSong(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_AllSong(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res) {
            resItems = res.data;
            resTotalRow = res.panigator.total;
          }
          console.log("resItems", resItems)
          this._itemsAllSong$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsacount$.value.map((el: T) => {
            const item: any = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  public fetch_AllRadio(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_AllSong(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res) {
            resItems = res.data;
            resTotalRow = res.panigator.total;
          }
          console.log("resItems radio", resItems)
          this._itemsAllRadio$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsacount$.value.map((el: T) => {
            const item: any = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }

  find_AllSup(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_AllDMThu(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_AllSong(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_AllTypeSong(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_AllAcountRoles(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_AllAcount(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_AllPhongBan(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_AllCustomer(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_AllContract(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_Bebt(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  findAlldebt(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }

  find_Payment(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_bill(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_Thuchi(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_chi(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  find_AllNhomUser(tableState: ITableState, routeFind: string = '',): Observable<any> {
    const url = routeFind;
    const httpHeader = this.getHttpHeaders();
    this._errorMessage.next('');
    return this.http.post<any>(url, tableState, { headers: httpHeader }).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ status: 0, data: [], panigator: null, error: null });
      })
    );
  }
  // CREATE
  // server should return the object with ID
  create(item: BaseModel): Observable<BaseModel> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    return this.http.post<BaseModel>(this.API_URL, item).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('CREATE ITEM', err);
        return of({ id: undefined });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // READ (Returning filtered list of entities)
  find(tableState: ITableState): Observable<TableResponseModel<T>> {
    const url = this.API_URL + '/find';
    this._errorMessage.next('');
    return this.http.post<TableResponseModel<T>>(url, tableState).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ items: [], total: 0 });
      })
    );
  }

  getItemById(id: number): Observable<BaseModel> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = `${this.API_URL}/${id}`;
    return this.http.get<BaseModel>(url).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('GET ITEM BY IT', id, err);
        return of({ id: undefined });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // UPDATE
  update(item: BaseModel): Observable<any> {
    const url = `${this.API_URL}/${item.id}`;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    return this.http.put(url, item).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('UPDATE ITEM', item, err);
        return of(item);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // UPDATE Status
  updateStatusForItems(ids: number[], status: number): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const body = { ids, status };
    const url = this.API_URL + '/updateStatus';
    return this.http.put(url, body).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('UPDATE STATUS FOR SELECTED ITEMS', ids, status, err);
        return of([]);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // DELETE
  delete(id: any): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = `${this.API_URL}/${id}`;
    return this.http.delete(url).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('DELETE ITEM', id, err);
        return of({});
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // delete list of items
  deleteItems(ids: number[] = []): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = this.API_URL + '/deleteItems';
    const body = { ids };
    return this.http.put(url, body).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('DELETE SELECTED ITEMS', ids, err);
        return of([]);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  public fetch() {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find(this._tableState$.value)
      .pipe(
        tap((res: TableResponseModel<T>) => {
          this._items$.next(res.items);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              res.total
            ),
          });
        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            items: [],
            total: 0
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._items$.value.map((el: T) => {
            const item = (el as unknown) as BaseModel;
            return item.id;
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }

  public fetchThuchi(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_Thuchi(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res) {
            resItems = res.data;
            resTotalRow = res.total;
          }

          this._itemsThuChi$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsacount$.value.map((el: T) => {
            const item: any = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  public fetchchi(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_chi(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res) {
            resItems = res.data;
            resTotalRow = res.total;
          }
          console.log("Plan chi", resItems)
          this._itemsPlanChi$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsacount$.value.map((el: T) => {
            const item: any = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }

  public fetchBill(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_bill(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res) {
            resItems = res.data;
            resTotalRow = res.total;
          }
          this._itemsBill$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsacount$.value.map((el: T) => {
            const item: any = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  public fetchPayments(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_Payment(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res) {
            resItems = res.data;
            resTotalRow = res.total;
          }
          console.log("ggggg chi ", resItems)
          this._itemsPayment$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsacount$.value.map((el: T) => {
            const item: any = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  public fetchBebt(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find_Bebt(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res) {
            resItems = res.data;
            resTotalRow = res.total;
          }
          this._itemsBebt$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsacount$.value.map((el: T) => {
            const item: any = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }
  public fetchAlldebt(apiRoute: string = '', nameKey: string = 'id') {
    var resItems: any = [];
    var resTotalRow: number = 0;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.findAlldebt(this._tableState$.value, apiRoute)
      .pipe(
        tap((res: any) => {
          if (res) {
            resItems = res.data;
            resTotalRow = res.total;
          }
          this._itemsDebtt$.next(resItems);
          this.__responseData$.next(res);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              resTotalRow
            ),
          });

        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            status: 0,
            data: [],
            panigator: null,
            error: null,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._itemsacount$.value.map((el: T) => {
            const item: any = (el as unknown) as BaseModel;
            return item[nameKey];
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }

  public setDefaults() {
    this.patchStateWithoutFetch({ filter: {} });
    this.patchStateWithoutFetch({ sorting: new SortState() });
    this.patchStateWithoutFetch({ grouping: new GroupingState() });
    this.patchStateWithoutFetch({ searchTerm: '' });
    this.patchStateWithoutFetch({
      paginator: new PaginatorState()
    });
    this._isFirstLoading$.next(true);
    this._isLoading$.next(true);
    this._tableState$.next(DEFAULT_STATE);
    this._errorMessage.next('');
  }

  // Base Methods
  public patchState(patch: Partial<ITableState>) {
    this.patchStateWithoutFetch(patch);
    this.fetch();
  }

  public patchStateWithoutFetch(patch: Partial<ITableState>) {
    const newState = Object.assign(this._tableState$.value, patch);
    this._tableState$.next(newState);
  }
}
