export interface PlayerConfig {
  id: string;
  name: string;           // Tên chính, e.g. "Nguyễn Văn Khanh"
  subNames: string[];     // Các tên viết tắt/biệt danh, e.g. ["Khanh", "Khanh3", "aKai"]
  telegramHandle: string; // Telegram handle, e.g. "@khanhtaquoc" (không bắt buộc)
  jerseyNumber: number;   // Số áo, e.g. 10
}
