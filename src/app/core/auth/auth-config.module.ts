import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://accounts.google.com',
            redirectUrl: window.location.origin,
            clientId: '161573849623-vfslgbiouorbge3ocf7ar82jlsnkiio0.apps.googleusercontent.com',
            responseType: 'id_token token',
            scope: 'openid email profile',
            triggerAuthorizationResultEvent: true,
            postLogoutRedirectUri: '/login',
            startCheckSession: false,
            silentRenew: false,
            silentRenewUrl: window.location.origin + '/silent-renew.html',
            postLoginRoute: '/profile',
            forbiddenRoute: '/login',
            unauthorizedRoute: '/login',
            logLevel: LogLevel.Debug,
            historyCleanupOff: true,
            // iss_validation_off: false
            // disable_iat_offset_validation: true
          },
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
