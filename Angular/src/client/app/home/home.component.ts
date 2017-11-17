import { Component, OnInit } from '@angular/core';
import { NameListService } from '../shared/name-list/name-list.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})

export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  names: any[] = [];
  author: string;
  quote: string;
  authors: string[] = ['Joseph Campbell', 'Steve Jobs',
    'Buddha', 'Francis of Assisi', 'Aristotle',
    'Muhammad Ali', 'Bruce Lee', 'Ernest Hemingway', 'Franklin D. Roosevelt', 'Heraclitus', 'George Orwell'];
  quotes = [{
    'Joseph Campbell': 'We must let go of the life we have planned, so as to accept the one that is waiting for us.',
    // tslint:disable-next-line:max-line-length
    'Steve Jobs': 'Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven\'t found it yet, keep looking. Don\'t settle. As with all matters of the heart, you\'ll know when you find it.',
    'Buddha': 'What we think, we become.',
    'Francis of Assisi': 'Start by doing what\'s necessary; then do what\'s possible; and suddenly you are doing the impossible.',
    'Aristotle': 'It is during our darkest moments that we must focus to see the light.',
    // tslint:disable-next-line:max-line-length
    'Muhammad Ali': 'I hated every minute of training, but I said, \'Don\'t quit. Suffer now and live the rest of your life as a champion.\'',
    // tslint:disable-next-line:max-line-length
    'Bruce Lee': 'If you always put limit on everything you do, physical or anything else. It will spread into your work and into your life. There are no limits. There are only plateaus, and you must not stay there, you must go beyond them. ',
    'Ernest Hemingway': 'But man is not made for defeat. A man can be destroyed but not defeated.',
    'Franklin D. Roosevelt': 'When you reach the end of your rope, tie a knot in it and hang on.',
    'Heraclitus': 'There is nothing permanent except change.',
    'George Orwell': 'Happiness can exist only in acceptance.'
  }];
  quotesJson = JSON.parse(JSON.stringify(this.quotes));
  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public nameListService: NameListService) { }

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getNames();
    this.random();
  }

  /**
   * Handle the nameListService observable
   */
  getNames() {
    this.nameListService.get()
      .subscribe(
      names => this.names = names,
      error => this.errorMessage = <any>error
      );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // TODO: implement nameListService.post
    this.names.push(this.newName);
    this.newName = '';
    return false;
  }
  /**
   *
   */
  random() {
    //this.author[Math.floor(Math.random() * this.author.length)]
    //this.quote=this.quotes.
    this.author = this.authors[Math.floor(Math.random() * this.authors.length)];
    console.log(this.author);
    this.quote = this.quotesJson[0][this.author];
    console.log(this.quotesJson[0][this.author]);
  }
}
