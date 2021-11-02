import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './deployActions/start/start.component';
import { StopComponent } from './deployActions/stop/stop.component';
import { ListReportsComponent } from './extracts/listReport/list-reports/list-reports.component';
import { ListExtractsComponent } from './extracts/listExtracts/list-extracts/list-extracts.component';
import { RetrieveExtractComponent } from './extracts/retrieveExtract/retrieve-extract/retrieve-extract.component';
import { ExtractStatusComponent } from './extracts/extractStatus/extract-status/extract-status.component';
import { ListReplicatsComponent } from './replicats/listsReplicats/list-replicats/list-replicats.component';
import { ReplicatListReportsComponent } from './replicats/replicatListsReports/replicat-list-reports/replicat-list-reports.component';
import { RetrieveReplicatComponent } from './replicats/retrieveReplicat/retrieve-replicat/retrieve-replicat.component';
import { ReplicatStatusComponent } from './replicats/replicatStatus/replicat-status/replicat-status.component';
import { LogsComponent } from './reports/logs/logs/logs.component';
import { MessagesComponent } from './reports/messages/messages/messages.component';
import { TaskManagerComponent } from './reports/taskManager/task-manager/task-manager.component';




@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    StopComponent,
    ListReportsComponent,
    ListExtractsComponent,
    RetrieveExtractComponent,
    ExtractStatusComponent,
    ListReplicatsComponent,
    ReplicatListReportsComponent,
    RetrieveReplicatComponent,
    ReplicatStatusComponent,
    LogsComponent,
    MessagesComponent,
    TaskManagerComponent
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
