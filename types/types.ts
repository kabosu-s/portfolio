export interface Vector2 {
      x: number;
      y: number;
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


export interface WorksItem {
  subject: string; // 例: Case番号
  topics_id: number;
  link: {
    title: string; // リンクのタイトル
  };
  update_ymdhi: string; // 更新日時
  contents_type_nm: string; // カテゴリ名
  contents_type_slug: string; // 使用ツール
}

export interface Works {
  list: WorksItem[]; // WorksItemの配列
}