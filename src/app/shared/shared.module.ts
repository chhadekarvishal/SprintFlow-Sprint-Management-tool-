import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from './material-module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MaterialModule,
    ],
    exports: [
        MaterialModule,
    ],
    providers: [
        MatSnackBar,
    ]
})
export class SharedModule { }
