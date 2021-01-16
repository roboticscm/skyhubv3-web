const SCHEME = 'http';
const PORT = 8080;
const HOST = 'localhost';

export class BaseUrl {
  static SYSTEM = `${SCHEME}://${HOST}:${PORT}`;
}

export class App {
  static NAME = 'SKYHUB';
  static SNACKBAR_TIMEOUT = 2000;
  static MAX_HEADER_HEIGHT = 100;
  static MIN_HEADER_HEIGHT = 30;
  static MIN_PASSWORD_LENGTH = 4;
  static GUTTER_WIDTH = 5;
  static AUTO_COMPLETE = 'off';
  static DEFAULT_PAGE_SIZE = 20;
  static PROGRESS_BAR = '<i class="fa fa-spinner fa-spin" />';
  static DEFAULT_END_TIME_FILTER_OFFSET = 30 * 24 * 60 * 60 * 1000;
}
