import { Component, OnInit } from '@angular/core';
import { ApiConnectorService } from '../app/connector/api-connector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dav-project-app';

  constructor(private apiConnectorService: ApiConnectorService) { }

  ngOnInit(): void {
    this.openTab('btnTab1', 'tab1');
  }

  tab1_name: string;
  tab1_username: string;
  tab1_password: string;
  tab2_username: string;
  tab2_password: string;

  openTab(tabButtonId, tabId) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabId).style.display = "block";
    document.getElementById(tabButtonId).className += " active";
  }

  doRegister(){
    this.apiConnectorService
    .doRegister(
      this.tab1_name,
      this.tab1_username,
      this.tab1_password
    )
    .subscribe((data: any)=>{
      console.log(data);
    });

    this.tab1_name = "";
    this.tab1_username = "";
    this.tab1_password = "";
  }

  doLogin(){
    this.apiConnectorService
        .doLogin(
          this.tab2_username,
          this.tab2_password
        )
        .subscribe((data: any)=>{
          console.log(data);
        });

    this.tab2_username = "";
    this.tab2_password = "";
  }
}
