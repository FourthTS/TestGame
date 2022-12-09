import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  squares: any = [];
  xIsNext: any;
  freshPage = true;
  isWin: boolean | undefined;
  draw: boolean | undefined;
  isLose: boolean | undefined;
  newData: any;

  startFirst: number | undefined;
  constructor(private DataService: DataService) {
    // TODO document why this constructor is empty

  }

  ngOnInit() {
    
  }

  wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  yourTurn = false;
  botTurn = false;

  async randomStartFirst() {
    this.startFirst = Math.floor(Math.random() * 2)

    if (this.startFirst == 0) {
      this.botTurn = true;
      await this.wait(1000);
      this.postData(this.data);
      this.botTurn = false;
    }
    else{
      this.yourTurn = true; 
    }

  }

  postData(data: number[][]) {
    this.DataService.postdata(data).subscribe((data) => {
      this.newData = data;
      console.log(this.newData);
      this.convartData(this.newData.data.field);

    })
  }

  convartData(inputData: []) {
    for (let idx = 0; idx < 3; idx++) {
      for (let idy = 0; idy < 3; idy++) {
        if (inputData[idx][idy] == 2) {
          this.squares[idx][idy] = this.bot;
          this.dis[idx][idy] = this.squares[idx][idy]
          this.checkWin(this.newData.data.isWin);
        }
      }
    }
  }

  newGame() {
    this.squares = [['', '', ''], ['', '', ''], ['', '', '']]
    this.dis = [['', '', ''], ['', '', ''], ['', '', '']]
    this.isWin = false;
    this.draw = false;
    this.isLose = false;
    this.freshPage = !this.freshPage;
  }

  again() {
    this.squares = [['', '', ''], ['', '', ''], ['', '', '']]
    this.dis = [['', '', ''], ['', '', ''], ['', '', '']]
    this.isWin = false;
    this.draw = false;
    this.isLose = false;
  }

  startWith: any;
  bot: any;

  userStart(select: string) {
    if (select == 'X') {
      this.startWith = 'X'
      this.bot = 'O'
      this.xIsNext = true
    }
    else if (select == 'O') {
      this.startWith = 'O'
      this.bot = 'X'
      this.xIsNext = false
    }
    this.newGame();
    return this.startWith && this.bot;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O'
  }

  dis = [['', '', ''], ['', '', ''], ['', '', '']];

  move(idx: number, idy: number) {
    if (!this.squares[idx][idy]) {

      this.squares[idx][idy] = this.player;
      this.setData(this.squares);

      this.dis[idx][idy] = this.squares[idx][idy]
    }
  }


  data = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  setData(getData: []): void {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (getData[i][j] === '' || null) {
          this.data[i][j] = 0;
        }
        else if (getData[i][j] == this.startWith) {
          this.data[i][j] = 1;
        }
        else {
          this.data[i][j] = 2;
        }
      }
    }
    this.postData(this.data)
  }

  checkWin(data: string) {
    console.log(data);
    if (data == 'win') {
      this.isWin = true;
    } else if (data == 'lose') {
      this.isLose = true;
    }
    else if (data == 'draw') {
      this.draw = true;
    } else {
      console.log();
    }
  }

  


}



