
export type ProjectEmailing = {
  id: number,
  title: string,
  emailTemplateEid: number,
  status: ProjectEmailingStatus,
  total_mail: number,
  total_sent: number,
  speed: number,
}

export enum ProjectEmailingStatus {
  NONE = 0,
  SENDING = 1,
  PAUSE = 2,
  COMPLETE = 3,
  CANCEL = 4,
}

