import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/Product';
@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`https://localhost:5001/api/products`)
    }
    deleteProduct(id: number | string): Observable<Product> {
        return this.http.delete<Product>(`https://localhost:5001/api/products/${id}`)
    }
    getProductById(id: number | string): Observable<Product> {
        return this.http.get<Product>(`https://localhost:5001/api/products/${id}`)
    }
    addProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`https://localhost:5001/api/products`, product)
    }
    updateProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(`https://localhost:5001/api/products/${product.id}`, product)
    }
}