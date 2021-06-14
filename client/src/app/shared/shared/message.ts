export enum MessageType {
  Success = 'success',
  Error = 'error',
}

export abstract class Message {
  content: string;
  type: MessageType;

  protected constructor(content: string, type: MessageType) {
    this.content = content;
    this.type = type;
  }
}

export class SuccessMessage extends Message {
  constructor(content: string) {
    super(content, MessageType.Success);
  }
}

export class ErrorMessage extends Message {
  constructor(content: string) {
    super(content, MessageType.Error);
  }
}
