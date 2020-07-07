// Core
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Routing
import { Tab1PageRoutingModule } from './tab1-routing.module';

// Pages
import { Tab1Page } from './tab1.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        Tab1PageRoutingModule
    ],
    declarations: [Tab1Page]
})
export class Tab1PageModule { }
