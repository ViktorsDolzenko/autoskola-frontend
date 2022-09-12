import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  public form: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
   this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      tel: ['', [Validators.required, Validators.maxLength(40) , Validators.pattern('[- +()0-9]+')]],
    })
  }


 public sendMessage() {
    if(this.form.invalid) {
      this.form.reset();
      const language = localStorage.getItem('lang') ?? 'lv'
      const message = language === 'lv' ? 'Kļūda, pieteikums netika nosūtīts, lūdzu, pārbaudiet, vai lauki ir pareizi aizpildīti' : 'Ошибка, заявка не отправлена, проверьте правильность заполнения полей'
      this._snackBar.open(message, 'Undo', {
        duration: 5000
      });
      return
    }
     this.http.post("https://adorable-figolla-676654.netlify.app/.netlify/functions/app", {
      name: this.form.controls.name.value,
      tel: this.form.controls.tel.value
    }).subscribe((success) => {
        const language = localStorage.getItem('lang') ?? 'lv'
        const message = language === 'lv' ? 'Pieteikums nosūtīts' : 'Заявка отправлена'
       this._snackBar.open(message, 'Undo', {
         duration: 5000
       });
       this.form.reset();
     },);
 }
}
