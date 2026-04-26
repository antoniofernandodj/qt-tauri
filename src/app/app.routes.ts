import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { GalleryComponent } from "./pages/gallery/gallery.component";
import { FusionComponent } from "./pages/fusion/fusion.component";
import { CalendarTestComponent } from "./pages/calendar-test/calendar-test.component";
import { CommandLinkButtonTestComponent } from "./pages/command-link-button-test/command-link-button-test.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'fusion', component: FusionComponent },
  { path: 'calendar', component: CalendarTestComponent },
  { path: 'command-link-button', component: CommandLinkButtonTestComponent },
];
