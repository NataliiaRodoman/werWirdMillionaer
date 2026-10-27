
import { CurrencyPipe } from '@angular/common'; 
import { Component, EventEmitter, Input, Output, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CurrencyPipe],
  styleUrl: './forms.scss',
  templateUrl: './forms.html',
})
export class Forms {
  private fb = inject(FormBuilder);
  gewonneneSumme = input<number>(0);
  formGesendet = output<any>();
  abbrechen = output<void>();

  winnerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    telefon: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]]
  });
  
  sendeDaten() {
    if (this.winnerForm.valid) {
      const finaleDaten = { ...this.winnerForm.value, gewinn: this.gewonneneSumme() };

      this.formGesendet.emit(finaleDaten);
      alert('Vielen Dank! Ihre Daten wurden übermittelt.');
    } else {
      this.winnerForm.markAllAsTouched();
    }
  }

  zuruecksetzen() {
    this.abbrechen.emit();
  }
}
