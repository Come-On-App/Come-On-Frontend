export interface NickNameIconButtonProps {
  onPress: () => void;
}

export interface ProfileNameProps {
  name: string;
  email: string;
}

export interface ProfileImageProps {
  image: string | null;
  nickname: string;
}
