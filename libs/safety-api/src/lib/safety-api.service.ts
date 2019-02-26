import { Injectable } from '@angular/core';

import { CategoryService } from './services/category.service';
import { ControlService } from './services/control.service';
import { FormService } from './services/form.service';
import { MyFormService } from './services/my-form.service';
import { RoleService } from './services/role.service';
import { PermissionService } from './services/permission.service';
import { UserRoleService } from './services/user-role.service';
import { UserService } from './services/user.service';

@Injectable()
export class SafetyApiService {
  constructor(
    public category: CategoryService,
    public control: ControlService,
    public form: FormService,
    public myForm: MyFormService,
    public role: RoleService,
    public permission: PermissionService,
    public userRole: UserRoleService,
    public user: UserService
  ) {}
}
