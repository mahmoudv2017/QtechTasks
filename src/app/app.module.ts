import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GridComponentComponent } from './Components/grid-component/grid-component.component';
import { SortDirective } from './Directives/sort.directive';
import { CustomPipePipe } from './Pipes/custom-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GridComponentComponent,
    SortDirective,
    CustomPipePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
