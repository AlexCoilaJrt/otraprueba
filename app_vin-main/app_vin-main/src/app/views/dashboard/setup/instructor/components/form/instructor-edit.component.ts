import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { Instructor } from '../../models/instructor';

@Component({
    selector: 'app-instructor-edit',
    standalone: true,
    imports: [
        FormsModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    template: `
        <div class="flex flex-col max-w-240 md:min-w-160 max-h-screen -m-6">
            <!-- Header -->
            <div class="flex flex-0 items-center justify-between h-16 pr-3 sm:pr-5 pl-6 sm:pl-8 bg-primary text-on-primary">
                <div class="text-lg font-medium">{{ title }}</div>
                <button mat-icon-button (click)="cancelForm()" [tabIndex]="-1">
                    <mat-icon class="text-current" [svgIcon]="'heroicons_outline:x-mark'"></mat-icon>
                </button>
            </div>

            <!-- Compose form -->
            <form class="flex flex-col flex-auto p-6 sm:p-8 overflow-y-auto" [formGroup]="instructorForm">
                <mat-form-field>
                    <mat-label>Nombre</mat-label>
                    <input matInput formControlName="nombre" />
                </mat-form-field>
                <mat-form-field>
                    <mat-label>Especialidad</mat-label>
                    <input matInput formControlName="especialidad" />
                </mat-form-field>
                <mat-form-field>
                    <mat-label>Edad</mat-label>
                    <input matInput formControlName="edad" />
                </mat-form-field>
                <mat-form-field>
                    <mat-label>Teléfono</mat-label>
                    <input matInput formControlName="telefono" />
                </mat-form-field>
                <!-- Actions -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between mt-4 sm:mt-6">
                    <div class="flex space-x-2 items-center mt-4 sm:mt-0 ml-auto">
                        <button mat-stroked-button color="warn" (click)="cancelForm()">Cancelar</button>
                        <button mat-stroked-button color="primary" (click)="saveForm()">Guardar</button>
                    </div>
                </div>
            </form>
        </div>
    `
})
export class InstructorEditComponent implements OnInit {
    instructorForm: FormGroup;

    @Input() title: string = '';
    @Input() instructor: Instructor;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<InstructorEditComponent>,
    ) { }

    ngOnInit() {
        this.instructorForm = this.fb.group({
            nombre: [this.instructor?.nombre, Validators.required],
            especialidad: [this.instructor?.especialidad, Validators.required],
            edad: [this.instructor?.edad, Validators.required],
            telefono: [this.instructor?.telefono, Validators.required]
        });
    }

    public saveForm(): void {
        if (this.instructorForm.valid) {
            this.dialogRef.close({ ...this.instructor, ...this.instructorForm.value });
        }
    }

    public cancelForm(): void {
        this.dialogRef.close();
    }
}
