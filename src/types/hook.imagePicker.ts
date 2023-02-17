export type AssetState = {
  name: string;
  type: string;
  uri: string;
  base64?: string | null | undefined;
};

export type PickImage = () => void;
