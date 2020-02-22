import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CodeGeneratorComponent } from './code-generator/code-generator.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PlaygroundComponent } from './playground/playground.component';
import { BallComponent } from './playground/ball/ball.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeGeneratorComponent,
    PlaygroundComponent,
    BallComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
