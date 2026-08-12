import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './services/auth-guard.service';
import { UserComponent } from './pages/user/user.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { RecipeCreateComponent } from './pages/recipe-create/recipe-create.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "login"
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignupComponent
    },
    {
        path: "user",
        component: UserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "forgot",
        component: ForgotComponent
    },
    {
        path: "recipe/create",
        component: RecipeCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "recipe/:id",
        component: RecipeDetailComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "**",
        redirectTo: "login"
    }
];