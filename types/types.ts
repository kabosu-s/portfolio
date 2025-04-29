export interface Vector2 {
  x: number;
  y: number;
}
export interface TransitionParticles {
  duration: number;
  delay: number;
  easing: string;
}

export interface ScrambleTextProps {
  text: string; // 表示するテキスト
  hoverText: string; // ホバー時にスクランブルするテキスト
}
interface Grade {
  name: number;
  email: number;
  message: number;
  category: number;
}
interface Attribute {
  parent_elm: string;
}
interface Col {
  key: string;
  title: string;
  required: string;
  order_no: number;
  type: string;
  options: any[];
  validate: any[];
  msg: string;
  option_default: any[];
  option_group: any[];
  attribute: Attribute;
}
interface StatusList {
  [key: number]: string;
}
interface Cols {
  name: Col;
  from_mail: Col;
  body: Col;
}
interface ResponseDetails {
  inquiry_id?: number;
  inquiry_name?: string;
  inquiry_info?: string;
  mail?: string;
  inst_ymdhi?: string;
  update_ymdhi?: string;
  grade?: Grade;
  thanks_text?: string;
  thanks_tag?: string;
  status?: number;
  order_no?: number;
  status_list?: StatusList;
  cols?: Cols;
  member_register_flg?: number;
  register_group_ids?: any[];
  sort_grade?: string[];
  ordered_keys?: string[];
}
export interface Response {
  errors?: { message: string }[];
  messages?: string[];
  details: ResponseDetails;
}

export interface SubmitData {
  name?: string;
  from_mail?: string;
  body?: string;
}

export interface FormResponse {
  details: {
    inquiry_name: string;
    inquiry_info: string;
    thanks_text: string;
  };
}

// 記事1件分のデータ
export interface ArticlesItem {
  topics_id: number;
  ymd: string;
  subject: string;
  update_ymdhi: string;
  contents_type_nm: string;
  mv?: {
    url: string;
    desc: string;
    url_org: string;
  };
  slug?: string;
}
// ページ情報
export type PageInfo = {
  totalCnt: number;       // 総記事数
  perPage: number;        // 1ページあたりの件数
  totalPageCnt: number;   // 総ページ数
  pageNo: number;         // 現在のページ番号
  firstIndex: number;     // このページの開始インデックス
  lastIndex: number;      // このページの終了インデックス
  startPageNo: number;    // ページャー表示開始番号
  endPageNo: number;      // ページャー表示終了番号
};

// 全体のレスポンス
export interface Articles {
  list: ArticlesItem[]; // ArticlesItemの配列
  pageInfo: PageInfo;
}
type EmblaType = 'blog' | 'works';

export interface EmblaCarouselProps {
  items: Articles;
  type: EmblaType; // 追加！
}
