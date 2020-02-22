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

@NgModule({
  declarations: [
    AppComponent,
    CodeGeneratorComponent,
    PlaygroundComponent,
    BallComponent,
    BarrierComponent,
    BasketComponent
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
