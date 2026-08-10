import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [LoginService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    if (this.signupForm.invalid) {
      this.toastService.warning("Preencha todos os campos corretamente.");
      return;
    }

    if (this.signupForm.value.password !== this.signupForm.value.passwordConfirm) {
      this.toastService.error("As senhas não coincidem!");
      return;
    }

    this.loginService.signup(
      this.signupForm.value.name,
      this.signupForm.value.email,
      this.signupForm.value.password
    ).subscribe({
      next: () => {
        this.toastService.success("Cadastro realizado com sucesso!");
        this.router.navigateByUrl("/login");
      },
      error: (err) => {
        const mensagem = err.error?.message || "Erro ao realizar cadastro!";
        this.toastService.error(mensagem);
      }
    });
  }

  navigate() {
    this.router.navigateByUrl("/login");
  }
}
