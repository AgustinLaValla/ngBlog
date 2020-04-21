import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, 
         MatCardModule, 
         MatInputModule, 
         MatToolbarModule, 
         MatIconModule, 
         MatFormFieldModule, 
         MatMenuModule, 
         MatSidenavModule, 
         MatListModule, 
         MatProgressSpinnerModule,
         MatChipsModule,
         MatDividerModule,
         MatTableModule,
         MatPaginatorModule,
         MatSortModule,
         MatTooltip,
         MatTooltipModule,
         MatDialogModule,
         MatSelectModule} from '@angular/material'

const materialComponents = [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule
]

@NgModule({
    imports: [ CommonModule, materialComponents ],
    exports: [materialComponents],
})
export class MaterialModule {}