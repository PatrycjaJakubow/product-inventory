import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [MatIcon, FormsModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class AddEditProductComponent {

  @Input() product: any;

  @Output() toggleEdit = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();


  toggleEditMode() {
   this.toggleEdit.emit(this.product);
     }

     saveRow() {
     this.save.emit(this.product);
     }
}
