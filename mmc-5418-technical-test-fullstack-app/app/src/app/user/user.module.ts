import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LogoutModule } from '../logout/logout.module';
import { UserComponent } from './user.component';
import { UserService } from './services/user.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule, LogoutModule, ReactiveFormsModule],
  providers: [UserService],
})
export class UserModule {}
