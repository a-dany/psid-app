import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routes';

@NgModule({
    declarations: [ AppComponent ],
    imports: [
        AppRoutingModule, BrowserModule, CommonModule, ComponentsModule, PagesModule, RouterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }