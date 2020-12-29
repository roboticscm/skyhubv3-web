import { RxHttp } from 'src/lib/rx-http';
import { BaseUrl } from 'src/lib/constants';


export class TableUtilStore {
  static findSimpleList(params) {
    return RxHttp.get({
      baseUrl: BaseUrl.SYSTEM,
      url: 'table-util/simple-list',
      params
    });
  }

  static getOneById(tableName, id) {
    return RxHttp.get({
      baseUrl: BaseUrl.SYSTEM,
      url: `table-util/${id}`,
      params: {tableName}
    });
  }

  // static getAllColumnsOfTable(tableName: string) {
  //   return RxHttp.get(`${BASE_URL}${toSnackCase('getAllColumnsOfTable')}`, {
  //     tableName,
  //   });
  // }

  static softDeleteMany(tableName, ids) {
    return RxHttp.delete({
      baseUrl: BaseUrl.SYSTEM,
      url: 'table-util',
      params: {
        tableName,
        ids: ids.join(',')
      }
    });
  }

  static hasAnyDeletedRecord(tableName, onlyMe = false) {
    return RxHttp.get({
      baseUrl: BaseUrl.SYSTEM,
      url: 'table-util/has-any-deleted-record',
      params: {tableName, onlyMe}
    });
  }

  static findDeletedRecords(tableName, columns, onlyMe = false) {
    return RxHttp.get({
      baseUrl: BaseUrl.SYSTEM,
      url: 'table-util/find-deleted-records',
      params: {tableName,  columns: columns.map((it) => `t.${it}`).join(','), onlyMe}
    });
  }

  static restoreOrForeverDelete(tableName, deleteIds, restoreIds) {
    return RxHttp.put({
      baseUrl: BaseUrl.SYSTEM,
      url: 'table-util/restore-or-forever-delete',
      params: {tableName, deleteIds, restoreIds}
    }); 
  }
}
