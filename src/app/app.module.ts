import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CodeGeneratorComponent } from './code-generator/code-generator.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PlaygroundComponent } from './playground/playground.component';
import { BallComponent } from './playground/ball/ball.component';
import { BarrierComponent } from './playground/barrier/barrier.component';
import { BasketComponent } from './playground/basket/basket.component';
import { NotificationComponent } from './notification/notification.component';
import { CommandComponent } from './code-generator/command/command.component';
import { ConsoleCommandComponent } from './code-generator/console-command/console-command.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeGeneratorComponent,
    PlaygroundComponent,
    BallComponent,
    BarrierComponent,
    BasketComponent,
    NotificationComponent,
    CommandComponent,
    ConsoleCommandComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
