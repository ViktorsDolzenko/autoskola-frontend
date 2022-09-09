import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  public form: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
   this.form = this.formBuilder.group({
      name: ['', Validators.required, Validators.maxLength(50)],
      tel: ['', Validators.required, Validators.maxLength(20)],
    })
  }


 public sendMessage() {
    if(this.form.invalid) {
     return
    }
     this.http.post("https://adorable-figolla-676654.netlify.app/.netlify/functions/app", {
      name: this.form.controls.name.value,
      tel: this.form.controls.tel.value
    }).subscribe();
 }
}
