import { Component, ViewChild, OnInit, Inject } from '@angular/core';
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

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface DialogData {
  id: number,
  name: string;
  category: string;
  price: number;
  stockStatus: boolean;
}


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
    MatSelectModule,
    MatOptionModule
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


 


  constructor(private productService: ProductService, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogNewProduct, {
      width: '400px',
      data: { id: null, name: '', category: '', price: null, stockStatus: true },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = [...this.dataSource.data, result]; // Add the new product to the dataSource
        this.table.renderRows();  // Re-render table to reflect changes
      }
    });
  }




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
    
  @Component({
    selector: 'dialog-new-product',
    templateUrl: 'dialog-new-product.html',
    standalone: true,
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
      MatOptionModule,
      FormsModule,
      MatSelectModule
    ],
  })
  export class DialogNewProduct {
    constructor(
      public dialogRef: MatDialogRef<DialogNewProduct>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }