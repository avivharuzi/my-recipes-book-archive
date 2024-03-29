import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from './features/auth/shared/authentication.guard';
import { CoreComponent } from './core/core.component';
import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { WithoutAuthenticationGuard } from './features/auth/shared/without-authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [WithoutAuthenticationGuard],
      },
      {
        path: 'auth',
        canActivate: [WithoutAuthenticationGuard],
        loadChildren: () =>
          import('./features/auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'recipes',
        canActivate: [AuthenticationGuard],
        loadChildren: () =>
          import('./features/recipes/recipes.module').then(
            m => m.RecipesModule
          ),
      },
      {
        path: 'collections',
        canActivate: [AuthenticationGuard],
        loadChildren: () =>
          import('./features/collections/collections.module').then(
            m => m.CollectionsModule
          ),
      },
      {
        path: 'settings',
        canActivate: [AuthenticationGuard],
        loadChildren: () =>
          import('./features/settings/settings.module').then(
            m => m.SettingsModule
          ),
      },
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      paramsInheritanceStrategy: 'always',
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'corrected',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
