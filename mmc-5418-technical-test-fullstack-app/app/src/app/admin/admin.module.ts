import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LogoutModule } from '../logout/logout.module';
import { AdminService } from './services/admin.service';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule, LogoutModule],
  providers: [AdminService],
})
export class AdminModule {}
