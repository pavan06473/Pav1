import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AddtaskComponent } from './task/addtask/addtask.component';
import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { FilterPipe } from './task/task-list/filter.pipe';
import { FilterNumPipe } from './task/task-list/filter-num.pipe';
import { FilterNumMaxPipe } from './task/task-list/filter-num-max.pipe';
import { UserComponent } from './user/user.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './reducers/user.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddtaskComponent,
    HomeComponent,
    TaskListComponent,
    FilterPipe,
    FilterNumPipe,
    FilterNumMaxPipe,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,  
    StoreModule.forRoot({
      users: userReducer
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
