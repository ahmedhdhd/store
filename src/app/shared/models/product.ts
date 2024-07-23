// product.ts
export interface Product {
    id: number;
    name: string;
    description: string;
    prix: number;
    familleId?: number;
    typeId?: number;
    famille?: any; 
    type?: any; 
  }
  
  // pagination.ts
  export interface Pagination<T> {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: T;
  }
  
  // brand.ts (Assuming similar structure to Product)
  export interface Brand {
    id: number;
    name: string;
  }
  
  // type.ts (Assuming similar structure to Product)
  export interface Type {
    id: number;
    name: string;
  }
  

  export class ShopParams {
    brandId = 0;
    typeId = 0;
    sort = 'name';
    pageNumber = 1;
    pageSize = 6;
    search = '';
}