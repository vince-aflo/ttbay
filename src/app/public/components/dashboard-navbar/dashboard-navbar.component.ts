import { Component, Input, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { LoginService } from 'src/app/core/services/login.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss']
})

export class DashboardNavbarComponent implements OnInit {
  showMenu:boolean = false
  profileImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFP0lEQVR4nO1aSYgdZRDu0WgUI65RccHlZFxQFETvigtEjTIHN3LyZeZ1Vf1V/TKoF1tvGvTkFlFy8CQeoybqQROUUccsmoDGMRlEE8WNgDAmGZOJVPffb15eXr/+/+5+Y5QU/DDM+7vq/7r2+jsIjtP/lIwxZ4YmuhuJVyHy20j8DSD/hsT7dOnfgPI1kKy1e5Y2Go+dERwLhIgLEfkhRHkPSQ4iyWHPdRCI14ckDyqvYL5p+fL4FMQoQuI92aGAZD8QbwDimEiWNZmvDsPwHN2rS/8momsAzH26B1A2AvKB9vPIuxGFde+8gAAwdwLxzvZbRdkMICtGRx8/y5eXPqPPAvGWOX78XWjM7QPVAhC/PKcB3oIod9TEfkhfEBJ/2QHohdrNjYjOB+JN1gT+ConN8PDwibUKCYIgjuMFQCxpgFBZMjEy0jqvFubGmMtU3ZbxjjCUawv2L0GUJxDlI0DZpcCRZBqJp4DkjdCYW4pkAsh1gDJpZU7qGSprogPEZ+qweXujKDoXkdcA8qGCSDULxE/349XmR/x5Bqa0ZqxPpOZE/Gmz2VyUt1eFAPJ2n9ALyH8DyautVuu0PL7NZnNRB5iJUj6DKK/MmVP+24vj+ARA/rhEDsnWJ3Ecn9xPM5CZGcmLXiCI5K62Yxf4REhyfwUQWYRa2U+GMeb6LAA4h2YROVWdNAECQkX703KkIhDi74vkQBLNUn9xMjEgaWV5wiHEDgHyn9WByGFmvqIwNKN8lWiF2BSXHrbscFEhIi6uA0Sqfb7Vw+R399UKkDxstbEpcKBmc+UFtQEx5l4HkUNZOQNgHsjdhcgfpEzlURcgGnbrAuLqxCHxiH1mXW4Bl5bVsl97CxemY2Njp2uCq8e0oitdZIrI2Vo1ax7q2c+oaq1ZfRh4ECL/UBkE8iGf8h1QNibPIi/tdaDn0h/lSS8gJOuqa4S3eclEeco+t6rXgd6xKO/xY8ovVQaCvMZHJpEsS61H1h71Y1YGaPXqylDLEyT+ubppyU/KK3Ak7T7tczt6AOE/9Ed1JleGureuqOXTYaLNX0Dyay8gSf/cr4DrpkajcVJWA1X0kX0+clGHHnZOUAuQlGkyQamqkd45oQgI8oFaTEuJqHVj2gGWBjEdMt/gIzNKmq7k2d97ALE1v2Ni6hVFyix91lceYuuqXGdv5wPP8JsyxoXqeCV84xdfU+5M3poygm4C4ufLJMSMtDnyBoJRVEYWEMe5CbFsiXJkBJMvPHLHhPYYJYFsyC1RtC+3AwHnorGbEPFiVyAiclEZGWKLRiSZyT0nkLzvU8Z3k9q7K5DS2gBZYUPvu7mbEPkR6yebywixZb0TkH7jJZfGSm8BChKNe6vbTQCty12BlJkeUtbqkvxYGO2y6AMoW33mu3ownUY6O3sy9Gtd6so/juMFWu5bi2G3nGDHQYXTitRmbwKS10pm92lEfh1Rbi4+VxTZFzzpnHusCmfzBnTJ9A+EjrgGqLx4m86ues14OwZ0s95XGdnIFIm/zUamOiVH5Dc7b5oGsGYQ+S09fHoOXJwN0vXOJPAlnThmA2REGddLHodJe20LElm8uu13KOOlr+XSuRVPzdfhMReU7NIrjqAKjUbRJW3V/iuLpzSsB3VQGI5d6BNaa1so42oVQZ1k58Kr6xrIFazZZDozyLt3DX+D9Bsg3hlSdNvAABzdSLHoGKdGX9ijCbhMo1WZVGj6+UUygJjxfvs6wyVer5N17WeCY4GSrxi0OUN5Vtvm5AMalL1zh5a9+r/kN+JntKUu87XEcQr+I/QPOfgeyQrlV5AAAAAASUVORK5CYII=";
  options = [
    { label: 'Profile', link: '/dashboard/profile', icon: 'https://img.icons8.com/metro/256/gender-neutral-user.png' },
    { label: 'Settings', link: '/dashboard/account-settings', icon: 'https://img.icons8.com/ios-filled/256/null/settings.png' },
    { label: 'Help', link: '/help', icon: 'https://img.icons8.com/metro/256/help.png' },
    { label: 'Logout', link: '/logout', icon: 'https://img.icons8.com/glyph-neue/256/power-off-button.png' },
  ];
  primaryLinks = [
    {label: 'Summary', link: '/dashboard/summary', icon: 'https://img.icons8.com/external-sbts2018-solid-sbts2018/58/null/external-summary-basic-ui-elements-2.4-sbts2018-solid-sbts2018.png'},
    {label: 'Auctions', link: '/dashboard/auctions', icon: 'https://img.icons8.com/external-vectorslab-glyph-vectorslab/53/null/external-auction-business-and-finance-vectorslab-glyph-vectorslab.png'},
    {label: 'Drafts', link: '/dashboard/drafts', icon: 'https://img.icons8.com/ios-filled/100/null/back-to-draft.png'},
    {label: 'Bids', link: '/dashboard/bids', icon: 'https://img.icons8.com/external-flatart-icons-solid-flatarticons/64/null/external-bid-auction-flatart-icons-solid-flatarticons.png'},
  ]
  activeTab:string = 'Summary'

  constructor(private oidcSecurityService:OidcSecurityService,
    private userService:UserService,
    private loginService: LoginService){}

  ngOnInit(){
    this.oidcSecurityService.checkAuth().subscribe(({ userData: { email } }) => {
      this.userService.getProfile(email).then(data => {
        data.subscribe({
          next: (response) => {
            console.log(response)
            if (response.profileUrl) {
              this.profileImage = response.profileUrl;         
            }
          }
        })
      })
    }); 
  }

  toggleMenu(e:any){
    this.showMenu = !this.showMenu
    e.stopPropagation();
  }

  setActiveTab(body:string){
    if(body == 'Logout') this.loginService.logout()
    this.activeTab = body;
    this.showMenu = false;
  }
}
