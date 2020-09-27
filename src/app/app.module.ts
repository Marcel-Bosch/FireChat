import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';

import { ChatService } from './providers/chat.service';


@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    FormsModule
  ],
  providers:[ChatService],
  declarations: [ AppComponent, ChatComponent, LoginComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}