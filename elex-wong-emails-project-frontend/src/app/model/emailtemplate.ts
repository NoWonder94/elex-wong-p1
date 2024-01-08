export type EmailTemplate = {
  id: number;
  name: string;
  template_json: string; // Json string representation of the template, in json
}

export type Image = {
  id: number,
  url: string;
  canDelete: boolean;
  file: any;
}

