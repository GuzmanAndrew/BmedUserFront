import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { ProdGuardService as guard } from 'src/app/guards/prod-guard.service';
import { TableCovidComponent } from 'src/app/pages/table-covid/table-covid.component';
import{TablePatologiasComponent} from 'src/app/pages/table-patologias/table-patologias.component'

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [guard], data: { expectedRol: ['medico', 'user'] } },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [guard], data: { expectedRol: ['medico', 'user'] } },
    { path: 'info', component: TablesComponent, canActivate: [guard], data: { expectedRol: ['medico', 'user'] } },
    { path: 'covid', component: IconsComponent, canActivate: [guard], data: { expectedRol: ['user'] } },
    { path: 'covid-med/:id', component: TableCovidComponent, canActivate: [guard], data: { expectedRol: ['medico'] } },
    { path: 'info/:id', component: TablesComponent, canActivate: [guard], data: { expectedRol: ['medico'] }  },
    { path: 'patologia/:id', component: TablePatologiasComponent, canActivate: [guard], data: { expectedRol: ['medico'] }  },
    { path: 'patologia', component: TablePatologiasComponent, canActivate: [guard], data: { expectedRol: ['medico', 'user'] } },
];
