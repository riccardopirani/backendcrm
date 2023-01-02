import { Preventivo } from "../../preventivo/entities/preventivo.entity";
export declare class Media {
  id: number;
  file_name: string;
  file_original_name: string;
  file_content_type: string;
  file_id: number;
  version: number;
  created_date: Date;
  updated_date: Date;
  preventivo: Preventivo;
  preventivo_id: number;
}
