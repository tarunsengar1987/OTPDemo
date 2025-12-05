export type OtpInputProps = {
  length?: number;
  initialValue?: string;
  onChange?: (code: string) => void;
};

export type OtpInputRef = {
  value: string;
  validate: () => boolean;
  clear: () => void;
};
