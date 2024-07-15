export enum Platform {
  WHATSAPP = 'whatsapp',
  LINE = 'line',
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  DOCUMENT = 'document',
  AUDIO = 'audio',
  VIDEO = 'video',
  STICKER = 'sticker',
  LOCATION = 'location',
  CONTACTS = 'contacts',
  BUTTON_REPLY = 'button_reply',
  LIST_REPLY = 'list_reply',
  TEMPLATE = 'template',
}

export interface FacebookTextMessage {
  recipient: { id: string };
  message: { text: string };
}

export interface FacebookMediaMessage {
  recipient: { id: string };
  message: {
    attachment: {
      type: 'image' | 'video';
      payload: { url: string };
    };
  };
}

export type FacebookMessage = FacebookTextMessage | FacebookMediaMessage;
