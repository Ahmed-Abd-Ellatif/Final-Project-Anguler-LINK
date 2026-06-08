import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';
import { BackTop } from '../../shared/back-top/back-top';

@Component({
  selector: 'app-pages',
  imports: [RouterModule, Navbar, Footer, BackTop],
  templateUrl: './pages.html',
  styleUrl: './pages.css',
})
export class Pages {}
