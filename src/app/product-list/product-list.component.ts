// import { Component, ViewChild, AfterViewInit } from '@angular/core';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatTable, MatTableModule, MatTableDataSource } from '@angular/material/table';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
// import { MatFormField, MatLabel } from '@angular/material/form-field';
// import { FormsModule, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { MatOptionModule } from '@angular/material/core';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelect } from '@angular/material/select';
// import { ProductService } from '../product.service';

// export interface ProductTable {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   stockStatus: boolean;
//   editMode: boolean;  // Flag to manage edit mode per row
// }

// const ELEMENT_DATA: ProductTable[] = [
//   { id: 1, name: 'Name1', category: 'X', price: 11, stockStatus: true, editMode: false },
//   { id: 2, name: 'Name2', category: 'X', price: 22, stockStatus: true, editMode: false },
//   { id: 3, name: 'Name3', category: 'Y', price: 33, stockStatus: true, editMode: false },
//   { id: 4, name: 'Name4', category: 'Y', price: 44, stockStatus: true, editMode: false },
//   { id: 5, name: 'Name5', category: 'Y', price: 55, stockStatus: true, editMode: false },
//   { id: 6, name: 'Name6', category: 'X', price: 66, stockStatus: true, editMode: false },
//   { id: 7, name: 'Name7', category: 'Z', price: 77, stockStatus: false, editMode: false },
//   { id: 8, name: 'Name8', category: 'Z', price: 88, stockStatus: false, editMode: false },
//   { id: 9, name: 'Name9', category: 'Z', price: 99, stockStatus: false, editMode: false },
//   { id: 10, name: 'Name10', category: 'X', price: 101, stockStatus: true, editMode: false },
// ];

// @Component({
//   selector: 'app-product-list',
//   standalone: true,
//   imports: [
//     MatIconModule,
//     MatButtonModule,
//     MatToolbarModule,
//     MatTableModule,
//     MatPaginatorModule,
//     MatSortModule,
//     MatFormField,
//     MatLabel,
//     FormsModule,
//     CommonModule,
//     ReactiveFormsModule,
//     MatOptionModule,
//     MatInputModule,
//     MatOptionModule,
//     MatSelect
    
//   ],
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css'],
// })
// export class ProductListComponent implements AfterViewInit {
//   displayedColumns: any[] = ['name', 'category', 'price', 'stockStatus', 'edit', 'delete'];
//   dataSource = new MatTableDataSource<ProductTable>(ELEMENT_DATA);

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;
//   @ViewChild(MatTable) table!: MatTable<ProductTable>;
// ELEMENT_DATA: any;
// categoryFormControl = new FormControl('', [Validators.pattern('^[a-zA-Z ]*$')]);

// constructor(
//   private productService: ProductService
// ) {}


//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }

//   addData() {
//     const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
//     const newData = [...this.dataSource.data, ELEMENT_DATA[randomElementIndex]];
//     this.dataSource.data = newData; // Explicitly reassign to trigger change detection
//   }

//   removeData(id: number) {
//     const newData = this.dataSource.data.filter((item) => item.id !== id); // Filter out the row by id
//     this.dataSource.data = newData; // Explicitly reassign to trigger change detection
//   }

//   toggleEditMode(element: ProductTable) {
//     element.editMode = !element.editMode;
//   }

//   saveRow(element: ProductTable) {
//     element.editMode = false; // Turn off edit mode after saving
//     this.table.renderRows(); // Update the table view
//   }

//   sortData(sort: Sort) {
//     const data = this.dataSource.data.slice();
//     if (!sort.active || sort.direction === '') {
//       this.dataSource.data = data;
//       return;
//     }

//     this.dataSource.data = data.sort((a, b) => {
//       const isAsc = sort.direction === 'asc';
//       switch (sort.active) {
//         case 'name':
//           return compare(a.name, b.name, isAsc);
//         case 'price':
//           return compare(a.price, b.price, isAsc);
//         default:
//           return 0;
//       }
//     });
//   }
// }

// function compare(a: number | string, b: number | string, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }


import { Component, ViewChild, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTable, MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormField,
    MatLabel,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  displayedColumns: string[] = ['name', 'category', 'price', 'stockStatus', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
     }
    
  loadProducts() {
    this.productService.getProducts().subscribe((products: any[]) => {
      this.products = products;
      this.dataSource.data = products;  // Update the dataSource
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

    addData() {
      const randomElementIndex = Math.floor(Math.random() * this.products.length);
      const newData = [...this.dataSource.data, this.products[randomElementIndex]];
      this.dataSource.data = newData; // Explicitly reassign to trigger change detection
       
    }
  
    toggleEditMode(element: any) {
    element.editMode = !element.editMode;
     }
      
    saveRow(element: any) {
      element.editMode = false; // Turn off edit mode after saving
       this.table.renderRows(); // Update the table view
     }


  removeProduct(id: number) {
    this.products = this.products.filter(product => product.id !== id);
    this.dataSource.data = this.products;
  }

  sortData() {
    const data = this.dataSource.data.slice(); // Create a copy of the data
    if (!this.sort.active || this.sort.direction === '') {
      this.dataSource.data = data;
      return;
    }
  
    // Sort the data based on the active column and direction
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc'; // Determine sort direction
      switch (this.sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        default:
          return 0; 
          case 'category':
          return compare(a.category, b.category, isAsc);
          case 'stockStatus':
          return compare(a.stockStatus, b.stockStatus, isAsc);
      }
    });
  }}
  
  function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
    
    