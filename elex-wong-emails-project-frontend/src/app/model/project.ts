import { File } from "./file";

export type Project = {
  id: number;
  name: string;
  url: string;
  twitter_id: string;
  category: string;
  api_key: string;
  logo?: File;
}
