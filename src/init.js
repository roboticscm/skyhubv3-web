import { findLanguage } from 'src/lib/locale';
import { Browser } from 'src/lib/browser';
// import { log } from 'src/lib/log';

export const init = () => {
    // log.info('Init App');
    return new Promise((resolve, reject) => {
        findLanguage(-1, Browser.getLanguage(), true).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    })
}