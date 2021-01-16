import { RxHttp } from 'src/lib/rx-http';
import { BaseUrl } from 'src/lib/constants';
import { LoginInfo } from './login-info';
import { findLanguage } from 'src/lib/locale';
import { OrgStore } from 'src/features/system/org/store';

export class SettingsStore {
  static saveUserSettings(obj, useBranch = true) {
    return new Promise((resolve, reject) => {
      RxHttp.post({
        baseUrl: BaseUrl.SYSTEM,
        url: `user-settings`,
        jsonData: useBranch ? { ...obj, branchId: LoginInfo.branchId$.value } : obj,
      }).subscribe((res) => {
        resolve();
      });
    });
  }

  static getUserSettings(params, useBranch = true) {
    return new Promise((resolve, reject) => {
      RxHttp.get({
        baseUrl: BaseUrl.SYSTEM,
        url: 'user-settings',
        params: useBranch ? { ...params, branchId: LoginInfo.branchId$.value } : params,
      }).subscribe((res) => {
        resolve(res);
      });
    });
  }

  static getLastUserSettings() {
    return new Promise((resolve, reject) => {
      RxHttp.get({
        baseUrl: BaseUrl.SYSTEM,
        url: 'user-settings/initial',
      }).subscribe((res) => {
        if (res.data && res.data.length > 0) {
          LoginInfo.companyId$.next(res.data[0].companyId);
          LoginInfo.companyName$.next(res.data[0].companyName);
          LoginInfo.branchId$.next(res.data[0].branchId);
          LoginInfo.branchName$.next(res.data[0].branchName);
          LoginInfo.departmentId$.next(res.data[0].departmentId);
        }

        SettingsStore.getUserSettings({
          key: 'lastSelected',
          menuPath: 'sys/user-profiles-modal',
          elementId: 'localeResourceUsedLanguageSelectId',
        }).then((r) => {
          let locale = 'vi-VN';
          if (r.data && r.data.length > 0) {
            locale = r.data[0].value;
          }
          LoginInfo.locale$.next(locale);
          findLanguage(LoginInfo.companyId$.value, locale).then(() => resolve());
        });

        // load branch
        OrgStore.findBranches().subscribe(() => {});
      });
    });
  }
}
